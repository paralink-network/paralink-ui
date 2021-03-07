import React from 'react';

interface Input {
  value: any;
  onChange: (value: any) => void;

  type?: string;
  className?: string;
  placeholder?: string;
}

export const Input = ({ value, onChange, type = 'text', className = '', placeholder = '' }: Input): JSX.Element => (
  <input
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={(event) => onChange(event.target.value)}
    className={`focus:ring-indigo-500 focus:border-indigo-500 inline-block sm:text-sm border-gray-300 rounded-md ${className}`}
  />
);

interface Label {
  name: string;
  className?: string;
}

export const Label = ({ name, className = '' }: Label): JSX.Element => (
  <label className={`my-auto text-lg font-medium text-gray-700 mr-3 ${className}`} htmlFor="">
    {name}
  </label>
);

interface LabeledInput extends Input {
  labelName: string;
}

export const LabelInput = ({
  value,
  labelName,
  onChange,
  className = '',
  placeholder = '',
}: LabeledInput): JSX.Element => (
  <div className={className}>
    <Label name={labelName} />
    <Input value={value} onChange={onChange} placeholder={placeholder} />
  </div>
);

interface Checkbox {
  value: boolean
  onChange: () => void
}

export const Checkbox = ({ value, onChange }: Checkbox) => (
  <input 
    type="checkbox" 
    checked={value}
    onChange={onChange}
    className="focus:ring-indigo-500 focus:border-indigo-500 inline-block sm:text-sm border-gray-300 rounded-md"
  />
);

interface Textarea {
  value: string;
  onChange: (value: string) => void;
}

export const Textarea = ({ value, onChange }: Textarea) => (
  <textarea
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="focus:ring-indigo-500 focus:border-indigo-500 inline-block sm:text-sm border-gray-300 rounded-md"
  />
)

interface Select {
  value: string;
  onChange: (value: string) => void;
}

export const Select: React.FC<Select> = ({ value, onChange, children }) => (
  <select 
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="flex-auto"
  >
    {children}
  </select>
);

interface Option {
  value: string;
}

export const Option: React.FC<Option> = ({ value, children }) => (
  <option value={value}>
    {children}
  </option>
)