'use client'
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { hexToHsl } from '../hexToHsl';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { clearColors, setColor } from "./theme-cookie";

interface ThemeColorProps {
    dict: any;
    colors: { type: string; color: string }[] | null;
}

function ThemeColor({ dict, colors }: ThemeColorProps) {
    const [colorState, setColorState] = useState(
        colors?.reduce((acc, color) => {
            acc[color.type] = color.color;
            return acc;
        }, {} as Record<string, string>) || {}
    );

    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    // Debounced effect to set color
    useEffect(() => {
        // Clean up previous timeout to avoid multiple requests
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set new timeout to delay the POST request
        const timeout = setTimeout(() => {
            Object.keys(colorState).forEach((type) => {
                const color = colorState[type];
                setColor(type, color); // Persist the new color
            });
        }, 500); // Adjust the debounce time (in ms)

        setDebounceTimeout(timeout);

        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        };
    }, [colorState]); // Effect depends on colorState changes

    const handleChange = (event: ChangeEvent<HTMLInputElement>, type: string) => {
        const newColor = event.target.value;
        setColorState(prevState => ({
            ...prevState,
            [type]: newColor
        }));
        const hslColor = hexToHsl(newColor);
        document.documentElement.style.setProperty(`--${type}`, hslColor);
    };

    const reset = () => {
        clearColors(['primary', 'foreground'])
    }

    return (
        <>
            <div className="flex flex-row items-center gap-4">
                {dict.title} <Button variant="ghost" onClick={reset}>{dict.standard}</Button>
            </div>
            <div className="grid gap-4 grid-cols-2 grid-rows-2 items-center">
                {colors?.map((color) => (
                    <Fragment key={color.type}>
                        <Label htmlFor={color.type}>{dict[color.type]}</Label>
                        <Input
                            type="color"
                            id={color.type}
                            value={colorState[color.type] || color.color} // Use the state value
                            onChange={(e) => handleChange(e, color.type)}
                            className="border p-2"
                            aria-label={dict[color.type]}
                        />
                    </Fragment>
                ))}
            </div>
        </>
    );
}

export default ThemeColor;