import { ChangeEventHandler } from 'react';

interface IInput {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  clickEvent?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function Input({ label, type, name, id, placeholder, value, clickEvent }: IInput) {
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div className='relative mt-2 rounded-md shadow-sm'>
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          placeholder={placeholder}
          onChange={clickEvent}
        />
      </div>
    </div>
  );
}
