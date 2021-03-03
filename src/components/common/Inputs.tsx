import React from 'react';

interface Input {
  value: any;
  onChange: (value: any) => void;
  
  type?: string;
  className?: string;
  placeholder?: string;
}

export const Input = ({ value, onChange, type='text', className='', placeholder='' }: Input) => (
  <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className={`focus:ring-indigo-500 focus:border-indigo-500 inline-block sm:text-sm border-gray-300 rounded-md ${className}`} placeholder={placeholder} />
);

interface Label {
  name: string;
  className?: string;
}

export const Label = ({ name, className='' }: Label) => (
  <label className={`text-lg font-medium text-gray-700 mr-3 ${className}`}>{name}</label>
)

interface LabeledInput extends Input {
  labelName: string;
}

export const LabelInput = ({ value, labelName, onChange, className='', placeholder='' }: LabeledInput) => (
  <div className={className}>
    <label className="text-lg font-medium text-gray-700 mr-3">{labelName}</label>
    <Input value={value} onChange={onChange} placeholder={placeholder} />
  </div>
)