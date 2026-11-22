import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: "'Source Code Pro', monospace",
  headings: { fontFamily: "'Source Code Pro', monospace" },
  colors: {
    accent: [
      '#f0ebfc', '#ded1f7', '#bca4ef', '#9a7ef0', '#7d5bea',
      '#6a41dd', '#4305ba', '#3a05a1', '#32048c', '#250367',
    ],
  },
  primaryColor: 'accent',
  primaryShade: { light: 6, dark: 3 },
});
