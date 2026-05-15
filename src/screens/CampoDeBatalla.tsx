import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Carta from '../components/Carta';
import type { CartaType } from '../data/entidades';
import CustomBtn from '../components/CustomBtn';
import LogsBatalla from '../components/LogsBatalla';

type Jugador = 'p1' | 'p2';

const getCarta = async (id: string): Promise<CartaType> => {
  const urlAPI = `https://educapi-v2.onrender.com/card/${id}`;
  const respuesta = await fetch(urlAPI, {
    method: 'GET',
    headers: {
      usersecretpasskey: 'uwu77',
    },
  });

  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar la carta ${id}`);
  }

  const objeto = await respuesta.json();
  const carta = objeto.data?.[0];

  if (!carta) {
    throw new Error(`No se encontro la carta ${id}`);
  }

  return carta;
};

function CampoDeBatalla() {
  const { id1, id2 } = useParams();
  const [carta1, setCarta1] = useState<CartaType | null>(null);
  const [carta2, setCarta2] = useState<CartaType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [turno, setTurno] = useState(1);
  const [cartaAtacando, setCartaAtacando] = useState<Jugador | null>(null);

  const jugadorTurno: Jugador = turno % 2 === 1 ? 'p1' : 'p2';

  const siguienteTurno = () => {
    if (!carta1 || !carta2 || cartaAtacando) {
      return;
    }

    setCartaAtacando(jugadorTurno);
  };

  const finalizarAnimacionGolpe = () => {
    setCartaAtacando(null);
    setTurno((turnoActual) => turnoActual + 1);
  };

  useEffect(() => {
    if (!id1 || !id2) {
      setCarta1(null);
      setCarta2(null);
      return;
    }

    setLoading(true);
    setError(null);
    setTurno(1);
    setCartaAtacando(null);

    const cargarCartas = async () => {
      try {
        const [nuevaCarta1, nuevaCarta2] = await Promise.all([
          getCarta(id1),
          getCarta(id2),
        ]);

        setCarta1(nuevaCarta1);
        setCarta2(nuevaCarta2);
        setLoading(false);
      } catch {
        setCarta1(null);
        setCarta2(null);
        setLoading(false);
        setError('No se pudieron cargar las cartas');
      }
    };

    cargarCartas();
  }, [id1, id2]);

  return (
    <div className='flex min-h-screen flex-col gap-8 relative'>
      <style>
        {`
          @keyframes golpe-p1 {
            0% {
              transform: translateX(0) rotate(0deg) scale(1);
            }
            35% {
              transform: translateX(90px) rotate(4deg) scale(1.05);
            }
            55% {
              transform: translateX(130px) rotate(2deg) scale(1.08);
            }
            72% {
              transform: translateX(35px) rotate(-3deg) scale(0.98);
            }
            100% {
              transform: translateX(0) rotate(0deg) scale(1);
            }
          }

          @keyframes golpe-p2 {
            0% {
              transform: translateX(0) rotate(0deg) scale(1);
            }
            35% {
              transform: translateX(-90px) rotate(-4deg) scale(1.05);
            }
            55% {
              transform: translateX(-130px) rotate(-2deg) scale(1.08);
            }
            72% {
              transform: translateX(-35px) rotate(3deg) scale(0.98);
            }
            100% {
              transform: translateX(0) rotate(0deg) scale(1);
            }
          }
        `}
      </style>
      <div className='flex items-center justify-center border border-black relative h-15'>
        <div className='border border-black p-4 absolute top-0 bg-white'>
          <h1 className='number-font text-5xl font-bold uppercase text-black'>
            Campo de Batalla
          </h1>
        </div>
      </div>
      <div className='flex items-center justify-center flex-1'>
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && carta1 && carta2 && (
          <div className='flex items-center justify-center gap-12'>
            <div
              className='relative z-10'
              onAnimationEnd={finalizarAnimacionGolpe}
              style={
                cartaAtacando === 'p1'
                  ? {
                      animation:
                        'golpe-p1 650ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                      willChange: 'transform',
                    }
                  : undefined
              }
            >
              <Carta
                carta={carta1}
                color={carta1.attributes?.color ?? '#252120'}
                ancho={260}
                alto={360}
                selectionMode={true}
                mostrarVida={true}
              />
            </div>
            <p className='number-font text-7xl font-bold text-black'>VS</p>
            <div
              className='relative z-10'
              onAnimationEnd={finalizarAnimacionGolpe}
              style={
                cartaAtacando === 'p2'
                  ? {
                      animation:
                        'golpe-p2 650ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                      willChange: 'transform',
                    }
                  : undefined
              }
            >
              <Carta
                carta={carta2}
                color={carta2.attributes?.color ?? '#252120'}
                ancho={260}
                alto={360}
                selectionMode={true}
                mostrarVida={true}
              />
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-1 flex-col'>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4 items-center justify-center'>
            {carta1 && carta2 && (
              <LogsBatalla turno={1} p1={carta1} p2={carta2} damage={100} />
            )}
            <Link to='/'>
              <CustomBtn extraStyle='rounded-full w-[120px]' accion={() => {}}>
                <p>Rendirse</p>
              </CustomBtn>
            </Link>
          </div>
          <div className='flex items-center justify-center'>
            {carta1 && carta2 && (
              <p className='mr-4 text-xl font-bold'>
                Turno {turno}:{' '}
                {jugadorTurno === 'p1' ? carta1.name : carta2.name}
              </p>
            )}
            <CustomBtn
              extraStyle='rounded-full w-[20%]'
              accion={siguienteTurno}
              disabled={!carta1 || !carta2 || Boolean(cartaAtacando)}
            >
              <p>Siguiente Turno</p>
            </CustomBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampoDeBatalla;
