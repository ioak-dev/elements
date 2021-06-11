import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faCog,
  faPencilAlt,
  faPlus,
  faTrash,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { newId } from '../../../utils/BasicUtil';
import NavigationActionType from '../../NavigationActionType';
import SectionButton from '../../ui/SectionButton';
import { ScrollToSectionCommand } from '../../event/ScrollToSectionCommand';

interface Props {
  sectionId?: string;
  first?: boolean;
  last?: boolean;
  single?: boolean;
  handleNavigation: any;
  hideNew?: boolean;
  startEditing?: any;
}
const SectionControl = (props: Props) => {
  const handleNavigation = (value: NavigationActionType) => {
    props.handleNavigation(value);
  };

  const [groupId, setGroupId] = useState(newId());

  useEffect(() => {
    ScrollToSectionCommand.asObservable().subscribe((message) => {
      if (message.sectionId === props.sectionId) {
        console.log(
          message.sectionId,
          document.getElementById(`section-control-${props.sectionId}`)
        );
        document
          .getElementById(`section-control-${props.sectionId}`)
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      }
    });
  }, []);

  return (
    <div className="section-control" id={`section-control-${props.sectionId}`}>
      <div className="section-control__left">
        {!props.hideNew && (
          <SectionButton
            handleClick={() => handleNavigation(NavigationActionType.NEW)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </SectionButton>
        )}
        {/* </div>
      <div className="section-control__right"> */}
        {!props.single && !props.first && (
          <SectionButton
            handleClick={() => handleNavigation(NavigationActionType.UP)}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </SectionButton>
        )}
        {!props.single && !props.last && (
          <SectionButton
            handleClick={() => handleNavigation(NavigationActionType.DOWN)}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </SectionButton>
        )}
        {props.startEditing && (
          <SectionButton handleClick={props.startEditing}>
            <FontAwesomeIcon icon={faCog} />
          </SectionButton>
        )}
        {!props.single && (
          <SectionButton
            handleClick={() => handleNavigation(NavigationActionType.DELETE)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </SectionButton>
        )}
      </div>
    </div>
  );
};

export default SectionControl;
