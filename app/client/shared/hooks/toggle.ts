import { useCallback, useEffect, useMemo, useState } from 'react';

export interface ToggleInterface {
  isOn: boolean;
  isOff: boolean;
  toggle(): void;
  turnOn(): void;
  turnOff(): void;
}

export const useToggle = (isOn?: boolean): ToggleInterface => {
  const [value, setValue] = useState(!!isOn);
  const toggle = useCallback(() => setValue(v => !v), []);
  const turnOn = useCallback(() => setValue(true), []);
  const turnOff = useCallback(() => setValue(false), []);

  useEffect(() => {
    setValue(!!isOn);
  }, [isOn]);

  return useMemo(() => {
    return {
      toggle,
      turnOff,
      turnOn,
      isOn: value === true,
      isOff: value === false,
    };
  }, [toggle, turnOff, turnOn, value]);
};
