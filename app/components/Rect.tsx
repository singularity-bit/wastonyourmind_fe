import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { TreeNode } from "../models/api";
import useForceUpdate from "../hooks/useForceUpdate";

const Rect = ({ node,updateTextWidth }: { node: HierarchyPointNode<TreeNode> ,updateTextWidth:Dispatch<SetStateAction<number>>}) => {
  const height = 20;
  const forceUpdate = useForceUpdate();
  const textRef = useRef<SVGTextElement>(null);
  const [width, setWidth] = useState(40);

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setWidth(bbox.width + 10);
      updateTextWidth(bbox.width + 10)
    }
  }, [node.data.name, updateTextWidth]);
  return (
    <>
      {node.depth !== 0 && (
        <rect
          width={width}
          height={height}
          y={-height / 2}
          x={-width / 2}
          fill={node.data.color}
          stroke={node.data.color}
          strokeWidth={1}
          strokeDasharray={node.data.children ? "0" : "2,2"}
          strokeOpacity={node.data.children ? 1 : 0.6}
          rx={node.data.children ? 0 : 10}
          onClick={() => {
            node.data.isExpanded = !node.data.isExpanded;
            console.log(node);
            forceUpdate();
          }}
        />
      )}
      <text
        dy=".33em"
        fontSize={10}
        fontFamily="Arial"
        fontWeight={node.depth === 0 ? 'bold': 'normal'}
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill={
          node.depth === 0 ? "#71248e" : node.children ? "white" : "#26deb0"
        }
        ref={textRef}
      >
        {node.data.name}
      </text>
    </>
  );
};

export default Rect;
