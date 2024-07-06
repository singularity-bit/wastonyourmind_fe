import { ResultModel } from '../models/api'
const colorMap={
    gray:'bg-gray-800',
    indigo:'bg-indigo-800',
    blue:'bg-indigo-800',
    green:'bg-green-800',
    orange:'bg-orange-800',
  }
const LabeledText = ({ents,text}:ResultModel) => {
    const gg=()=>{
        const lables=text.split('').map((char,index)=>{
            const entityStart=ents.find(en=>en.start===index)
            const activeColor=colorMap[entityStart?.color ?? 'gray']

            if(entityStart){
                return `<a class='bg-clip-border ${activeColor}'>${char}`
            }else if(ents.find(en=>en.end-1===index)){
                return char+"</a>"
            }
            return char
        }).join('')
        return {__html:lables}
    }
  return (
    <p dangerouslySetInnerHTML={gg()}></p>
  )
}

export default LabeledText