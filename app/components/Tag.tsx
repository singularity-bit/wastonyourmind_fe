import React from 'react'
import { COLORS_ENUM } from '../models/api'
const colorMap={
  gray:'bg-gray-800 dark:bg-gray-900 dark:text-gray-300',
  indigo:'bg-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  blue:'bg-blue-800 dark:bg-blue-900 dark:text-blue-300',
  green:'bg-green-800 dark:bg-green-900 dark:text-green-300',
  orange:'bg-orange-800 dark:bg-orange-900 dark:text-orange-300',
}
const Tag = ({tag,color}:{tag:string,color:COLORS_ENUM}) => {
  const activeColor=colorMap[color]
  return (
    <span className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded ${activeColor}`}>{tag}</span>
  )
}

export default Tag