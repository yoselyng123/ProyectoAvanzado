import type { CartaType } from '../data/entidades';

type Props = {
  carta: CartaType;
  color: string;
  ancho?: number;
  alto?: number;
  seleccionada?: boolean;
  selectionMode?: boolean;
};

function Carta({
  carta,
  color = '#252120',
  ancho = 420,
  alto = 600,
  seleccionada = false,
  selectionMode = false,
}: Props) {
  return (
    <div
      className={`group cursor-pointer transition-transform duration-300 ${seleccionada ? 'scale-105' : ''}`}
      style={{
        width: `${ancho}px`,
        height: `${alto}px`,
        perspective: '1000px',
      }}
    >
      <div
        className={`relative h-full w-full ${!selectionMode && 'duration-700 transform-3d group-hover:transform-[rotateY(180deg)]'}`}
      >
        {/* Front */}
        <div
          className={`
            ${ancho > 300 ? 'border-16' : 'border-10'} 
            absolute inset-0 rounded-2xl text-white backface-hidden flex flex-col
            ${seleccionada ? 'border-blue-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'border-[#252120]'}
          `}
          style={{
            backgroundColor: '#252120',
            transition: 'border-color 0.3s ease',
          }}
        >
          <div
            className='relative flex h-full items-center justify-center rounded-lg text-white'
            style={{
              backgroundColor: color,
            }}
          >
            <div className='absolute top-0 right-3'>
              <p
                className='
                  text-4xl font-black italic tracking-tighter text-white uppercase
                  [text-shadow:2px_2px_0px_rgba(0,0,0,1)]
                  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                  number-font
                '
              >
                {String(carta?.idCard).padStart(3, '0')}
              </p>
            </div>

            <img
              src={carta.pictureUrl}
              alt={carta.name}
              referrerPolicy='no-referrer'
              className='h-full w-full object-cover p-3'
            />

            <div
              className={`absolute ${ancho > 400 ? 'bottom-20' : 'bottom-10'} left-0 w-full`}
            >
              {/* Contenedor principal con fondo oscuro y forma sesgada */}
              <div
                className={`bg-[#252120] text-white px-8 ${ancho > 400 ? 'py-3' : 'py-1.5'} flex items-center justify-center w-[90%] [clip-path:polygon(0_0,100%_0,92%_100%,0%_100%)] border-b-4 border-gray-400/80`}
              >
                <h2 className='text-3xl font-black italic tracking-tighter uppercase drop-shadow-md'>
                  {carta?.name || 'LUKE'}
                </h2>
              </div>

              {/* Detalle decorativo del borde derecho (la línea diagonal blanca/gris) */}
              <div
                className='absolute bottom-0 right-0 h-full w-[15%] bg-gray-300
               [clip-path:polygon(80%_0,100%_0,100%_100%,20%_100%)] 
               -z-10 translate-x-1'
              />
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={`
            ${ancho > 300 ? 'border-16' : 'border-10'} 
            absolute inset-0 rounded-2xl text-white backface-hidden transform-[rotateY(180deg)] flex items-center justify-center
            ${seleccionada ? 'border-blue-500' : 'border-[#252120]'}
          `}
          style={{
            backgroundColor: '#252120',
            transition: 'border-color 0.3s ease',
          }}
        >
          <div
            className={`rounded-2xl text-center relative transform-[rotate(45deg)] -translate-y-[15px] -translate-x-2.5 ${ancho > 300 && 'scale-125'}`}
          >
            <div className='w-[50px] h-[50px] bg-[#E95E30] rounded-full opacity-70 absolute top-[-30%] left-[35%] -translate-x-[25px] -translate-y-[25px]' />
            <div className='w-[50px] h-[50px] bg-[#3B4497] rounded-full opacity-70 absolute top-[-30%] left-[35%] translate-x-[25px] -translate-y-[25px]' />
            <div className='w-[50px] h-[50px] bg-[#E3D2A7] rounded-full opacity-70 absolute top-[-30%] left-[35%] -translate-x-[25px] translate-y-[25px]' />
            <div className='w-[50px] h-[50px] bg-[#71B373] rounded-full opacity-70 absolute top-[-30%] left-[35%] translate-x-[25px] translate-y-[25px]' />
            <p className='number-font z-10 text-2xl font-extrabold transform-[rotate(-45deg)] translate-y-0.5 translate-x-[15px]'>
              EDUCA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carta;
