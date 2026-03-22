import { useEffect, useState } from 'react';
import './App.css';

import { type CartaType } from './data/entidades.tsx';
import { Route, Routes, useNavigate } from 'react-router';
import VistaMazo from './screens/VistaMazo.tsx';
import VistaDetalle from './screens/VistaDetalle.tsx';
import CrearCarta from './components/CrearCarta.tsx';

function App() {
  const [mazoCartas, setMazoCartas] = useState<CartaType[]>([]);
  const [cartaClickeada, setCartaClickeada] = useState<CartaType | null>(null);

  let navigate = useNavigate();

  const getCartas = async () => {
    let urlAPI = 'https://educapi-v2.onrender.com/card';

    const respuesta = await fetch(urlAPI, {
      method: 'GET',
      headers: {
        usersecretpasskey: 'uwu77',
      },
    });

    const objeto = await respuesta.json();

    setMazoCartas(objeto.data);

    console.log(objeto.data);
  };

  useEffect(() => {
    getCartas();
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <VistaMazo
            mazo={mazoCartas}
            setCartaClickeada={setCartaClickeada}
            setMazoCartas={setMazoCartas}
            cartaClickeada={cartaClickeada}
          />
        }
      />
      {cartaClickeada && (
        <Route
          path='/:idCard'
          element={
            <VistaDetalle
              cambiarEstadoModal={() => {
                navigate('/');
              }}
              carta={cartaClickeada}
              setMazoCartas={setMazoCartas}
            />
          }
        />
      )}

      <Route
        path='/crear'
        element={
          <CrearCarta
            setMazoCartas={setMazoCartas}
            cambiarEstadoModal={() => {
              navigate('/');
            }}
          />
        }
      />
    </Routes>
  );
}

export default App;
