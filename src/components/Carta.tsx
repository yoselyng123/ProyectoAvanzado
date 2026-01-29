import { useEffect } from 'react';

type Props = {
  nombre: number | string;
  imagen: string;
  ancho?: number;
  alto?: number;
};

function Carta({ nombre, imagen, ancho = 380, alto = 580 }: Props) {
  useEffect(() => {
    console.log('USE EFFECT DE CARTA');
  }, []);

  return (
    <div
      style={{ width: `${ancho}px`, height: `${alto}px` }}
      className={`relative border-2 border-black bg-white text-white flex justify-center items-center rounded-2xl cursor-pointer`}
    >
      <div className='absolute top-2 left-2 text-black font-bold text-2xl'>
        <p>{nombre}</p>
      </div>
      <div>
        <p className='text-7xl'>{imagen}</p>
      </div>
    </div>
  );
}

export default Carta;
