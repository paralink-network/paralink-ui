import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import Button from '../../components/common/Buttons';
import Toggle from '../../components/common/Toggle';

export interface TrackedContract {
  address?: string;
  enabled?: boolean;
  edited?: boolean;
}

interface TrackedContractProps {
  trackedContract: TrackedContract;
  // saved: (contract: TrackedContract) => void; // Instead do a callback as "saved to refresh the view or the array"
  remove: () => void;
  focused?: boolean;
}

const TrackedContractRow: React.FC<TrackedContractProps> = ({ trackedContract, remove, focused }) => {
  const [inputFocused, setInputFocused] = useState<boolean>(focused || false);
  const [edited, setEdited] = useState<boolean>(false);
  const [contract, setContract] = useState<TrackedContract>(trackedContract);
  const initialContract = trackedContract;

  let trackInputRef: any = null;

  useEffect(() => {
    if (focused && trackInputRef) {
      trackInputRef.focus();
    }
  }, [focused, trackInputRef]);

  // const saved = () => { callParent to update the array view without recharging the page }
  //

  // Handle the UI state for the contrat changing
  const handleContractChange = (value: TrackedContract): void => {
    setContract({ ...contract, ...value });
    setEdited(true);
  };

  // reset the state to lose focus on the row
  const loseFocus = (): void => {
    setEdited(false);
    trackInputRef.blur();
  };

  // Save the contract
  const saveClick = (): void => {
    // save contract as it is
    // then set it as not edited anymore

    loseFocus();
  };

  // cancel the changes on the contract
  const cancelClick = (): void => {
    setContract(initialContract);
    loseFocus();
  };

  // Templates
  const saveCancelButtons = (
    <>
      <Button className="ml-1 border-none px-3.5 py-3.5" disabled={!edited} color="green" onClick={() => saveClick()}>
        <FaCheck />
      </Button>
      <Button className="ml-1 border-none px-3.5 py-3.5" disabled={!edited} color="gray" onClick={() => cancelClick()}>
        <FaTimes />
      </Button>
    </>
  );

  const removeButton = (
    <Button className="ml-1 border-none px-3.5 py-3.5" color="red" onClick={() => remove()}>
      <FaTrash />
    </Button>
  );

  return (
    <div className="container mx-auto py-4 pr-48 relative">
      <div className="w-full overflow-hidden overflow-ellipsis relative">
        <input
          className="block w-full py-2 pr-8"
          type="text"
          ref={(e) => {
            trackInputRef = e;
          }}
          value={contract.address}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onChange={(event) => handleContractChange({ address: event.target.value })}
        />
      </div>
      <div className="w-48 flex justify-end items-center absolute right-0 top-1/2 transform -translate-y-1/2">
        {inputFocused || edited ? <div className="flex mr-1">{saveCancelButtons}</div> : ''}
        <Toggle
          enabled={contract.enabled || false}
          onClick={() => {
            handleContractChange({ enabled: !contract.enabled });
          }}
        />
        {removeButton}
      </div>
    </div>
  );
};

export default TrackedContractRow;
