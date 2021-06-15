/* eslint-disable import/prefer-default-export */
import { ContentFrameType } from 'src';
import { newId } from '../../utils/BasicUtil';
import {
  ContentFrameItemDataType,
  ContentFrameGroupType,
  ContentFrameGroupContainerType,
} from '../ContentFrameType';
import { SplitSectionEditorType } from '../editor/SplitSectionEditor/SplitSectionEditorType';
import SectionType from '../SectionType';
import { BackgroundType } from '../BackgroundType';
import { OverlapSectionEditorType } from '../editor/OverlapSectionEditor/OverlapSectionEditorType';
import { SingleSectionEditorType } from '../editor/SingleSectionEditor/SingleSectionEditorType';

const tinycolor = require('tinycolor2');

export const getSingleSectionEditorData = (): SingleSectionEditorType => {
  return {
    id: newId(),
    type: SectionType.SINGLE_SECTION,
    meta: {
      height: 'small',
      gap: 'small',
      layout: 'single-column',
      verticalPosition: 'middle',
    },
    data: {
      background: getBackgroundData(),
      contentFrameGroupContainer: getContentFrameGroupContainerData(),
    },
  };
};

export const getSplitSectionEditorData = (): SplitSectionEditorType => {
  return {
    id: newId(),
    type: SectionType.SPLIT_SECTION,
    meta: {
      height: 'small',
      verticalPosition: 'middle',
      gap: 'small',
      proportion: 0,
    },
    left: {
      meta: {
        verticalPosition: 'middle',
        gap: 'small',
        layout: 'single-column',
      },
      background: getBackgroundData(),
      contentFrameGroupContainer: getContentFrameGroupContainerData(),
    },
    right: {
      meta: {
        verticalPosition: 'middle',
        gap: 'small',
        layout: 'single-column',
      },
      background: getBackgroundData(),
      contentFrameGroupContainer: getContentFrameGroupContainerData(),
    },
  };
};

export const getOverlapSectionEditorData = (): OverlapSectionEditorType => {
  return {
    id: newId(),
    type: SectionType.OVERLAP_SECTION,
    meta: {
      width: 'small',
      offset: 'small',
      offsetPosition: 'top',
    },
    mainSection: getSingleSectionEditorData(),
    subSection: getSingleSectionEditorData(),
  };
};

export const getBackgroundData = (): BackgroundType => {
  return {
    source: 'UNSPLASH',
    meta: {
      overlayIntensity: 'none',
      overlayColor: '#000000',
      parallax: false,
    },
    data: {
      urls: {
        raw: 'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjk0OTh8MHwxfHNlYXJjaHw0fHxiYWxsZXR8ZW58MHwwfHx8MTYyMTMzODkyNA&ixlib=rb-1.2.1&q=80&w=1080',
        full: 'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMjk0OTh8MHwxfHNlYXJjaHw3NXx8cnxlbnwwfDB8fHwxNjIzMjIxNTUz&ixlib=rb-1.2.1&q=85',
        regular:
          'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjk0OTh8MHwxfHNlYXJjaHw3NXx8cnxlbnwwfDB8fHwxNjIzMjIxNTUz&ixlib=rb-1.2.1&q=80&w=1080',
        small:
          'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjk0OTh8MHwxfHNlYXJjaHw3NXx8cnxlbnwwfDB8fHwxNjIzMjIxNTUz&ixlib=rb-1.2.1&q=80&w=400',
        thumb:
          'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjk0OTh8MHwxfHNlYXJjaHw3NXx8cnxlbnwwfDB8fHwxNjIzMjIxNTUz&ixlib=rb-1.2.1&q=80&w=200',
      },
      alt_description: 'people at the football field',
    },
  };
};

export const getContentFrameGroupContainerData =
  (): ContentFrameGroupContainerType => {
    return {
      meta: {
        horizontalPosition: 'center',
        verticalPosition: 'middle',
      },
      contentFrameGroup: [getContentFrameGroupData()],
    };
  };

export const getContentFrameGroupData = (): ContentFrameGroupType => {
  return {
    id: newId(),
    meta: {
      horizontalPosition: 'center',
      verticalPosition: 'middle',
      expandToFill: true,
      gap: 'small',
      gridWidth: 'small',
      layout: 'responsive',
    },
    contentFrame: [],
  };
};

export const getContentFrameData = (): ContentFrameType => {
  return {
    id: newId(),
    meta: {
      color: 'none',
      gap: 'small',
      horizontalPadding: 'none',
      verticalPadding: 'none',
      horizontalPosition: 'center',
      verticalPosition: 'middle',
      borderThickness: 'none',
    },
    contentFrameItem: [
      {
        id: newId(),
        type: ContentFrameItemDataType.TEXT,
        meta: {},
        data: {},
      },
    ],
  };
};
