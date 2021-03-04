import React from 'react';
import { Icon } from '@iconify/react';
import arrowRightDropCircleOutline from '@iconify-icons/mdi/arrow-right-drop-circle-outline';
import hammerIcon from '@iconify-icons/mdi/hammer';
import contentSaveOutline from '@iconify-icons/mdi/content-save-outline';
import reloadIcon from '@iconify-icons/mdi/reload';
import { TooltipButton } from '../../common/Buttons';
import { LabelInput } from '../../common/Inputs';

interface QueryHeader {
  projectName: string;
  setProjectName: (value: string) => void;
}

const QueryHeader = ({ projectName, setProjectName }: QueryHeader): JSX.Element => (
  <div className="p-2 h-50 shadow-sm flex flex-column justify-between">
    <LabelInput
      value={projectName}
      labelName="Project name"
      placeholder="Project name"
      className="mt-1 mb-1 relative rounded-md"
      onChange={setProjectName}
    />

    <div className="mt-1 mb-1">
      <TooltipButton onClick={() => {}} className="ml-1" tooltip="Save">
        <Icon icon={contentSaveOutline} width="20" />
      </TooltipButton>
      <TooltipButton onClick={() => {}} className="ml-1" tooltip="Reload">
        <Icon icon={reloadIcon} width="20" />
      </TooltipButton>
      <TooltipButton onClick={() => {}} className="ml-1" tooltip="Build">
        <Icon icon={hammerIcon} width="20" />
      </TooltipButton>
      <TooltipButton onClick={() => {}} color="green" className="ml-1" tooltip="Run">
        <Icon icon={arrowRightDropCircleOutline} width="20" />
      </TooltipButton>
    </div>
  </div>
);

export default QueryHeader;
