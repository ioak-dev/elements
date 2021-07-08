import React, { useEffect, useState } from 'react';
import OakModal from '../../../oakui/wc/OakModal';
import OakButton from '../../../oakui/wc/OakButton';
import { newId } from '../../../utils/BasicUtil';
import './style.scss';
import OakClickArea from '../../../oakui/wc/OakClickArea';
import MetaDetails from './MetaDetails';
import { getTextClass, getTextStyle } from '../../service/EditorHelperService';
import { ContentFrameItemType } from '../../ContentFrameType';
import { DisableParallaxCommand } from 'src/SiteBuilder/event/DisableParallax';

const tinycolor = require('tinycolor2');

interface Props {
  handleChange: any;
  handleDelete: any;
  block: ContentFrameItemType;
  placeholder?: string;
  align?: 'left' | 'right' | 'center';
}
const TextInput = (props: Props) => {
  const [state, setState] = useState({
    edit: false,
    id: newId(),
  });

  const [className, setClassName] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [groupId, setGroupId] = useState(newId());

  useEffect(() => {
    setClassName(getTextClass(props.block, props.align));
    const viewEl = document.getElementById(`view-${state.id}`);
    const previewEl = document.getElementById(`preview-${state.id}`);
    const placeholderEl = document.getElementById(`placeholder-${state.id}`);
    const computedStyle = getTextStyle(props.block, props.align);
    if (viewEl) {
      viewEl.style.color = computedStyle.color;
    }
    if (previewEl) {
      previewEl.style.color = computedStyle.color;
    }
    if (placeholderEl) {
      placeholderEl.style.color = computedStyle.color;
    }
  }, [props.block, props.align]);

  const handleDataChange = (event: any) => {
    const _block = { ...props.block };
    _block.data[event.currentTarget.name] = event.currentTarget.value;
    props.handleChange(_block);
  };

  const handleMetaChange = (meta: any) => {
    const _block = { ...props.block };
    _block.meta = meta;
    props.handleChange(_block);
  };

  const handleDelete = () => {
    props.handleDelete(props.block.id);
    setIsOpen(false);
  };

  useEffect(() => {
    isOpen
      ? DisableParallaxCommand.next(true)
      : DisableParallaxCommand.next(false);
  }, [isOpen]);

  return (
    <>
      <OakClickArea handleClick={() => setIsOpen(true)}>
        {props.block.data.text && (
          <div
            id={`view-${state.id}`}
            className={`text_input__output ${className} elements-inline-children`}
            dangerouslySetInnerHTML={{ __html: props.block.data.text || '' }}
          />
        )}
        {!props.block.data.text && (
          <div
            id={`placeholder-${state.id}`}
            className={`text-input__placeholder ${className}`}
          >
            {props.placeholder}
          </div>
        )}
      </OakClickArea>
      <OakModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        heading="Edit text block"
        width="medium"
        height="auto"
      >
        <div slot="body">
          <div className="">
            <div
              id={`preview-${state.id}`}
              className={`text_input__output ${className} elements-inline-children`}
              dangerouslySetInnerHTML={{ __html: props.block.data.text || '' }}
            />
            {props.block.data.text}
            <textarea
              name="text"
              className="text-input__input"
              onInput={handleDataChange}
              value={props.block.data.text}
            />
            <MetaDetails
              meta={props.block.meta}
              handleChange={handleMetaChange}
            />
          </div>
        </div>
        <div slot="footer">
          <OakButton shape="sharp" theme="danger" handleClick={handleDelete}>
            Delete
          </OakButton>
        </div>
      </OakModal>
    </>
  );
};

export default TextInput;
