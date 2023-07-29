import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="px-4 py-2 bg-slate-700 text-white rounded-md cursor-pointer shadow disabled:opacity-60 disabled:cursor-not-allowed hover:bg-slate-600"
    >
      {children}
    </button>
  );
};

export default Button;