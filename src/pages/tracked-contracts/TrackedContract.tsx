import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import ContractsApi from '../../api/contracts';
import Button from '../../components/common/Buttons';
import Toggle from '../../components/common/Toggle';
import { Contract } from '../../interfaces';

interface TrackedContractProps {
  trackedContract: Contract;
  // saved: (contract: TrackedContract) => void; // TODO: Once we have the BE working use this function to do a callback to the parent to update with the id or the new status
  remove: () => void; // This helps remove the line from the array and refresh the parent view
  focused?: boolean;
}

const TrackedContractRow: React.FC<TrackedContractProps> = ({ trackedContract, remove, focused }) => {
  const [inputFocused, setInputFocused] = useState<boolean>(focused || false);
  const [edited, setEdited] = useState<boolean>(false);
  const [contract, setContract] = useState<Contract>(trackedContract);
  // Keep the original contract.
  const initialContract = trackedContract;

  // Reference to the input
  let trackInputRef: any = null;

  useEffect(() => {
    // When adding a new line we want straight awayt to focus the new line
    if (focused && trackInputRef) {
      trackInputRef.focus();
    }
  }, [focused, trackInputRef]);

  // Handle the UI state for the contrat changing
  const handleContractChange = (value: Partial<Contract>): void => {
    setContract({ ...contract, ...value });
    setEdited(true);
  };

  // reset the state to lose focus on the row
  const loseFocus = (): void => {
    setEdited(false);
    setInputFocused(false);
    console.log('trackinputRef', trackInputRef);
    if (trackInputRef) {
      trackInputRef.blur();
    }
  };

  // Save the contract
  const saveClick = (): void => {
    // save contract as it is
    // then set it as not edited anymore
    if (!contract.id) {
      // TODO: Should have the BE send us the response of the new object so we can update the view ( example with the id )
      ContractsApi.createContract(contract).then(() => {
        loseFocus();
      });
    } else {
      // TODO: same as above
      ContractsApi.setContractStatus(contract.id, { active: contract.active }).then(() => {
        loseFocus();
      });
    }
  };

  const deleteClick = (): void => {
    if (contract.id) {
      // TODO: Handle the errors and exception
      // This should be done when we have our notification component
      // basically we'd make the notification component appear with the error
      // Potentially add an outline to the line as red until it's touched ( Optional )
      ContractsApi.deleteContract(contract.id).then(() => {
        remove();
      });
    } else {
      remove();
    }
  };

  // Cancel the changes on the contract and revert back to original
  const cancelClick = (): void => {
    setContract(initialContract);
    loseFocus();
  };

  // Templates
  const saveCancelButtons = (
    <>
      <Button className="ml-1 border-none px-3.5 py-3.5" disabled={!edited} color="green" onClick={saveClick}>
        <FaCheck />
      </Button>
      <Button className="ml-1 border-none px-3.5 py-3.5" disabled={!edited} color="gray" onClick={cancelClick}>
        <FaTimes />
      </Button>
    </>
  );

  const removeButton = (
    <Button className="ml-1 border-none px-3.5 py-3.5" color="red" onClick={deleteClick}>
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
          enabled={contract.active || false}
          onClick={() => {
            handleContractChange({ active: !contract.active });
          }}
        />
        {removeButton}
      </div>
    </div>
  );
};

export default TrackedContractRow;
