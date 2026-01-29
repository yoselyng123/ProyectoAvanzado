import { useState } from 'react';
import Carta from '../components/Carta';
import CustomBtn from '../components/CustomBtn';
import Modal from '../components/Modal';
import PropiedadCarta from '../components/PropiedadCarta';

type Props = {
  cambiarEstadoModal: Function;
};

function VistaDetalle({ cambiarEstadoModal }: Props) {
  const [modoEditar, setModoEditar] = useState(false);

  return (
    <div className='absolute w-full'>
      <Modal cambiarEstadoModal={cambiarEstadoModal}>
        <div className='flex gap-8 w-full justify-center'>
          <div className='flex-1 flex items-center justify-center flex-col gap-7'>
            <Carta nombre={1} imagen='😎' />
            <div className='flex gap-8'>
              <CustomBtn accion={() => {}} extraStyle='bg-white min-w-[150px]'>
                <p>Eliminar</p>
              </CustomBtn>
              <CustomBtn
                accion={() => setModoEditar(!modoEditar)}
                extraStyle='bg-white min-w-[150px]'
              >
                <p>{modoEditar ? 'Cancelar' : 'Editar'}</p>
              </CustomBtn>
            </div>
          </div>
          <div className='flex flex-col gap-6 flex-1'>
            <PropiedadCarta titulo='Nombre' valor='1' modoEditar={modoEditar} />
            <PropiedadCarta
              titulo='Ataque'
              valor='⚔️ 50'
              modoEditar={modoEditar}
            />
            <PropiedadCarta
              titulo='Defensa'
              valor='🛡️ 20'
              modoEditar={modoEditar}
            />
            <PropiedadCarta
              titulo='Vida'
              valor='❤️ 100'
              modoEditar={modoEditar}
            />
            <PropiedadCarta
              titulo='Imagen'
              valor='https:randomImg.com'
              modoEditar={modoEditar}
            />
            {modoEditar && (
              <CustomBtn accion={() => {}} extraStyle='bg-white w-[40%] mt-10'>
                <p>Guardar Cambios</p>
              </CustomBtn>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default VistaDetalle;
