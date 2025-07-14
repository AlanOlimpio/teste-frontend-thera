"use client";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonTeste(props: ButtonProps) {
  return <button {...props}>Button</button>;
}
