import React, { FormEvent } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import arrowRightDropCircleOutline from '@iconify-icons/mdi/arrow-right-drop-circle-outline';
import hammerIcon from '@iconify-icons/mdi/hammer';
import contentSaveOutline from '@iconify-icons/mdi/content-save-outline';
import reloadIcon from '@iconify-icons/mdi/reload';
import { TooltipButton } from '../../common/Buttons';
import { LabelInput } from '../../common/Inputs';


interface QueryHeader {
  // name: string;
  // onNameChange: (event: FormEvent<HTMLInputElement>) => void;
}

const QueryHeader = ({ }: QueryHeader): JSX.Element => (
  <div className='p-2 h-50 shadow-sm flex flex-column justify-between'>
    <LabelInput labelName='Project name' value='Project 1' onChange={(value: string) => {}} placeholder='Project name' className='mt-1 mb-1 relative rounded-md' />

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

