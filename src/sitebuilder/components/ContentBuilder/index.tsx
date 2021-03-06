import React, { useEffect, useState } from 'react';
import './style.scss';
import {
  ContentFrameItemType,
  ContentFrameItemDataType,
  ContentFrameMetaType,
} from '../../ContentFrameType';
import { newId } from '../../../utils/BasicUtil';
import TextInput from '../TextInput';
import { getContentClass } from '../../service/EditorHelperService';
import ImageContainer from '../ImageContainer';
import ActionLinks from '../ActionLinks';

interface Props {
  items: ContentFrameItemType[];
  handleChange: any;
  meta: ContentFrameMetaType;
}
const ContentBuilder = (props: Props) => {
  const [groupId, setGroupId] = useState(newId());

  const handleChange = (item: any) => {
    const index = props.items.findIndex((_item: any) => item.id === _item.id);
    if (index >= 0) {
      const _items = [...props.items];
      _items[index] = item;
      props.handleChange(_items);
    }
  };

  const handleDelete = (id: any) => {
    props.handleChange(props.items.filter((item: any) => item.id !== id));
  };

  return (
    <>
      <div className="content-builder">
        <div className={getContentClass(props.meta)}>
          {props.items.map((item) => (
            <div key={item.id}>
              {item.type === ContentFrameItemDataType.TEXT && (
                <TextInput
                  block={item}
                  handleChange={handleChange}
                  handleDelete={handleDelete}
                  placeholder="Enter text"
                  align={props.meta.horizontalPosition}
                />
              )}
              {item.type === ContentFrameItemDataType.IMAGE && (
                <ImageContainer
                  handleDelete={handleDelete}
                  block={item}
                  handleChange={handleChange}
                  align={props.meta.horizontalPosition}
                />
              )}
              {item.type === ContentFrameItemDataType.LINKS && (
                <ActionLinks
                  handleDelete={handleDelete}
                  block={item}
                  handleChange={handleChange}
                  align={props.meta.horizontalPosition}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContentBuilder;
