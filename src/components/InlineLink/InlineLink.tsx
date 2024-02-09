import { AnchorHTMLAttributes, FC, PropsWithChildren } from "react";
import "./InlineLink.style.scss";
import classNames from "classnames";

export const InlineLink: FC<
  PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>
> = ({ children, ...props }) => {
  return (
    <a {...props} className={classNames(props.className, "inline-link")}>
      {children}
    </a>
  );
};
