import { BackgroundType } from '../../BackgroundType';
import { ContentFrameGroupContainerType } from '../../ContentFrameType';
import SectionType from '../../SectionType';

export interface SplitSectionEditorType {
  id: string;
  meta: SplitSectionEditorMetaType;
  left: SplitSectionEditorDataType;
  right: SplitSectionEditorDataType;
  type: SectionType;
}

export interface SplitSectionEditorDataType {
  meta: SplitSectionEditorContentMetaType;
  background: BackgroundType;
  contentFrameGroupContainer: ContentFrameGroupContainerType;
}

export interface SplitSectionEditorMetaType {
  height: 'auto' | 'small' | 'medium' | 'large' | 'full';
  verticalPosition: 'top' | 'middle' | 'bottom';
  gap: 'none' | 'small' | 'medium' | 'large';
  proportion: number;
}

export interface SplitSectionEditorContentMetaType {
  verticalPosition: 'top' | 'middle' | 'bottom';
  layout: 'single-column' | 'two-column';
  layoutProportion:
    | 'auto-left'
    | 'auto-right'
    | 'equal'
    | 'wide-left'
    | 'wide-right';
  layoutResponsive: boolean;
  gap: 'none' | 'small' | 'medium' | 'large';
}

export interface ContentFrameMetaType {
  verticalPosition: 'top' | 'middle' | 'bottom';
  horizontalPosition: 'left' | 'center' | 'right';
  verticalPadding: 'none' | 'small' | 'medium' | 'large';
  horizontalPadding: 'none' | 'small' | 'medium' | 'large';
  color: 'none' | 'default' | 'primary' | 'secondary' | 'custom';
  opacity?: number;
  gap: 'none' | 'small' | 'medium' | 'large';
  hex?: string;
  borderColorHex?: string;
  borderThickness?: 'none' | 'thin' | 'normal' | 'thick';
}
