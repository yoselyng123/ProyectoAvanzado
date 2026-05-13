import type { CartaType } from '../data/entidades';
import CustomBtn from '../components/CustomBtn';
import { IoMdAdd } from 'react-icons/io';
import { TbSwords } from 'react-icons/tb';
import Carta from '../components/Carta';
import { useState } from 'react';
import { Link } from 'react-router';
import VistaDetalle from './VistaDetalle';

type Props = {
  mazo: CartaType[];
  setCartaClickeada: Function;
  setMazoCartas: Function;
  cartaClickeada: CartaType | null;
  loading: boolean;
};

function VistaMazo({
  mazo,
  setCartaClickeada,
  setMazoCartas,
  cartaClickeada,
  loading,
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
      <header className='flex justify-between p-5 border-b-2'>
        <h1 className='uppercase font-bold text-8xl text-black number-font'>
          Mazo
        </h1>
        <div className='flex gap-5'>
          <Link to='/seleccionar-cartas'>
            <CustomBtn extraStyle='rounded-full' accion={() => {}}>
              <TbSwords size={28} />
            </CustomBtn>
          </Link>
          <Link to='/crear'>
            <CustomBtn extraStyle='rounded-full' accion={() => {}}>
              <IoMdAdd size={28} />
            </CustomBtn>
          </Link>
        </div>
      </header>
      <div className='flex flex-wrap px-4 py-2.5 gap-4'>
        {loading && <p>Cargando...</p>}

        {!loading &&
          mazo &&
          mazo.map((carta) => {
            return (
              <div
                onClick={() => mostrarDetalleCarta(carta)}
                key={carta.idCard}
              >
                <Carta
                  carta={carta}
                  color={carta.attributes.color}
                  ancho={260}
                  alto={360}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default VistaMazo;
