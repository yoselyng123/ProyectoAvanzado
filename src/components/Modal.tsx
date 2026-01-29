import { type ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';
import CustomBtn from './CustomBtn';

type Props = {
  children: ReactNode;
  cambiarEstadoModal: Function;
};

function Modal({ children, cambiarEstadoModal }: Props) {
  return (
    <div className='relative min-h-screen flex justify-center items-center w-full bg-black/50 z-50'>
      <div className='absolute top-4 right-4'>
        <CustomBtn
          extraStyle='bg-white'
          accion={() => cambiarEstadoModal(false)}
        >
          <IoClose size={32} />
        </CustomBtn>
      </div>
      {children}
    </div>
  );
}

export default Modal;
