type Props = {
  nombre: number | string;
  color: string;
  ancho?: number;
  alto?: number;
};

function Carta({ nombre, color = '#252120', ancho = 320, alto = 500 }: Props) {
  return (
    <div
      className={`${ancho > 300 ? 'border-20' : 'border-12'} border-[#252120] text-white rounded-2xl cursor-pointer`}
      style={{
        width: `${ancho}px`,
        height: `${alto}px`,
        backgroundColor: '#252120',
      }}
    >
      <div
        className={`relative text-white flex justify-center items-center rounded-2xl cursor-pointer h-full`}
        style={{
          backgroundColor: color,
        }}
      >
        <div className='absolute top-0 left-2 text-white font-bold text-3xl number-font'>
          <p>{nombre}</p>
        </div>
        <div className='bg-white rounded-[100%] w-[95%] h-[55%] flex items-center justify-center number-font'>
          <p className='text-black font-bold text-7xl'>{nombre}</p>
        </div>
        <div className='absolute bottom-0 right-2 text-white font-bold text-3xl number-font'>
          <p>{nombre}</p>
        </div>
      </div>
    </div>
  );
}

export default Carta;
