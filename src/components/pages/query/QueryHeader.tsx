import React from 'react';
import { Icon } from '@iconify/react';
import arrowRightDropCircleOutline from '@iconify-icons/mdi/arrow-right-drop-circle-outline';
import hammerIcon from '@iconify-icons/mdi/hammer';
import contentSaveOutline from '@iconify-icons/mdi/content-save-outline';
import reloadIcon from '@iconify-icons/mdi/reload';
import codeJson from '@iconify-icons/mdi/code-json';
import clipboardTextOutline from '@iconify-icons/mdi/clipboard-text-outline';
import { TooltipButton } from '../../common/Buttons';
import { LabelInput } from '../../common/Inputs';

interface QueryHeader {
  showResult: boolean;
  projectName: string;

  onRun: () => void;
  onSave: () => void;
  onBuild: () => void;
  onCompile: () => void;
  onResultCodeSwitch: () => void;
  setProjectName: (value: string) => void;
}

const QueryHeader = ({
  showResult,
  projectName,
  onRun,
  onSave,
  onBuild,
  onCompile,
  setProjectName,
  onResultCodeSwitch,
}: QueryHeader): JSX.Element => (
  <div className="p-2 h-50 shadow-sm flex flex-column justify-between">
    <LabelInput
      value={projectName}
      labelName="Project name"
      placeholder="Project name"
      className="mt-1 mb-1 relative rounded-md"
      onChange={setProjectName}
    />

    <div className="mt-1 mb-1">
      <TooltipButton onClick={onResultCodeSwitch} className="ml-1" tooltip={showResult ? 'Show code' : 'Show result'}>
        <Icon icon={showResult ? codeJson : clipboardTextOutline} width="20" />
      </TooltipButton>
      <TooltipButton onClick={onSave} className="ml-1" tooltip="Save">
        <Icon icon={contentSaveOutline} width="20" />
      </TooltipButton>
      <TooltipButton onClick={onBuild} className="ml-1" tooltip="Build">
        <Icon icon={hammerIcon} width="20" />
      </TooltipButton>
      <TooltipButton onClick={onCompile} className="ml-1" tooltip="Compile">
        <Icon icon={reloadIcon} width="20" />
      </TooltipButton>
      <TooltipButton onClick={onRun} color="green" className="ml-1" tooltip="Run">
        <Icon icon={arrowRightDropCircleOutline} width="20" />
      </TooltipButton>
    </div>
  </div>
);

export default QueryHeader;
