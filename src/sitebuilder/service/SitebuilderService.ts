/* eslint-disable import/prefer-default-export */
import ContentType from '../ContentType';
import TextType from '../TextType';
import SectionType from '../SectionType';
import {
  getHtmlForOverlapSection,
  getHtmlForSingleSection,
  getHtmlForSplitSection,
} from './RenderHelperService';

const tinycolor = require('tinycolor2');

export const toHtml = (sections: any[]) => {
  let res = '';
  sections.forEach((section) => {
    switch (section.type) {
      case SectionType.SINGLE_SECTION:
        res += getHtmlForSingleSection(section);
        break;
      case SectionType.SPLIT_SECTION:
        res += getHtmlForSplitSection(section);
        break;
      case SectionType.OVERLAP_SECTION:
        res += getHtmlForOverlapSection(section);
        break;
      default:
        break;
    }
  });
  return res;
};
