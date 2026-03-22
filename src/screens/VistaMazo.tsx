import type { CartaType } from '../data/entidades';
import CustomBtn from '../components/CustomBtn';
import { IoMdAdd } from 'react-icons/io';
import Carta from '../components/Carta';
import { useState } from 'react';
import { Link } from 'react-router';
import VistaDetalle from './VistaDetalle';

type Props = {
  mazo: CartaType[];
  setCartaClickeada: Function;
  setMazoCartas: Function;
  cartaClickeada: CartaType | null;
};

function VistaMazo({
  mazo,
  setCartaClickeada,
  setMazoCartas,
  cartaClickeada,
}: Props) {
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  function mostrarDetalleCarta(carta: CartaType) {
    setMostrarModal(true);
    setCartaClickeada(carta);
    // navigate(`/${carta.idCard}`);
  }

  return (
    <div className='flex flex-col gap-2 min-h-screen'>
      {mostrarModal && cartaClickeada && (
        <VistaDetalle
          cambiarEstadoModal={() => setMostrarModal(false)}
          carta={cartaClickeada}
          setMazoCartas={setMazoCartas}
        />
      )}
      <header className='flex justify-between p-5 border-b border-gray-400'>
        <h1 className='uppercase font-bold text-4xl'>Carticas</h1>
        <Link to='/crear'>
          <CustomBtn extraStyle='rounded-full' accion={() => {}}>
            <IoMdAdd size={28} />
          </CustomBtn>
        </Link>
      </header>
      <div className='flex flex-wrap px-4 py-2.5 gap-4'>
        {mazo.map((carta) => {
          return (
            <div onClick={() => mostrarDetalleCarta(carta)} key={carta.idCard}>
              <Carta
                nombre={carta.name}
                color={carta.attributes.color}
                ancho={180}
                alto={280}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VistaMazo;
