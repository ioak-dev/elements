import ContentType from '../ContentType';
import TextType from '../TextType';
import SectionType from '../SectionType';
import {
  getActionButtonClass,
  getActionButtonStyle,
  getBackgroundClass,
  getBackgroundStyle,
  getContentClass,
  getContentContainerClass,
  getContentFrameClass,
  getContentFrameGroupClass,
  getContentRootClass,
  getSplitSectionClass,
  getTextAlignment,
  getTextClass,
  getImageContainerClass,
  getImageContainerImgClass,
  getTextStyle,
  getContentFrameStyle,
} from './EditorHelperService';
import {
  ContentFrameItemDataType,
  ContentFrameItemType,
  ContentFrameMetaType,
  ContentFrameGroupType,
  ContentFrameType,
} from '../ContentFrameType';

const tinycolor = require('tinycolor2');

export const getHtmlForSplitContent = (section: any) => {
  let leftContent = `<div
          class="${getContentContainerClass(
            section.height,
            section.left.verticalPosition
          )}"
        >`;
  leftContent += getContentFrameGroup(
    section.left.layout,
    section.left.horizontalPosition,
    section.left.gap,
    section.left.gridWidth,
    section.left.expandToFill,
    section.left.content
  );
  leftContent += '</div>';
  let rightContent = `<div
          class="${getContentContainerClass(
            section.height,
            section.right.verticalPosition
          )}"
        >`;
  rightContent += getContentFrameGroup(
    section.right.layout,
    section.right.horizontalPosition,
    section.right.gap,
    section.right.gridWidth,
    section.right.expandToFill,
    section.right.content
  );
  rightContent += '</div>';
  let content = '<div class="elements-site-viewbox">';
  content += `<div class="${getSplitSectionClass(section.proportion)}">`;
  content += leftContent;
  content += rightContent;
  content += '</div>';
  content += '</div>';
  const result = getBackgroundView(section.background, content, true);
  return result;
};

export const getHtmlForSplitSection = (section: any) => {
  let leftContent = `<div
          class="${getContentContainerClass(
            section.height,
            section.left.verticalPosition,
            'left'
          )}"
        >`;
  leftContent += getContentFrameGroup(
    section.left.layout,
    section.left.horizontalPosition,
    section.left.gap,
    section.left.gridWidth,
    section.left.expandToFill,
    section.left.content
  );
  leftContent += '</div>';
  const left = getBackgroundView(section.left.background, leftContent, true);

  let rightContent = `<div
          class="${getContentContainerClass(
            section.height,
            section.right.verticalPosition,
            'right'
          )}"
        >`;

  rightContent += getContentFrameGroup(
    section.right.layout,
    section.right.horizontalPosition,
    section.right.gap,
    section.right.gridWidth,
    section.right.expandToFill,
    section.right.content
  );
  rightContent += '</div>';
  const right = getBackgroundView(section.right.background, rightContent, true);

  let result = `<div class="${getSplitSectionClass(section.proportion)}">`;
  result += '<div>';
  result += left;
  result += '</div>';
  result += '<div>';
  result += right;
  result += '</div>';
  result += '</div>';
  return result;
};

export const getHtmlForSingleSection = (section: any) => {
  let content = `<div
          class="${`elements-site-viewbox ${getContentContainerClass(
            section.height,
            section.position
          )}`}"
        >`;
  content += getContentFrameGroup(
    section.layout,
    section.horizontalPosition,
    section.gap,
    section.gridWidth,
    section.expandToFill,
    section.content
  );
  content += '</div>';
  const result = getBackgroundView(section.background, content);
  return result;
};

const getContentFrameGroup = (
  layout: string,
  horizontalPosition: 'left' | 'center' | 'right',
  gap: 'none' | 'small' | 'medium' | 'large',
  gridWidth: 'auto' | 'small' | 'medium' | 'large',
  expandToFill: boolean,
  content: ContentFrameGroupType
) => {
  let res = '';
  res += `<div class="${getContentFrameGroupClass(
    content.meta,
    horizontalPosition,
    layout,
    gap,
    gridWidth,
    expandToFill
  )}">`;
  let contentDiv = '';
  content.items.forEach(
    (frame) =>
      (contentDiv += `<div>
        ${getContentFrame(frame)}
      </div>`)
  );
  res += contentDiv;
  res += '</div>';
  return res;
};

