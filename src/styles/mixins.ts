import { css } from 'styled-components';
import { theme } from './theme';

// Media query mixins
export const mediaQueries = {
  mobile: `@media (max-width: ${theme.breakpoints.mobile})`,
  tablet: `@media (max-width: ${theme.breakpoints.tablet})`,
  desktop: `@media (min-width: ${theme.breakpoints.desktop})`,
};

// Common layout mixins
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const absoluteFull = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

// Mobile optimization mixin
export const mobileOptimized = css`
  ${mediaQueries.mobile} {
    ${absoluteFull}
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

// Button mixins
export const buttonBase = css`
  border: none;
  cursor: pointer;
  transition: ${theme.transitions.normal};
  border-radius: ${theme.borderRadius.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const primaryButton = css`
  ${buttonBase}
  background: ${theme.colors.primary};
  color: ${theme.colors.text.inverse};
  
  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
  }
`;

export const secondaryButton = css`
  ${buttonBase}
  background: ${theme.colors.background.secondary};
  color: ${theme.colors.text.primary};
  
  &:hover:not(:disabled) {
    background: ${theme.colors.border.light};
  }
`;

// Text mixins
export const truncateText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const monospaceText = css`
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
`;

// Shadow mixins
export const cardShadow = css`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const elevatedShadow = css`
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
`;

// Scrollbar styling
export const customScrollbar = css`
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.background.secondary};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border.light};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.text.secondary};
  }
`;

// Loading animation
export const spinAnimation = css`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  animation: spin 1s linear infinite;
`;

// Focus states
export const focusOutline = css`
  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;

// Interactive states
export const interactiveElement = css`
  ${focusOutline}
  transition: ${theme.transitions.normal};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`; 