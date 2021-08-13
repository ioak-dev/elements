/* eslint-disable import/prefer-default-export */

import BlockType from '../BlockEditor/BlockType';
import {
  getHeading,
  getParagraph,
  getList,
  getUnsplash,
} from './RenderHelperService';

export const toHtml = (blocks: any[]) => {
  let result = '';

  blocks.forEach((block) => {
    switch (block.type) {
      case BlockType.HEADING:
        result += getHeading(block);
        break;
      case BlockType.PARAGRAPH:
        result += getParagraph(block);
        break;
      case BlockType.LIST:
        result += getList(block);
        break;
      case BlockType.UNSPLASH:
        result += getUnsplash(block);
        break;
      default:
        break;
    }
  });

  return result;
};

export const toText = (blocks: any[]) => {
  let result = '';

  blocks.forEach((block) => {
    switch (block.type) {
      case BlockType.HEADING:
        result += `${block.data.text?.replace(/(<([^>]+)>)/gi, '')} `;
        break;
      case BlockType.PARAGRAPH:
        result += `${block.data.text?.replace(/(<([^>]+)>)/gi, '')} `;
        break;
      default:
        break;
    }
  });

  return result;
};

export const getFirstImage = (blocks: any[]): any => {
  let result: any = null;

  blocks.forEach((block) => {
    if (!result) {
      switch (block.type) {
        case BlockType.UNSPLASH:
          result = block;
          break;
        default:
          break;
      }
    }
  });

  return result;
};
