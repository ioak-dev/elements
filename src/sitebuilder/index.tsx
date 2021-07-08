import React, { useEffect, useRef, useState } from 'react';
import Rellax from 'rellax';
import './style.scss';
// import {} from 'lod';
import ActionButton from './ui/ActionButton';
import SectionType from './SectionType';
import OakButton from '../oakui/wc/OakButton';
import { newId } from '../utils/BasicUtil';
import NavigationActionType from './NavigationActionType';
import SingleSectionEditor from './editor/SingleSectionEditor';
import OverlapSectionEditor from './editor/OverlapSectionEditor';
import SplitSectionEditor from './editor/SplitSectionEditor';
import SectionControl from './components/SectionControl';
import NewSectionEditor from './editor/NewSectionEditor';
import { ScrollToSectionCommand } from './event/ScrollToSectionCommand';
import SectionButton from './ui/SectionButton';
import { SingleSectionEditorType } from './editor/SingleSectionEditor/SingleSectionEditorType';
import { ContentFrameItemDataType } from './ContentFrameType';
import {
  getOverlapSectionEditorData,
  getSingleSectionEditorData,
  getSplitSectionEditorData,
} from './service/DataTypeService';
import { DisableParallaxCommand } from './event/DisableParallax';
// import { ScrollToBlockCommand } from './types/ScrollToBlockCommand';

interface Props {
  value: any[];
  handleChange: any;
}

const SiteBuilder = (props: Props) => {
  const [currentEditorId, setCurrentEditorId] = useState('');

  const parallaxLow = useRef<any>(null);
  const disableParallax = useRef<boolean>(false);

  useEffect(() => {
    initializeParallax();
    DisableParallaxCommand.subscribe((message) => {
      disableParallax.current = message;
      if (message && parallaxLow.current) {
        parallaxLow.current.destroy();
      } else if (!message) {
        initializeParallax();
      }
    });
  }, []);

  useEffect(() => {
    if (props.value && parallaxLow.current) {
      initializeParallax();
    }
  }, [props.value]);

  const initializeParallax = () => {
    if (disableParallax.current) {
      return;
    }
    if (parallaxLow.current) {
      parallaxLow.current.destroy();
    }
    parallaxLow.current = new Rellax('.elements-site-parallax', {
      speed: 2,
      center: true,
      round: true,
      vertical: true,
      horizontal: false,
    });
  };

  const handleChange = (section: any, value: any) => {
    const _value = [...props.value];
    const index = _value.findIndex((item) => item.id === section.id);
    if (index >= 0) {
      _value[index] = value;
    }
    props.handleChange(_value);
  };

  const setSectionType = (section: any, type: SectionType) => {
    const _value = [...props.value];
    const index = _value.findIndex((item) => item.id === section.id);
    if (index >= 0) {
      _value[index] = { ...getNewSection(type), id: _value[index].id };
    }
    props.handleChange(_value);
  };

  const handleNavigation = (section: any, type: NavigationActionType) => {
    switch (type) {
      case NavigationActionType.UP:
        moveUp(section);
        break;
      case NavigationActionType.DOWN:
        moveDown(section);
        break;
      case NavigationActionType.NEW:
        add(section);
        break;
      case NavigationActionType.DELETE:
        remove(section);
        break;

      default:
        break;
    }
  };

  const moveDown = (section: any) => {
    const _value: any[] = [...props.value];
    const index = _value.findIndex((item) => item.id === section.id);
    arraymove(_value, index, index + 1);
    _value.forEach((item) => (item.id = newId()));
    props.handleChange(_value);
    ScrollToSectionCommand.next({ sectionId: _value[index + 1].id });
  };

  const moveUp = (section: any) => {
    const _value: any[] = [...props.value];
    const index = _value.findIndex((item) => item.id === section.id);
    arraymove(_value, index, index - 1);
    _value.forEach((item) => (item.id = newId()));
    props.handleChange(_value);
    ScrollToSectionCommand.next({ sectionId: _value[index - 1].id });
  };

  const add = (section?: any) => {
    const _value: any[] = [...props.value];
    const index = _value.findIndex((item) => item.id === section?.id);
    const newBlock = getNewSection();
    if (index >= 0) {
      _value.splice(index, 0, newBlock);
    } else {
      _value.push(newBlock);
    }
    console.log(_value);
    props.handleChange(_value);
    // ScrollToBlockCommand.next({ blockId: newBlock.id });
  };

  const getNewSection = (sectionType?: SectionType) => {
    switch (sectionType) {
      case SectionType.SINGLE_SECTION:
        return getSingleSectionEditorData();
      case SectionType.SPLIT_SECTION:
        return getSplitSectionEditorData();
      case SectionType.OVERLAP_SECTION:
        return getOverlapSectionEditorData();
      default:
        return {
          id: newId(),
          type: sectionType,
        };
    }
  };

  const remove = (section: any) => {
    console.log('**remove');
    props.handleChange(props.value.filter((item) => item.id !== section.id));
  };

  const arraymove = (arr: any[], fromIndex: number, toIndex: number) => {
    const element = { ...arr[fromIndex] };
    const toElement = { ...arr[toIndex] };
    arr[fromIndex] = toElement;
    arr[toIndex] = element;

    // arr.splice(fromIndex, 1);
    // arr.splice(toIndex, 0, element);
  };

  return (
    <div className="site-builder">
      <div className="elements-site-parallax" />
      {props.value.map((section: any, index: number) => (
        <div key={section.id} className="site-builder__container">
          <div className="site-builder__container__action">
            <SectionControl
              sectionId={section.id}
              first={index === 0}
              last={props.value.length === index - 1}
              handleNavigation={(actionType: NavigationActionType) =>
                handleNavigation(section, actionType)
              }
              hideNew={!section.type}
              startEditing={() => setCurrentEditorId(section.id)}
            />
          </div>
          {!section.type && (
            <NewSectionEditor
              section={section}
              handleNavigation={(type: NavigationActionType) =>
                handleNavigation(section, type)
              }
              handleChange={(type: SectionType) =>
                setSectionType(section, type)
              }
            />
          )}
          {section.type === SectionType.SINGLE_SECTION && (
            <SingleSectionEditor
              value={section}
              handleChange={(value: any) => handleChange(section, value)}
              currentEditorId={currentEditorId}
              stopEditing={() => setCurrentEditorId('')}
            />
          )}
          {section.type === SectionType.SPLIT_SECTION && (
            <SplitSectionEditor
              value={section}
              handleChange={(value: any) => handleChange(section, value)}
              currentEditorId={currentEditorId}
              stopEditing={() => setCurrentEditorId('')}
            />
          )}
          {section.type === SectionType.OVERLAP_SECTION && (
            <OverlapSectionEditor
              value={section}
              handleChange={(value: any) => handleChange(section, value)}
              currentEditorId={currentEditorId}
              stopEditing={() => setCurrentEditorId('')}
            />
          )}
        </div>
      ))}
      <div className="site-builder__container__action">
        <SectionControl
          single
          handleNavigation={(type: NavigationActionType) =>
            handleNavigation(null, type)
          }
        />
      </div>
    </div>
  );
};

export default SiteBuilder;
