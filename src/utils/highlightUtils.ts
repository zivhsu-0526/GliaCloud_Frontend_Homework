import { HighlightClip, TranscriptSentence } from "../types";

/**
 * Generate highlight clips from selected sentences
 * Sentences with time intervals ≤ 5 seconds are merged into the same clip
 */
export const generateHighlightClips = (
  selectedSentences: TranscriptSentence[]
): HighlightClip[] => {
  if (selectedSentences.length === 0) return [];

  // sort the sentences by the start time
  const sortedSentences = [...selectedSentences].sort(
    (a, b) => a.startTime - b.startTime
  );

  const clips: HighlightClip[] = [];
  let currentClip: TranscriptSentence[] = [];
  let clipStartTime = 0;

  sortedSentences.forEach((sentence, index) => {
    const prevSentence = sortedSentences[index - 1];

    // if it's the first sentence, or the sentence is continuous with the previous sentence (the interval is less than or equal to 5 seconds)
    if (index === 0 || sentence.startTime - prevSentence.endTime <= 5) {
      if (currentClip.length === 0) {
        clipStartTime = clips.reduce(
          (acc, clip) => acc + (clip.endTime - clip.startTime),
          0
        );
      }
      currentClip.push(sentence);
    } else {
      // end the current clip, start a new clip
      if (currentClip.length > 0) {
        const clipDuration =
          currentClip[currentClip.length - 1].endTime -
          currentClip[0].startTime;
        clips.push({
          id: `clip-${clips.length + 1}`,
          startTime: clipStartTime,
          endTime: clipStartTime + clipDuration,
          sentences: [...currentClip],
          originalStartTime: currentClip[0].startTime,
          originalEndTime: currentClip[currentClip.length - 1].endTime,
        });
      }

      // start a new clip
      clipStartTime = clips.reduce(
        (acc, clip) => acc + (clip.endTime - clip.startTime),
        0
      );
      currentClip = [sentence];
    }
  });

  // process the last clip
  if (currentClip.length > 0) {
    const clipDuration =
      currentClip[currentClip.length - 1].endTime - currentClip[0].startTime;
    clips.push({
      id: `clip-${clips.length + 1}`,
      startTime: clipStartTime,
      endTime: clipStartTime + clipDuration,
      sentences: [...currentClip],
      originalStartTime: currentClip[0].startTime,
      originalEndTime: currentClip[currentClip.length - 1].endTime,
    });
  }

  return clips;
};

/**
 * Calculate total duration of highlight clips
 */
export const calculateHighlightDuration = (clips: HighlightClip[]): number => {
  return clips.reduce((total, clip) => {
    return total + (clip.endTime - clip.startTime);
  }, 0);
};

/**
 * Convert highlight timeline time to original video time
 */
export const getOriginalTimeFromHighlightTime = (
  highlightTime: number,
  clips: HighlightClip[]
): number => {
  if (clips.length === 0) return highlightTime;

  let accumulatedTime = 0;

  for (const clip of clips) {
    const clipDuration = clip.endTime - clip.startTime;

    if (highlightTime <= accumulatedTime + clipDuration) {
      // the time is within this clip
      const timeWithinClip = highlightTime - accumulatedTime;
      return clip.originalStartTime + timeWithinClip;
    }

    accumulatedTime += clipDuration;
  }

  // if the time exceeds all clips, return the end time of the last clip
  const lastClip = clips[clips.length - 1];
  return lastClip.originalEndTime;
};

/**
 * Convert original video time to highlight timeline time
 */
export const getHighlightTimeFromOriginalTime = (
  originalTime: number,
  clips: HighlightClip[]
): number => {
  if (clips.length === 0) return originalTime;

  let accumulatedTime = 0;

  for (const clip of clips) {
    if (
      originalTime >= clip.originalStartTime &&
      originalTime <= clip.originalEndTime
    ) {
      // the time is within this clip
      const timeWithinClip = originalTime - clip.originalStartTime;
      return accumulatedTime + timeWithinClip;
    }

    accumulatedTime += clip.endTime - clip.startTime;
  }

  // if the time is not within any clip, find the closest clip
  let closestClip = clips[0];
  let minDistance = Math.abs(originalTime - clips[0].originalStartTime);

  for (const clip of clips) {
    const distanceToStart = Math.abs(originalTime - clip.originalStartTime);
    const distanceToEnd = Math.abs(originalTime - clip.originalEndTime);
    const distance = Math.min(distanceToStart, distanceToEnd);

    if (distance < minDistance) {
      minDistance = distance;
      closestClip = clip;
    }
  }

  // return the start time of the closest clip in the highlight timeline
  let timeToClosestClip = 0;
  for (const clip of clips) {
    if (clip.id === closestClip.id) {
      break;
    }
    timeToClosestClip += clip.endTime - clip.startTime;
  }

  return timeToClosestClip;
}; 