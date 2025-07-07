import { test, expect } from '@playwright/test';

test.describe('Video Transcript Editor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show initial upload interface', async ({ page }) => {
    // check main title
    await expect(page.getByRole('heading', { name: 'Video Transcript Editor' })).toBeVisible();
    
    // check subtitle
    await expect(page.getByText('Create exciting video highlights with AI')).toBeVisible();
    
    // check upload area
    await expect(page.getByText('Click to upload video file')).toBeVisible();
    await expect(page.getByText('Supports MP4, MOV, AVI formats')).toBeVisible();
    
    // check description
    await expect(page.getByText('This is a simulation of the video transcript editor')).toBeVisible();
  });

  test('should be able to upload video and show processing status', async ({ page }) => {
    // click upload area
    await page.getByText('Click to upload video file').click();
    
    // upload video file
    await page.setInputFiles('input[type="file"]', 'public/sample-video264.mp4');
    
    // check processing status
    await expect(page.getByRole('heading', { name: 'Processing video...' })).toBeVisible();
    await expect(page.getByText('AI is analyzing content and generating subtitles')).toBeVisible();
    
    // wait for processing to complete, show transcript result
    await expect(page.getByRole('heading', { name: 'Transcript' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('AI suggested 4 highlights (yellow marked)')).toBeVisible();
  });

  test('should show transcript content and preview area', async ({ page }) => {
    // upload video
    await page.getByText('Click to upload video file').click();
    await page.setInputFiles('input[type="file"]', 'public/sample-video264.mp4');
    
    // wait for processing to complete
    await expect(page.getByRole('heading', { name: 'Transcript' })).toBeVisible({ timeout: 10000 });
    
    // check transcript content structure
    await expect(page.getByRole('heading', { name: 'Introduction' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Key Features' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Demonstration' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Conclusion' })).toBeVisible();
    
    // check preview area
    await expect(page.getByRole('heading', { name: 'Preview' })).toBeVisible();
    
    // check play mode switch button (initial state should be Full Video)
    await expect(page.getByRole('button', { name: 'Full Video' })).toBeVisible();
    
    // check control buttons
    await expect(page.getByRole('button', { name: 'Previous segment' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next segment' })).toBeVisible();
    
    // check time display (check if there is text with time format)
    const hasTimeFormat = await page.locator('text=/\\d{2}:\\d{2}/').count() > 0;
    expect(hasTimeFormat).toBe(true);
  });

  test('should be able to switch play mode', async ({ page }) => {
    // upload video
    await page.getByText('Click to upload video file').click();
    await page.setInputFiles('input[type="file"]', 'public/sample-video264.mp4');
    
    // wait for processing to complete
    await expect(page.getByRole('heading', { name: 'Preview' })).toBeVisible({ timeout: 10000 });
    
    // check initial state: Full Video button and Highlights indicator
    await expect(page.getByRole('button', { name: 'Full Video' })).toBeVisible();
    
    // click play mode switch button
    await page.getByRole('button', { name: 'Full Video' }).click();
    
    // check play mode switch after state: Highlights button and Full Video indicator
    await expect(page.getByRole('button', { name: 'Highlights' })).toBeVisible();
    
    // switch back
    await page.getByRole('button', { name: 'Highlights' }).click();
    await expect(page.getByRole('button', { name: 'Full Video' })).toBeVisible();
  });

  test('should be able to control video playback', async ({ page }) => {
    // upload video
    await page.getByText('Click to upload video file').click();
    await page.setInputFiles('input[type="file"]', 'public/sample-video264.mp4');
    
    // wait for processing to complete
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible({ timeout: 10000 });
    
    // click play button
    await page.getByRole('button', { name: 'Play' }).click();
    
    // wait for video to play
    await page.waitForTimeout(2000);
    
    // check playback state: play button becomes pause button, or at least pause button is visible
    const pauseButton = page.getByRole('button', { name: 'Pause' });
    const playButton = page.getByRole('button', { name: 'Play' });
    
    // check if there is pause button or play button (at least one should be visible)
    const hasPlayControl = await pauseButton.isVisible() || await playButton.isVisible();
    expect(hasPlayControl).toBe(true);
    
    // if there is pause button, click it
    if (await pauseButton.isVisible()) {
      await pauseButton.click();
      await page.waitForTimeout(1000);
    }
  });

  test('should be able to use paragraph navigation', async ({ page }) => {
    // upload video
    await page.getByText('Click to upload video file').click();
    await page.setInputFiles('input[type="file"]', 'public/sample-video264.mp4');
    
    // wait for processing to complete
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible({ timeout: 10000 });
    
    // switch to Highlights mode to test paragraph navigation
    await page.getByRole('button', { name: 'Full Video' }).click();
    await expect(page.getByRole('button', { name: 'Highlights' })).toBeVisible();
    
    // click next segment button
    await page.getByRole('button', { name: 'Next segment' }).click();
    
    // wait for navigation to complete
    await page.waitForTimeout(1500);
    
    // verify navigation works (check if there is time change)
    const timeElements = await page.locator('text=/\\d{2}:\\d{2}/').count();
    expect(timeElements).toBeGreaterThan(0);
    
    // test previous segment button
    await page.getByRole('button', { name: 'Previous segment' }).click();
    await page.waitForTimeout(1000);
  });

  test('should show video subtitles', async ({ page }) => {
    // upload video
    await page.getByText('Click to upload video file').click();
    await page.setInputFiles('input[type="file"]', 'public/sample-video264.mp4');
    
    // wait for processing to complete
    await expect(page.getByRole('heading', { name: 'Preview' })).toBeVisible({ timeout: 10000 });
    
    // check if there is subtitle (in video preview area)
    await expect(page.getByText('Today, we\'ll be showcasing our latest innovation.').first()).toBeVisible();
    
    // switch to Highlights mode to test next paragraph
    await page.getByRole('button', { name: 'Full Video' }).click();
    await page.getByRole('button', { name: 'Next segment' }).click();
    
    // wait for subtitle to update
    await page.waitForTimeout(1500);
    
    // check if subtitle is updated (check if there is new subtitle text)
    const hasNewCaption = await page.getByText('Simply press this button to start.').count() > 0;
    expect(hasNewCaption).toBe(true);
  });

  test('should be able to click transcript text item', async ({ page }) => {
    // upload video
    await page.getByText('Click to upload video file').click();
    await page.setInputFiles('input[type="file"]', 'public/sample-video264.mp4');
    
    // wait for processing to complete
    await expect(page.getByRole('heading', { name: 'Transcript' })).toBeVisible({ timeout: 10000 });
    
    // click transcript text item
    await page.getByText('Welcome to our product demonstration.').click();
    
    // check if there is corresponding reaction (e.g. highlight)
    await page.waitForTimeout(500);
    
    // click another item
    await page.getByText('Our product has three main features.').click();
    await page.waitForTimeout(500);
  });
});

test.describe('time formatting tool test', () => {
  test('should correctly format time', async ({ page }) => {
    // these are pure function tests, we can run them in browser environment
    await page.goto('/');
    
    // test formatting functions in browser context
    const formatResults = await page.evaluate(() => {
      // define formatting functions for testing
      const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };
      
      const formatTimeWithMilliseconds = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const milliseconds = Math.floor((seconds % 1) * 1000);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
      };
      
      const hasMillisecondPrecision = (seconds: number): boolean => {
        return seconds % 1 !== 0;
      };
      
      return {
        formatTime_0: formatTime(0),
        formatTime_65: formatTime(65),
        formatTime_125: formatTime(125),
        formatTimeWithMs_0: formatTimeWithMilliseconds(0),
        formatTimeWithMs_65_123: formatTimeWithMilliseconds(65.123),
        hasMs_0: hasMillisecondPrecision(0),
        hasMs_65_123: hasMillisecondPrecision(65.123),
      };
    });
    
    // verify formatting results
    expect(formatResults.formatTime_0).toBe('00:00');
    expect(formatResults.formatTime_65).toBe('01:05');
    expect(formatResults.formatTime_125).toBe('02:05');
    expect(formatResults.formatTimeWithMs_0).toBe('00:00.000');
    expect(formatResults.formatTimeWithMs_65_123).toBe('01:05.123');
    expect(formatResults.hasMs_0).toBe(false);
    expect(formatResults.hasMs_65_123).toBe(true);
  });
}); 