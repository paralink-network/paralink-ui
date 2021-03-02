import React, { FormEvent } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import arrowRightDropCircleOutline from '@iconify-icons/mdi/arrow-right-drop-circle-outline';
import hammerIcon from '@iconify-icons/mdi/hammer';
import contentSaveOutline from '@iconify-icons/mdi/content-save-outline';
import reloadIcon from '@iconify-icons/mdi/reload';
import { Button, TooltipButton } from '../../common/Buttons';


interface QueryHeader {
  // name: string;
  // onNameChange: (event: FormEvent<HTMLInputElement>) => void;
}

const QueryHeader = ({ }: QueryHeader): JSX.Element => (
  <div className='p-2 h-50 shadow-sm flex flex-column justify-between'>
    <div className="mt-1 mb-1 relative rounded-md">
      <label htmlFor="name" className="inline-block text-lg font-medium text-gray-700 mr-3">Name: </label>
      <input type="text" name="price" id="name" className="focus:ring-indigo-500 focus:border-indigo-500 inline-block sm:text-sm border-gray-300 rounded-md" placeholder="PQL example 1"/>
    </div>

    <div className="mt-1 mb-1">
      <TooltipButton onClick={() => {}} className="ml-1" tooltip='Save'>
        <Icon icon={contentSaveOutline} width="20"/>
      </TooltipButton>
      <TooltipButton onClick={() => {}} className="ml-1" tooltip='Reload'>
        <Icon icon={reloadIcon} width="20"/>
      </TooltipButton>
      <TooltipButton onClick={() => {}} className="ml-1" tooltip="Build">
        <Icon icon={hammerIcon} width="20"/>
      </TooltipButton>
      <TooltipButton onClick={() => {}} color="green" className="ml-1" tooltip='Run'>
        <Icon icon={arrowRightDropCircleOutline} width="20"/>
      </TooltipButton>
    </div>
  </div>
);

export default QueryHeader;

