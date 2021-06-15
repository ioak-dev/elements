import SectionType from '../../SectionType';
import { SingleSectionEditorType } from '../SingleSectionEditor/SingleSectionEditorType';

export interface OverlapSectionEditorType {
  id: string;
  meta: OverlapSectionEditorMetaType;
  mainSection: SingleSectionEditorType;
  subSection: SingleSectionEditorType;
  type: SectionType;
}

export interface OverlapSectionEditorMetaType {
  offset: 'small' | 'medium' | 'large';
  width: 'small' | 'medium' | 'large';
  offsetPosition: 'top' | 'bottom';
}
