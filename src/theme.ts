import '@material-ui/styles';

export const theme = {
  palette: {
    primary: '#FF6060',
    secondary: '#FF0066',
  },
};

type Theme = typeof theme;

declare module '@material-ui/styles' {
  export interface DefaultTheme extends Theme {}
}
