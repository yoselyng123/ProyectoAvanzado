type Props = {
  label: string;
  value: string | number;
  setValue: Function;
};

function CustomInput({ label, value, setValue }: Props) {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor=''>{label}</label>
      <input
        type='text'
        value={value}
        className='p-1 border border-black rounded-sm'
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default CustomInput;
