import React, { useEffect, useRef, useState } from 'react';
import { FaCheck, FaSpinner, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ContractsApi from '../../api/contracts';
import Button from '../../components/common/Buttons';
import Toggle from '../../components/common/Toggle';
import { Contract } from '../../interfaces';
import ContractUtil from '../../utils/ContractUtil';

interface TrackedContractProps {
  trackedContract: Contract;
  // saved: (contract: TrackedContract) => void; // TODO: Once we have the BE working use this function to do a callback to the parent to update with the id or the new status
  remove: () => void; // This helps remove the line from the array and refresh the parent view
  update: (contract: Contract) => void;
  focused?: boolean;
}

const TrackedContractRow: React.FC<TrackedContractProps> = ({ trackedContract, remove, update, focused }) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [edited, setEdited] = useState<boolean>(false);
  const [contract, setContract] = useState<Contract>(trackedContract);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  // Keep the original contract.
  const initialContract = trackedContract;

  // Reference to the input
  const trackInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // When adding a new line we want straight awayt to focus the new line
    if (focused && trackInputRef.current) {
      trackInputRef.current.focus();
    }
  }, [focused, trackInputRef]);

  const showNotification = (title: string, type: 'success' | 'error'): void => {
    let displayNotification: any = toast;
    if (type === 'success') {
      displayNotification = toast.success;
    } else if (type === 'error') {
      displayNotification = toast.error;
    }
    displayNotification(title, {
      autoClose: 2000,
    });
  };

  // Handle the UI state for the contrat changing
  const handleContractChange = (value: Partial<Contract>): void => {
    setContract({ ...contract, ...value });
    setEdited(true);
  };

  // reset the state to lose focus on the row
  const loseFocus = (): void => {
    setEdited(false);
    setInputFocused(false);

    if (trackInputRef.current) {
      trackInputRef.current.blur();
    }
  };

  // Save the contract
  const saveClick = (): void => {
    setLoadingUpdate(true);
    // save contract as it is
    // then set it as not edited anymore
    if (contract.newContract) {
      // TODO: Should have the BE send us the response of the new object so we can update the view ( example with the id )
      const payload = {
        address: contract.address,
        chain: contract.chain,
        active: contract.active,
      };

      ContractsApi.createContract(payload)
        .then(() => {
          contract.newContract = false;
          loseFocus();
          update(contract);
          showNotification(`Contract ${ContractUtil.displayContract(contract.address)} has been added`, 'success');
        })
        .catch((e) => {
          console.error('error', e);
          showNotification(`Error when adding ${ContractUtil.displayContract(contract.address)}`, 'error');
        })
        .finally(() => setLoadingUpdate(false));
    } else {
      // TODO: same as above
      ContractsApi.setContractStatus(contract.chain, contract.address, { active: contract.active })
        .then(() => {
          loseFocus();
          showNotification(`Contract ${ContractUtil.displayContract(contract.address)} updated`, 'success');
        })
        .catch((e) => {
          console.error('error', e);
          showNotification(`Error when trying to update ${ContractUtil.displayContract(contract.address)}`, 'error');
        })
        .finally(() => setLoadingUpdate(false));
    }
  };

  const deleteClick = (): void => {
    if (!contract.newContract) {
      // TODO: Handle the errors and exception
      // This should be done when we have our notification component
      // basically we'd make the notification component appear with the error
      // Potentially add an outline to the line as red until it's touched ( Optional )
      setLoadingUpdate(true);
      ContractsApi.deleteContract(contract.chain, contract.address)
        .then(() => {
          remove();
          showNotification(`Contract ${ContractUtil.displayContract(contract.address)} deleted`, 'success');
        })
        .catch((e) => {
          console.error('delete error', e);
          showNotification(
            `Error when trying to delete Contract ${ContractUtil.displayContract(contract.address)}`,
            'error',
          );
        })
        .finally(() => {
          setLoadingUpdate(false);
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

  const loading = (
    <>
      <span className="px-3.5">
        <FaSpinner className="animate-spin" />
      </span>
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
        {!contract.newContract ? (
          <span className="block w-full py-2 pr-8">{contract.address}</span>
        ) : (
          <input
            className="block w-full py-2 pr-8"
            type="text"
            readOnly={!contract.newContract}
            ref={trackInputRef}
            value={contract.address}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onChange={(event) => handleContractChange({ address: event.target.value })}
          />
        )}
      </div>
      <div className="w-48 flex justify-end items-center absolute right-0 top-1/2 transform -translate-y-1/2">
        {!loadingUpdate && (inputFocused || edited) ? <div className="flex mr-1">{saveCancelButtons}</div> : ''}
        {loadingUpdate ? <div className="flex mr-1">{loading}</div> : ''}

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
