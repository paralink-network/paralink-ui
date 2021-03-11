import React from 'react';
import { InlineIcon } from '@iconify/react';
import cogIcon from '@iconify-icons/mdi/cog';
import minusIcon from '@iconify-icons/mdi/minus';
import arrowRightDropCircleOutline from '@iconify-icons/mdi/arrow-right-drop-circle-outline';
import { TooltipButton } from '../../../common/Buttons';

interface OperationBody {
  onRun: () => void;
  onConfig: () => void;
  onRemove: () => void;
}

const OperationBody = ({ onRemove, onConfig, onRun }: OperationBody): JSX.Element => (
  <div className="flex flex-row">
    <TooltipButton className="rounded-full ml-1" color="green" tooltip="Run" onClick={onRun}>
      <InlineIcon icon={arrowRightDropCircleOutline} />
    </TooltipButton>
    <TooltipButton className="rounded-full ml-1" tooltip="Config" onClick={onConfig}>
      <InlineIcon icon={cogIcon} />
    </TooltipButton>
    <TooltipButton className="rounded-full ml-1" color="red" tooltip="Remove" onClick={onRemove}>
      <InlineIcon icon={minusIcon} className="m-auto" />
    </TooltipButton>
  </div>
);

export default OperationBody;
