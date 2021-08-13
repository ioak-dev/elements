import { BehaviorSubject } from 'rxjs';

export const ScrollToSectionCommand =
  new BehaviorSubject<ScrollToSectionCommandType>({ sectionId: '' });

export interface ScrollToSectionCommandType {
  sectionId: string;
}
