"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
    // loading: boolean;
    text: string;
  }
  
  export default function FormButton({ text }: FormButtonProps) {
    const { pending } = useFormStatus(); //this hook only can be used in child of form, that needs to be modified.
    return (
      <button
        disabled={pending}
        className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
      >
        {pending ? "로딩 중" : text}
      </button>
    );
  }

  //make server action, and  put action in form component