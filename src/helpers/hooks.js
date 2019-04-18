import { useState } from 'react';

export function useToggle(defaultValue = false) {
  const [toggle, setToggle] = useState(defaultValue);
  function onToggled() {
    setToggle(!toggle);
  }
  return [toggle, onToggled];
}

export function useBtnControl(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);
  function onBtnClicked(e) {
    setValue(e.target.id === value ? '' : e.target.id);
  }
  return [value, onBtnClicked];
}

export function useInputControl(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);
  function onHandle(e) {
    setValue(e.currentTarget ? e.currentTarget.value : e);
  }
  return [value, onHandle];
}
