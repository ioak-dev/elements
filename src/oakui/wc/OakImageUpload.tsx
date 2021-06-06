import React, { useState, useEffect, ReactElement, useRef } from 'react';

interface Props {
  name?: string;
  value?: any;
  toolbarPosition?: 'top' | 'bottom' | 'left' | 'right';
  handleChange?: any;
}

const OakImageUpload = (props: Props) => {
  const elementRef = useRef();

  return (
    <oak-image-upload
      ref={elementRef}
      toolbarPosition={props.toolbarPosition}
    />
  );
};

export default OakImageUpload;
