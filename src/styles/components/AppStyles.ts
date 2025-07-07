import styled from 'styled-components';
import { theme } from '../theme';
import { flexColumn, mediaQueries } from '../mixins';

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  ${flexColumn}
  background-color: ${theme.colors.background.secondary};
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
  height: 100%;

  ${mediaQueries.mobile} {
    display: none;
  }
`;

export const LeftPanel = styled.div`
  width: 50%;
  background-color: ${theme.colors.background.primary};
  border-right: 1px solid ${theme.colors.border.light};
  ${flexColumn}
`;

export const RightPanel = styled.div`
  width: 50%;
  background-color: ${theme.colors.background.darker};
  ${flexColumn}
`; 