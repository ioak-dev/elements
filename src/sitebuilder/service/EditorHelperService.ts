import {
  ContentFrameMetaType,
  ContentFrameGroupMetaType,
  ContentFrameGroupContainerMetaType,
} from '../ContentFrameType';

const tinycolor = require('tinycolor2');

export const getActionButtonClass = (meta: any, item: any) => {
  let res = 'elements-site__action-button';
  res += ` elements-site__action-button--color-${item.color}`;
  if (meta.rounded) {
    res += ` elements-site__action-button--rounded`;
  }
  res += ` elements-site__action-button--size-${meta.size}`;
  res += ` elements-site__action-button--variant-${item.variant}`;
  return res;
};

export const getActionButtonStyle = (meta: any, item: any) => {
  let res: any = {
    backgroundColor: null,
    color: null,
    backgroundColorHover: null,
    colorHover: null,
  };
  if (item.color === 'custom') {
    const backgroundColor = tinycolor(item.hex || '#000');
    const backgroundColorHover = backgroundColor.isLight()
      ? backgroundColor.clone().darken(7)
      : backgroundColor.clone().lighten(7);
    const color = backgroundColor.isLight() ? '#000' : '#fff';
    const colorHover = backgroundColorHover.isLight() ? '#000' : '#fff';
    res = {
      backgroundColor: backgroundColor.toString(),
      backgroundColorHover: backgroundColorHover.toString(),
      color,
      colorHover,
    };
  }
  return res;
};

export const getBackgroundStyle = (
  value: any
): {
  backgroundColor: string;
  backgroundImage: string;
  overlayBackgroundColor: string;
} => {
  let backgroundImage = 'none';
  let backgroundColor = null;
  let overlayBackgroundColor = null;
  if (value?.source === 'UNSPLASH' && value?.data?.urls) {
    backgroundImage = `url(${value.data.urls.regular})`;
    backgroundColor = 'inherit';
  }
  if (value?.source === 'SOLID-COLOR') {
    backgroundImage = 'none';
    if (value?.data?.color === 'custom') {
      backgroundColor = value?.data?.hex;
    } else if (value?.data?.color === 'default') {
      backgroundColor = 'var(--color-surface)';
    } else {
      backgroundColor = `var(--color-${value?.data?.color})`;
    }
  }

  const overlayColor = getOverlay({
    baseColor: value.meta.overlayColor,
    intensity: value.meta.overlayIntensity,
  });
  overlayBackgroundColor = overlayColor;

  return { backgroundColor, backgroundImage, overlayBackgroundColor };
};

export const getTextAlignment = (
  position:
    | 'left'
    | 'center'
    | 'right'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
): 'left' | 'right' | 'center' => {
  if (['left', 'top-left', 'bottom-left'].includes(position)) {
    return 'left';
  }
  if (['center', 'top-center', 'bottom-center'].includes(position)) {
    return 'center';
  }
  if (['right', 'top-right', 'bottom-right'].includes(position)) {
    return 'right';
  }

  return 'left';
};

export const getTextClass = (
  section: any,
  align?: 'left' | 'right' | 'center'
) => {
  const _align = align || section.meta.align || 'left';
  let res = '';
  res = `elements-fontsize-${section.meta.elementType || 'body'}-${
    section.meta.fontsize || 'medium'
  }`;
  res += ` elements-textalign-${_align}`;
  if (section.meta.italic) {
    res += ' elements-fontstyle-italic';
  }
  res += ` elements-fontfamily-${section.meta.fontfamily || 'body'}`;
  res += ` elements-fontweight-${section.meta.fontweight || 'regular'}`;
  res += ` elements-textcolor-${section.meta.color}`;
  return res;
};

export const getTextStyle = (
  section: any,
  align?: 'left' | 'right' | 'center'
) => {
  const res = { color: '' };
  if (section.meta.color === 'custom') {
    res.color = section.meta.hex;
  }
  return res;
};

const getOverlay = (settings: {
  baseColor: string;
  intensity: 'none' | 'ultralow' | 'low' | 'moderate' | 'heavy' | 'intense';
}) => {
  const overlayColor = tinycolor(settings.baseColor);
  switch (settings.intensity) {
    case 'none':
      return null;
    case 'ultralow':
      return overlayColor.setAlpha(0.1).toRgbString();
    case 'low':
      return overlayColor.setAlpha(0.2).toRgbString();
    case 'moderate':
      return overlayColor.setAlpha(0.3).toRgbString();
    case 'heavy':
      return overlayColor.setAlpha(0.5).toRgbString();
    case 'intense':
      return overlayColor.setAlpha(0.7).toRgbString();
    default:
      return null;
  }
};

export const getContentRootClass = (
  position:
    | 'left'
    | 'center'
    | 'right'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right',
  padding: 'none' | 'small' | 'medium' | 'large'
) => {
  let res = `elements-site__content-root elements-site__content-root--position-${position} elements-site__content-root--padding-${padding}`;
  res += ` elements-site__content-root--align-${getTextAlignment(position)}`;
  return res;
};

