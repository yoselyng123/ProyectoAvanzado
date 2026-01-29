import React from 'react';

type Props = {
  titulo: string;
  valor: string;
  modoEditar: boolean;
};

function PropiedadCarta({ titulo, valor, modoEditar }: Props) {
  return (
    <div>
      <p className='font-bold'>{titulo}</p>
      {modoEditar ? (
        <input
          placeholder={titulo}
          value={valor}
          className='p-1 border border-black rounded-lg bg-white min-w-[40%]'
        />
      ) : (
        <p>{valor}</p>
      )}
    </div>
  );
}

export default PropiedadCarta;
