import { FiCpu, FiGithub } from "react-icons/fi";
import { Button } from "../Button/Button";
import "./Header.style.scss";
import { ControlPanel, ControlPanelProps } from "../ControlPanel/ControlPanel";
import { FC } from "react";

type HeaderProps = ControlPanelProps;

export const Header: FC<HeaderProps> = (props) => {
  return (
    <div className="header">
      <div className="header__segment header__title">
        <FiCpu></FiCpu>
        Rust8
      </div>
      <div className="header__segment header__control-panel">
        <ControlPanel {...props}></ControlPanel>
      </div>
      <div className="header__segment header__github-link">
        <Button
          icon={<FiGithub fill="black"></FiGithub>}
          onClick={() =>
            window.open("https://github.com/lagmoellertim/rust8-web", "_self")
          }
        >
          View on GitHub
        </Button>
      </div>
    </div>
  );
};
