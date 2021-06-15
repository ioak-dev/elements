import React, { useEffect, useState } from 'react';
import './style.scss';
import OakRadioGroup from '../../../oakui/wc/OakRadioGroup';
import OakRadio from '../../../oakui/wc/OakRadio';
import { newId } from '../../../utils/BasicUtil';

interface Props {
  label?: string;
  section: any;
  handleChange: any;
  handleNavigation: any;
}
const NewSectionEditor = (props: Props) => {
  const handleChange = (detail: any) => {
    props.handleChange(detail.value);
  };

  const [groupId, setGroupId] = useState(newId());

  return (
    <div className="new-section-editor">
      <div className="new-section-editor__content">
        <OakRadioGroup
          radioGroupName={groupId}
          name="type"
          value={props.section.type}
          handleChange={handleChange}
        >
          <div className="new-section-editor__content__options">
            <OakRadio radioGroupName={groupId} name="SINGLE_SECTION">
              Single Section
            </OakRadio>
            <OakRadio radioGroupName={groupId} name="SPLIT_SECTION">
              Split Section
            </OakRadio>
            <OakRadio radioGroupName={groupId} name="OVERLAP_SECTION">
              Overlap Section
            </OakRadio>
          </div>
        </OakRadioGroup>
      </div>
    </div>
  );
};

export default NewSectionEditor;
