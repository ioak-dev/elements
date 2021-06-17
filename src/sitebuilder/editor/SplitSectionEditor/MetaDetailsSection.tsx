import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import OakRadioGroup from '../../../oakui/wc/OakRadioGroup';
import OakRadio from '../../../oakui/wc/OakRadio';
import OakCheckbox from '../../../oakui/wc/OakCheckbox';

interface Props {
  value: any;
  handleChange: any;
  isActive: boolean;
  deactivate: any;
}
const MetaDetailsSection = (props: Props) => {
  const [groupId, setGroupId] = useState(newId());
  const [elementId, setElementId] = useState(newId());

  const handleChange = (detail: any) => {
    const _value = { ...props.value, [detail.name]: detail.value };
    props.handleChange(_value);
  };

  return (
    <>
      {/* <OakRadioGroup
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
      </OakRadioGroup> */}
      {/* {props.value.layout === 'two-column' && (
        <OakCheckbox
          name="layoutResponsive"
          value={props.value.layoutResponsive}
          handleChange={handleChange}
          gutterBottom
        >
          Mobile responsive grid
        </OakCheckbox>
      )}
      {props.value.layout === 'two-column' && (
        <OakRadioGroup
          name="layoutProportion"
          radioGroupName={`layoutProportion-${groupId}`}
          value={props.value.layoutProportion}
          label="Proportion of two sides"
          handleChange={handleChange}
          gutterBottom
        >
          <OakRadio
            name="auto-left"
            radioGroupName={`layoutProportion-${groupId}`}
          >
            Auto left
          </OakRadio>
          <OakRadio
            name="auto-right"
            radioGroupName={`layoutProportion-${groupId}`}
          >
            Auto right
          </OakRadio>
          <OakRadio name="equal" radioGroupName={`layoutProportion-${groupId}`}>
            1:1
          </OakRadio>
          <OakRadio
            name="wide-left"
            radioGroupName={`layoutProportion-${groupId}`}
          >
            2:1
          </OakRadio>
          <OakRadio
            name="wide-right"
            radioGroupName={`layoutProportion-${groupId}`}
          >
            1:2
          </OakRadio>
        </OakRadioGroup>
      )} */}
      <OakRadioGroup
        name="gap"
        radioGroupName={`gap-${groupId}`}
        value={props.value.gap}
        label="Gap"
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
        <OakRadio name="middle" radioGroupName={`verticalPosition-${groupId}`}>
          Middle
        </OakRadio>
        <OakRadio name="bottom" radioGroupName={`verticalPosition-${groupId}`}>
          Bottom
        </OakRadio>
      </OakRadioGroup>
    </>
  );
};

export default MetaDetailsSection;
