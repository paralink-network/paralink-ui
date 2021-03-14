import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchInput {
  value: any;
  onChange: (value: string) => void;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInput> = ({
  value,
  onChange,
  name = 'search',
  id = 'search',
  className = '',
  placeholder = '',
}): JSX.Element => {
  return (
    <div className="mt-1 relative">
      <div className="absolute inset-y-0 right-0 p-3 text-gray-600 flex items-center">
        {/** TODO: Remove this and actually use the other icons library once we get the query manager merged in */}
        {value ? (
          <button type="button" onClick={() => onChange('')}>
            <FaTimes size={12} />
          </button>
        ) : (
          <FaSearch size={12} />
        )}
      </div>
      <input
        type="text"
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        className={`focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-primary block w-full pl-7 pr-12 sm:text-sm border-gray-200 bg-gray-200 text-gray-600 rounded-full ${className}`}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default SearchInput;
