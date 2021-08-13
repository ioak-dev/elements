import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import OakModal from '../../../oakui/wc/OakModal';
import MetaDetailsSection from './MetaDetailsSection';
import CommonMetaDetailsSection from './CommonMetaDetailsSection';

interface Props {
  value: any;
  handleChange: any;
  isActive: boolean;
  deactivate: any;
}
const MetaDetails = (props: Props) => {
  const [groupId, setGroupId] = useState(newId());
  const [elementId, setElementId] = useState(newId());

  const handleCommonChange = (meta: any) => {
    props.handleChange({ ...props.value, meta });
  };

  const handleLeftChange = (meta: any) => {
    const _value = { ...props.value };
    _value.left.meta = meta;
    props.handleChange(_value);
  };

  const handleRightChange = (meta: any) => {
    const _value = { ...props.value };
    _value.right.meta = meta;
    props.handleChange(_value);
  };

  return (
    <OakModal
      isOpen={props.isActive}
      handleClose={props.deactivate}
      heading="Section settings"
    >
      <div slot="body">
        <div className="site-modal-section__root">
          <div className="site-modal-section">
            <div className="site-modal-section__title">Common</div>
            <CommonMetaDetailsSection
              deactivate={props.deactivate}
              handleChange={handleCommonChange}
              value={props.value.meta}
              isActive={props.isActive}
            />
            <div className="site-modal-section__title">Left section</div>
            <MetaDetailsSection
              deactivate={props.deactivate}
              handleChange={handleLeftChange}
              value={props.value.left.meta}
              isActive={props.isActive}
            />
          </div>
          <div className="site-modal-section">
            <div className="site-modal-section__title">Right section</div>
            <MetaDetailsSection
              deactivate={props.deactivate}
              handleChange={handleRightChange}
              value={props.value.right.meta}
              isActive={props.isActive}
            />
          </div>
        </div>
      </div>
    </OakModal>
  );
};

export default MetaDetails;
