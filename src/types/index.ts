export interface TranscriptSentence {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  selected: boolean;
  highlighted?: boolean;
  suggested?: boolean;
}

export interface TranscriptSection {
  id: string;
  title: string;
  sentences: TranscriptSentence[];
}

export interface VideoData {
  url: string;
  duration: number;
  transcript: TranscriptSection[];
  suggestedHighlights: string[];
}

export interface TimelineSegment {
  startTime: number;
  endTime: number;
  text: string;
}

export interface HighlightClip {
  id: string;
  startTime: number;
  endTime: number;
  sentences: TranscriptSentence[];
  originalStartTime: number;
  originalEndTime: number;
}

export interface HighlightPlaybackState {
  currentClipIndex: number;
  currentClipTime: number;
  totalHighlightTime: number;
  isPlayingHighlights: boolean;
  isHighlightMode: boolean;
} 