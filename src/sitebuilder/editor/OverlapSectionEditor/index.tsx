import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import './style.scss';
import MetaDetails from './MetaDetails';
import { getOverlapSectionClass } from '../../service/EditorHelperService';
import SingleSectionEditor from '../SingleSectionEditor';
import { OverlapSectionEditorType } from './OverlapSectionEditorType';

interface Props {
  value: OverlapSectionEditorType;
  handleChange: any;
  placeholder?: string;
  currentEditorId?: string;
  stopEditing?: any;
}
const OverlapSectionEditor = (props: Props) => {
  const handleMetaChange = (value: any) => {
    props.handleChange(value);
  };

  const handleMainSectionChange = (value: any) => {
    const _value = { ...props.value, mainSection: value };
    props.handleChange(_value);
  };

  const handleSubSectionChange = (value: any) => {
    const _value = { ...props.value, subSection: value };
    props.handleChange(_value);
  };

  const elementId = newId();

  return (
    <div
      className={`overlap-section-editor overlap-section-editor--offset-${props.value.meta.offset} overlap-section-editor--offset-position-${props.value.meta.offsetPosition}`}
    >
      <MetaDetails
        isActive={props.currentEditorId === props.value.id}
        handleChange={handleMetaChange}
        value={props.value}
        deactivate={props.stopEditing}
      />
      <SingleSectionEditor
        value={props.value.mainSection}
        handleChange={handleMainSectionChange}
        childrenAtBottom={props.value.meta.offsetPosition === 'bottom'}
        // handleEditRequest={() => setIsEditOpen(true)}
      >
        <div
          className={getOverlapSectionClass(
            props.value.mainSection.meta.height,
            props.value.meta.width,
            props.value.meta.offset,
            props.value.meta.offsetPosition
          )}
        >
          <SingleSectionEditor
            value={props.value.subSection}
            handleChange={handleSubSectionChange}
          />
        </div>
      </SingleSectionEditor>
      {/* <MainView
        value={props.value.main}
        handleChange={handleChangeMain}
      >
        <div className="overlap-section__container">
          <SingleSectionEditor
            value={props.value.child}
            handleChange={handleMainSectionChange}
            // handleEditRequest={() => setIsEditOpen(true)}
          />
        </div>
        <ContentFrameGroup
          horizontalPosition={props.value.horizontalPosition}
          layout={props.value.layout}
          gap={props.value.gap}
          gridWidth={props.value.gridWidth}
          expandToFill={props.value.expandToFill}
          content={props.value.content}
          handleChange={handleContentChange}
        />
      </MainView> */}
    </div>
  );
};

export default OverlapSectionEditor;
