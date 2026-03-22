import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  extraStyle: undefined | string;
  accion: Function;
  disabled?: boolean;
};

function CustomBtn({ children, extraStyle, accion, disabled = false }: Props) {
  return (
    <button
      className={`p-[5px] border min-w-5 rounded-xl hover:cursor-pointer hover:bg-gray-200 transition duration-300 ${extraStyle} ${disabled && 'opacity-50'}`}
      onClick={() => accion()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default CustomBtn;
