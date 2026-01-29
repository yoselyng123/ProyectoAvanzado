import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  extraStyle: undefined | string;
  accion: Function;
};

function CustomBtn({ children, extraStyle, accion }: Props) {
  return (
    <button
      className={`p-[5px] border min-w-5 rounded-xl hover:cursor-pointer hover:bg-gray-200 transition duration-300 ${extraStyle}`}
      onClick={() => accion()}
    >
      {children}
    </button>
  );
}

export default CustomBtn;
