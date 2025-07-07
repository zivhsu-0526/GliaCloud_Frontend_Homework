import React, { useState, useRef, useEffect } from "react";
import { VideoData, TranscriptSentence, HighlightPlaybackState } from "./types";
import { mockApiCall } from "./data/mockData";
import {
  generateHighlightClips,
  calculateHighlightDuration,
  getOriginalTimeFromHighlightTime,
  getHighlightTimeFromOriginalTime,
} from "./utils/highlightUtils";
import VideoUpload from "./components/VideoUpload";
import MobileLayout from "./components/MobileLayout";
import LoadingScreen from "./components/LoadingScreen";
import TranscriptEditor from "./components/TranscriptEditor";
import VideoPreview from "./components/VideoPreview";
import {
  AppContainer,
  MainContent,
  LeftPanel,
  RightPanel,
} from "./styles/components/AppStyles";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightPlaybackState, setHighlightPlaybackState] =
    useState<HighlightPlaybackState>({
      currentClipIndex: 0,
      currentClipTime: 0,
      totalHighlightTime: 0,
      isPlayingHighlights: false,
      isHighlightMode: false,
    });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      const data = await mockApiCall(file);
      setVideoData(data);
      // initialize the highlight playback state
      const selectedSentences = getSelectedSentences(data);
      const clips = generateHighlightClips(selectedSentences);
      setHighlightPlaybackState({
        currentClipIndex: 0,
        currentClipTime: 0,
        totalHighlightTime: calculateHighlightDuration(clips),
        isPlayingHighlights: clips.length > 0, // if there are selected clips, default to highlight mode
        isHighlightMode: clips.length > 0,
      });
    } catch (error) {
      console.error("Error processing video:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSentenceToggle = (sentenceId: string) => {
    if (!videoData) return;

    setVideoData((prev) => {
      if (!prev) return prev;

      const newData = {
        ...prev,
        transcript: prev.transcript.map((section) => ({
          ...section,
          sentences: section.sentences.map((sentence) =>
            sentence.id === sentenceId
              ? { ...sentence, selected: !sentence.selected }
              : sentence
          ),
        })),
      };

      // update the highlight playback state
      const selectedSentences = getSelectedSentences(newData);
      const clips = generateHighlightClips(selectedSentences);
      setHighlightPlaybackState((prevState) => ({
        ...prevState,
        totalHighlightTime: calculateHighlightDuration(clips),
        isPlayingHighlights: clips.length > 0 && prevState.isPlayingHighlights,
        isHighlightMode: clips.length > 0,
      }));

      return newData;
    });
  };

  const handleTimeSeek = (time: number) => {
    setCurrentTime(time);
    if (videoRef.current) {
      if (highlightPlaybackState.isPlayingHighlights) {
        // highlight mode: calculate the corresponding original video time
        const clips = generateHighlightClips(getSelectedSentences());
        const originalTime = getOriginalTimeFromHighlightTime(time, clips);
        videoRef.current.currentTime = originalTime;
      } else {
        // full video mode
        videoRef.current.currentTime = time;
      }
    }
  };

  // in the App component
  const handlePlaybackModeToggle = () => {
    if (!videoData) return;
    const selected = getSelectedSentences();
    if (selected.length === 0) return;

    // calculate the mapping
    const clips = generateHighlightClips(selected);
    const oldOriginalTime = videoRef.current?.currentTime ?? 0;
    const oldDisplayTime = getCurrentDisplayTime();
    let newOriginalTime = oldOriginalTime;
    let newDisplayTime = oldDisplayTime;

    if (!highlightPlaybackState.isPlayingHighlights) {
      // switch to highlight mode: use the original time to calculate the highlight time
      newDisplayTime = getHighlightTimeFromOriginalTime(oldOriginalTime, clips);
    } else {
      // switch to full video mode: use the highlight time to calculate the original time
      newOriginalTime = getOriginalTimeFromHighlightTime(oldDisplayTime, clips);
      newDisplayTime = newOriginalTime;
    }

    // set the state
    setHighlightPlaybackState((prev) => ({
      ...prev,
      isPlayingHighlights: !prev.isPlayingHighlights,
      isHighlightMode: !prev.isHighlightMode,
      totalHighlightTime: calculateHighlightDuration(clips),
      currentClipIndex: 0,
      currentClipTime: 0,
    }));
    setCurrentTime(newDisplayTime);

    // sync the video element
    if (videoRef.current) {
      videoRef.current.currentTime = newOriginalTime;
    }
  };

  const getSelectedSentences = (
    data: VideoData | null = videoData
  ): TranscriptSentence[] => {
    if (!data) return [];

    return data.transcript
      .flatMap((section) => section.sentences)
      .filter((sentence) => sentence.selected)
      .sort((a, b) => a.startTime - b.startTime);
  };

  // calculate the current displayed time (based on the playback mode)
  const getCurrentDisplayTime = (): number => {
    if (!highlightPlaybackState.isPlayingHighlights) {
      return currentTime;
    }

    const clips = generateHighlightClips(getSelectedSentences());
    return getHighlightTimeFromOriginalTime(currentTime, clips);
  };

  // calculate the total duration (based on the playback mode)
  const getTotalDuration = (): number => {
    if (!videoData) return 0;

    if (highlightPlaybackState.isPlayingHighlights) {
      const clips = generateHighlightClips(getSelectedSentences());
      return calculateHighlightDuration(clips);
    }

    return videoData.duration;
  };

  if (loading) return <LoadingScreen />;

  if (!videoData)
    return (
      <AppContainer>
        <VideoUpload onFileUpload={handleFileUpload} />
      </AppContainer>
    );

  const editor = (
    <TranscriptEditor
      videoData={videoData}
      onSentenceToggle={handleSentenceToggle}
      onTimeSeek={handleTimeSeek}
      currentTime={currentTime}
    />
  );
  const preview = (
    <VideoPreview
      videoData={videoData}
      selectedSentences={getSelectedSentences()}
      currentTime={getCurrentDisplayTime()}
      totalDuration={getTotalDuration()}
      onTimeUpdate={setCurrentTime}
      isPlaying={isPlaying}
      onPlayingChange={setIsPlaying}
      highlightPlaybackState={highlightPlaybackState}
      onPlaybackModeToggle={handlePlaybackModeToggle}
    />
  );

  return (
    <AppContainer>
      {/* if isMobile is false, render Desktop; if isMobile is true, render Mobile */}
      {isMobile ? (
        <MobileLayout transcriptEditor={editor} videoPreview={preview} />
      ) : (
        <MainContent>
          <LeftPanel>{editor}</LeftPanel>
          <RightPanel>{preview}</RightPanel>
        </MainContent>
      )}
    </AppContainer>
  );
}

export default App;
