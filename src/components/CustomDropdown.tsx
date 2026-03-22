type Props = {
  label: string;
  selectedOption: string | number;
  setSelectedOption: Function;
  options: any[];
  textColor?: string;
};

function CustomDropdown({
  label,
  selectedOption,
  setSelectedOption,
  options,
  textColor = 'black',
}: Props) {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor='' className={`${textColor !== 'black' && 'text-white'}`}>
        {label}
      </label>
      <select
        value={selectedOption}
        className='p-1 border border-black bg-white max-w-[40%] rounded-lg'
        onChange={(e) => {
          setSelectedOption(e.target.value);
        }}
      >
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CustomDropdown;
