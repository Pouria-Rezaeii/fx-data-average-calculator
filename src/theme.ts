import '@material-ui/styles';

export const theme = {
  palette: {
    primary: '#FF6060',
    secondary: {
      main: '#264653',
    },
    text: {
      primary: '#232323',
    },
  },
};

type Theme = typeof theme;

declare module '@material-ui/styles' {
  export interface DefaultTheme extends Theme {}
}
