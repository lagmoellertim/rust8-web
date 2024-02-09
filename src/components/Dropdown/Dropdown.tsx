import { FC, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { FiChevronDown } from "react-icons/fi";
import "./Dropdown.style.scss";
import { Backdrop } from "../Backdrop/Backdrop";
import classNames from "classnames";
import { useClickAway } from "react-use";

type DropdownProps = {
  items: { title: string; id: string; callback: () => void }[];
  actions: { title: string; callback: () => void }[];
  label: string;
};

export const Dropdown: FC<DropdownProps> = ({ items, actions, label }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => {
    setVisible(false);
  });

  return (
    <div className="dropdown" ref={ref}>
      <Button
        onClick={() => setVisible(!visible)}
        icon={<FiChevronDown></FiChevronDown>}
      >
        {label}
      </Button>
      <Backdrop
        className={classNames("dropdown__menu", {
          "dropdown__menu--active": visible,
        })}
      >
        <div className="dropdown__menu-list">
          <ul className="dropdown__menu-items-list">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  item.callback();
                  setVisible(false);
                }}
              >
                {item.title}
              </li>
            ))}
          </ul>
          <div className="dropdown__menu-list-divider"></div>
          <ul>
            {actions.map((action) => (
              <li
                key={action.title}
                onClick={() => {
                  action.callback();
                  setVisible(false);
                }}
              >
                {action.title}
              </li>
            ))}
          </ul>
        </div>
      </Backdrop>
    </div>
  );
};
