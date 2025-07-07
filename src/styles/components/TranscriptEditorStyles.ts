import styled from 'styled-components';
import { theme } from '../theme';
import { flexColumn, flexBetween, mobileOptimized, customScrollbar } from '../mixins';

export const EditorContainer = styled.div`
  flex: 1;
  ${flexColumn}
  overflow: hidden;
  height: 100%;
  background: ${theme.colors.background.primary};
  ${mobileOptimized}
`;

export const Header = styled.div`
  padding: ${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.lg} ${theme.spacing.xl};
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
  }
`;

export const Title = styled.h2`
  font-size: ${theme.typography.fontSizes.xxl};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSizes.xl};
  }
`;

export const SuggestedHighlightsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.suggestion.background};
  border: 1px solid ${theme.colors.suggestion.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.suggestion.text};

  svg {
    width: 16px;
    height: 16px;
    color: ${theme.colors.suggestion.border};
  }
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 ${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.xl};
  min-height: 0;
  ${customScrollbar}

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.lg};
    -webkit-overflow-scrolling: touch;
  }
`;

export const Section = styled.div`
  margin-bottom: ${theme.spacing.xxl};
`;

export const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin: 0 0 10px 0;
`;

export const TranscriptList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

interface SentenceItemProps {
  $selected: boolean;
  $highlighted: boolean;
  $suggested?: boolean;
}

export const SentenceItem = styled.li<SentenceItemProps>`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.xs};
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  transition: ${theme.transitions.normal};

  /* Background logic */
  background: ${(props) => 
    props.$selected ? theme.colors.primary : 'transparent'
  };

  /* Border logic: use 2px for all borders to avoid height jumps */
  border: ${(props) => {
    if (props.$selected && props.$highlighted) {
      return `2px solid ${theme.colors.border.highlight}`;
    } else if (props.$selected) {
      return `2px solid ${theme.colors.primaryDark}`;
    } else if (props.$highlighted) {
      return `2px solid ${theme.colors.border.highlight}`;
    } else if (props.$suggested) {
      return `2px solid ${theme.colors.border.suggested}`;
    }
    return '2px solid transparent';
  }};

  color: ${(props) => 
    props.$selected ? theme.colors.text.inverse : theme.colors.text.primary
  };

  &:hover {
    background: ${(props) => 
      props.$selected ? theme.colors.primary : theme.colors.primaryLight
    };
  }
`;

export const SuggestedIndicator = styled.div`
  position: absolute;
  top: 6px;
  right: ${theme.spacing.sm};
  background: ${theme.colors.border.suggested};
  color: ${theme.colors.text.inverse};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;

  svg {
    width: 12px;
    height: 12px;
  }
`;

interface TimestampProps {
  $isSelected?: boolean;
}

export const Timestamp = styled.span<TimestampProps>`
  display: inline-block;
  width: 60px;
  font-weight: ${theme.typography.fontWeights.bold};
  margin-right: ${theme.spacing.md};
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  color: ${(props) => 
    props.$isSelected ? theme.colors.text.inverse : theme.colors.text.primary
  };
  cursor: pointer;
`;

export const SentenceText = styled.span`
  flex: 1;
  padding-right: 30px; /* leave space for suggested indicator */
`; 