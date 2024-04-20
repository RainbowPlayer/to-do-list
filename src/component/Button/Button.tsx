import './style.css'

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button"; 
}

const Button = ({ onClick, children, className, type }: ButtonProps) => {
    const buttonClass = `button ${className || ''}`;
  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
