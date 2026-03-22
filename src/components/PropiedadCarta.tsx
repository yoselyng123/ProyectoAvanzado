type Props = {
  titulo: string;
  valor: string | number | undefined;
  modoEditar: boolean;
  valorEditable: string | number;
  setValorEditable: Function;
};

function PropiedadCarta({
  titulo,
  valor,
  modoEditar,
  valorEditable,
  setValorEditable,
}: Props) {
  return (
    <div>
      <p className='font-bold text-white'>{titulo}</p>
      {modoEditar ? (
        <input
          placeholder={titulo}
          value={valorEditable}
          onChange={(e) => setValorEditable(e.target.value)}
          className='p-1 border border-black rounded-lg bg-white min-w-[40%]'
        />
      ) : (
        <p className='text-white'>{valor}</p>
      )}
    </div>
  );
}

export default PropiedadCarta;
