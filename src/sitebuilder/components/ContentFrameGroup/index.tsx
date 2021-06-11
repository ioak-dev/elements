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

interface Props {
  layout: string;
  horizontalPosition: 'left' | 'center' | 'right';
  gap: 'none' | 'small' | 'medium' | 'large';
  gridWidth: 'auto' | 'small' | 'medium' | 'large';
  expandToFill: boolean;
  content: ContentFrameGroupType;
  handleChange: any;
}
const ContentFrameGroup = (props: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const elementId = newId();

  const handleAdd = (frame: ContentFrameType) => {
    const _content = { ...props.content, items: [...props.content.items] };
    const index = _content.items.findIndex((item) => item.id === frame.id);
    const newFrame: ContentFrameType = {
      id: newId(),
      items: [],
      meta: {
        borderThickness: 'none',
        color: 'none',
        gap: 'small',
        horizontalPadding: 'small',
        horizontalPosition: 'left',
        verticalPadding: 'none',
        verticalPosition: 'top',
      },
    };
    _content.items.splice(index + 1, 0, newFrame);
    props.handleChange(_content);
  };

  const handleDelete = () => {
    console.log('delete');
  };
  const handleChange = (frame: ContentFrameType) => {
    const _content = { ...props.content, items: [...props.content.items] };
    const index = _content.items.findIndex((item) => item.id === frame.id);
    if (index >= 0) {
      _content.items[index] = frame;
      props.handleChange(_content);
    }
  };

  return (
    <div
      className={getContentFrameGroupClass(
        props.content.meta,
        props.horizontalPosition,
        props.layout,
        props.gap,
        props.gridWidth,
        props.expandToFill
      )}
    >
      {props.content.items.map((frame) => (
        <div key={frame.id}>
          <ContentFrame
            frame={frame}
            handleAdd={() => handleAdd(frame)}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        </div>
      ))}
      {props.content.items.length === 0 && (
        <ControlButton handleClick={handleAdd} circle>
          <FontAwesomeIcon icon={faThLarge} />
        </ControlButton>
      )}
    </div>
  );
};

export default ContentFrameGroup;
