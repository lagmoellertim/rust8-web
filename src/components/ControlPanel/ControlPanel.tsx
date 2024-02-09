import { FC, useEffect } from "react";
import "./ControlPanel.style.scss";
import { Button } from "../Button/Button";

import { FiPause, FiPlay } from "react-icons/fi";
import { Backdrop } from "../Backdrop/Backdrop";
import { Dropdown } from "../Dropdown/Dropdown";
import { useFilePicker } from "use-file-picker";
import { Rom } from "../../types/rom.type";

export type ControlPanelProps = {
  currentRom?: Rom;
  onCurrentRomChange: (rom: Rom) => void;
  roms: Rom[];
  onRomAdd: (rom: Rom) => void;
  running: boolean;
  onRunningChange: (running: boolean) => void;
};

export const ControlPanel: FC<ControlPanelProps> = ({
  roms,
  onRomAdd,
  currentRom,
  onCurrentRomChange,
  running,
  onRunningChange,
}) => {
  const { openFilePicker, filesContent } = useFilePicker({
    readAs: "ArrayBuffer",
    multiple: false,
  });

  useEffect(() => {
    const content = filesContent?.[0] as unknown as {
      path: string;
      content: ArrayBuffer;
    };

    if (!content) {
      return;
    }

    const rom: Rom = {
      name: content.path.split("/").slice(-1).pop()?.split(".")[0]!,
      content: new Uint8Array(content.content),
      id: content.path,
    };

    onRomAdd(rom);
    onCurrentRomChange(rom);
  }, [filesContent, onRomAdd, onCurrentRomChange]);

  return (
    <div className="control-panel">
      <Backdrop>
        <div style={{ display: "flex" }}>
          <Button
            className="control-panel__button"
            active={running}
            onClick={() => onRunningChange(true)}
            icon={<FiPlay fill="black"></FiPlay>}
          />
          <Button
            className="control-panel__button"
            active={!running}
            onClick={() => onRunningChange(false)}
            icon={<FiPause fill="black"></FiPause>}
          />
        </div>
      </Backdrop>
      <Dropdown
        label={currentRom ? currentRom.name : "Select ROM"}
        items={roms.map((rom) => ({
          id: rom.id,
          title: rom.name,
          callback: () => onCurrentRomChange(rom),
        }))}
        actions={[{ title: "From file", callback: () => openFilePicker() }]}
      ></Dropdown>
    </div>
  );
};