const getContentFrame = (frame: ContentFrameType) => {
  const computedStyle = getContentFrameStyle(frame.meta);
  let style = `--content-frame-border-color: ${computedStyle.borderColor};`;
  style += `--content-frame-background-color: ${computedStyle.backgroundColor};`;
  let res = '';
  res += `<div class="${getContentFrameClass(frame.meta)}" style="${style}">`;
  res += getContentBuilder(frame.items, frame.meta);
  res += '</div>';
  return res;
};

const getContentBuilder = (
  items: ContentFrameItemType[],
  meta: ContentFrameMetaType
) => {
  let res = '';
  res += `<div class="${getContentClass(meta)}">`;
  let itemsDiv = '';
  items.forEach((item) => {
    switch (item.type) {
      case ContentFrameItemDataType.TEXT:
        itemsDiv += `<div>${getTextBlock(item, meta.horizontalPosition)}</div>`;
        break;
      case ContentFrameItemDataType.LINKS:
        itemsDiv += `<div>${getActionLinks(
          item,
          meta.horizontalPosition
        )}</div>`;
        break;
      case ContentFrameItemDataType.IMAGE:
        itemsDiv += `<div>${getImageBlock(
          item,
          meta.horizontalPosition
        )}</div>`;
        break;

      default:
        break;
    }
  });
  res += itemsDiv;
  res += '</div>';
  return res;
};

const getTextBlock = (block: any, align: any) => {
  let color = null;
  if (block.meta.color === 'custom') {
    color = block.meta.hex;
  }
  const textClass = getTextClass(block, align);
  const textStyle = getTextStyle(block, align);
  switch (block.meta.elementType) {
    case 'h1':
    case 'h2':
    case 'h3':
      return `<${
        block.meta.elementType
      } class="${`text_input__output ${textClass} elements-inline-children`}" style="color: ${
        textStyle.color
      };">${block.data.text || ''}</${block.meta.elementType}>`;
    case 'body':
    case 'subtitle':
    case 'caption':
      return `<div class="${`text_input__output ${textClass} elements-inline-children`}" style="color: ${
        textStyle.color
      };">${block.data.text || ''}</div>`;

    default:
      return '';
  }
};

const getImageBlock = (block: any, align: any) => {
  let res = `<div class="${getImageContainerClass(align, block.meta)}">`;
  res += `<img class="${getImageContainerImgClass(block.meta)}"
            src=${block.data.urls.regular}
            alt=${block.alt_description}
          />`;
  res += '</div>';
  return res;
};

const ___getContent = (
  content: any[],
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
  let res = `<div class="${getContentRootClass(position, padding)}">`;
  content.forEach((item) => {
    switch (item.type) {
      case ContentType.TEXT:
        res += getTextBlock(item, getTextAlignment(position));
        break;
      case ContentType.ACTION:
        res += getActionLinks(item, getTextAlignment(position));
        break;

      default:
        break;
    }
  });
  res += '</div>';
  return res;
};

const getActionLinks = (block: any, align: any) => {
  let res = `<div class="${`action-links__container elements-site__action elements-site__action--align-${align}`}">`;
  block.data.items.forEach((item: any) => {
    res += getActionButton(block.meta, item);
  });
  res += '</div>';
  return res;
};

const getActionButton = (meta: any, item: any) => {
  const computedStyle = getActionButtonStyle(meta, item);
  let style = `--action-button-background-color: ${computedStyle.backgroundColor};`;
  style += `--action-button-background-color-hover: ${computedStyle.backgroundColorHover};`;
  style += `--action-button-color: ${computedStyle.color};`;
  style += `--action-button-color-hover: ${computedStyle.colorHover};`;
  let res = `<button style="${style}" class="${getActionButtonClass(
    meta,
    item
  )}" onClick='${() => actionButtonClickHandler(item)}'>`;
  res += item.label;
  res += `</button>`;
  return res;
};

function actionButtonClickHandler(item: any) {
  window.open(item.url);
}

const getBackgroundView = (value: any, children: string, split?: boolean) => {
  const computedStyles = getBackgroundStyle(value);
  let result = `<div class="${getBackgroundClass(
    value.meta.parallax,
    split || false
  )}" style="background-image:${
    computedStyles.backgroundImage
  }; background-color:${computedStyles.backgroundColor};">`;
  result += `<div class='elements-site__background__overlay' 
    style="background-color:${computedStyles.overlayBackgroundColor};">`;
  result += children;
  result += '</div>';
  result += '</div>';
  return result;
};
