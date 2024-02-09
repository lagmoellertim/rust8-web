import { FC } from "react";
import "./Backdrop.style.scss";
import classNames from "classnames";

export const Backdrop: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div {...props} className={classNames(props.className, "backdrop")}>
      {children}
    </div>
  );
};
