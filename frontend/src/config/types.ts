import type React from "react";

export interface BottomWarningProps {
  warning: string,
  to: string,
  label: string,
};

export interface HeadingProps {
  label: string,
};

export interface SubHeadingProps {
  label: string,
};

export interface InputBoxProps {
  label: string,
  placeholder?: string,
  type?: string,
  ref: React.Ref<HTMLInputElement>
};

export interface ButtonProps {
  label: string,
  onclick: ()=> void
};

export interface BackButtonProps {
  link?: string,
};

export interface BalanceProps {
  balance: number,
};

export interface UsersProps {
  users: User[],
  onchange: (e: any)=>void
};

export interface User {
  firstName: string,
  lastName: string,
  email: string,
  id: string,
};

export interface SendMoneyProps {
  to: string, 
  amount: number,
};