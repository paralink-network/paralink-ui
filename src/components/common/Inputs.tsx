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
  <label className={`text-lg font-medium text-gray-700 mr-3 ${className}`} htmlFor="">
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
