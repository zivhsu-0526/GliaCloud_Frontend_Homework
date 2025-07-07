import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import { Film, Scissors } from "lucide-react";
import {
  VideoData,
  TranscriptSentence,
  HighlightPlaybackState,
} from "../types";
import {
  generateHighlightClips,
  getOriginalTimeFromHighlightTime,
} from "../utils/highlightUtils";
import VideoControls from "./VideoControls";
import VideoTimeline from "./VideoTimeline";
import { useVideoNavigation } from "../hooks/useVideoNavigation";
import {
  PreviewContainer,
  Header,
  Title,
  ModeToggle,
  VideoContainer,
  Video,
  VideoPlaceholder,
  VideoCaption,
  ModeIndicator,
} from "../styles/components/VideoPreviewStyles";

interface VideoPreviewProps {
  videoData: VideoData;
  selectedSentences: TranscriptSentence[];
  currentTime: number;
  totalDuration: number;
  onTimeUpdate: (time: number) => void;
  isPlaying: boolean;
  onPlayingChange: (playing: boolean) => void;
  highlightPlaybackState: HighlightPlaybackState;
  onPlaybackModeToggle: () => void;
}

const VideoPreview = forwardRef<HTMLVideoElement, VideoPreviewProps>(
  (props, ref) => {
    const {
      videoData,
      selectedSentences,
      currentTime,
      totalDuration,
      onTimeUpdate,
      isPlaying,
      onPlayingChange,
      highlightPlaybackState,
      onPlaybackModeToggle,
    } = props;

    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentText, setCurrentText] = useState("");

    // Sync ref
    useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

    // Use custom navigation hook
    const { handleNext, handlePrevious, seekToTime } = useVideoNavigation({
      selectedSentences,
      highlightPlaybackState,
      videoRef,
      onTimeUpdate,
    });

    // Handle play/pause
    const handlePlay = () => {
      onPlayingChange(!isPlaying);
    };

    // Handle timeline interactions
    const handleTimelineClick = (newTime: number) => {
      if (highlightPlaybackState.isPlayingHighlights) {
        const clips = generateHighlightClips(selectedSentences);
        const originalTime = getOriginalTimeFromHighlightTime(newTime, clips);
        seekToTime(originalTime);
      } else {
        seekToTime(newTime);
      }
    };

    const handleDragStart = () => {
      if (isPlaying && videoRef.current) {
        videoRef.current.pause();
        onPlayingChange(false);
      }
    };

    const handleDragEnd = (newTime: number) => {
      handleTimelineClick(newTime);
      // Resume playback logic is handled in VideoTimeline component
    };

    // Listen to playback state
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleTimeUpdate = () => {
        onTimeUpdate(video.currentTime);
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }, [onTimeUpdate]);

    // Listen to playback state changes
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      if (isPlaying) {
        video.play().catch((error) => {
          console.error("Play failed:", error);
          onPlayingChange(false);
        });
      } else {
        video.pause();
      }
    }, [isPlaying, onPlayingChange]);

    // Subtitle alignment: highlight mode back to original time and get text
    useEffect(() => {
      let lookupTime = currentTime;
      if (highlightPlaybackState.isPlayingHighlights) {
        const clips = generateHighlightClips(selectedSentences);
        lookupTime = getOriginalTimeFromHighlightTime(currentTime, clips);
      }
      let text = "";
      for (const sec of videoData.transcript) {
        for (const s of sec.sentences) {
          if (lookupTime >= s.startTime && lookupTime < s.endTime) {
            text = s.text;
            break;
          }
        }
        if (text) break;
      }
      setCurrentText(text);
    }, [
      currentTime,
      highlightPlaybackState.isPlayingHighlights,
      selectedSentences,
      videoData.transcript,
    ]);

    // Listen to playback mode changes
    useEffect(() => {
      if (!ref) return;
      const video = ref as React.MutableRefObject<HTMLVideoElement>;
      if (!video.current) return;

      if (highlightPlaybackState.isPlayingHighlights) {
        const clips = generateHighlightClips(selectedSentences);
        if (clips.length > 0) {
          const handleSeeked = () => {
            onTimeUpdate(video.current?.currentTime || 0);
            video.current?.removeEventListener("seeked", handleSeeked);
          };
          video.current.addEventListener("seeked", handleSeeked);
          video.current.currentTime = clips[0].originalStartTime;
        }
      } else {
        const handleSeeked = () => {
          onTimeUpdate(video.current?.currentTime || 0);
          video.current?.removeEventListener("seeked", handleSeeked);
        };
        video.current.addEventListener("seeked", handleSeeked);
        onTimeUpdate(video.current.currentTime);
      }
    }, [
      highlightPlaybackState.isPlayingHighlights,
      selectedSentences,
      ref,
      onTimeUpdate,
    ]);

    // Listen to video loaded
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleLoadedMetadata = () => {
        if (highlightPlaybackState.isPlayingHighlights) {
          const clips = generateHighlightClips(selectedSentences);
          if (clips.length > 0) {
            const handleSeeked = () => {
              onTimeUpdate(video.currentTime);
              video.removeEventListener("seeked", handleSeeked);
            };
            video.addEventListener("seeked", handleSeeked);
            video.currentTime = clips[0].originalStartTime;
          }
        } else {
          const handleSeeked = () => {
            onTimeUpdate(video.currentTime);
            video.removeEventListener("seeked", handleSeeked);
          };
          video.addEventListener("seeked", handleSeeked);
          video.currentTime = 0;
        }
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }, [
      videoRef,
      highlightPlaybackState.isPlayingHighlights,
      selectedSentences,
      onTimeUpdate,
    ]);

    // Listen to video time update for highlight mode auto-jump
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleTimeUpdate = () => {
        if (highlightPlaybackState.isPlayingHighlights && isPlaying) {
          const currentTime = video.currentTime;
          const clips = generateHighlightClips(selectedSentences);

          let isInSelectedClip = false;
          let nextClipStartTime = null;
          let currentClipEndTime = null;

          for (let i = 0; i < clips.length; i++) {
            const clip = clips[i];
            if (
              currentTime >= clip.originalStartTime - 0.1 &&
              currentTime <= clip.originalEndTime + 0.1
            ) {
              isInSelectedClip = true;
              currentClipEndTime = clip.originalEndTime;
              if (
                currentTime >= clip.originalEndTime - 0.2 &&
                i < clips.length - 1
              ) {
                nextClipStartTime = clips[i + 1].originalStartTime;
              }
              break;
            }
            if (currentTime < clip.originalStartTime - 0.1) {
              nextClipStartTime = clip.originalStartTime;
              break;
            }
          }

          if (
            !isInSelectedClip ||
            (currentClipEndTime && currentTime >= currentClipEndTime - 0.2)
          ) {
            if (nextClipStartTime !== null) {
              const handleSeeked = () => {
                video.removeEventListener("seeked", handleSeeked);
                if (isPlaying) {
                  video.play().catch(() => {
                    // Ignore auto play error
                  });
                }
              };
              video.addEventListener("seeked", handleSeeked);
              video.currentTime = nextClipStartTime;
            } else if (clips.length > 0) {
              const handleSeeked = () => {
                video.removeEventListener("seeked", handleSeeked);
                if (isPlaying) {
                  video.play().catch(() => {
                    // Ignore auto play error
                  });
                }
              };
              video.addEventListener("seeked", handleSeeked);
              video.currentTime = clips[0].originalStartTime;
            }
          }
        }
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }, [
      videoRef,
      highlightPlaybackState.isPlayingHighlights,
      selectedSentences,
      isPlaying,
    ]);

    return (
      <PreviewContainer>
        <Header>
          <Title>Preview</Title>
          <ModeToggle
            $isHighlightMode={highlightPlaybackState.isPlayingHighlights}
            onClick={onPlaybackModeToggle}
          >
            {highlightPlaybackState.isPlayingHighlights ? (
              <>
                <Film size={16} />
                Full Video
              </>
            ) : (
              <>
                <Scissors size={16} />
                Highlights
              </>
            )}
          </ModeToggle>
        </Header>
        
        <VideoContainer>
          {videoData.url ? (
            <Video
              src={videoData.url}
              ref={videoRef}
              preload="metadata"
              playsInline
              webkit-playsinline="true"
              crossOrigin="anonymous"
              disablePictureInPicture
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = currentTime;
                }
              }}
            />
          ) : (
            <VideoPlaceholder>
              <div>Preview</div>
              <div
                style={{ fontSize: "14px", marginTop: "8px", color: "#6b7280" }}
              >
                Video content will appear here
              </div>
            </VideoPlaceholder>
          )}
          {currentText && <VideoCaption>{currentText}</VideoCaption>}
          <ModeIndicator
            $isHighlightMode={highlightPlaybackState.isPlayingHighlights}
          >
            {highlightPlaybackState.isPlayingHighlights
              ? "Highlights"
              : "Full Video"}
          </ModeIndicator>
        </VideoContainer>

        <VideoControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          onPlay={handlePlay}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        <VideoTimeline
          videoData={videoData}
          selectedSentences={selectedSentences}
          currentTime={currentTime}
          totalDuration={totalDuration}
          highlightPlaybackState={highlightPlaybackState}
          isPlaying={isPlaying}
          onTimelineClick={handleTimelineClick}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </PreviewContainer>
    );
  }
);

VideoPreview.displayName = "VideoPreview";

export default VideoPreview;
