import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { formatTime } from '../utils/formatUtils';

const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.5fr;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
`;

const CurrentTime = styled.div`
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  color: ${theme.colors.text.inverse};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  text-align: right;
  justify-self: end;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  padding: ${theme.spacing.sm};
  cursor: pointer;
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transitions.normal};

  svg {
    width: 30px;
    height: 30px;
    stroke: ${theme.colors.text.inverse};
    fill: none;
    color: ${theme.colors.text.inverse};
  }

  &:hover svg {
    stroke: #e5e7eb;
  }
`;

const PlayButton = styled(ControlButton)`
  svg {
    width: 24px;
    height: 24px;
    stroke: ${theme.colors.text.inverse};
    fill: none;
    transform: translateX(1px);
  }

  &:hover svg {
    stroke: #e5e7eb;
  }
`;

interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  onPlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  currentTime,
  onPlay,
  onPrevious,
  onNext,
}) => {
  return (
    <Controls>
      <ControlButton onClick={onPrevious} title="Previous segment">
        <svg viewBox="0 0 24 24">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor" />
        </svg>
      </ControlButton>

      <PlayButton onClick={onPlay} title={isPlaying ? "Pause" : "Play"}>
        {isPlaying ? (
          <svg viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
            <rect x="14" y="4" width="4" height="16" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24">
            <polygon points="8,5 19,12 8,19" fill="currentColor" />
          </svg>
        )}
      </PlayButton>

      <ControlButton onClick={onNext} title="Next segment">
        <svg viewBox="0 0 24 24">
          <path d="M18 6h-2v12h2zm-3.5 6L6 6v12z" fill="currentColor" />
        </svg>
      </ControlButton>

      <CurrentTime>{formatTime(currentTime)}</CurrentTime>
    </Controls>
  );
};

export default VideoControls; 