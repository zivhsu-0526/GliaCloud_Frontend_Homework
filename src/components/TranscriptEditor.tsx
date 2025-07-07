import React, { useRef, useEffect } from "react";
import { Lightbulb } from "lucide-react";
import { VideoData } from "../types";
import { formatTime } from "../utils/formatUtils";
import {
  EditorContainer,
  Header,
  Title,
  SuggestedHighlightsInfo,
  Content,
  Section,
  SectionTitle,
  TranscriptList,
  SentenceItem,
  SuggestedIndicator,
  Timestamp,
  SentenceText,
} from "../styles/components/TranscriptEditorStyles";

interface TranscriptEditorProps {
  videoData: VideoData;
  onSentenceToggle: (sentenceId: string) => void;
  onTimeSeek: (time: number) => void;
  currentTime: number;
}

const TranscriptEditor: React.FC<TranscriptEditorProps> = ({
  videoData,
  onSentenceToggle,
  onTimeSeek,
  currentTime,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);



  const getCurrentSentence = () => {
    for (const section of videoData.transcript) {
      for (const sentence of section.sentences) {
        if (
          currentTime >= sentence.startTime &&
          currentTime <= sentence.endTime
        ) {
          return sentence.id;
        }
      }
    }
    return null;
  };

  // calculate the number of suggested highlights
  const getSuggestedCount = () => {
    return videoData.transcript
      .flatMap((section) => section.sentences)
      .filter((sentence) => sentence.suggested).length;
  };

  // Auto-scroll to current sentence
  useEffect(() => {
    const currentSentenceId = getCurrentSentence();
    if (currentSentenceId && contentRef.current) {
      const element = contentRef.current.querySelector(
        `[data-sentence-id="${currentSentenceId}"]`
      );
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }, [currentTime, videoData.transcript]);

  return (
    <EditorContainer>
      <Header>
        <Title>Transcript</Title>
        {getSuggestedCount() > 0 && (
          <SuggestedHighlightsInfo>
            <Lightbulb />
            AI suggested {getSuggestedCount()} highlights (yellow marked)
          </SuggestedHighlightsInfo>
        )}
      </Header>
      <Content ref={contentRef}>
        {videoData.transcript.map((section) => (
          <Section key={section.id}>
            <SectionTitle>{section.title}</SectionTitle>
            <TranscriptList>
              {section.sentences.map((sentence) => {
                const isHighlighted = getCurrentSentence() === sentence.id;
                const isActive = isHighlighted || sentence.selected;
                return (
                                <SentenceItem
                key={sentence.id}
                data-sentence-id={sentence.id}
                $selected={sentence.selected}
                $highlighted={isHighlighted}
                $suggested={sentence.suggested}
                onClick={() => onSentenceToggle(sentence.id)}
              >
                    <Timestamp
                      $isSelected={sentence.selected}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTimeSeek(sentence.startTime);
                      }}
                    >
                      {formatTime(sentence.startTime)}
                    </Timestamp>
                    <SentenceText>{sentence.text}</SentenceText>
                    {sentence.suggested && (
                      <SuggestedIndicator title="AI suggested highlights">
                        <Lightbulb />
                      </SuggestedIndicator>
                    )}
                  </SentenceItem>
                );
              })}
            </TranscriptList>
          </Section>
        ))}
      </Content>
    </EditorContainer>
  );
};

export default TranscriptEditor;
