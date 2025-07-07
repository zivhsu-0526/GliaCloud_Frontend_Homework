import React, { useRef } from "react";
import styled from "styled-components";
import { Upload, AlertTriangle } from "lucide-react";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  box-sizing: border-box;

  /* mobile portrait optimization */
  @media (max-width: 767px) and (orientation: portrait) {
    padding: 15px;
    justify-content: flex-start;
    padding-top: 60px;
  }

  /* mobile landscape optimization */
  @media (max-width: 767px) and (orientation: landscape) {
    padding: 10px;
    justify-content: center;
    min-height: 100vh;
  }

  /* tablet landscape optimization */
  @media (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) {
    padding: 15px;
    justify-content: center;
  }
`;

const UploadBox = styled.div`
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 60px 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  margin-bottom: 40px;
  max-width: 400px;
  width: 100%;

  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  /* mobile portrait optimization */
  @media (max-width: 767px) and (orientation: portrait) {
    padding: 40px 20px;
    margin-bottom: 30px;
    border-radius: 8px;
  }

  /* mobile landscape optimization */
  @media (max-width: 767px) and (orientation: landscape) {
    padding: 25px 20px;
    margin-bottom: 15px;
    border-radius: 8px;
    max-width: 350px;
  }

  /* tablet landscape optimization */
  @media (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) {
    padding: 35px 30px;
    margin-bottom: 25px;
  }
`;

const UploadIcon = styled(Upload)`
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
  opacity: 0.8;

  /* mobile portrait optimization */
  @media (max-width: 767px) and (orientation: portrait) {
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
  }

  /* mobile landscape optimization */
  @media (max-width: 767px) and (orientation: landscape) {
    width: 40px;
    height: 40px;
    margin-bottom: 12px;
  }

  /* tablet landscape optimization */
  @media (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) {
    width: 48px;
    height: 48px;
    margin-bottom: 15px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 600;
  text-align: center;

  /* mobile portrait optimization */
  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 2rem;
    margin-bottom: 8px;
  }

  /* mobile landscape optimization */
  @media (max-width: 767px) and (orientation: landscape) {
    font-size: 1.8rem;
    margin-bottom: 5px;
  }

  /* tablet landscape optimization */
  @media (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) {
    font-size: 2rem;
    margin-bottom: 8px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.9;
  text-align: center;

  /* mobile portrait optimization */
  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 1rem;
    margin-bottom: 25px;
  }

  /* mobile landscape optimization */
  @media (max-width: 767px) and (orientation: landscape) {
    font-size: 0.95rem;
    margin-bottom: 15px;
  }

  /* tablet landscape optimization */
  @media (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const WarningContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.9;
  text-align: center;
  max-width: 400px;
  width: 100%;

  /* mobile portrait optimization */
  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 0.95rem;
    margin-bottom: 20px;
    align-items: flex-start;
    text-align: left;
  }

  /* mobile landscape optimization */
  @media (max-width: 767px) and (orientation: landscape) {
    font-size: 0.9rem;
    margin-bottom: 10px;
    align-items: flex-start;
    text-align: left;
    max-width: 350px;
  }

  /* tablet landscape optimization */
  @media (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) {
    font-size: 0.95rem;
    margin-bottom: 15px;
    align-items: flex-start;
    text-align: left;
  }
`;

const WarningIcon = styled(AlertTriangle)`
  width: 20px;
  height: 20px;
  color: #fbbf24;
  flex-shrink: 0;

  /* mobile portrait optimization */
  @media (max-width: 767px) and (orientation: portrait) {
    width: 18px;
    height: 18px;
    margin-top: 2px;
  }

  /* mobile landscape optimization */
  @media (max-width: 767px) and (orientation: landscape) {
    width: 16px;
    height: 16px;
    margin-top: 1px;
  }

  /* tablet landscape optimization */
  @media (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) {
    width: 18px;
    height: 18px;
    margin-top: 2px;
  }
`;

const UploadText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 10px;

  /* mobile portrait optimization */
  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  /* mobile landscape optimization */
  @media (max-width: 767px) and (orientation: landscape) {
    font-size: 1rem;
    margin-bottom: 6px;
  }

  /* tablet landscape optimization */
  @media (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
`;

const FileInfo = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;

  /* mobile portrait optimization */
  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 0.85rem;
  }

  /* mobile landscape optimization */
  @media (max-width: 767px) and (orientation: landscape) {
    font-size: 0.8rem;
  }

  /* tablet landscape optimization */
  @media (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) {
    font-size: 0.85rem;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

interface VideoUploadProps {
  onFileUpload: (file: File) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      onFileUpload(file);
    } else {
      alert("Please select a valid video file");
    }
  };

  return (
    <UploadContainer>
      <Title>Video Transcript Editor</Title>
      <Subtitle>Create exciting video highlights with AI</Subtitle>

      <UploadBox onClick={handleClick}>
        <UploadIcon />
        <UploadText>Click to upload video file</UploadText>
        <FileInfo>Supports MP4, MOV, AVI formats</FileInfo>
      </UploadBox>

      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
      />

      <WarningContainer>
        <WarningIcon />
        This is a simulation of the video transcript editor, the video will used
        the sample video.
      </WarningContainer>
    </UploadContainer>
  );
};

export default VideoUpload;
