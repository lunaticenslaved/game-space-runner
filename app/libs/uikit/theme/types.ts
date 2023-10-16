export type Theme = {
  colors: {
    // colors
    primaryColor: string;
    primaryColorHover: string;
    onPrimaryColor: string;
    errorColor: string;
    onErrorColor: string;

    shadowColor: string;

    // surface
    surfaceColor: string;
    onSurfaceColor: '#fff';

    // animation
    animationTime: string;
  };
  components: {
    button: {
      bgColor: string;
      bgColorHover: string;
      bgColorDisabled: string;
      fontColorDisabled: string;
      fontColor: string;
      fontWeight: string;
      paddingX: string;
      paddingY: string;
      transition: string;
      spinnerColor: string;
      spinnerColorDisabled: string;
    };
    spinner: {
      color: string;
      width: string;
      speed: string;
    };
    card: {
      gapX: string;
      gapY: string;
      titleFontColor: string;
      subtitleFontColor: string;
      bodyFontColor: string;
      bgColor: string;
      shadow: string;
      backdropFilter: string;
    };
    progressLinear: {
      color: string;
      speed: string;
    };
    avatar: {
      bgColor: string;
    };
    inputField: {
      paddingX: string;
      paddingY: string;
    };
  };
};
