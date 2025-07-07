import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { VideoData, TranscriptSentence, HighlightPlaybackState } from '../types';
import { generateHighlightClips } from '../utils/highlightUtils';

const Timeline = styled.div`
  margin-top: ${theme.spacing.sm};
`;

const TimelineBar = styled.div`
  position: relative;
  width: 100%;
  height: 39px;
  background: #4b5563;
  border-radius: 3px;
  cursor: pointer;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

interface TimelineProgressProps {
  $progress: number;
  $isDragging?: boolean;
}

const TimelineProgress = styled.div<TimelineProgressProps>`
  height: 100%;
  background: #6b7280;
  border-radius: 3px;
  width: ${(props) => props.$progress}%;
  transition: ${(props) => (props.$isDragging ? "none" : "width 0.1s ease")};
`;

const TimelineHighlights = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

interface HighlightSegmentProps {
  $left: number;
  $width: number;
  $isSuggested?: boolean;
}

const HighlightSegment = styled.div<HighlightSegmentProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  background: ${(props) => (props.$isSuggested ? "#fbbf24" : theme.colors.secondary)};
  left: ${(props) => props.$left}%;
  width: ${(props) => props.$width}%;
  border-radius: 3px;
  opacity: ${(props) => (props.$isSuggested ? 0.7 : 1)};
`;

interface CurrentPositionMarkerProps {
  $position: number;
  $isDragging?: boolean;
}

const CurrentPositionMarker = styled.div<CurrentPositionMarkerProps>`
  position: absolute;
  top: -1px;
  bottom: -1px;
  background: #ef4444;
  left: ${(props) => props.$position}%;
  width: 3px;
  border-radius: 2px;
  z-index: 10;
  transition: ${(props) => (props.$isDragging ? "none" : "left 0.1s ease")};
`;

interface VideoTimelineProps {
  videoData: VideoData;
  selectedSentences: TranscriptSentence[];
  currentTime: number;
  totalDuration: number;
  highlightPlaybackState: HighlightPlaybackState;
  isPlaying: boolean;
  onTimelineClick: (time: number) => void;
  onDragStart: () => void;
  onDragEnd: (time: number) => void;
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({
  videoData,
  selectedSentences,
  currentTime,
  totalDuration,
  highlightPlaybackState,
  isPlaying,
  onTimelineClick,
  onDragStart,
  onDragEnd,
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [wasPlayingBeforeDrag, setWasPlayingBeforeDrag] = useState(false);

  const getTimeFromPosition = (clientX: number): number => {
    if (!timelineRef.current) return currentTime;

    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));

    if (highlightPlaybackState.isPlayingHighlights) {
      return percentage * totalDuration;
    } else {
      return percentage * videoData.duration;
    }
  };

  const handleTimelineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const newTime = getTimeFromPosition(event.clientX);
    onTimelineClick(newTime);
  };

  const handleMouseDown = () => {
    setWasPlayingBeforeDrag(isPlaying);
    onDragStart();
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newTime = getTimeFromPosition(e.clientX);
    onTimelineClick(newTime);
  };

  const handleMouseUp = (e: MouseEvent) => {
    setIsDragging(false);
    const newTime = getTimeFromPosition(e.clientX);
    onDragEnd(newTime);
  };

  useEffect(() => {
    if (!isDragging) return;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const renderTimelineSegments = () => {
    const segments: React.ReactElement[] = [];

    if (highlightPlaybackState.isPlayingHighlights) {
      const clips = generateHighlightClips(selectedSentences);
      clips.forEach((clip, i) => {
        const left = (clip.startTime / totalDuration) * 100;
        const width = ((clip.endTime - clip.startTime) / totalDuration) * 100;
        segments.push(
          <HighlightSegment
            key={`clip-${i}`}
            $left={left}
            $width={width}
            $isSuggested={false}
          />
        );
      });
    } else {
      videoData.transcript.forEach((section) => {
        section.sentences.forEach((sentence) => {
          if (sentence.selected || sentence.suggested) {
            const left = (sentence.startTime / videoData.duration) * 100;
            const width =
              ((sentence.endTime - sentence.startTime) / videoData.duration) * 100;
            segments.push(
              <HighlightSegment
                key={`sent-${sentence.id}`}
                $left={left}
                $width={width}
                $isSuggested={sentence.suggested && !sentence.selected}
              />
            );
          }
        });
      });
    }

    return segments;
  };

  return (
    <Timeline>
      <TimelineBar
        ref={timelineRef}
        onClick={handleTimelineClick}
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? "grabbing" : "pointer" }}
      >
        <TimelineProgress
          $progress={(currentTime / totalDuration) * 100}
          $isDragging={isDragging}
        />
        <TimelineHighlights>
          {renderTimelineSegments()}
          <CurrentPositionMarker
            $position={(currentTime / totalDuration) * 100}
            $isDragging={isDragging}
          />
        </TimelineHighlights>
      </TimelineBar>
    </Timeline>
  );
};

export default VideoTimeline; 