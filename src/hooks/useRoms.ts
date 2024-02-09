import { useAsync } from "react-use";
import { Rom } from "../types/rom.type";
import { useMemo } from "react";

const loadableRoms: { id: string; name: string }[] = [
    { id: "airplane", name: "Airplane" },
    { id: "breakout", name: "Breakout" },
    { id: "connect4", name: "Connect 4" },
    { id: "maze", name: "Maze" },
    { id: "pong", name: "Pong" },
    { id: "tetris", name: "Tetris" },

]

export const useRoms = (): Rom[] => {
    const asyncState = useAsync(async (): Promise<Rom[]> => {
        return await Promise.all(loadableRoms.map(async (loadableRom): Promise<Rom> => {
            const response = await fetch(`roms/${loadableRom.id}.ch8`);
            const arrayBuffer = await response.arrayBuffer();
            const content = new Uint8Array(arrayBuffer);

            return { id: loadableRom.id, name: loadableRom.name, content };
        }))
    }, [])

    return useMemo((): Rom[] => {
        if (asyncState.error || asyncState.loading || !asyncState.value) {
            return [];
        }

        return asyncState.value
    }, [asyncState])
}