export const getContentContainerClass = (
  height: string,
  verticalPosition: 'top' | 'middle' | 'bottom',
  placement?: 'left' | 'right' | 'default'
) => {
  const base = 'elements-site__content-container';
  let res = base;
  res += ` ${base}--height-${height}`;
  res += ` ${base}--align-y-${verticalPosition}`;
  if (placement && placement !== 'default') {
    res += ` ${base}--${placement}`;
  }
  return res;
};

export const getContentFrameGroupContainerClass = (
  meta: ContentFrameGroupContainerMetaType,
  layout: 'single-column' | 'two-column',
  gap: 'none' | 'small' | 'medium' | 'large'
) => {
  const base = 'elements-site__content-frame-group-container';
  let res = base;
  res += ` ${base}--gap-${gap}`;
  res += ` ${base}--layout-${layout}`;
  return res;
};

export const getContentFrameGroupClass = (meta: ContentFrameGroupMetaType) => {
  const base = 'elements-site__content-frame-group';
  let res = base;
  res += ` ${base}--padding-x-${meta.horizontalPadding}`;
  res += ` ${base}--padding-y-${meta.verticalPadding}`;
  res += ` ${base}--align-x-${meta.horizontalPosition}`;
  res += ` ${base}--gap-${meta.gap}`;
  res += ` ${base}--layout-${meta.layout}`;
  res += ` ${base}--grid-width-${meta.gridWidth}`;
  if (meta.expandToFill) {
    res += ` ${base}--expand-to-fill`;
  } else {
    res += ` ${base}--do-not-expand-to-fill`;
  }
  return res;
};

export const getContentFrameClass = (meta: ContentFrameMetaType) => {
  const base = 'elements-site__content-frame';
  let res = base;
  res += ` ${base}--padding-x-${meta.horizontalPadding}`;
  res += ` ${base}--padding-y-${meta.verticalPadding}`;
  res += ` ${base}--align-x-${meta.horizontalPosition}`;
  res += ` ${base}--align-y-${meta.verticalPosition}`;
  res += ` ${base}--color-${meta.color}`;
  res += ` ${base}--border-thickness-${meta.borderThickness}`;
  if (meta.borderThickness && meta.borderThickness !== 'none') {
    res += ` ${base}--border`;
  }
  return res;
};

export const getContentFrameStyle = (meta: ContentFrameMetaType) => {
  const res: any = { backgroundColor: null, borderColor: null };
  if (meta.color === 'custom' && meta.hex) {
    if (meta.opacity) {
      const color = tinycolor(meta.hex).setAlpha(meta.opacity);
      res.backgroundColor = color.toString();
    } else {
      res.backgroundColor = meta.hex;
    }
  }
  if (meta.borderThickness !== 'none') {
    res.borderColor = meta.borderColorHex;
  }
  console.log('***********', meta, res);
  return res;
};

export const getContentClass = (meta: ContentFrameMetaType) => {
  const base = 'elements-site__content';
  let res = base;
  res += ` ${base}--gap-${meta.gap}`;
  res += ` ${base}--align-x-${meta.horizontalPosition}`;
  return res;
};

export const getImageContainerClass = (
  align: 'left' | 'center' | 'right',
  meta: any
) => {
  const base = 'elements-site__image-container';
  let res = base;
  res += ` ${base}--align-${align}`;
  res += ` ${base}--height-${meta.height}`;
  res += ` ${base}--shape-${meta.shape}`;
  return res;
};

export const getImageContainerImgClass = (meta: any) => {
  const base = 'elements-site__image-container__img';
  let res = base;
  res += ` ${base}--shape-${meta.shape}`;
  res += ` ${base}--border-radius-${meta.borderRadius}`;
  return res;
};

export const getOverlapSectionClass = (
  backgroundSectionHeight: 'auto' | 'small' | 'medium' | 'large' | 'full',
  width: 'small' | 'medium' | 'large',
  offset: 'small' | 'medium' | 'large',
  offsetPosition: 'top' | 'bottom'
) => {
  const base = 'elements-site__overlap-section';
  let res = base;
  res += ` ${base}--background-section-height-${backgroundSectionHeight}`;
  res += ` ${base}--width-${width}`;
  res += ` ${base}--offset-${offset}`;
  res += ` ${base}--offset-position-${offsetPosition}`;
  return res;
};

export const getSplitSectionClass = (proportion: number) => {
  let res = 'elements-site__split-section';
  res += ` elements-site__split-section--proportion-${
    proportion > 0 ? `p${proportion}` : `m${0 - proportion}`
  }`;
  return res;
};

export const getSplitSectionContentClass = (
  proportion: number,
  side?: 'left' | 'right'
) => {
  let res = `elements-site__split-section__content__${side}`;
  res += ` elements-site__split-section__content__${side}--proportion-${
    proportion > 0 ? `p${proportion}` : `m${0 - proportion}`
  }`;
  return res;
};

export const getBackgroundClass = (parallax: boolean, split: boolean) => {
  let res = 'elements-site__background';
  res += ` ${parallax ? 'elements-site__background--parallax' : ''}`;
  res += ` ${split ? 'elements-site__background--split' : ''}`;
  return res;
};
