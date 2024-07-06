import { API_ENDPOINT } from "../models/api";
async function fetchModels():Promise<string[]>{
    const result = await fetch(`${API_ENDPOINT}/models`);
    return await result.json();
}
export default async function getModels():Promise<string[]>{
   return await fetchModels()
}