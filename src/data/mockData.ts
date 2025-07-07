import { VideoData } from "../types";

export const generateMockVideoData = (): VideoData => {
  const data: VideoData = {
    url: `${window.location.origin}/sample-video264.mp4`,
    duration: 70.5,
    transcript: [
      {
        id: "intro",
        title: "Introduction",
        sentences: [
          {
            id: "1",
            startTime: 0.25,
            endTime: 2.8,
            text: "Welcome to our product demonstration.",
            selected: false,
            suggested: false,
          },
          {
            id: "2",
            startTime: 4.8,
            endTime: 7.2,
            text: "Today, we'll be showcasing our latest innovation.",
            selected: false,
            suggested: false,
          },
        ],
      },
      {
        id: "features",
        title: "Key Features",
        sentences: [
          {
            id: "3",
            startTime: 14.5,
            endTime: 17,
            text: "Our product has three main features.",
            selected: false,
            suggested: false,
          },
          {
            id: "4",
            startTime: 19.2,
            endTime: 21.65,
            text: "First, it's incredibly easy to use.",
            selected: false,
            suggested: false,
          },
          {
            id: "5",
            startTime: 24.1,
            endTime: 25.85,
            text: "Second, it's highly efficient.",
            selected: false,
            suggested: false,
          },
          {
            id: "6",
            startTime: 28.4,
            endTime: 30.2,
            text: "And third, it's cost-effective.",
            selected: false,
            suggested: false,
          },
        ],
      },
      {
        id: "demo",
        title: "Demonstration",
        sentences: [
          {
            id: "7",
            startTime: 37.8,
            endTime: 40.5,
            text: "Let me show you how it works.",
            selected: false,
            suggested: false,
          },
          {
            id: "8",
            startTime: 42.3,
            endTime: 45.15,
            text: "Simply press this button to start.",
            selected: false,
            suggested: false,
          },
          {
            id: "9",
            startTime: 46.8,
            endTime: 50.25,
            text: "The interface is intuitive and user-friendly.",
            selected: false,
            suggested: false,
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusion",
        sentences: [
          {
            id: "10",
            startTime: 57.2,
            endTime: 60.45,
            text: "In conclusion, our product is a game-changer.",
            selected: false,
            suggested: false,
          },
          {
            id: "11",
            startTime: 62.1,
            endTime: 64.2,
            text: "We're excited to bring this to market.",
            selected: false,
            suggested: false,
          },
          {
            id: "12",
            startTime: 65,
            endTime: 66.2,
            text: "Thank you for your attention.",
            selected: false,
            suggested: false,
          },
        ],
      },
    ],
    suggestedHighlights: ["2", "8", "9", "11"],
  };

  // mark the suggested highlights and automatically apply the selection
  data.transcript.forEach((section) => {
    section.sentences.forEach((sentence) => {
      // mark the suggested highlights
      if (data.suggestedHighlights.includes(sentence.id)) {
        sentence.suggested = true;
        sentence.selected = true; // automatically select the suggested highlights
      }
    });
  });

  return data;
};

/**
 * Generate mock data with millisecond precision from server response
 * This simulates a more realistic API response with precise timing
 */
export const generatePreciseMockVideoData = (): VideoData => {
  const data: VideoData = {
    url: `${window.location.origin}/sample-video264.mp4`,
    duration: 70.534, // Precise duration
    transcript: [
      {
        id: "intro",
        title: "Introduction",
        sentences: [
          {
            id: "1",
            startTime: 0.254,
            endTime: 2.847,
            text: "Welcome to our product demonstration.",
            selected: false,
            suggested: false,
          },
          {
            id: "2",
            startTime: 5.123,
            endTime: 8.756,
            text: "Today, we'll be showcasing our latest innovation.",
            selected: false,
            suggested: false,
          },
        ],
      },
      {
        id: "features",
        title: "Key Features",
        sentences: [
          {
            id: "3",
            startTime: 14.312,
            endTime: 16.945,
            text: "Our product has three main features.",
            selected: false,
            suggested: false,
          },
          {
            id: "4",
            startTime: 19.234,
            endTime: 21.678,
            text: "First, it's incredibly easy to use.",
            selected: false,
            suggested: false,
          },
          {
            id: "5",
            startTime: 24.156,
            endTime: 25.823,
            text: "Second, it's highly efficient.",
            selected: false,
            suggested: false,
          },
          {
            id: "6",
            startTime: 28.445,
            endTime: 30.234,
            text: "And third, it's cost-effective.",
            selected: false,
            suggested: false,
          },
        ],
      },
      {
        id: "demo",
        title: "Demonstration",
        sentences: [
          {
            id: "7",
            startTime: 38.789,
            endTime: 40.512,
            text: "Let me show you how it works.",
            selected: false,
            suggested: false,
          },
          {
            id: "8",
            startTime: 42.334,
            endTime: 45.167,
            text: "Simply press this button to start.",
            selected: false,
            suggested: false,
          },
          {
            id: "9",
            startTime: 47.623,
            endTime: 50.289,
            text: "The interface is intuitive and user-friendly.",
            selected: false,
            suggested: false,
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusion",
        sentences: [
          {
            id: "10",
            startTime: 57.845,
            endTime: 60.478,
            text: "In conclusion, our product is a game-changer.",
            selected: false,
            suggested: false,
          },
          {
            id: "11",
            startTime: 62.123,
            endTime: 65.734,
            text: "We're excited to bring this to market.",
            selected: false,
            suggested: false,
          },
          {
            id: "12",
            startTime: 65.912,
            endTime: 70.534,
            text: "Thank you for your attention.",
            selected: false,
            suggested: false,
          },
        ],
      },
    ],
    suggestedHighlights: ["2", "8", "9", "11"],
  };

  // mark the suggested highlights and automatically apply the selection
  data.transcript.forEach((section) => {
    section.sentences.forEach((sentence) => {
      // mark the suggested highlights
      if (data.suggestedHighlights.includes(sentence.id)) {
        sentence.suggested = true;
        sentence.selected = true; // automatically select the suggested highlights
      }
    });
  });

  return data;
};

/**
 * Convert milliseconds to seconds (for server responses in milliseconds)
 * @param timeInMs Time in milliseconds
 * @returns Time in seconds with millisecond precision
 */
export const msToSeconds = (timeInMs: number): number => {
  return Number((timeInMs / 1000).toFixed(3));
};

/**
 * Convert seconds to milliseconds (for API requests requiring milliseconds)
 * @param timeInSeconds Time in seconds
 * @returns Time in milliseconds
 */
export const secondsToMs = (timeInSeconds: number): number => {
  return Math.round(timeInSeconds * 1000);
};

export const mockApiCall = (file: File): Promise<VideoData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Use the precise mock data by default
      resolve(generateMockVideoData());
    }, 2000);
  });
}; 