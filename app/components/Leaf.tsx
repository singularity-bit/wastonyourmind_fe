import { HierarchyPointNode } from '@visx/hierarchy/lib/types';
import { pointRadial } from 'd3-shape';
import React, { useState } from 'react'
import { TreeNode } from '../models/api';
import { Group } from '@visx/group';
import useForceUpdate from '../hooks/useForceUpdate';
import Rect from './Rect';

const Leaf = ({
    node,
    layout,
    orientation
}:{
    node:HierarchyPointNode<TreeNode>
    layout:string,
    orientation:string
}) => {
    const forceUpdate = useForceUpdate();
    const [width, setWidth] = useState(100);
    let top: number;
    let left: number;
    if (layout === 'polar') {
      const [radialX, radialY] = pointRadial(node.x, node.y);
      top = radialY;
      left = radialX;
    } else if (orientation === 'vertical') {
      top = node.y;
      left = node.x;
    } else {
      top = node.x;
      left = node.y;
    }

    return (
      <Group top={top} left={left}>
        {node.depth === 0 && (
          <circle
            r={width/2}
            fill="url('#links-gradient')"
            onClick={() => {
              node.data.isExpanded = !node.data.isExpanded;
              console.log(node);
              forceUpdate();
            }}
          />
        )}
        <Rect node={node} updateTextWidth={setWidth}/>
      </Group>
    );
}

export default Leaf