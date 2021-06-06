import {
  INPUT_CHANGE_EVENT,
  INPUT_INPUT_EVENT,
} from '@oakui/core-stage/event/OakInputEvent';
import React, { useState, useEffect, ReactElement, useRef } from 'react';

interface Props {
  name: string;
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'default'
    | 'danger'
    | 'warning'
    | 'success'
    | 'invert'
    | 'info';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  handleChange?: any;
  children: any;
  radioGroupName?: string;
}

const OakRadio = (props: Props) => {
  const elementRef = useRef();

  const handleChange = (event: any) => {
    if (props.handleChange) {
      const { detail } = event;
      props.handleChange(detail);
    }
  };

  useEffect(() => {
    (elementRef as any).current.addEventListener(
      INPUT_CHANGE_EVENT,
      handleChange
    );
    (elementRef as any).current.addEventListener(
      INPUT_INPUT_EVENT,
      handleChange
    );
    return () => {
      (elementRef as any).current?.removeEventListener(
        INPUT_CHANGE_EVENT,
        handleChange
      );
      (elementRef as any).current?.removeEventListener(
        INPUT_INPUT_EVENT,
        handleChange
      );
    };
  });

  return (
    <oak-radio
      ref={elementRef}
      name={props.name}
      color={props.color}
      size={props.size}
      radioGroupName={props.radioGroupName}
    >
      {props.children}
    </oak-radio>
  );
};

export default OakRadio;
