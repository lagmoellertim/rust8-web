import { ButtonHTMLAttributes, FC } from "react";
import "./Button.style.scss";
import classNames from "classnames";
import { Backdrop } from "../Backdrop/Backdrop";

type ButtonProps = {
  active?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  children,
  active = false,
  icon,
  ...buttonProps
}) => {
  return (
    <Backdrop>
      <button
        {...buttonProps}
        className={classNames(buttonProps.className, "button", {
          "button--active": active,
          "button--square": icon && !children,
        })}
      >
        {children && <div className="button__children">{children}</div>}
        {icon && <div className="button__icon-right">{icon}</div>}
      </button>
    </Backdrop>
  );
};
