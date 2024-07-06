import { Group } from '@visx/group';
import { Tree, hierarchy } from '@visx/hierarchy';
import React, { useLayoutEffect, useRef, useState } from 'react'
import getLinkComponent from '../utils/getLinkComponent';
import LinkControls from './LinkControls';
import { ResultModel } from '../models/api';
import { dataToTreeNode } from '../utils/factory';
import Leaf from './Leaf';
import { LinearGradient } from '@visx/gradient';

const defaultMargin = { top: 50, left: 50, right: 50, bottom: 70 };

export type LinkTypesProps = {
  margin?: { top: number; right: number; bottom: number; left: number };
  data:ResultModel;
};
const Graph = ({
    margin = defaultMargin,
    data
  }: LinkTypesProps) => {
    const container=useRef<HTMLDivElement>(null)
    const [layout, setLayout] = useState<string>('cartesian');
    const [orientation, setOrientation] = useState<string>('horizontal');
    const [linkType, setLinkType] = useState<string>('diagonal');
    const [stepPercent, setStepPercent] = useState<number>(0.5);
    const [totalWidth,setTotalWidth]=useState(100)
    const [totalHeight,setTotalHeight]=useState(1000)
    const formattedData=dataToTreeNode(data)
    const innerWidth = totalWidth - margin.left - margin.right;
    const innerHeight = totalHeight - margin.top - margin.bottom;
    useLayoutEffect(()=>{
        if(container.current){
            setTotalWidth(container.current.offsetWidth)
            setTotalHeight(container.current.offsetHeight)
        }
    },[])
    let origin: { x: number; y: number };
    let sizeWidth: number;
    let sizeHeight: number;
  
    if (layout === 'polar') {
      origin = {
        x: innerWidth / 2,
        y: innerHeight / 2,
      };
      sizeWidth = 2 * Math.PI;
      sizeHeight = Math.min(innerWidth, innerHeight) / 2;
    } else {
      origin = { x: 0, y: 0 };
      if (orientation === 'vertical') {
        sizeWidth = innerWidth;
        sizeHeight = innerHeight;
      } else {
        sizeWidth = innerHeight;
        sizeHeight = innerWidth;
      }
    }
  
    const LinkComponent = getLinkComponent({ layout, linkType, orientation });
  
    return totalWidth < 10 ? null : (
      <div className='container overflow-x-auto' ref={container} >
        <LinkControls
          layout={layout}
          orientation={orientation}
          linkType={linkType}
          stepPercent={stepPercent}
          setLayout={setLayout}
          setOrientation={setOrientation}
          setLinkType={setLinkType}
          setStepPercent={setStepPercent}
        />
        <svg width={totalWidth} height={totalHeight}>
          <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
          <Group top={margin.top} left={margin.left}>
            <Tree
              root={hierarchy(formattedData, (d) => (d.isExpanded ? null : d.children))}
              size={[sizeWidth, sizeHeight]}
              separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
            >
              {(tree) => (
                <Group top={origin.x} left={origin.y}  className='container'>
                  {tree.links().map((link, i) => (
                    <LinkComponent
                      key={i}
                      data={link}
                      percent={stepPercent}
                      stroke="rgb(254,110,158,0.6)"
                      strokeWidth="1"
                      fill="none"
                    />
                  ))}
  
                  {tree.descendants().map((node, key) => 
                  <Leaf 
                    key={key} 
                    node={node}
                    layout={layout} 
                    orientation={orientation}/>)}
                </Group>
              )}
            </Tree>
          </Group>
        </svg>
      </div>)
}

export default Graph