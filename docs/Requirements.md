# Video Highlight Tool - Frontend Homework Assignment Analysis

## Project Overview

This is an AI-powered video highlight editing tool. The tool helps users create highlight clips from uploaded videos and add transcripts.

## Core Feature Requirements

### 1. Video Upload
- Users can upload video files
- Support multiple video formats (MP4, MOV, AVI, etc.)

### 2. Mock AI Processing
Use a **mock API** to simulate AI processing that returns JSON data including:
- Full video transcript
- Transcript split into sections
- Titles for each section
- Suggested highlight sentences

### 3. User Interface Design

#### 3.1 Split Screen Layout
- **Left side:** Editing area
- **Right side:** Preview area

#### 3.2 Editing Area (Left)
- Shows transcript with **section titles**
- Displays sentences and their **timestamps**
- Users can select/unselect sentences for highlight clips
- **Clickable timestamps** for easy navigation
- **Auto-scrolls** to follow preview playback

#### 3.3 Preview Area (Right)
- Shows the **edited highlight clip**, not the original video
- Standard video player controls (play, pause, seek)
- Displays selected transcript text as an **overlay on the video**
- Timeline showing the selected highlights
- Smooth transitions between selected clips

#### 3.4 Synchronization
- **Editing Area → Preview Area:**
  - Clicking timestamps updates preview timeline
  - Selecting/unselecting sentences updates preview content
- **Preview Area → Editing Area:**
  - During playback, current sentence is highlighted in editing area
  - Editing area auto-scrolls to keep current sentence visible

### 4. Transcript Overlay
- Selected sentences appear as **text overlay** on the preview video
- Text timing matches the audio of the selected clips

## Technical Requirements

### Platform Support
- **Desktop:** Windows & Mac, latest Chrome
- **Mobile:** iOS & Android, latest Chrome & Safari

### Responsive Web Design
- Implement **responsive design** to support different device sizes

### Mock API Implementation
- Create a **mock API endpoint** simulating AI processing
- Return structured JSON with transcript, section titles, and highlight suggestions

## Evaluation Criteria

The submission will be evaluated on:

1. **Feature completeness**
2. **Code quality and organization**
3. **Documentation quality**
4. **User experience (UX) design**
5. **Responsive web design implementation**
6. **Quality and appropriateness of mock data**
7. **Overall polish and professionalism**

## Key Technical Highlights

### Video-Text Synchronization
- Precise synchronization between video and transcript
- Support timestamp navigation
- **Two-way synchronization** between editing and preview areas

### Text Overlay Technology
- Real-time display of selected transcript text on video
- Accurate timing matching text with audio

### Highlight Clip Editing
- Users can selectively edit highlight clips
- Support combining **non-continuous clips**
- Smooth transitions between clips

---

This project combines modern frontend technologies, video processing, and responsive design to deliver a fully functional demo of a video highlight editing tool. The focus is on smooth UX and precise video-text synchronization.
