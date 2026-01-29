import { useState } from 'react';
import CustomBtn from './CustomBtn';
import CustomInput from './CustomInput';
import Modal from './Modal';

type Props = {
  cambiarEstadoModal: Function;
};

function CrearCarta({ cambiarEstadoModal }: Props) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ataque, setAtaque] = useState(0);
  const [defensa, setDefensa] = useState(0);
  const [vida, setVida] = useState(0);
  const [imagen, setImagen] = useState('');

  const [error, setError] = useState<null | string>(null);

  const crearCarta = () => {
    console.log(`VALOR nombre: ${nombre}`);
    console.log(`VALOR descripcion: ${descripcion}`);
    console.log(`VALOR ataque: ${ataque}`);
    console.log(`VALOR defensa: ${defensa}`);
    console.log(`VALOR vida: ${vida}`);
    console.log(`VALOR imagen: ${imagen}`);

    if (
      nombre === '' ||
      descripcion === '' ||
      imagen === '' ||
      ataque <= 0 ||
      defensa <= 0 ||
      vida <= 0
    ) {
      setError('Error. Los campos no pueden estar vacios ni ser menores a 0.');
    } else {
      setError(null);
    }
  };

  return (
    <div className='absolute w-full'>
      <Modal cambiarEstadoModal={cambiarEstadoModal}>
        <div className='flex flex-col min-w-[30%] gap-5'>
          <div className='bg-white flex flex-col p-4 border border-black rounded-2xl gap-5 '>
            <CustomInput label='Nombre' value={nombre} setValue={setNombre} />
            <CustomInput
              label='Descripcion'
              value={descripcion}
              setValue={setDescripcion}
            />
            <CustomInput label='Ataque' value={ataque} setValue={setAtaque} />
            <CustomInput
              label='Defensa'
              value={defensa}
              setValue={setDefensa}
            />
            <CustomInput label='Vida' value={vida} setValue={setVida} />
            <CustomInput label='Imagen' value={imagen} setValue={setImagen} />
            {error && <p className='text-red-500 font-bold'>*{error}</p>}
          </div>

          <CustomBtn accion={() => crearCarta()} extraStyle='bg-white'>
            <p>Crear Carta</p>
          </CustomBtn>
        </div>
      </Modal>
    </div>
  );
}

export default CrearCarta;
