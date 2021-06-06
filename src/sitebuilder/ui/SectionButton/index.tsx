import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import './style.scss';
import {
  getActionButtonClass,
  getActionButtonStyle,
} from '../../service/SitebuilderService';

interface Props {
  children: any;
  handleClick: any;
}
const SectionButton = (props: Props) => {
  const elementId = newId();

  return (
    <button
      id={elementId}
      className="section-button"
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
};

export default SectionButton;
