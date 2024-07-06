export interface Entity{
    label: Labels, 
    color:COLORS_ENUM,
    start: number, 
    end: number
}
export interface ResultModel{
    text:string,
    ents:Entity[],

}
export type Labels='MOBILE' | 'CLOUD' | 'FRONTEND' | 'BACKEND'
export type Fields='Software Engineers'
export type COLORS_ENUM='indigo' | 'blue' | 'green' | 'orange' | 'gray'
export const COLORS={
    gray:'gray',
    MOBILE:'indigo',
    CLOUD:'blue',
    FRONTEND:'green',
    BACKEND:'orange',
}
export interface TreeNode {
    name: string;
    isExpanded?: boolean;
    color:COLORS_ENUM,
    children?: TreeNode[];
}
export const API_ENDPOINT=process.env.NEXT_PUBLIC_API_ENDPOINT
