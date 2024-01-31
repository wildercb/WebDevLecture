import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Button({
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className="p-2 w-full border border-black rounded disabled:bg-gray-200"
      {...props}
    >
      {children}
    </button>
  );
}
