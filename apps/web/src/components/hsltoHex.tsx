const hslToHex = ({ first, second, third }: { first: string, second: string, third: string }) => {
    let h = Number.parseInt(first)
    let s = Number.parseInt(second)
    let l = Number.parseInt(third)
    // Convert percentage to decimal
    s /= 100;
    l /= 100;

    const chroma = (1 - Math.abs(2 * l - 1)) * s;
    const x = chroma * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - chroma / 2;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
        r = chroma; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
        r = x; g = chroma; b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0; g = chroma; b = x;
    } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = chroma;
    } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = chroma;
    } else if (h >= 300 && h <= 360) {
        r = chroma; g = 0; b = x;
    }

    // Convert to [0, 255] and apply offset m
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    // Convert to HEX
    const toHex = (value: number) => value.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
