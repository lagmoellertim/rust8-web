import { useCallback, useEffect, useState } from "react";
import { Key } from "../types/key.type";

export const useKeypad = (): [keys: Key[], setKeys: (keys: Key[]) => void] => {
    const [keys, setKeys] = useState<Key[]>([
        { label: "1", pressed: false, keycode: "1" },
        { label: "2", pressed: false, keycode: "2" },
        { label: "3", pressed: false, keycode: "3" },
        { label: "C", pressed: false, keycode: "c" },
        { label: "4", pressed: false, keycode: "4" },
        { label: "5", pressed: false, keycode: "5" },
        { label: "6", pressed: false, keycode: "6" },
        { label: "D", pressed: false, keycode: "d" },
        { label: "7", pressed: false, keycode: "7" },
        { label: "8", pressed: false, keycode: "8" },
        { label: "9", pressed: false, keycode: "9" },
        { label: "E", pressed: false, keycode: "e" },
        { label: "A", pressed: false, keycode: "a" },
        { label: "0", pressed: false, keycode: "0" },
        { label: "B", pressed: false, keycode: "b" },
        { label: "F", pressed: false, keycode: "f" },
    ]);

    const updateKey = useCallback((newKey: string, pressed: boolean) => {
        setKeys((keys) => {
            const i = keys.findIndex((key) => key.keycode === newKey);

            if (i < 0) {
                return keys;
            }
            const newKeys = [...keys];
            newKeys[i] = { ...newKeys[i], pressed };
            return newKeys;
        });
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) =>
            updateKey(event.key, true);
        const handleKeyUp = (event: KeyboardEvent) =>
            updateKey(event.key, false);

        // Adding event listeners to the window object
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        // Cleanup function to remove event listeners
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [updateKey]);

    return [
        keys, setKeys
    ]
}