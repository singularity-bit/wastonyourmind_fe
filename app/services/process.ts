import { API_ENDPOINT, ResultModel } from "../models/api";
import { mapEntity, mapLabels } from "../utils/factory";
async function sendFile(formData:FormData):Promise<{result:ResultModel[]}>{
   try {
    const result=await fetch(`${API_ENDPOINT}/process/`, { method: "POST", body: formData })
    return await result.json()
   } catch (error) {
    throw error
   }
}
export default async function processText({file,model}:{file:File,model:string}) {
   try {
    const formData = new FormData();
    formData.append("file",file);
    formData.append('model',model)
    const {result}=await sendFile(formData)
    const mappedResults = mapEntity(result);
    const labels = mapLabels(result);
    return {
        result:mappedResults,
        labels
    }
   } catch (error) {
    throw error
   }
  }