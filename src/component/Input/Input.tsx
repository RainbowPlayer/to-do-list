
interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  className: string;
}

const Input = ({ value, onChange, placeholder, type, className }: InputProps) => {
  return (
    <input className={className} type={type} value={value} onChange={onChange} placeholder={placeholder} />
  );
};

export default Input;
