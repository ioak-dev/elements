/* eslint-disable import/prefer-default-export */

import BlockType from '../BlockEditor/BlockType';

export const getHeadingClass = (block: any) => {
  const base = 'elements-editor__heading';
  let res = base;
  res += ` ${base}--level-${block.data.level}`;
  return res;
};

export const getParagraphClass = (block: any) => {
  const base = 'elements-editor__paragraph';
  const res = base;
  return res;
};

export const getUnsplashClass = () => {
  const base = 'elements-editor__unsplash';
  const res = base;
  return res;
};

export const getUnsplashContainerClass = (block: any) => {
  const base = 'elements-editor__unsplash__container';
  let res = base;
  res += ` ${base}--position-${block.data.position}`;
  return res;
};

export const getUnsplashContainerImageClass = () => {
  const base = 'elements-editor__unsplash__container__image';
  const res = base;
  return res;
};

export const getUnsplashContainerImageImgClass = (block: any) => {
  const base = 'elements-editor__unsplash__container__image__img';
  let res = base;
  res += ` ${base}--position-${block.data.position}`;
  return res;
};

export const getUnsplashContainerTextClass = () => {
  const base = 'elements-editor__unsplash__container__text';
  const res = base;
  return res;
};

export const getUnsplashContainerTextContainerClass = () => {
  const base = 'elements-editor__unsplash__container__text__container';
  const res = base;
  return res;
};
