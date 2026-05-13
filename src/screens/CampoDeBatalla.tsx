import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Carta from '../components/Carta';
import type { CartaType } from '../data/entidades';

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

  useEffect(() => {
    if (!id1 || !id2) {
      setCarta1(null);
      setCarta2(null);
      return;
    }

    setLoading(true);
    setError(null);

    const cargarCartas = async () => {
      try {
        const [nuevaCarta1, nuevaCarta2] = await Promise.all([
          getCarta(id1),
          getCarta(id2),
        ]);

        setCarta1(nuevaCarta1);
        setCarta2(nuevaCarta2);
      } catch (error) {
        setCarta1(null);
        setCarta2(null);
        setLoading(false);
        setError('No se pudieron cargar las cartas');
      }
    };

    cargarCartas();
  }, [id1, id2]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8 p-5'>
      <h1 className='number-font text-8xl font-bold uppercase text-black'>
        Campo de Batalla
      </h1>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && carta1 && carta2 && (
        <div className='flex items-center justify-center gap-12'>
          <Carta
            nombre={carta1.name}
            color={carta1.attributes?.color ?? '#252120'}
            ancho={220}
            alto={340}
          />
          <p className='number-font text-7xl font-bold text-black'>VS</p>
          <Carta
            nombre={carta2.name}
            color={carta2.attributes?.color ?? '#252120'}
            ancho={220}
            alto={340}
          />
        </div>
      )}
    </div>
  );
}

export default CampoDeBatalla;
