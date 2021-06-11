import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import './style.scss';
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
const SplitContentEditor = (props: Props) => {
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

  useEffect(() => {
    const el = document.getElementById(elementId);
    if (
      el &&
      props.value?.background?.source === 'UNSPLASH' &&
      props.value?.background?.data?.urls
    ) {
      el.style.backgroundImage = `url("${props.value.background.data.urls.regular}")`;
      el.style.backgroundColor = 'inherit';
    }
    if (el && props.value?.background?.source === 'SOLID-COLOR') {
      el.style.backgroundImage = 'none';
      if (props.value?.background?.data?.color === 'custom') {
        el.style.backgroundColor = props.value?.background?.data?.hex;
      } else if (props.value?.background?.data?.color === 'default') {
        el.style.backgroundColor = 'var(--color-surface)';
      } else {
        el.style.backgroundColor = `var(--color-${props.value?.background?.data?.color})`;
      }
    }
  }, [props.value]);

  const handleChange = (value: any) => {
    props.handleChange(value);
  };

  const handleChangeBackground = (value: any) => {
    const _value = { ...props.value };
    _value.background = value;
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

  const elementId = newId();

  return (
    <>
      <MetaDetails
        isActive={props.currentEditorId === props.value.id}
        handleChange={handleChange}
        value={props.value}
        deactivate={props.stopEditing}
      />

      <BackgroundView
        value={props.value.background}
        handleChange={handleChangeBackground}
        handleResizeUp={
          props.value.proportion > -3 ? () => handleResizeUp() : null
        }
        handleResizeDown={
          props.value.proportion < 3 ? () => handleResizeDown() : null
        }
        resizeControlPosition="left"
      >
        <div className="elements-site-viewbox">
          <div className={getSplitSectionClass(props.value.proportion)}>
            <div
              className={getContentContainerClass(
                props.value.height,
                props.value.left.verticalPosition
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
            <div
              className={getContentContainerClass(
                props.value.height,
                props.value.right.verticalPosition
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
          </div>
        </div>
      </BackgroundView>
    </>
  );
};

export default SplitContentEditor;
