/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import React, { HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  className?: string;
  variant?: "base" | "white" | "disable";
  withArrow?: boolean;
  loading?: boolean;
  children?: ReactNode;
}

interface LinkButtonProops extends ButtonProps {
  href: string;
  target?: HTMLAttributeAnchorTarget | undefined;
}
export function LinkButton({ className, children, variant, withArrow, href, loading, target }: LinkButtonProops) {
  const baseButton = variant === "base";
  const whiteButton = variant === "white";
  const disableButton = variant === "disable";
  if (baseButton) {
    return (
      <Link
        href={href}
        target={target}
        className={`focus:outline-none text-white bg-base hover:bg-Secondary focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className} flex w-fit items-center duration-300`}
      >
        {withArrow && (
          <svg width="12" className="mr-2" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.8" d="M1 1.00073L6 6.00073L11 1.00073" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {loading ? (
          <>
            <svg aria-hidden="true" className="inline w-5 h-5 text-gray-300 animate-spin fill-white mr-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>{children}</>
        )}
      </Link>
    );
  } else if (whiteButton) {
    return (
      <Link href={href} target={target} className={`focus:outline-none text-black bg-white hover:bg-slate-100 focus:ring focus:ring-slate-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className} duration-500 `}>
        {children}
      </Link>
    );
  } else if (disableButton) {
    return (
      <Link href={href} target={target} className={`focus:outline-none text-black bg-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className} duration-500 `}>
        {children}
      </Link>
    );
  }
}

interface FormButtonProops extends ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function FormButton({ className, children, disabled, loading, onClick, type, variant, withArrow }: FormButtonProops) {
  const baseButton = variant === "base";
  const whiteButton = variant === "white";
  const disableButton = variant === "disable";
  if (baseButton) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`focus:outline-none text-black bg-Primary hover:bg-Secondary hover:text-Primary focus:ring-4 border-2 border-Secondary focus:ring-blue-400 font-medium  text-sm px-5 py-2.5 me-2 mb-2 ${className} flex w-fit items-center rounded-lg duration-300`}
      >
        {withArrow ? (
          <div className="flex justify-center items-center gap-x-3">
            <svg width="12" className="mr-2" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.8" d="M1 1.00073L6 6.00073L11 1.00073" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {children}
          </div>
        ) : (
          <>
            {loading ? (
              <>
                <svg aria-hidden="true" className="inline w-5 h-5 text-gray-300 animate-spin fill-white mr-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span>Loading...</span>
              </>
            ) : (
              <p className="mx-auto">{children}</p>
            )}
          </>
        )}
      </button>
    );
  } else if (whiteButton) {
    return (
      <button type={type} onClick={onClick} className={`focus:outline-none text-black bg-white hover:bg-slate-100 focus:ring focus:ring-slate-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className} `}>
        {loading ? (
          <>
            <svg aria-hidden="true" className="inline w-5 h-5 text-gray-300 animate-spin fill-black mr-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>{children}</>
        )}
      </button>
    );
  } else if (disableButton) {
    return (
      <button type={type} onClick={onClick} className={`focus:outline-none text-black bg-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className} `} disabled>
        {children}
      </button>
    );
  }
}
