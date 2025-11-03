
const Form = ({ placeholder, type, value, onChange, disabled, text, error }) => {
  return (
    <div className="flex flex-col gap-1 my-4 w-full justify-start *:transition-all">
      <p className="text-black text-sm font-bold items-start">{text || placeholder}</p>
      <input type={type} placeholder={placeholder} className="border border-gray-700 p-2 lg:w-96 w-full focus:outline-none focus:ring-2 focus:ring-black" value={value} onChange={onChange} disabled={disabled} />
      {error && <div className="text-red-500">*{error}</div>}
    </div>
  );
};

export default Form;
