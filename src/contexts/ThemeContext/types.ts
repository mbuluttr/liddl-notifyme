export type ThemeTypes = 'light' | 'dark' | 'blue' | 'green' | 'gold';

export type Theme = {
  background: string;
  subStepSection: string;
  title: string;
  text: string;
  completedText: string;
  nonCompletedSquare: string;
  completedSquare: string;
  completedSquareCheck: string;
  circleOuter: string;
  circleInner: string;
  stepCheck: string;
  button: string;
  buttonIcon: string;
  input: string;
};

export type Themes = {
  dark: Theme;
  light: Theme;
  blue: Theme;
  green: Theme;
  gold: Theme;
};
