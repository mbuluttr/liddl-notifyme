export type ThemeTypes = 'light' | 'dark';

export type Theme = {
  background: string;
  subStepSection: string;
  title: string;
  text: string;
  completedText: string;
  nonCompletedSquare: string;
  completedSquare: string;
  completedSquareCheck: string;
  stepNonCompletedCircleOuter: string;
  stepNonCompletedCircleInner: string;
  stepCompletedCheck: string;
  floatButton: string;
  floatButtonIcon: string;
  input: string;
};

export type Themes = {
  dark: Theme;
  light: Theme;
  blue: Theme;
  green: Theme;
  gold: Theme;
};
