import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { newId } from '../../../utils/BasicUtil';
import { getContentFrameGroupClass } from '../../service/EditorHelperService';
import ContentFrame from '../ContentFrame';
import {
  ContentFrameGroupType,
  ContentFrameType,
} from '../../ContentFrameType';
import ControlButton from '../../ui/ControlButton';
import { getContentFrameData } from '../../service/DataTypeService';
import MetaDetails from './MetaDetails';

interface Props {
  layout: string;
  horizontalPosition: 'left' | 'center' | 'right';
  gap: 'none' | 'small' | 'medium' | 'large';
  gridWidth: 'auto' | 'small' | 'medium' | 'large';
  expandToFill: boolean;
  content: ContentFrameGroupType;
  handleChange: any;
  handleDelete: any;
  addFrameGroup: any;
}
const ContentFrameGroup = (props: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const elementId = newId();

  const handleMetaChange = (meta: any) => {
    const _content = { ...props.content, meta };
    props.handleChange(_content);
  };

  const handleAdd = (frame: ContentFrameType) => {
    const _content: ContentFrameGroupType = {
      ...props.content,
      contentFrame: [...props.content.contentFrame],
    };
    const index = _content.contentFrame.findIndex(
      (item) => item.id === frame.id
    );
    const newFrame: ContentFrameType = getContentFrameData();
    _content.contentFrame.splice(index + 1, 0, newFrame);
    props.handleChange(_content);
  };

  const handleDelete = (id: string) => {
    const _content: ContentFrameGroupType = {
      ...props.content,
      contentFrame: [...props.content.contentFrame],
    };
    _content.contentFrame = props.content.contentFrame.filter(
      (item) => item.id !== id
    );
    props.handleChange(_content);
  };

  const handleGroupDelete = () => {
    props.handleDelete(props.content.id);
  };

  const handleChange = (frame: ContentFrameType) => {
    const _content: ContentFrameGroupType = {
      ...props.content,
      contentFrame: [...props.content.contentFrame],
    };
    const index = _content.contentFrame.findIndex(
      (item) => item.id === frame.id
    );
    if (index >= 0) {
      _content.contentFrame[index] = frame;
      props.handleChange(_content);
    }
  };

  return (
    <>
      <MetaDetails
        deactivate={() => setIsEditOpen(false)}
        isActive={isEditOpen}
        value={props.content.meta}
        handleChange={handleMetaChange}
        handleDelete={handleGroupDelete}
      />
      <div className={getContentFrameGroupClass(props.content.meta)}>
        {props.content.contentFrame.map((frame, index) => (
          <div key={frame.id}>
            <ContentFrame
              frame={frame}
              addFrame={() => handleAdd(frame)}
              addFrameGroup={props.addFrameGroup}
              handleChange={handleChange}
              handleDelete={handleDelete}
              openFrameGroupSettings={
                index === 0 ? () => setIsEditOpen(true) : null
              }
            />
          </div>
        ))}
        {props.content.contentFrame.length === 0 && (
          <ControlButton handleClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} />
            Add frame
          </ControlButton>
        )}
      </div>
    </>
  );
};

export default ContentFrameGroup;
