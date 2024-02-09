import { FiHeart } from "react-icons/fi";
import { InlineLink } from "../InlineLink/InlineLink";
import "./Footer.style.scss";

export const Footer = () => {
  return (
    <div className="footer">
      Made with
      <FiHeart className="footer__heart" fill="palevioletred"></FiHeart>
      by
      <InlineLink href="https://github.com/lagmoellertim">
        @lagmoellertim
      </InlineLink>
    </div>
  );
};
