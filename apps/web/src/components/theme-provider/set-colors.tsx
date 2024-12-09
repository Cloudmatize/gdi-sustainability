import { hexToHsl } from '../hexToHsl';
import { getColors } from './theme-cookie';

async function setColors() {
    const colors = await getColors(['primary', 'foreground'])
    colors?.map((color) => {
        document.documentElement.style.setProperty(`--${color.type}`, hexToHsl(color.color));
    })
    return true
}

export default setColors