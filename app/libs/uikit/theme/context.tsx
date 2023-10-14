import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { Theme } from './types';
import { baseTheme } from './constants';

interface IThemeContext {
  theme: Theme;
  updateTheme(newTheme: Theme): void;
}

const ThemeContext = createContext<IThemeContext>({
  theme: baseTheme,
} as IThemeContext);

export type ThemeContextProviderProps = {
  children: ReactNode;
  theme?: Theme;
};

export const ThemeContextProvider = ({
  children,
  theme: themeProp = baseTheme,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState(themeProp);

  useEffect(() => {
    if (!document) return;

    const style = document.documentElement.style;
    const components = theme.components;

    style.setProperty('--primary-color', theme.colors.primaryColor);
    style.setProperty('--on-primary-color', theme.colors.onPrimaryColor);
    style.setProperty('--on-primary-color--hover', theme.colors.primaryColorHover);

    // spinner
    style.setProperty('--spinner-color', components.spinner.color);
    style.setProperty('--spinner-width', components.spinner.width);
    style.setProperty('--spinner-speed', components.spinner.speed);

    // button
    style.setProperty('--button-bg-color', components.button.bgColor);
    style.setProperty('--button-bg-color--hover', components.button.bgColorHover);
    style.setProperty('--button-bg-color--disabled', components.button.bgColorDisabled);
    style.setProperty('--button-color--disabled', components.button.fontColorDisabled);
    style.setProperty('--button-color', components.button.fontColor);
    style.setProperty('--button-font-weight', components.button.fontWeight);
    style.setProperty('--button-font-weight', components.button.fontWeight);
    style.setProperty('--button-border-radius', components.button.borderRadius);
    style.setProperty('--button-padding-x', components.button.paddingX);
    style.setProperty('--button-padding-y', components.button.paddingY);
    style.setProperty('--button-transition', components.button.transition);

    // card
    style.setProperty('--card-gap-x', components.card.gapX);
    style.setProperty('--card-gap-y', components.card.gapY);
    style.setProperty('--card-title-font-color', components.card.titleFontColor);
    style.setProperty('--card-subtitle-font-color', components.card.subtitleFontColor);
    style.setProperty('--card-body-font-color', components.card.bodyFontColor);
    style.setProperty('--card-bg-color', components.card.bgColor);
    style.setProperty('--card-border-radius', components.card.borderRadius);
    style.setProperty('--card-shadow', components.card.shadow);
    style.setProperty('--card-backdrop-filter', components.card.backdropFilter);

    // progress
    style.setProperty('--progress-linear-color', components.progressLinear.color);
    style.setProperty('--progress-linear-speed', components.progressLinear.speed);

    // avatar
    style.setProperty('--avatar-bg-color', components.avatar.bgColor);
    style.setProperty('--avatar-border-radius', components.avatar.borderRadius);
  }, [theme]);

  const value = useMemo(() => {
    return {
      theme,
      updateTheme: setTheme,
    };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('Uikit context not found');
  }

  return theme;
};
