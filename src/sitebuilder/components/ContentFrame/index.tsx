import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faCogs,
  faPlus,
  faThLarge,
} from '@fortawesome/free-solid-svg-icons';
import { newId } from '../../../utils/BasicUtil';
import './style.scss';
import MetaDetails from './MetaDetails';
import ContentBuilder from '../ContentBuilder';
import {
  getContentFrameClass,
  getContentFrameStyle,
} from '../../service/EditorHelperService';
import {
  ContentFrameItemDataType,
  ContentFrameType,
} from '../../ContentFrameType';
import OakRadio from '../../../oakui/wc/OakRadio';
import OakModal from '../../../oakui/wc/OakModal';
import ControlButton from '../../ui/ControlButton';
import OakButton from '../../../oakui/wc/OakButton';

interface Props {
  frame: ContentFrameType;
  handleChange: any;
  addFrame: any;
  addFrameGroup: any;
  handleDelete: any;
  openFrameGroupSettings?: any;
}
const ContentFrame = (props: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleContentChange = (content: any) => {
    const _frame = { ...props.frame };
    _frame.contentFrameItem = content;
    props.handleChange(_frame);
  };

  const handleMetaChange = (meta: any) => {
    const _frame = { ...props.frame, meta };
    props.handleChange(_frame);
  };

  useEffect(() => {
    const el = document.getElementById(`content-frame-${elementId}`);
    if (el) {
      const computedStyle = getContentFrameStyle(props.frame.meta);
      el.style.setProperty(
        '--content-frame-background-color',
        computedStyle.backgroundColor
      );
      el.style.setProperty(
        '--content-frame-border-color',
        computedStyle.borderColor
      );
    }
  }, [props.frame]);

  const elementId = newId();

  const addFrameGroup = () => {
    props.addFrameGroup();
    setIsAddOpen(false);
  };

  const addFrame = () => {
    props.addFrame();
    setIsAddOpen(false);
  };

  const addNew = (type: ContentFrameItemDataType) => {
    const newBlock = getNewBlock(type);
    if (newBlock) {
      const _value: ContentFrameType = {
        ...props.frame,
        contentFrameItem: [...props.frame.contentFrameItem, newBlock],
      };
      props.handleChange(_value);
    }
    setIsAddOpen(false);
  };

  const handleDelete = () => {
    props.handleDelete(props.frame.id);
  };

  const getNewBlock = (type: ContentFrameItemDataType) => {
    switch (type) {
      case ContentFrameItemDataType.TEXT:
        return {
          id: newId(),
          type,
          data: {
            text: '',
          },
          meta: {
            elementType: 'body',
            fontsize: 'medium',
          },
        };
      case ContentFrameItemDataType.IMAGE:
        return {
          id: newId(),
          type,
          source: 'UNSPLASH',
          data: {
            urls: {
              regular:
                'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjk0OTh8MHwxfHNlYXJjaHw0fHxiYWxsZXR8ZW58MHwwfHx8MTYyMTMzODkyNA&ixlib=rb-1.2.1&q=80&w=1080',
            },
          },
          meta: {
            overlay: 'low',
            height: 'auto',
            parallax: false,
          },
        };
      case ContentFrameItemDataType.LINKS:
        return {
          id: newId(),
          type,
          data: {
            items: [
              {
                id: newId(),
                color: 'default',
                label: 'label',
                url: 'google.com',
              },
            ],
          },
          meta: {
            size: 'medium',
            shape: 'sharp',
          },
        };

      default:
        return null;
    }
  };

  return (
    <>
      <OakModal
        isOpen={isAddOpen}
        handleClose={() => setIsAddOpen(false)}
        width="auto"
        heading="Add new content"
      >
        <div slot="body">
          <div className="elements-site__content-root__type-selection">
            <OakRadio
              handleChange={() => addNew(ContentFrameItemDataType.TEXT)}
              name={ContentFrameItemDataType.TEXT}
            >
              Text
            </OakRadio>
            <OakRadio
              handleChange={() => addNew(ContentFrameItemDataType.LINKS)}
              name={ContentFrameItemDataType.LINKS}
            >
              Links
            </OakRadio>
            <OakRadio
              handleChange={() => addNew(ContentFrameItemDataType.IMAGE)}
              name={ContentFrameItemDataType.IMAGE}
            >
              Image
            </OakRadio>
            <OakRadio handleChange={addFrameGroup} name="frameGroup">
              Content frame group
            </OakRadio>
            <OakRadio handleChange={addFrame} name="frame">
              Content frame
            </OakRadio>
          </div>
        </div>
      </OakModal>
      <MetaDetails
        isActive={isEditOpen}
        handleChange={handleMetaChange}
        handleDelete={handleDelete}
        meta={props.frame.meta}
        deactivate={() => setIsEditOpen(false)}
      />
      <div
        id={`content-frame-${elementId}`}
        className={`content-frame-editor ${getContentFrameClass(
          props.frame.meta
        )}`}
      >
        <ContentBuilder
          handleChange={handleContentChange}
          items={props.frame.contentFrameItem}
          meta={props.frame.meta}
        />
        <div className="content-frame__action">
          <ControlButton handleClick={() => setIsAddOpen(true)} circle>
            <FontAwesomeIcon icon={faPlus} />
          </ControlButton>
          <ControlButton handleClick={() => setIsEditOpen(true)} circle>
            <FontAwesomeIcon icon={faCog} />
          </ControlButton>
          {props.openFrameGroupSettings && (
            <ControlButton handleClick={props.openFrameGroupSettings} circle>
              <FontAwesomeIcon icon={faThLarge} />
            </ControlButton>
          )}
        </div>
      </div>
    </>
  );
};

export default ContentFrame;
