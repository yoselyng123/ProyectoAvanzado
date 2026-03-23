type Props = {
  nombre: number | string;
  color: string;
  ancho?: number;
  alto?: number;
};

function Carta({ nombre, color = '#252120', ancho = 320, alto = 500 }: Props) {
  return (
    <div
      className='group cursor-pointer'
      style={{
        width: `${ancho}px`,
        height: `${alto}px`,
        perspective: '1000px',
      }}
    >
      <div className='relative h-full w-full duration-700 transform-3d group-hover:transform-[rotateY(180deg)]'>
        {/* Front */}
        <div
          className={`${ancho > 300 ? 'border-20' : 'border-12'} absolute inset-0 rounded-2xl border border-[#252120] text-white backface-hidden`}
          style={{
            backgroundColor: '#252120',
          }}
        >
          <div
            className='relative flex h-full items-center justify-center rounded-2xl text-white'
            style={{
              backgroundColor: color,
            }}
          >
            <div className='absolute top-0 left-2 text-3xl font-bold number-font'>
              <p>{nombre}</p>
            </div>

            <div className='flex h-[55%] w-[95%] items-center justify-center rounded-full bg-white number-font'>
              <p className='text-7xl font-bold text-black'>{nombre}</p>
            </div>

            <div className='absolute right-2 bottom-0 text-3xl font-bold number-font'>
              <p>{nombre}</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={`${ancho > 300 ? 'border-20' : 'border-12'} absolute inset-0 rounded-2xl border border-[#252120] text-white backface-hidden transform-[rotateY(180deg)] flex items-center justify-center`}
          style={{
            backgroundColor: '#252120',
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
