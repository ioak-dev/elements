import React, { useEffect, useState } from 'react';
import MetaDetails from './MetaDetails';
import BackgroundView from '../../components/BackgroundView';
import {
  getContentContainerClass,
  getSplitSectionClass,
} from '../../service/EditorHelperService';
import ContentFrameGroup from '../../components/ContentFrameGroup';
import { SplitSectionEditorType } from './SplitSectionEditorType';
import ContentFrameGroupContainer from '../../components/ContentFrameGroupContainer';

interface Props {
  value: SplitSectionEditorType;
  handleChange: any;
  placeholder?: string;
  currentEditorId?: string;
  stopEditing?: any;
}
const SplitSectionEditor = (props: Props) => {
  const handleContentLeftChange = (contentFrameGroupContainer: any) => {
    const _value: SplitSectionEditorType = { ...props.value };
    _value.left.contentFrameGroupContainer = contentFrameGroupContainer;
    props.handleChange(_value);
  };

  const handleContentRightChange = (contentFrameGroupContainer: any) => {
    const _value = { ...props.value };
    _value.right.contentFrameGroupContainer = contentFrameGroupContainer;
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

  const handleMetaChange = (meta: any) => {
    props.handleChange({ ...props.value, meta });
  };

  const handleRightMetaChange = (value: any) => {
    const _value = { ...props.value };
    _value.right = value;
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
    _value.meta.proportion -= 1;
    props.handleChange(_value);
  };

  const handleResizeDown = () => {
    const _value = { ...props.value };
    _value.meta.proportion += 1;
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

      <div className={getSplitSectionClass(props.value.meta.proportion)}>
        <div>
          <BackgroundView
            value={props.value.left.background}
            handleChange={handleChangeLeftBackground}
            handleResizeUp={
              props.value.meta.proportion > -3 ? () => handleResizeUp() : null
            }
            resizeControlPosition="right"
            split
          >
            <div
              className={getContentContainerClass(
                props.value.meta.height,
                props.value.left.meta.verticalPosition,
                'left'
              )}
            >
              <ContentFrameGroupContainer
                gap={props.value.left.meta.gap}
                layout={props.value.left.meta.layout}
                layoutProportion={props.value.left.meta.layoutProportion}
                layoutResponsive={props.value.left.meta.layoutResponsive}
                verticalPosition={props.value.left.meta.verticalPosition}
                content={props.value.left.contentFrameGroupContainer}
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
              props.value.meta.proportion < 3 ? () => handleResizeDown() : null
            }
            resizeControlPosition="left"
            split
          >
            <div
              className={getContentContainerClass(
                props.value.meta.height,
                props.value.right.meta.verticalPosition,
                'right'
              )}
            >
              <ContentFrameGroupContainer
                gap={props.value.right.meta.gap}
                layout={props.value.right.meta.layout}
                layoutProportion={props.value.left.meta.layoutProportion}
                layoutResponsive={props.value.left.meta.layoutResponsive}
                verticalPosition={props.value.right.meta.verticalPosition}
                content={props.value.right.contentFrameGroupContainer}
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
