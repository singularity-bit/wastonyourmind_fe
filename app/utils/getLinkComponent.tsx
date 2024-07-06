import { ComponentType } from 'react';
import {
  LinkHorizontal,
  LinkVertical,
  LinkRadial,
  LinkHorizontalStep,
  LinkVerticalStep,
  LinkRadialStep,
  LinkHorizontalCurve,
  LinkVerticalCurve,
  LinkRadialCurve,
  LinkHorizontalLine,
  LinkVerticalLine,
  LinkRadialLine,
} from '@visx/shape';

export default function getLinkComponent({
  layout,
  linkType,
  orientation,
}: {
  layout: string;
  linkType: string;
  orientation: string;
}): ComponentType<any> {
  let LinkComponent: ComponentType<any>;

  if (layout === 'polar') {
    switch (linkType){
      case 'step':LinkComponent = LinkRadialStep;
      case 'curve':LinkComponent = LinkRadialCurve;
      case 'line': LinkComponent = LinkRadialLine;
      default :LinkComponent = LinkRadial;
    }
  } else if (orientation === 'vertical') {
    switch(linkType){
      case 'step':LinkComponent = LinkVerticalStep;
      case 'curve': LinkComponent = LinkVerticalCurve;
      case 'line':LinkComponent = LinkVerticalLine;
      default:LinkComponent = LinkVertical;
    }
  } else {
    switch(linkType){
      case 'step':LinkComponent = LinkHorizontalStep;
      case 'curve':LinkComponent = LinkHorizontalCurve;
      case 'line':LinkComponent = LinkHorizontalLine;
      default: LinkComponent = LinkHorizontal;
    }
  }
  
  return LinkComponent;
}
