import { useEffect, type ReactNode, useState } from "react";
import { createPortal } from "react-dom";

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

type ToastProps = {
  children: ReactNode;
  type: ToastType;
};

const iconPaths = {
  [ToastType.SUCCESS]: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  ),
  [ToastType.ERROR]: (
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  [ToastType.WARNING]: (
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  ),
  [ToastType.INFO]: (
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  ),
};

const Toast = ({ children, type = ToastType.SUCCESS }: ToastProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => setLoaded(true), []);

  const classes = `alert bg-${type} text-white`;

  return (
    loaded && (
      <div
        className="toast toast-top toast-end top-0 right-2"
        style={{ position: "fixed", zIndex: 10000 }}
      >
        <div className={classes}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            {iconPaths[type]}
          </svg>
          <span>{children}</span>
        </div>
      </div>
    )
  );
};

export default Toast;
