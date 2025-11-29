import './carta.css';

function Carta({
  numero,
  imagen,
}: {
  numero: number | string;
  imagen: string;
}) {
  return (
    <div className='contenedor'>
      <div>
        <p>{numero}</p>
      </div>
      <div>
        <p>{imagen}</p>
      </div>
    </div>
  );
}

export default Carta;
