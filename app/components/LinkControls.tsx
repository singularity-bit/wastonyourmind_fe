import React from 'react';


type Props = {
  layout: string;
  orientation: string;
  linkType: string;
  stepPercent: number;
  setLayout: (layout: string) => void;
  setOrientation: (orientation: string) => void;
  setLinkType: (linkType: string) => void;
  setStepPercent: (percent: number) => void;
};

export default function LinkControls({
  layout,
  orientation,
  linkType,
  stepPercent,
  setLayout,
  setOrientation,
  setLinkType,
  setStepPercent,
}: Props) {
  return (
    <div className='flex space-x-5 flex-row'>
      <div className='flex flex-row items-baseline'>
      <label htmlFor='layout' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>layout:</label>&nbsp;
      <select
      id='layout'
        className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setLayout(e.target.value)}
        value={layout}
      >
        <option value="cartesian">cartesian</option>
        <option value="polar">polar</option>
      </select>
      </div>
      <div className='flex flex-row items-baseline'>
      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>orientation:</label>&nbsp;
      <select
        className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setOrientation(e.target.value)}
        value={orientation}
        disabled={layout === 'polar'}
      >
        <option value="vertical">vertical</option>
        <option value="horizontal">horizontal</option>
      </select>
      </div>
     <div className='flex flex-row items-baseline' >
     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">link:</label>&nbsp;
      <select
        className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setLinkType(e.target.value)}
        value={linkType}
      >
        <option value="diagonal">diagonal</option>
        <option value="step">step</option>
        <option value="curve">curve</option>
        <option value="line">line</option>
      </select>
     </div>
      {linkType === 'step' && layout !== 'polar' && (
        <div className='flex flex-row items-baseline'>
          &nbsp;&nbsp;
          <label>step:</label>&nbsp;
          <input
            onClick={(e) => e.stopPropagation()}
            type="range"
            min={0}
            max={1}
            step={0.1}
            onChange={(e) => setStepPercent(Number(e.target.value))}
            value={stepPercent}
            disabled={linkType !== 'step' || layout === 'polar'}
          />
        </div>
      )}
    </div>
  );
}
