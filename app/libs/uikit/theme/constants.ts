import { Theme } from './types';

const PRIMARY_COLOR = '#564282';
const PRIMARY_COLOR__HOVER = '#322858';
const ON_PRIMARY_COLOR = '#fff';
const DISABLED_COLOR = '#aaa';
const ON_DISABLED_COLOR = '#888';
const SURFACE_COLOR = '#2a3158';
const ON_SURFACE_COLOR = '#fff';

export const baseTheme: Theme = {
  colors: {
    primaryColor: PRIMARY_COLOR,
    primaryColorHover: PRIMARY_COLOR__HOVER,
    onPrimaryColor: ON_PRIMARY_COLOR,
    animationTime: '0.5s',

    errorColor: 'red',
    onErrorColor: '#fff',

    shadowColor: '#000',

    surfaceColor: SURFACE_COLOR,
    onSurfaceColor: ON_SURFACE_COLOR,
  },
  components: {
    button: {
      bgColor: PRIMARY_COLOR,
      bgColorHover: PRIMARY_COLOR__HOVER,
      bgColorDisabled: DISABLED_COLOR,
      fontColorDisabled: ON_DISABLED_COLOR,
      fontColor: ON_PRIMARY_COLOR,
      fontWeight: '800',
      paddingX: '16px',
      paddingY: '24px',
      transition: 'background 0.75s ease-out',
      spinnerColor: ON_PRIMARY_COLOR,
      spinnerColorDisabled: ON_DISABLED_COLOR,
    },
    spinner: {
      color: PRIMARY_COLOR,
      width: '4px',
      speed: '1s',
    },
    card: {
      gapY: '20px',
      gapX: '20px',
      titleFontColor: ON_PRIMARY_COLOR,
      subtitleFontColor: ON_PRIMARY_COLOR,
      bodyFontColor: ON_PRIMARY_COLOR,
      bgColor: SURFACE_COLOR,
      shadow: `0px 0px 8px ${SURFACE_COLOR}`,
      backdropFilter: 'blur(16px)',
    },
    progressLinear: {
      color: PRIMARY_COLOR,
      speed: '2.2s',
    },
    avatar: {
      bgColor: DISABLED_COLOR,
    },
    inputField: {
      paddingX: '16px',
      paddingY: '16px',
    },
  },
};
