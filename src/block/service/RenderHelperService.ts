/* eslint-disable import/prefer-default-export */

import BlockType from '../BlockEditor/BlockType';
import {
  getHeadingClass,
  getParagraphClass,
  getUnsplashClass,
  getUnsplashContainerClass,
  getUnsplashContainerImageClass,
  getUnsplashContainerImageImgClass,
  getUnsplashContainerTextClass,
  getUnsplashContainerTextContainerClass,
} from './EditorHelperService';

export const getHeading = (block: any) => {
  const result = `<h${block.data.level} class="${getHeadingClass(block)}">${
    block.data.text
  }</h${block.data.level}>`;
  return result;
};

export const getParagraph = (block: any) => {
  // const result = `<p class="${getParagraphClass(block)}">${
  //   block.data.text
  // }</p>`;
  const result = block.data.text;
  return result;
};

export const getList = (block: any) => {
  // const result = `<div>${block.data.text}</div>`;
  const result = block.data.text;
  return result;
};

export const getUnsplash = (block: any) => {
  let res = `<div class="${getUnsplashClass()}">`;
  res += `<div class="${getUnsplashContainerClass(block)}">`;
  res += `<img
              class="${getUnsplashContainerImageImgClass(block)}"
              src="${block.data.raw.urls.regular}"
              alt="${block.data.raw.alt_description}"
            />`;
  if (block.data.position !== 'center') {
    res += getTextForUnsplash(block);
  }
  res += '</div>';
  res += '</div>';
  return res;
};

const getTextForUnsplash = (block: any) => {
  // let res = `<div class="${getParagraphClass(block)}">`;
  // res += block.data.text;
  // res += '</div>';
  const res = block.data.text;
  return res;
};
