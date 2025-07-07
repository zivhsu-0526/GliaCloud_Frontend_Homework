import React, { useState } from "react";
import styled from "styled-components";
import { Monitor, Edit3 } from "lucide-react";

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;

  @media (min-width: 768px) {
    display: none;
  }
`;

const TabBar = styled.div`
  display: flex;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  flex-shrink: 0;
  height: 60px;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 15px;
  border: none;
  background: ${(props) => (props.active ? "#4285f4" : "white")};
  color: ${(props) => (props.active ? "white" : "#666")};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  height: 100%;

  &:hover {
    background: ${(props) => (props.active ? "#3367d6" : "#f5f5f5")};
  }
`;

const TabContent = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  min-height: 0;
  margin-top: 60px;
  height: calc(100vh - 60px);
`;

const TabPane = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: ${(props) => (props.active ? "block" : "none")};
`;

interface MobileLayoutProps {
  transcriptEditor: React.ReactNode;
  videoPreview: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  transcriptEditor,
  videoPreview,
}) => {
  const [activeTab, setActiveTab] = useState<"transcript" | "preview">(
    "transcript"
  );

  return (
    <MobileContainer>
      <TabBar>
        <TabButton
          active={activeTab === "transcript"}
          onClick={() => setActiveTab("transcript")}
        >
          <Edit3 size={20} />
          Edit
        </TabButton>
        <TabButton
          active={activeTab === "preview"}
          onClick={() => setActiveTab("preview")}
        >
          <Monitor size={20} />
          Preview
        </TabButton>
      </TabBar>

      <TabContent>
        <TabPane active={activeTab === "transcript"}>
          {transcriptEditor}
        </TabPane>
        <TabPane active={activeTab === "preview"}>{videoPreview}</TabPane>
      </TabContent>
    </MobileContainer>
  );
};

export default MobileLayout;
