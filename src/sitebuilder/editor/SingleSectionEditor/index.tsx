import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import './style.scss';
import MetaDetails from './MetaDetails';
import BackgroundView from '../../components/BackgroundView';
import { getContentContainerClass } from '../../service/EditorHelperService';
import ContentFrameGroup from '../../components/ContentFrameGroup';
import ContentFrameGroupContainer from '../../components/ContentFrameGroupContainer';
import { SingleSectionEditorType } from './SingleSectionEditorType';

interface Props {
  value: SingleSectionEditorType;
  handleChange: any;
  placeholder?: string;
  handleEditRequest?: any;
  children?: any;
  currentEditorId?: string;
  stopEditing?: any;
  childrenAtBottom?: boolean;
}
const SingleSectionEditor = (props: Props) => {
  const handleContentChange = (contentFrameGroupContainer: any) => {
    const _value: SingleSectionEditorType = {
      ...props.value,
      data: { ...props.value.data, contentFrameGroupContainer },
    };
    props.handleChange(_value);
  };

  useEffect(() => {
    const el = document.getElementById(elementId);
    if (
      el &&
      props.value?.data.background?.source === 'UNSPLASH' &&
      props.value?.data.background?.data?.urls
    ) {
      el.style.backgroundImage = `url("${props.value.data.background.data.urls.regular}")`;
      el.style.backgroundColor = 'inherit';
    }
    if (el && props.value?.data.background?.source === 'SOLID-COLOR') {
      el.style.backgroundImage = 'none';
      if (props.value?.data.background?.data?.color === 'custom') {
        el.style.backgroundColor = props.value?.data.background?.data?.hex;
      } else if (props.value?.data.background?.data?.color === 'default') {
        el.style.backgroundColor = 'var(--color-surface)';
      } else {
        el.style.backgroundColor = `var(--color-${props.value?.data.background?.data?.color})`;
      }
    }
  }, [props.value]);

  const handleMetaChange = (meta: any) => {
    props.handleChange({ ...props.value, meta });
  };

  const handleChangeBackground = (value: any) => {
    const _value: SingleSectionEditorType = {
      ...props.value,
      data: { ...props.value.data },
    };
    _value.data.background = value;
    props.handleChange(_value);
  };

  const elementId = newId();

  return (
    <>
      {!props.handleEditRequest && (
        <MetaDetails
          isActive={props.currentEditorId === props.value.id}
          handleChange={handleMetaChange}
          value={props.value.meta}
          deactivate={props.stopEditing}
        />
      )}

      <BackgroundView
        value={props.value.data.background}
        handleChange={handleChangeBackground}
      >
        {!props.childrenAtBottom && props.children}
        <div
          className={`elements-site-viewbox ${getContentContainerClass(
            props.value.meta.height,
            props.value.meta.verticalPosition
          )}`}
        >
          <ContentFrameGroupContainer
            gap={props.value.meta.gap}
            layout={props.value.meta.layout}
            verticalPosition={props.value.meta.verticalPosition}
            content={props.value.data.contentFrameGroupContainer}
            handleChange={handleContentChange}
          />
        </div>
        {props.childrenAtBottom && props.children}
      </BackgroundView>
    </>
  );
};

export default SingleSectionEditor;
