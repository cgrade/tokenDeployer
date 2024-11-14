"use client";
type ButtonProps = {
  children: React.ReactNode;
  [key: string]: any;
};

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="bg-blue-500 text-white px-8 py-2 rounded transition-all duration-300 hover:bg-blue-600"
    >
      {children}
    </button>
  );
};

export default Button;
