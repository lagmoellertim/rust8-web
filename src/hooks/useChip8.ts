import { useEffect, useMemo, useState } from "react";
import { usePrevious } from "react-use"

import { Chip8 } from "wasm-rust8/rust8_wasm";

type KeyState = {
    keycode: string;
    pressed: boolean;
}

type Options = {
    keyStates?: KeyState[]
    canvasRef: HTMLCanvasElement | null
    running: boolean
    setRunning: (running: boolean) => void
    program?: Uint8Array
}

export const useChip8 = ({ canvasRef, keyStates = [], program, running, setRunning }: Options): { error?: string, canvasMessage?: string } => {
    const prevKeyStates = usePrevious(keyStates)
    const [error, setError] = useState<string | undefined>(undefined)

    const chip8 = useMemo(() => {
        if (!canvasRef) {
            return undefined
        }

        return new Chip8(canvasRef, (errorMessage: string) => {
            setError(errorMessage)
            setRunning(false)
        });

    }, [canvasRef, setRunning])

    useEffect(() => {
        if (!chip8) {
            return;
        }

        keyStates.forEach((keyState, i) => {
            if (keyState.pressed !== prevKeyStates?.[i].pressed) {
                if (keyState.pressed) {
                    chip8.key_down(keyState.keycode);
                } else {
                    chip8.key_up(keyState.keycode);
                }
            }
        });
    }, [keyStates, prevKeyStates, chip8]);

    useEffect(() => {
        if (!chip8 || !program) {
            return;
        }

        setError(undefined)

        try {
            chip8.load_program(program);
            setRunning(true);
        } catch (e) {
            setError(`${e}`)
        }

    }, [chip8, program, setRunning])

    useEffect(() => {
        if (!chip8) return;

        if (running) {
            chip8.start()
        } else {
            chip8.stop()
        }
    }, [running, chip8])

    const canvasMessage = useMemo(() => {
        if (error) {
            return `Error: ${error}`;
        }
        if (!program) {
            return "No Rom selected";
        }

        if (!running) {
            return "Paused";
        }
    }, [program, running, error]);

    return { error, canvasMessage }
}