export type Theme = {
  colors: {
    primaryColor: string;
    primaryColorHover: string;
    onPrimaryColor: string;
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
      borderRadius: string;
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
      borderRadius: string;
      shadow: string;
      backdropFilter: string;
    };
    progressLinear: {
      color: string;
      speed: string;
    };
    avatar: {
      borderRadius: string;
      bgColor: string;
    };
  };
};
