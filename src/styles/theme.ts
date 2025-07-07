export const theme = {
  colors: {
    primary: '#1890ff',
    primaryDark: '#0050b3',
    primaryLight: '#e6f7ff',
    secondary: '#3b82f6',
    secondaryDark: '#2563eb',
    
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      dark: '#1f2937',
      darker: '#2a3441',
    },
    
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#9ca3af',
      inverse: '#ffffff',
    },
    
    border: {
      light: '#e0e0e0',
      primary: '#1890ff',
      highlight: '#ffd700',
      suggested: '#fbbf24',
    },
    
    status: {
      success: '#52c41a',
      warning: '#fbbf24',
      error: '#ff4d4f',
      info: '#1890ff',
    },
    
    suggestion: {
      background: '#fef3c7',
      border: '#fbbf24',
      text: '#92400e',
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
  },
  
  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
  },
  
  typography: {
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  breakpoints: {
    mobile: '767px',
    tablet: '1024px',
    desktop: '1200px',
  },
  
  zIndex: {
    modal: 1000,
    overlay: 999,
    dropdown: 100,
    header: 10,
  },
  
  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },
} as const;

export type Theme = typeof theme; 