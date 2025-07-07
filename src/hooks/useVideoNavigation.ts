import { useCallback } from 'react';
import { TranscriptSentence, HighlightPlaybackState } from '../types';
import { generateHighlightClips } from '../utils/highlightUtils';
import { roundToMillisecond } from '../utils/formatUtils';

interface UseVideoNavigationProps {
  selectedSentences: TranscriptSentence[];
  highlightPlaybackState: HighlightPlaybackState;
  videoRef: React.RefObject<HTMLVideoElement>;
  onTimeUpdate: (time: number) => void;
}

export const useVideoNavigation = ({
  selectedSentences,
  highlightPlaybackState,
  videoRef,
  onTimeUpdate,
}: UseVideoNavigationProps) => {
  
  const seekToTime = useCallback((targetTime: number) => {
    if (!videoRef.current) return;

    // Round to millisecond precision for consistency
    const preciseTargetTime = roundToMillisecond(targetTime);

    try {
      videoRef.current.currentTime = preciseTargetTime;
      onTimeUpdate(preciseTargetTime);

      // Mobile extra handling: retry if time is not set correctly
      // Use smaller tolerance for millisecond precision
      setTimeout(() => {
        if (
          videoRef.current &&
          Math.abs(videoRef.current.currentTime - preciseTargetTime) > 0.1
        ) {
          videoRef.current.currentTime = preciseTargetTime;
          onTimeUpdate(videoRef.current.currentTime);
        }
      }, 100);
    } catch (error) {
      console.warn("Time jump failed:", error);
      onTimeUpdate(preciseTargetTime);
    }
  }, [videoRef, onTimeUpdate]);

  // Helper function for more precise time comparison
  const isTimeInRange = useCallback((currentTime: number, startTime: number, endTime: number): boolean => {
    // Use small tolerance for floating point comparison
    const tolerance = 0.001; // 1ms tolerance
    return currentTime >= (startTime - tolerance) && currentTime < (endTime + tolerance);
  }, []);

  const handleNext = useCallback(() => {
    if (!videoRef.current) return;

    if (highlightPlaybackState.isPlayingHighlights) {
      const clips = generateHighlightClips(selectedSentences);
      const currentTime = roundToMillisecond(videoRef.current.currentTime);

      // Find current clip and sentence
      let currentClipIdx = -1;
      let currentSentenceIdx = -1;

      for (let i = 0; i < clips.length; i++) {
        const clip = clips[i];
        if (isTimeInRange(currentTime, clip.originalStartTime, clip.originalEndTime)) {
          currentClipIdx = i;
          // Find current sentence
          for (let j = 0; j < clip.sentences.length; j++) {
            const sentence = clip.sentences[j];
            if (isTimeInRange(currentTime, sentence.startTime, sentence.endTime)) {
              currentSentenceIdx = j;
              break;
            }
          }
          break;
        }
      }

      // If current clip is found
      if (currentClipIdx !== -1) {
        const currentClip = clips[currentClipIdx];

        // If current sentence is found and not the last in current clip
        if (
          currentSentenceIdx !== -1 &&
          currentSentenceIdx < currentClip.sentences.length - 1
        ) {
          const nextSentence = currentClip.sentences[currentSentenceIdx + 1];
          seekToTime(nextSentence.startTime);
          return;
        }

        // Jump to next clip if available
        if (currentClipIdx < clips.length - 1) {
          const nextClip = clips[currentClipIdx + 1];
          seekToTime(nextClip.originalStartTime);
          return;
        }

        // Loop to first clip
        seekToTime(clips[0].originalStartTime);
        return;
      }

      // Find next closest clip
      let nextClipIdx = -1;
      let minTimeDiff = Infinity;

      for (let i = 0; i < clips.length; i++) {
        const clip = clips[i];
        if (clip.originalStartTime > currentTime) {
          const timeDiff = clip.originalStartTime - currentTime;
          if (timeDiff < minTimeDiff) {
            minTimeDiff = timeDiff;
            nextClipIdx = i;
          }
        }
      }

      if (nextClipIdx !== -1) {
        seekToTime(clips[nextClipIdx].originalStartTime);
      } else if (clips.length > 0) {
        seekToTime(clips[0].originalStartTime);
      }
    } else {
      // Non-highlight mode
      const sentences = selectedSentences;
      const currentTime = roundToMillisecond(videoRef.current.currentTime);

      const currentIdx = sentences.findIndex(
        (s) => isTimeInRange(currentTime, s.startTime, s.endTime)
      );

      if (currentIdx !== -1 && currentIdx < sentences.length - 1) {
        const nextSentence = sentences[currentIdx + 1];
        seekToTime(nextSentence.startTime);
      } else {
        // Find next closest sentence
        let closestSentence = null;
        let minTimeDiff = Infinity;

        for (const sentence of sentences) {
          if (sentence.startTime > currentTime) {
            const timeDiff = sentence.startTime - currentTime;
            if (timeDiff < minTimeDiff) {
              minTimeDiff = timeDiff;
              closestSentence = sentence;
            }
          }
        }

        if (closestSentence) {
          seekToTime(closestSentence.startTime);
        } else if (sentences.length > 0) {
          seekToTime(sentences[0].startTime);
        }
      }
    }
  }, [videoRef, highlightPlaybackState.isPlayingHighlights, selectedSentences, seekToTime, isTimeInRange]);

  const handlePrevious = useCallback(() => {
    if (!videoRef.current) return;

    if (highlightPlaybackState.isPlayingHighlights) {
      const clips = generateHighlightClips(selectedSentences);
      const currentTime = roundToMillisecond(videoRef.current.currentTime);

      // Find current clip and sentence
      let currentClipIdx = -1;
      let currentSentenceIdx = -1;

      for (let i = 0; i < clips.length; i++) {
        const clip = clips[i];
        if (isTimeInRange(currentTime, clip.originalStartTime, clip.originalEndTime)) {
          currentClipIdx = i;
          for (let j = 0; j < clip.sentences.length; j++) {
            const sentence = clip.sentences[j];
            if (isTimeInRange(currentTime, sentence.startTime, sentence.endTime)) {
              currentSentenceIdx = j;
              break;
            }
          }
          break;
        }
      }

      // If current clip is found
      if (currentClipIdx !== -1) {
        const currentClip = clips[currentClipIdx];

        // If not first sentence in current clip
        if (currentSentenceIdx > 0) {
          const prevSentence = currentClip.sentences[currentSentenceIdx - 1];
          seekToTime(prevSentence.startTime);
          return;
        }

        // Jump to previous clip
        if (currentClipIdx > 0) {
          const prevClip = clips[currentClipIdx - 1];
          const lastSentence = prevClip.sentences[prevClip.sentences.length - 1];
          seekToTime(lastSentence.startTime);
          return;
        }

        // Loop to last clip
        const lastClip = clips[clips.length - 1];
        const lastSentence = lastClip.sentences[lastClip.sentences.length - 1];
        seekToTime(lastSentence.startTime);
        return;
      }

      // Find previous closest clip
      let prevClipIdx = -1;
      let minTimeDiff = Infinity;

      for (let i = clips.length - 1; i >= 0; i--) {
        const clip = clips[i];
        if (clip.originalStartTime < currentTime) {
          const timeDiff = currentTime - clip.originalStartTime;
          if (timeDiff < minTimeDiff) {
            minTimeDiff = timeDiff;
            prevClipIdx = i;
          }
        }
      }

      if (prevClipIdx !== -1) {
        const prevClip = clips[prevClipIdx];
        const lastSentence = prevClip.sentences[prevClip.sentences.length - 1];
        seekToTime(lastSentence.startTime);
      } else if (clips.length > 0) {
        const lastClip = clips[clips.length - 1];
        const lastSentence = lastClip.sentences[lastClip.sentences.length - 1];
        seekToTime(lastSentence.startTime);
      }
    } else {
      // Non-highlight mode
      const sentences = selectedSentences;
      const currentTime = roundToMillisecond(videoRef.current.currentTime);

      const currentIdx = sentences.findIndex(
        (s) => isTimeInRange(currentTime, s.startTime, s.endTime)
      );

      if (currentIdx > 0) {
        const prevSentence = sentences[currentIdx - 1];
        seekToTime(prevSentence.startTime);
      } else {
        // Find previous closest sentence
        let closestSentence = null;
        let minTimeDiff = Infinity;

        for (let i = sentences.length - 1; i >= 0; i--) {
          const sentence = sentences[i];
          if (sentence.startTime < currentTime) {
            const timeDiff = currentTime - sentence.startTime;
            if (timeDiff < minTimeDiff) {
              minTimeDiff = timeDiff;
              closestSentence = sentence;
            }
          }
        }

        if (closestSentence) {
          seekToTime(closestSentence.startTime);
        } else if (sentences.length > 0) {
          seekToTime(sentences[sentences.length - 1].startTime);
        }
      }
    }
  }, [videoRef, highlightPlaybackState.isPlayingHighlights, selectedSentences, seekToTime, isTimeInRange]);

  return {
    seekToTime,
    handleNext,
    handlePrevious,
  };
}; 