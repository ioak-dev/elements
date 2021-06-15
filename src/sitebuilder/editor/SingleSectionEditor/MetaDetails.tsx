import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import OakRadioGroup from '../../../oakui/wc/OakRadioGroup';
import OakRadio from '../../../oakui/wc/OakRadio';
import OakModal from '../../../oakui/wc/OakModal';
import OakCheckbox from '../../../oakui/wc/OakCheckbox';

interface Props {
  value: any;
  handleChange: any;
  isActive: boolean;
  deactivate: any;
}
const MetaDetails = (props: Props) => {
  const [groupId, setGroupId] = useState(newId());
  const [elementId, setElementId] = useState(newId());

  useEffect(() => {
    document.getElementById(elementId)?.scrollIntoView(true);
  }, []);

  const handleChange = (detail: any) => {
    const _value = { ...props.value, [detail.name]: detail.value };
    props.handleChange(_value);
  };

  return (
    <OakModal
      isOpen={props.isActive}
      handleClose={props.deactivate}
      heading="Section settings"
    >
      <div slot="body">
        <div className="site-builder-meta" id={elementId}>
          <OakRadioGroup
            name="layout"
            radioGroupName={`layout-${groupId}`}
            value={props.value.layout}
            label="Layout"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio name="single-column" radioGroupName={`layout-${groupId}`}>
              Single column
            </OakRadio>
            <OakRadio name="two-column" radioGroupName={`layout-${groupId}`}>
              Two column
            </OakRadio>
          </OakRadioGroup>
          <OakRadioGroup
            name="gap"
            radioGroupName={`gap-${groupId}`}
            value={props.value.gap}
            label="gap"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio name="none" radioGroupName={`gap-${groupId}`}>
              None
            </OakRadio>
            <OakRadio name="small" radioGroupName={`gap-${groupId}`}>
              Small
            </OakRadio>
            <OakRadio name="medium" radioGroupName={`gap-${groupId}`}>
              Medium
            </OakRadio>
            <OakRadio name="large" radioGroupName={`gap-${groupId}`}>
              Large
            </OakRadio>
          </OakRadioGroup>
          <OakRadioGroup
            name="verticalPosition"
            radioGroupName={`verticalPosition-${groupId}`}
            value={props.value.verticalPosition}
            label="Vertical position"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio name="top" radioGroupName={`verticalPosition-${groupId}`}>
              Top
            </OakRadio>
            <OakRadio
              name="middle"
              radioGroupName={`verticalPosition-${groupId}`}
            >
              Middle
            </OakRadio>
            <OakRadio
              name="bottom"
              radioGroupName={`verticalPosition-${groupId}`}
            >
              Bottom
            </OakRadio>
          </OakRadioGroup>
          <OakRadioGroup
            name="height"
            radioGroupName={`height-${groupId}`}
            value={props.value.height}
            label="Section height / Vertical padding"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio name="auto" radioGroupName={`height-${groupId}`}>
              Auto
            </OakRadio>
            <OakRadio name="small" radioGroupName={`height-${groupId}`}>
              Small
            </OakRadio>
            <OakRadio name="medium" radioGroupName={`height-${groupId}`}>
              Medium
            </OakRadio>
            <OakRadio name="large" radioGroupName={`height-${groupId}`}>
              Large
            </OakRadio>
            <OakRadio name="full" radioGroupName={`height-${groupId}`}>
              Full page
            </OakRadio>
          </OakRadioGroup>
        </div>
      </div>
    </OakModal>
  );
};

export default MetaDetails;
