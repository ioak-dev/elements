import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import './style.scss';
import MetaDetails from './MetaDetails';
import ContentBuilder from '../../components/ContentBuilder';
import ContentType from '../../ContentType';
import BackgroundView from '../../components/BackgroundView';
import {
  getContentClass,
  getContentContainerClass,
  getTextAlignment,
} from '../../service/SitebuilderService';
import ContentFrame from '../../components/ContentFrame';
import ContentFrameGroup from '../../components/ContentFrameGroup';

interface Props {
  value: any;
  handleChange: any;
  placeholder?: string;
  handleEditRequest?: any;
  children?: any;
}
const SingleSectionEditor = (props: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleContentChange = (content: any) => {
    console.log(content);
    const _value = { ...props.value, content };
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

  const handleMetaChange = (value: any) => {
    console.log(value);
    props.handleChange(value);
  };

  const handleChangeBackground = (value: any) => {
    const _value = { ...props.value };
    _value.background = value;
    console.log(_value);
    props.handleChange(_value);
  };

  const elementId = newId();

  return (
    <>
      {!props.handleEditRequest && (
        <MetaDetails
          isActive={isEditOpen}
          handleChange={handleMetaChange}
          value={props.value}
          deactivate={() => setIsEditOpen(false)}
        />
      )}

      <BackgroundView
        value={props.value.background}
        handleChange={handleChangeBackground}
        handleEditRequest={
          props.handleEditRequest
            ? () => props.handleEditRequest()
            : () => setIsEditOpen(true)
        }
      >
        {props.children}
        <div
          className={`elements-site-viewbox ${getContentContainerClass(
            props.value.height,
            props.value.verticalPosition
          )}`}
        >
          {/* <div className="elements-site__content__textblock"> */}
          <ContentFrameGroup
            horizontalPosition={props.value.horizontalPosition}
            layout={props.value.layout}
            gap={props.value.gap}
            gridWidth={props.value.gridWidth}
            expandToFill={props.value.expandToFill}
            content={props.value.content}
            handleChange={handleContentChange}
          />
          {/* <ContentBuilder
            position={props.value.position}
            padding={props.value.padding}
            supportedTypes={[ContentType.TEXT, ContentType.ACTION]}
            value={props.value.content}
            handleChange={handleContentChange}
          /> */}
          {/* </div> */}
        </div>
      </BackgroundView>
    </>
  );
};

export default SingleSectionEditor;