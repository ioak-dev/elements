import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { newId } from '../../../utils/BasicUtil';
import './style.scss';
import {
  getImageContainerClass,
  getImageContainerImgClass,
} from '../../service/EditorHelperService';
import ImageWizard from '../ImageWizard';
import ControlButton from '../../ui/ControlButton';
import { DisableParallaxCommand } from '../../event/DisableParallax';

interface Props {
  block: any;
  handleChange: any;
  handleDelete?: any;
  align: 'left' | 'right' | 'center';
}

const ImageContainer = (props: Props) => {
  const [elementId, setElementId] = useState(newId());
  const [isOpen, setIsOpen] = useState(false);

  const handleImageChange = (imageData: any) => {
    props.handleChange(imageData);
  };

  const handleDelete = () => {
    props.handleDelete(props.block.id);
  };

  useEffect(() => {
    isOpen
      ? DisableParallaxCommand.next(true)
      : DisableParallaxCommand.next(false);
  }, [isOpen]);

  return (
    <>
      <ImageWizard
        deactivate={() => setIsOpen(false)}
        imageData={props.block}
        isActive={isOpen}
        handleChange={handleImageChange}
        handleDelete={props.handleDelete ? handleDelete : null}
        heading="Choose image"
        supportedTypes={['IMAGE', 'UNSPLASH']}
        supportedModifiers={['OVERLAY', 'PARALLAX', 'HEIGHT', 'SHAPE']}
      />
      <div className="image-container__container">
        <div className={getImageContainerClass(props.align, props.block.meta)}>
          <img
            className={getImageContainerImgClass(props.block.meta)}
            src={props.block.data.urls.regular}
            alt={props.block.alt_description}
          />
        </div>
        <div className="image-container__control">
          <ControlButton handleClick={() => setIsOpen(true)} circle>
            <FontAwesomeIcon icon={faPencilAlt} />
          </ControlButton>
        </div>
      </div>
    </>
  );
};

export default ImageContainer;
