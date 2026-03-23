import { useEffect, useState } from 'react';
import Carta from '../components/Carta';
import CustomBtn from '../components/CustomBtn';
import Modal from '../components/Modal';
import PropiedadCarta from '../components/PropiedadCarta';
import CustomDropdown from '../components/CustomDropdown';

type CartaType = {
  idCard: string;
  attack: number;
  defense: number;
  descripcion?: string;
  lifePoints: number;
  name: string;
  pictureUrl: string;
  userSecret: string;
  attributes: any;
  createdAt: string;
  updatedAt: any;
};

type Props = {
  cambiarEstadoModal: Function;
  carta: CartaType;
  setMazoCartas: Function;
};

function VistaDetalle({ cambiarEstadoModal, carta, setMazoCartas }: Props) {
  const COLORS = {
    Rojo: '#E95E30',
    Azul: '#3B4497',
    Amarillo: '#E3D2A7',
    Verde: '#71B373',
    Negro: '#252120',
  };
  type ColorKey = keyof typeof COLORS;
  const colorKeys = Object.keys(COLORS) as ColorKey[];
  const [color, setColor] = useState<ColorKey>(colorKeys[0]);

  const [modoEditar, setModoEditar] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ataque, setAtaque] = useState(0);
  const [defensa, setDefensa] = useState(0);
  const [vida, setVida] = useState(0);
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState<null | string>(null);

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

  function getKeyByValue(value: string): ColorKey | undefined {
    return (Object.keys(COLORS) as ColorKey[]).find(
      (key) => COLORS[key] === value,
    );
  }

  useEffect(() => {
    if (modoEditar) {
      setNombre(carta.name);
      setDescripcion(carta.descripcion ?? '');
      setAtaque(carta.attack);
      setDefensa(carta.defense);
      setVida(carta.lifePoints);
      setImagen(carta.pictureUrl);
      const colorKey = getKeyByValue(carta.attributes.color);
      if (colorKey) {
        setColor(colorKey);
      }
      setError(null);
      setLoading(false);
    }
  }, [modoEditar]);

  const actualizarCarta = async () => {
    console.log('ACTUALIZAR');
    if (
      nombre === '' ||
      imagen === '' ||
      ataque <= 0 ||
      defensa <= 0 ||
      vida <= 0
    ) {
      console.log('HERE');
      setError('Error. Los campos no pueden estar vacios ni ser menores a 0.');
    } else {
      setError(null);
      setLoading(true);
      try {
        let urlAPI = `https://educapi-v2.onrender.com/card/${carta.idCard}`;
        console.log(urlAPI);

        const respuesta = await fetch(urlAPI, {
          method: 'PATCH',
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
      } catch (error) {
        console.log(error);
      }
    }
  };

  const eliminarCarta = async (idCard: string) => {
    let urlAPI = `https://educapi-v2.onrender.com/card/${idCard}`;

    const respuesta = await fetch(urlAPI, {
      method: 'DELETE',
      headers: {
        usersecretpasskey: 'uwu77',
      },
    });

    if (respuesta.status === 200 || respuesta.status === 201) {
      cambiarEstadoModal(false);
      getCartas();
    }

    console.log(respuesta);
  };

  return (
    <div className='absolute w-full'>
      <Modal cambiarEstadoModal={cambiarEstadoModal}>
        <div className='flex gap-8 w-full justify-center'>
          <div className='flex-1 flex items-center justify-center flex-col gap-7'>
            <Carta nombre={carta.name} color={carta.attributes.color} />
            <div className='flex gap-8'>
              <CustomBtn
                accion={() => {
                  eliminarCarta(carta.idCard);
                }}
                extraStyle='bg-white min-w-[150px]'
              >
                {loading ? (
                  <div
                    role='status'
                    className='flex justify-center items-center'
                  >
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
                  <p>Eliminar</p>
                )}
              </CustomBtn>
              <CustomBtn
                accion={() => {
                  setModoEditar(!modoEditar);
                }}
                extraStyle='bg-white min-w-[150px]'
              >
                <p>{modoEditar ? 'Cancelar' : 'Editar'}</p>
              </CustomBtn>
            </div>
          </div>
          <div className='flex flex-col gap-6 flex-1'>
            <PropiedadCarta
              titulo='Nombre'
              valor={carta.name}
              modoEditar={modoEditar}
              valorEditable={nombre}
              setValorEditable={setNombre}
            />
            <PropiedadCarta
              titulo='Descripcion'
              valor={carta.descripcion}
              modoEditar={modoEditar}
              valorEditable={descripcion}
              setValorEditable={setDescripcion}
            />
            <PropiedadCarta
              titulo='Ataque'
              valor={`⚔️ ${carta.attack}`}
              modoEditar={modoEditar}
              valorEditable={ataque}
              setValorEditable={setAtaque}
            />
            <PropiedadCarta
              titulo='Defensa'
              valor={`🛡️ ${carta.defense}`}
              modoEditar={modoEditar}
              valorEditable={defensa}
              setValorEditable={setDefensa}
            />
            <PropiedadCarta
              titulo='Vida'
              valor={`❤️ ${carta.lifePoints}`}
              modoEditar={modoEditar}
              valorEditable={vida}
              setValorEditable={setVida}
            />
            <PropiedadCarta
              titulo='Imagen'
              valor={carta.pictureUrl}
              modoEditar={modoEditar}
              valorEditable={imagen}
              setValorEditable={setImagen}
            />
            {modoEditar ? (
              <CustomDropdown
                label='Color'
                selectedOption={color}
                setSelectedOption={setColor}
                options={colorKeys}
                textColor='white'
              />
            ) : (
              <PropiedadCarta
                titulo='Color'
                valor={carta.attributes.color}
                modoEditar={modoEditar}
                valorEditable={color}
                setValorEditable={setColor}
              />
            )}

            {error && <p className='text-red-500 font-bold'>*{error}</p>}

            {modoEditar && (
              <CustomBtn
                accion={() => {
                  actualizarCarta();
                }}
                extraStyle='bg-white w-[40%] mt-10'
                disabled={loading}
              >
                {loading ? (
                  <div
                    role='status'
                    className='flex justify-center items-center'
                  >
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
                  <p>Guardar Cambios</p>
                )}
              </CustomBtn>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default VistaDetalle;
