/**
 * Format time in seconds to MM:SS format
 * Supports millisecond precision but displays only seconds
 * @param seconds Time in seconds (supports decimal values)
 * @returns Formatted time string (MM:SS)
 */
export const formatTime = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Format time in seconds to MM:SS.mmm format with millisecond precision
 * @param seconds Time in seconds (supports decimal values)
 * @returns Formatted time string with milliseconds (MM:SS.mmm)
 */
export const formatTimeWithMilliseconds = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds);
  const milliseconds = Math.round((seconds - totalSeconds) * 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
};

/**
 * Format time in seconds to HH:MM:SS format for longer durations
 * @param seconds Time in seconds (supports decimal values)
 * @returns Formatted time string (HH:MM:SS)
 */
export const formatDuration = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

/**
 * Format time in seconds to HH:MM:SS.mmm format with millisecond precision
 * @param seconds Time in seconds (supports decimal values)
 * @returns Formatted time string with milliseconds (HH:MM:SS.mmm)
 */
export const formatDurationWithMilliseconds = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds);
  const milliseconds = Math.round((seconds - totalSeconds) * 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  }
  
  return `${mins}:${secs
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
};

/**
 * Parse time string (MM:SS or MM:SS.mmm) to seconds
 * @param timeString Time string in MM:SS or MM:SS.mmm format
 * @returns Time in seconds with millisecond precision
 */
export const parseTimeString = (timeString: string): number => {
  const parts = timeString.split(':');
  if (parts.length !== 2) {
    throw new Error('Invalid time format. Expected MM:SS or MM:SS.mmm');
  }
  
  const minutes = parseInt(parts[0], 10);
  const secondsPart = parts[1];
  
  // Check if seconds part contains milliseconds
  if (secondsPart.includes('.')) {
    const [seconds, milliseconds] = secondsPart.split('.');
    return minutes * 60 + parseInt(seconds, 10) + parseInt(milliseconds, 10) / 1000;
  } else {
    const seconds = parseInt(secondsPart, 10);
    return minutes * 60 + seconds;
  }
};

/**
 * Format timestamp for display in transcript editor
 * Shows precise timing for better editing experience
 * @param seconds Time in seconds
 * @param showMilliseconds Whether to show milliseconds
 * @returns Formatted timestamp string
 */
export const formatTimestamp = (seconds: number, showMilliseconds: boolean = false): string => {
  return showMilliseconds ? formatTimeWithMilliseconds(seconds) : formatTime(seconds);
};

/**
 * Calculate the time difference between two timestamps
 * @param startTime Start time in seconds
 * @param endTime End time in seconds
 * @returns Duration in seconds with millisecond precision
 */
export const calculateDuration = (startTime: number, endTime: number): number => {
  return Number((endTime - startTime).toFixed(3));
};

/**
 * Round time to nearest millisecond for consistency
 * @param seconds Time in seconds
 * @returns Rounded time in seconds (3 decimal places)
 */
export const roundToMillisecond = (seconds: number): number => {
  return Number(seconds.toFixed(3));
};

/**
 * Check if a time value has millisecond precision
 * @param seconds Time in seconds
 * @returns True if the time has decimal places
 */
export const hasMillisecondPrecision = (seconds: number): boolean => {
  return seconds % 1 !== 0;
};

/**
 * Format file size in bytes to human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Truncate text to specified length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert seconds to percentage of total duration
 */
export const timeToPercentage = (currentTime: number, totalTime: number): number => {
  if (totalTime === 0) return 0;
  return Math.min(100, Math.max(0, (currentTime / totalTime) * 100));
};

/**
 * Convert percentage to time based on total duration
 */
export const percentageToTime = (percentage: number, totalTime: number): number => {
  return (percentage / 100) * totalTime;
}; 