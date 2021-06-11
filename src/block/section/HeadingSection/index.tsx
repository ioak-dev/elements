import React, { useEffect, useState } from 'react';
import Sectionlabel from '../../ui/SectionLabel';
import SectionButton from '../../../SiteBuilder/ui/SectionButton';
import HeadingEditor from '../../editor/HeadingEditor';
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
const HeadingSection = (props: Props) => {
  const handleChange = (value: string) => {
    props.handleChange(value);
  };
  const handleNavigation = (value: NavigationActionType) => {
    props.handleNavigation(value);
  };

  const handleLevelChange = (level: 1 | 2 | 3) => {
    const _newData = { ...props.value.data, level };
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
          {!props.fixed && (
            <SectionButton handleClick={() => handleLevelChange(1)}>
              H1
            </SectionButton>
          )}
          {!props.fixed && (
            <SectionButton handleClick={() => handleLevelChange(2)}>
              H2
            </SectionButton>
          )}
          {!props.fixed && (
            <SectionButton handleClick={() => handleLevelChange(3)}>
              H3
            </SectionButton>
          )}
          <Sectionlabel label={props.label || 'HEADING'} />
        </div>
      </div>
      <div className="elements-editor-section__editor">
        <HeadingEditor
          value={props.value}
          placeholder={props.placeholder}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default HeadingSection;
