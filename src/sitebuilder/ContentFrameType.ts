export interface ContentFrameGroupContainerType {
  meta: ContentFrameGroupContainerMetaType;
  contentFrameGroup: ContentFrameGroupType[];
}

export interface ContentFrameGroupType {
  id: string;
  meta: ContentFrameGroupMetaType;
  contentFrame: ContentFrameType[];
}

export interface ContentFrameGroupMetaType {
  verticalPosition: 'top' | 'middle' | 'bottom';
  horizontalPosition: 'left' | 'center' | 'right';
  verticalPadding: 'none' | 'small' | 'medium' | 'large';
  horizontalPadding: 'none' | 'small' | 'medium' | 'large';
  layout: string;
  layoutProportion:
    | 'auto-left'
    | 'auto-right'
    | 'equal'
    | 'wide-left'
    | 'wide-right';
  layoutResponsive: boolean;
  gap: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  gridWidth: 'auto' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  expandToFill: boolean;
}

export interface ContentFrameGroupContainerMetaType {
  verticalPosition: 'top' | 'middle' | 'bottom';
  horizontalPosition: 'left' | 'center' | 'right';
}

export interface ContentFrameType {
  id: string;
  meta: ContentFrameMetaType;
  contentFrameItem: ContentFrameItemType[];
}

export interface ContentFrameMetaType {
  verticalPosition: 'top' | 'middle' | 'bottom';
  horizontalPosition: 'left' | 'center' | 'right';
  verticalPadding: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  horizontalPadding:
    | 'none'
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge';
  color: 'none' | 'default' | 'primary' | 'secondary' | 'custom';
  opacity?: number;
  gap: 'none' | 'small' | 'medium' | 'large';
  hex?: string;
  borderColorHex?: string;
  borderThickness?: 'none' | 'thin' | 'normal' | 'thick';
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
}

export interface ContentFrameItemType {
  id: string;
  type: ContentFrameItemDataType;
  data: any;
  meta: any;
}

export enum ContentFrameItemDataType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  LINKS = 'LINKS',
}
