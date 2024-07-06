import { useEffect, useState } from "react";
import getModels from "../services/models";

export default function useGetModels(){
    const [models,setModels]=useState<string[]>([])
    const [isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        const getData=async ()=>{
            setIsLoading(true)
            const result=await getModels()
            setIsLoading(false)
            result && setModels(result)
        }
        getData()
    },[])

    return {isLoading,models}
}