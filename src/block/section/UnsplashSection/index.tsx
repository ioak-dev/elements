import React, { useEffect, useState } from 'react';
import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sectionlabel from '../../ui/SectionLabel';
import SectionButton from '../../../SiteBuilder/ui/SectionButton';
import UnsplashEditor from '../../editor/UnsplashEditor';
import NavigationActionType from '../NavigationActionType';
import NavigationToolset from '../NavigationToolset';
import '../Section.scss';

interface Props {
  label?: string;
  value: any;
  handleChange: any;
  handleNavigation?: any;
  placeholder?: string;
  navigationActions: NavigationActionType[];
  fixed?: boolean;
}
const UnsplashSection = (props: Props) => {
  const handleChange = (value: string) => {
    props.handleChange(value);
  };
  const handleNavigation = (value: NavigationActionType) => {
    props.handleNavigation(value);
  };

  const handlePositionChange = (
    position: 'left' | 'right' | 'center' | 'full'
  ) => {
    const _newData = { ...props.value.data, position };
    props.handleChange(_newData);
  };

  return (
    <div className="elements-editor-section">
      <div className="elements-editor-section__toolbar">
        <div className="elements-editor-section__toolbar__left">
          <NavigationToolset
            actions={props.navigationActions}
            handleAction={handleNavigation}
          />
        </div>
        <div className="elements-editor-section__toolbar__right">
          <Sectionlabel label={props.label || 'PARAGRAPH'} />
          {!props.fixed && (
            <SectionButton handleClick={() => handlePositionChange('left')}>
              <FontAwesomeIcon icon={faAlignLeft} />
            </SectionButton>
          )}
          {!props.fixed && (
            <SectionButton handleClick={() => handlePositionChange('right')}>
              <FontAwesomeIcon icon={faAlignRight} />
            </SectionButton>
          )}
          {!props.fixed && (
            <SectionButton handleClick={() => handlePositionChange('center')}>
              <FontAwesomeIcon icon={faAlignCenter} />
            </SectionButton>
          )}
          {!props.fixed && (
            <SectionButton handleClick={() => handlePositionChange('full')}>
              <FontAwesomeIcon icon={faAlignJustify} />
            </SectionButton>
          )}
        </div>
      </div>
      <div className="elements-editor-section__editor">
        <UnsplashEditor
          value={props.value}
          placeholder={props.placeholder}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default UnsplashSection;
