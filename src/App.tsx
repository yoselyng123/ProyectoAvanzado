import { useEffect, useState } from 'react';
import './App.css';

import { type CartaType } from './data/entidades.tsx';
import { Route, Routes, useNavigate } from 'react-router';
import VistaMazo from './screens/VistaMazo.tsx';
import VistaDetalle from './screens/VistaDetalle.tsx';
import CrearCarta from './components/CrearCarta.tsx';
import SeleccionarCartas from './screens/SeleccionarCartas.tsx';
import CampoDeBatalla from './screens/CampoDeBatalla.tsx';

function App() {
  const [mazoCartas, setMazoCartas] = useState<CartaType[]>([]);
  const [cartaClickeada, setCartaClickeada] = useState<CartaType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  let navigate = useNavigate();

  const getCartas = async () => {
    setLoading(true);
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
    setLoading(false);
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
            loading={loading}
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

      <Route
        path='/seleccionar-cartas'
        element={<SeleccionarCartas mazo={mazoCartas} loading={loading} />}
      />

      <Route path='/campo-de-batalla/:id1/:id2' element={<CampoDeBatalla />} />
    </Routes>
  );
}

export default App;
