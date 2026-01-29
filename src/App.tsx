import { useState } from 'react';
import './App.css';
import { IoMdAdd } from 'react-icons/io';
import CustomBtn from './components/CustomBtn';
import VistaDetalle from './screens/VistaDetalle.tsx';
import CrearCarta from './components/CrearCarta.tsx';
import Carta from './components/Carta.tsx';

function App() {
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [mostrarModalCrearCarta, setMostrarModalCrearCarta] =
    useState<boolean>(false);

  const [listaCartas, setListaCartas] = useState([]);

  function condicionalModal() {
    if (mostrarModal === true) {
      return <VistaDetalle cambiarEstadoModal={setMostrarModal} />;
    }
  }

  {
    mostrarModal === true && (
      <VistaDetalle cambiarEstadoModal={setMostrarModal} />
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      {/* {mostrarModal && <VistaDetalle cambiarEstadoModal={setMostrarModal} />} */}
      {condicionalModal()}

      {mostrarModalCrearCarta && (
        <CrearCarta
          cambiarEstadoModal={() => setMostrarModalCrearCarta(false)}
        />
      )}
      <header className='flex justify-between p-5 border-b border-gray-400'>
        <h1 className='uppercase font-bold text-4xl'>Carticas</h1>
        <CustomBtn
          extraStyle='rounded-full'
          accion={() => setMostrarModalCrearCarta(true)}
        >
          <IoMdAdd size={28} />
        </CustomBtn>
      </header>
      <div className='flex flex-wrap px-4 py-2.5 gap-4'>
        <div onClick={() => setMostrarModal(true)}>
          <Carta nombre={1} imagen='😎' ancho={150} alto={220} />
        </div>
        <div onClick={() => setMostrarModal(true)}>
          <Carta nombre={1} imagen='😎' ancho={150} alto={220} />
        </div>
        <div onClick={() => setMostrarModal(true)}>
          <Carta nombre={1} imagen='😎' ancho={150} alto={220} />
        </div>
        <div onClick={() => setMostrarModal(true)}>
          <Carta nombre={1} imagen='😎' ancho={150} alto={220} />
        </div>
      </div>
    </div>
  );
}

export default App;
