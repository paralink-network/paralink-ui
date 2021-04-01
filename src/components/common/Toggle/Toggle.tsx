import classnames from 'classnames';
import React from 'react';

export interface ToggleProps {
  color?: string;
  enabled: boolean;
  onClick: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ enabled, onClick, color }) => {
  return (
    <button
      onClick={() => onClick()}
      type="button"
      className={classnames(
        'bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none',
        {
          _p_toggle_enabled: enabled,
          _p_toggle: !enabled,
          [`bg-green-500`]: enabled && !color,
          [`bg-${color}-500`]: enabled && color,
        },
      )}
      aria-pressed={enabled}
    >
      <span
        aria-hidden="true"
        className={classnames(
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ',
          {
            _p_toggle_circle_enabled: enabled,
            _p_toggle_circle: !enabled,
            'translate-x-0': !enabled,
            'translate-x-full': enabled,
          },
        )}
      />
    </button>
  );
};

export default Toggle;
