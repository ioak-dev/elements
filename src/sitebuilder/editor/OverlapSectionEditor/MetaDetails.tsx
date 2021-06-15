import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import OakModal from '../../../oakui/wc/OakModal';
import MetaDetailsSection from './MetaDetailsSection';
import CommonMetaDetailsSection from './CommonMetaDetailsSection';
import { OverlapSectionEditorType } from './OverlapSectionEditorType';

interface Props {
  value: OverlapSectionEditorType;
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

  const handleMainSectionChange = (meta: any) => {
    const _value = { ...props.value };
    _value.mainSection.meta = meta;
    props.handleChange(_value);
  };

  const handleSubSectionChange = (meta: any) => {
    const _value = { ...props.value };
    _value.subSection.meta = meta;
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
            <div className="site-modal-section__title">Main section</div>
            <MetaDetailsSection
              deactivate={props.deactivate}
              handleChange={handleMainSectionChange}
              value={props.value.mainSection.meta}
              isActive={props.isActive}
            />
          </div>
          <div className="site-modal-section">
            <div className="site-modal-section__title">Sub section</div>
            <MetaDetailsSection
              deactivate={props.deactivate}
              handleChange={handleSubSectionChange}
              value={props.value.subSection.meta}
              isActive={props.isActive}
            />
          </div>
        </div>
      </div>
    </OakModal>
  );
};

export default MetaDetails;
