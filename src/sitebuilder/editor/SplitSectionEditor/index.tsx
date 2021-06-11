import React, { useEffect, useState } from 'react';
import MetaDetails from './MetaDetails';
import BackgroundView from '../../components/BackgroundView';
import {
  getContentContainerClass,
  getSplitSectionClass,
} from '../../service/EditorHelperService';
import ContentFrameGroup from '../../components/ContentFrameGroup';

interface Props {
  value: any;
  handleChange: any;
  placeholder?: string;
  currentEditorId?: string;
  stopEditing?: any;
}
const SplitSectionEditor = (props: Props) => {
  const handleContentLeftChange = (content: any) => {
    const _value = { ...props.value };
    _value.left.content = content;
    props.handleChange(_value);
  };

  const handleContentRightChange = (content: any) => {
    const _value = { ...props.value };
    _value.right.content = content;
    props.handleChange(_value);
  };

  const handleSectionChange = (value: any, pos: 'left' | 'right') => {
    const _value = { ...props.value };
    _value[pos] = value;
    // _value.left = { ..._value.left, height: value.height };
    props.handleChange(_value);
  };

  const handleChange = (value: any) => {
    props.handleChange(value);
  };

  const handleRightMetaChange = (value: any) => {
    const _value = { ...props.value };
    _value.right = value;
    _value.left = { ..._value.left, height: value.height };
    props.handleChange(_value);
  };

  const handleChangeLeftBackground = (value: any) => {
    const _value = { ...props.value };
    _value.left.background = value;
    props.handleChange(_value);
  };

  const handleChangeRightBackground = (value: any) => {
    const _value = { ...props.value };
    _value.right.background = value;
    props.handleChange(_value);
  };

  const handleResizeUp = () => {
    const _value = { ...props.value };
    _value.proportion -= 1;
    props.handleChange(_value);
  };

  const handleResizeDown = () => {
    const _value = { ...props.value };
    _value.proportion += 1;
    props.handleChange(_value);
  };

  return (
    <>
      <MetaDetails
        isActive={props.currentEditorId === props.value.id}
        handleChange={handleChange}
        value={props.value}
        deactivate={props.stopEditing}
      />

      <div className={getSplitSectionClass(props.value.proportion)}>
        <div>
          <BackgroundView
            value={props.value.left.background}
            handleChange={handleChangeLeftBackground}
            handleResizeUp={
              props.value.proportion > -3 ? () => handleResizeUp() : null
            }
            resizeControlPosition="right"
            split
          >
            <div
              className={getContentContainerClass(
                props.value.height,
                props.value.left.verticalPosition,
                'left'
              )}
            >
              <ContentFrameGroup
                horizontalPosition={props.value.left.horizontalPosition}
                layout={props.value.left.layout}
                gap={props.value.left.gap}
                gridWidth={props.value.left.gridWidth}
                expandToFill={props.value.left.expandToFill}
                content={props.value.left.content}
                handleChange={handleContentLeftChange}
              />
            </div>
          </BackgroundView>
        </div>
        <div>
          <BackgroundView
            value={props.value.right.background}
            handleChange={handleChangeRightBackground}
            handleResizeDown={
              props.value.proportion < 3 ? () => handleResizeDown() : null
            }
            resizeControlPosition="left"
            split
          >
            <div
              className={getContentContainerClass(
                props.value.height,
                props.value.right.verticalPosition,
                'right'
              )}
            >
              <ContentFrameGroup
                horizontalPosition={props.value.right.horizontalPosition}
                layout={props.value.right.layout}
                gap={props.value.right.gap}
                gridWidth={props.value.right.gridWidth}
                expandToFill={props.value.right.expandToFill}
                content={props.value.right.content}
                handleChange={handleContentRightChange}
              />
            </div>
          </BackgroundView>
        </div>
      </div>
    </>
  );
};

export default SplitSectionEditor;
