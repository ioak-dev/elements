import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import OakRadioGroup from '../../../oakui/wc/OakRadioGroup';
import OakRadio from '../../../oakui/wc/OakRadio';

interface Props {
  value: any;
  handleChange: any;
  isActive: boolean;
  deactivate: any;
}
const CommonMetaDetailsSection = (props: Props) => {
  const [groupId, setGroupId] = useState(newId());
  const [elementId, setElementId] = useState(newId());

  const handleChange = (detail: any) => {
    const _value = { ...props.value, [detail.name]: detail.value };
    props.handleChange(_value);
  };

  return (
    <>
      <OakRadioGroup
        name="width"
        radioGroupName={`width-${groupId}`}
        value={props.value.width}
        label="Width"
        handleChange={handleChange}
        gutterBottom
      >
        <OakRadio name="small" radioGroupName={`width-${groupId}`}>
          Small
        </OakRadio>
        <OakRadio name="medium" radioGroupName={`width-${groupId}`}>
          Medium
        </OakRadio>
        <OakRadio name="large" radioGroupName={`width-${groupId}`}>
          Large
        </OakRadio>
      </OakRadioGroup>
      <OakRadioGroup
        name="offsetPosition"
        radioGroupName={`offsetPosition-${groupId}`}
        value={props.value.offsetPosition}
        label="Offset position"
        handleChange={handleChange}
        gutterBottom
      >
        <OakRadio name="top" radioGroupName={`offsetPosition-${groupId}`}>
          Top
        </OakRadio>
        <OakRadio name="bottom" radioGroupName={`offsetPosition-${groupId}`}>
          Bottom
        </OakRadio>
      </OakRadioGroup>
      <OakRadioGroup
        name="offset"
        radioGroupName={`offset-${groupId}`}
        value={props.value.offset}
        label="Offset"
        handleChange={handleChange}
        gutterBottom
      >
        <OakRadio name="small" radioGroupName={`offset-${groupId}`}>
          Small
        </OakRadio>
        <OakRadio name="medium" radioGroupName={`offset-${groupId}`}>
          Medium
        </OakRadio>
        <OakRadio name="large" radioGroupName={`offset-${groupId}`}>
          Large
        </OakRadio>
      </OakRadioGroup>
    </>
  );
};

export default CommonMetaDetailsSection;
