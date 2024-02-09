import { FC } from "react";
import { Button } from "../Button/Button";
import classNames from "classnames";
import { isNumeric } from "../../utils/utils";
import "./Keypad.style.scss";
type Key = { label: string; pressed: boolean; keycode: string };

type KeypadProps = {
  keys: Key[];
  setKeys: (key: Key[]) => void;
};

export const Keypad: FC<KeypadProps> = ({ keys, setKeys }) => {
  const setKey = (i: number, key: Key) => {
    const newKeys = [...keys];
    newKeys[i] = key;
    setKeys(newKeys);
  };

  return (
    <div className="keypad">
      {keys.map((key, i) => (
        <Button
          key={key.label}
          className={classNames("keypad__button", {
            "keypad__button--numeric": isNumeric(key.keycode),
          })}
          active={key.pressed}
          onPointerDown={() => {
            setKey(i, { ...key, pressed: true });
          }}
          onPointerUp={() => {
            setKey(i, { ...key, pressed: false });
          }}
          onPointerLeave={() => {
            setKey(i, { ...key, pressed: false });
          }}
          onPointerCancel={() => {
            setKey(i, { ...key, pressed: false });
          }}
        >
          {key.label}
        </Button>
      ))}
    </div>
  );
};
