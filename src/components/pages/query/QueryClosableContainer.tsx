import React from 'react';
import { InlineIcon } from '@iconify/react';
import arrowLeft from '@iconify-icons/mdi/arrow-left';
import { Button, TooltipButton } from '../../common/Buttons';

interface QueryClosableContainer {
  onClose: () => void;
  submitButton?: boolean;
}

const QueryClosableContainer: React.FC<QueryClosableContainer> = ({ onClose, children, submitButton = false }) => (
  <div className="flex flex-col">
    <div className="mb-3">
      <TooltipButton className="rounded-full" onClick={onClose} tooltip="Back">
        <InlineIcon icon={arrowLeft} />
      </TooltipButton>
    </div>
    {children}
    {submitButton && (
      <div className="flex justify-center mt-3">
        <Button color="green" onClick={onClose}>
          Submit
        </Button>
      </div>
    )}
  </div>
);

export default QueryClosableContainer;
