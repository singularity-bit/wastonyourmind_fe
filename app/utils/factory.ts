import { COLORS, COLORS_ENUM, Entity, Labels, ResultModel, TreeNode } from "../models/api";


const getColor=(ent:Entity):COLORS_ENUM=>{

    return COLORS[ent.label] as COLORS_ENUM
}
export const mapEntity=(data:ResultModel[]):ResultModel=>{
    const value=data[0]
    return {
        text:value.text,
        ents:value.ents.map((ent)=>({
          ...ent,
          color:getColor(ent)
        }))
      }
}
export const mapLabels=(data:ResultModel[]):{entity:Labels,color:COLORS_ENUM}[]=>{
    const labelsSet=new Map()
    data[0].ents.forEach((ent,id)=>labelsSet.set(ent.label,getColor(ent)))
    return Array.from(labelsSet, ([entity, color]) => ({ entity, color }))
}
const mapEntities=(data:ResultModel)=>{
  const labels=mapLabels([data])
  return labels.map(label=>{
    return {
      ...label,
      fields:new Set(data.ents.filter(ent=>ent.label===label.entity).map(ent=>{
        return data.text.slice(ent.start,ent.end)
      }))
    }
  })
}

export const dataToTreeNode=(data:ResultModel):TreeNode=>{
  const processed=mapEntities(data)
  return {
    name:'IT Roles Mindmap',
    color:'gray',
    children:processed.map(p=>{
      return {
        name:p.entity,
        color:p.color,
        children:Array.from(p.fields).map(field=>{
          return {
          name:field,
          color:p.color
          }
        })
      }
    })
  }
}