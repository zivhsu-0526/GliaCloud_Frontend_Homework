import styled from 'styled-components';
import { theme } from '../theme';
import { flexColumn, flexBetween, mobileOptimized, monospaceText } from '../mixins';

export const PreviewContainer = styled.div`
  flex: 1;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background.dark};
  color: ${theme.colors.text.inverse};
  ${flexColumn}
  height: 100%;
  ${mobileOptimized}

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
  }
`;

export const Header = styled.div`
  padding-bottom: ${theme.spacing.lg};
  flex-shrink: 0;
  ${flexBetween}

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-bottom: ${theme.spacing.md};
  }
`;

export const Title = styled.h2`
  font-size: ${theme.typography.fontSizes.xxl};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.inverse};
  margin: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSizes.xl};
  }
`;

interface ModeToggleProps {
  $isHighlightMode: boolean;
}

export const ModeToggle = styled.button<ModeToggleProps>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${(props) => 
    props.$isHighlightMode ? theme.colors.secondary : '#4b5563'
  };
  color: ${theme.colors.text.inverse};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-size: ${theme.typography.fontSizes.sm};
  transition: ${theme.transitions.normal};

  &:hover {
    background: ${(props) => 
      props.$isHighlightMode ? theme.colors.secondaryDark : '#374151'
    };
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  background: #000;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};
  height: 335px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 200px;
    max-height: 50vh;
    border-radius: ${theme.borderRadius.md};
  }
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  ${flexColumn}
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.light};
  font-size: ${theme.typography.fontSizes.lg};
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSizes.md};
  }
`;

export const VideoCaption = styled.div`
  position: absolute;
  bottom: ${theme.spacing.lg};
  left: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.inverse};
  background: rgba(0, 0, 0, 0.7);
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  max-width: calc(100% - 32px);
`;

interface ModeIndicatorProps {
  $isHighlightMode: boolean;
}

export const ModeIndicator = styled.div<ModeIndicatorProps>`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background: ${(props) => 
    props.$isHighlightMode ? theme.colors.secondary : '#6b7280'
  };
  color: ${theme.colors.text.inverse};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.medium};
`; 