import type { CartaType } from '../data/entidades';

type Props = {
  card: CartaType;
  color: string;
  ancho?: number;
  alto?: number;
};

function Carta({ card, color = '#252120', ancho = 320, alto = 500 }: Props) {
  return (
    <div
      className='group cursor-pointer'
      style={{
        width: `${ancho}px`,
        height: `${alto}px`,
        perspective: '1000px',
      }}
    >
      <div className='relative h-full w-full duration-600 transform-3d group-hover:transform-[rotateY(180deg)]'>
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-xl text-white backface-hidden`}
        >
          <div
            className='relative flex h-full items-center justify-center rounded-2xl text-white'
            style={{
              backgroundColor: color,
            }}
          >
            <img
              src={card.pictureUrl}
              alt='Character'
              className='object-cover h-full'
            />
            <div className='absolute left-0 bottom-10 bg-zinc-400 min-w-[60%] w-fit pt-0 pr-1 pb-1 pl-0 [clip-path:polygon(0_0,100%_0,80%_100%,0_100%)]'>
              <div className='bg-zinc-950 px-4 py-2 flex items-center [clip-path:polygon(0_0,100%_0,80%_100%,0_100%)]'>
                <h1 className='text-2xl font-black tracking-tighter uppercase italic bg-linear-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm pr-2'>
                  {card.name}
                </h1>
              </div>
            </div>
            <div className='absolute top-4.5 right-0.5'>
              <p className='number-font text-3xl font-black text-black pr-2'>
                {card.idCard}
              </p>
            </div>
            <div className='absolute top-3.5 right-1'>
              <p className='number-font text-3xl font-black tracking-tighter uppercase bg-linear-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-2xl pr-2'>
                {card.idCard}
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-xl text-white backface-hidden transform-[rotateY(180deg)] flex items-center justify-center`}
          style={{
            backgroundColor: '#252120',
          }}
        >
          <div
            className={`rounded-xl text-center relative transform-[rotate(45deg)] -translate-y-[15px] -translate-x-2.5 ${ancho > 300 && 'scale-125'}`}
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
