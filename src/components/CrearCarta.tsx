import { useState } from 'react';
import CustomBtn from './CustomBtn';
import CustomInput from './CustomInput';
import Modal from './Modal';
import CustomDropdown from './CustomDropdown';

type Props = {
  cambiarEstadoModal: Function;
  setMazoCartas: Function;
};

function CrearCarta({ cambiarEstadoModal, setMazoCartas }: Props) {
  const COLORS = {
    Rojo: '#E95E30',
    Azul: '#3B4497',
    Amarillo: '#E3D2A7',
    Verde: '#71B373',
    Negro: '#252120',
  };

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ataque, setAtaque] = useState(0);
  const [defensa, setDefensa] = useState(0);
  const [vida, setVida] = useState(0);
  const [imagen, setImagen] = useState('');

  type ColorKey = keyof typeof COLORS;
  const colorKeys = Object.keys(COLORS) as ColorKey[];
  const [color, setColor] = useState<ColorKey>(colorKeys[0]);

  const [error, setError] = useState<null | string>(null);

  const [loading, setLoading] = useState(false);

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

  const crearCarta = async () => {
    if (
      nombre === '' ||
      descripcion === '' ||
      imagen === '' ||
      ataque <= 0 ||
      defensa <= 0 ||
      vida <= 0
    ) {
      setError('Error. Los campos no pueden estar vacios ni ser menores a 0.');
    } else {
      setError(null);
      setLoading(true);
      let urlAPI = `https://educapi-v2.onrender.com/card`;

      const respuesta = await fetch(urlAPI, {
        method: 'POST',
        headers: {
          usersecretpasskey: 'uwu77',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: nombre,
          description: descripcion,
          attack: ataque,
          defense: defensa,
          lifePoints: vida,
          pictureUrl: imagen,
          attributes: { color: COLORS[color] },
        }),
      });

      if (respuesta.status === 200 || respuesta.status === 201) {
        cambiarEstadoModal(false);
        getCartas();
      }
      setLoading(false);
      console.log(respuesta);
    }
  };

  return (
    <div className='absolute w-full'>
      <Modal cambiarEstadoModal={cambiarEstadoModal}>
        <div className='flex flex-col min-w-[30%] gap-5'>
          <div className='bg-white flex flex-col p-4 border border-black rounded-2xl gap-5 '>
            <CustomInput label='Nombre' value={nombre} setValue={setNombre} />
            <CustomInput
              label='Descripcion'
              value={descripcion}
              setValue={setDescripcion}
            />
            <CustomInput label='Ataque' value={ataque} setValue={setAtaque} />
            <CustomInput
              label='Defensa'
              value={defensa}
              setValue={setDefensa}
            />
            <CustomInput label='Vida' value={vida} setValue={setVida} />
            <CustomInput label='Imagen' value={imagen} setValue={setImagen} />
            <CustomDropdown
              label='Color'
              selectedOption={color}
              setSelectedOption={setColor}
              options={colorKeys}
            />
            {error && <p className='text-red-500 font-bold'>*{error}</p>}
          </div>

          <CustomBtn
            accion={() => crearCarta()}
            extraStyle='bg-white'
            disabled={loading}
          >
            {loading ? (
              <div role='status' className='flex justify-center items-center'>
                <svg
                  aria-hidden='true'
                  className='w-8 h-8 text-neutral-tertiary animate-spin fill-brand'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            ) : (
              <p>Crear Carta</p>
            )}
          </CustomBtn>
        </div>
      </Modal>
    </div>
  );
}

export default CrearCarta;
