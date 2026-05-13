import { Link } from 'react-router';
import Carta from '../components/Carta';
import CustomBtn from '../components/CustomBtn';
import type { CartaType } from '../data/entidades';
import { MdArrowBack } from 'react-icons/md';
import { TbSwords } from 'react-icons/tb';
import { useState } from 'react';

type Props = {
  mazo: CartaType[];
  loading: boolean;
};

function SeleccionarCartas({ mazo, loading }: Props) {
  const [cartaSeleccionada1, setCartaSeleccionada1] =
    useState<CartaType | null>(null);
  const [cartaSeleccionada2, setCartaSeleccionada2] =
    useState<CartaType | null>(null);
  const [listoBatalla, setListoBatalla] = useState<boolean>(false);

  const handleSeleccionarCarta = (carta: CartaType) => {
    const isSelected1 = cartaSeleccionada1?.idCard === carta.idCard;
    const isSelected2 = cartaSeleccionada2?.idCard === carta.idCard;

    if (isSelected1) {
      setCartaSeleccionada1(null);
      setListoBatalla(false);
      return;
    }

    if (isSelected2) {
      setCartaSeleccionada2(null);
      setListoBatalla(false);
      return;
    }

    if (!cartaSeleccionada1) {
      setCartaSeleccionada1(carta);
      if (cartaSeleccionada2) setListoBatalla(true);
    } else if (!cartaSeleccionada2) {
      setCartaSeleccionada2(carta);
      setListoBatalla(true);
    }
  };

  return (
    <div className='h-full'>
      <header className='flex justify-between items-center p-5 border-b-2'>
        <div className='flex gap-5'>
          <Link to='/'>
            <CustomBtn extraStyle='rounded-full' accion={() => {}}>
              <MdArrowBack size={28} />
            </CustomBtn>
          </Link>
        </div>
        <h1 className='uppercase font-bold text-8xl text-black number-font'>
          Seleccionar Cartas
        </h1>

        <Link
          to={`/campo-de-batalla/${cartaSeleccionada1?.idCard}/${cartaSeleccionada2?.idCard}`}
          style={{ pointerEvents: listoBatalla ? 'auto' : 'none' }}
        >
          <CustomBtn
            extraStyle='rounded-full'
            accion={() => {}}
            disabled={!listoBatalla}
          >
            <TbSwords size={28} />
          </CustomBtn>
        </Link>
      </header>
      <div>
        <div className='flex flex-wrap px-4 py-2.5 gap-4'>
          {loading && <p>Cargando...</p>}

          {!loading &&
            mazo &&
            mazo.map((carta) => {
              return (
                <div
                  onClick={() => {
                    handleSeleccionarCarta(carta);
                  }}
                  key={carta.idCard}
                >
                  <Carta
                    carta={carta}
                    color={carta.attributes.color}
                    ancho={260}
                    alto={360}
                    seleccionada={
                      cartaSeleccionada1?.idCard == carta.idCard ||
                      cartaSeleccionada2?.idCard == carta.idCard
                    }
                    selectionMode={true}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SeleccionarCartas;
