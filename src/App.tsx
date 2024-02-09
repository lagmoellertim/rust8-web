import { useCallback, useEffect, useRef, useState } from "react";
import "./App.scss";
import { Canvas } from "./components/Canvas/Canvas";

import { Keypad } from "./components/Keypad/Keypad";

import { Header } from "./components/Header/Header";

import { Footer } from "./components/Footer/Footer";
import { useChip8 } from "./hooks/useChip8";
import { Rom } from "./types/rom.type";
import { useRoms } from "./hooks/useRoms";
import { useKeypad } from "./hooks/useKeypad";
import { useKeyPressEvent } from "react-use";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [keys, setKeys] = useKeypad();

  const [roms, setRoms] = useState<Rom[]>([]);
  const [currentRom, setCurrentRom] = useState<Rom | undefined>(undefined);
  const preloadedRoms = useRoms();
  useEffect(() => {
    setRoms((roms) => [...preloadedRoms, ...roms]);
  }, [preloadedRoms]);

  const [running, setRunning] = useState<boolean>(false);
  useKeyPressEvent(" ", undefined, () => setRunning((running) => !running));

  const { canvasMessage } = useChip8({
    canvasRef: canvasRef.current,
    keyStates: keys,
    program: currentRom?.content,
    setRunning,
    running,
  });

  const onRomAdd = useCallback(
    (rom: Rom) => setRoms((roms) => [...roms, rom]),
    []
  );

  return (
    <div className="app">
      <Header
        currentRom={currentRom}
        roms={roms}
        running={running}
        onCurrentRomChange={setCurrentRom}
        onRomAdd={onRomAdd}
        onRunningChange={setRunning}
      ></Header>

      <div className="content">
        <div className="content__canvas">
          <Canvas
            canvasRef={canvasRef}
            overlayMessage={
              canvasMessage ? <div>{canvasMessage}</div> : undefined
            }
          />
        </div>

        <Keypad keys={keys} setKeys={setKeys}></Keypad>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
