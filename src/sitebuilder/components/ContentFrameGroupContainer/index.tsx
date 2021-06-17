import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { newId } from '../../../utils/BasicUtil';
import { getContentFrameGroupContainerClass } from '../../service/EditorHelperService';
import {
  ContentFrameGroupContainerType,
  ContentFrameGroupType,
} from '../../ContentFrameType';
import ControlButton from '../../ui/ControlButton';
import ContentFrameGroup from '../ContentFrameGroup';

import './style.scss';
import { getContentFrameGroupData } from '../../service/DataTypeService';

interface Props {
  verticalPosition: 'top' | 'middle' | 'bottom';
  layout: 'single-column' | 'two-column';
  layoutProportion:
    | 'auto-left'
    | 'auto-right'
    | 'equal'
    | 'wide-left'
    | 'wide-right';
  layoutResponsive: boolean;
  gap: 'none' | 'small' | 'medium' | 'large';
  content: ContentFrameGroupContainerType;
  handleChange: any;
}
const ContentFrameGroupContainer = (props: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const elementId = newId();

  const handleAdd = (frameGroup?: ContentFrameGroupType) => {
    const _content: ContentFrameGroupContainerType = {
      ...props.content,
      contentFrameGroup: [...props.content.contentFrameGroup],
    };
    const index = _content.contentFrameGroup.findIndex(
      (item) => item.id === frameGroup?.id
    );
    const newFrame: ContentFrameGroupType = getContentFrameGroupData();
    if (index >= 0) {
      _content.contentFrameGroup.splice(index + 1, 0, newFrame);
    } else {
      _content.contentFrameGroup = [newFrame];
    }
    props.handleChange(_content);
  };

  const handleDelete = () => {
    console.log('delete');
  };
  const handleChange = (frameGroup: ContentFrameGroupType) => {
    console.log(props.content.contentFrameGroup, frameGroup);
    const _content: ContentFrameGroupContainerType = {
      ...props.content,
      contentFrameGroup: [...props.content.contentFrameGroup],
    };
    const index = _content.contentFrameGroup.findIndex(
      (item) => item.id === frameGroup.id
    );
    if (index >= 0) {
      _content.contentFrameGroup[index] = frameGroup;
      props.handleChange(_content);
    }
  };

  return (
    <div
      className={getContentFrameGroupContainerClass(
        props.content.meta,
        props.layout,
        props.layoutProportion,
        props.layoutResponsive,
        props.gap
      )}
    >
      {props.content.contentFrameGroup.map((frameGroup) => (
        <div
          key={frameGroup.id}
          className="content-frame-group-container__item"
        >
          <ContentFrameGroup
            expandToFill={false}
            gap="small"
            gridWidth="auto"
            horizontalPosition="center"
            layout={frameGroup.meta.layout}
            content={frameGroup}
            handleChange={handleChange}
            addFrameGroup={() => handleAdd(frameGroup)}
          />
        </div>
      ))}
      {props.content.contentFrameGroup.length === 0 && (
        <ControlButton handleClick={handleAdd}>
          <FontAwesomeIcon icon={faPlus} />
          Add frame group
        </ControlButton>
      )}
    </div>
  );
};

export default ContentFrameGroupContainer;
