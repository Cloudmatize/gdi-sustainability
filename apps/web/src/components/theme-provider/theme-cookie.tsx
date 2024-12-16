'use server'

import { cookies } from 'next/headers'

// export async function create(data) {
//     const cookieStore = await cookies()

//     cookieStore.set('name', 'lee')
//     // or
//     cookieStore.set('name', 'lee', { secure: true })
//     // or
//     cookieStore.set({
//         name: 'name',
//         value: 'lee',
//         httpOnly: true,
//         path: '/',
//     })
// }

export async function getColor(param: string) {
    const cookieStore = await cookies()
    const color = cookieStore.get(param)
    if (color) return color
    return null
}

export async function setColor(type: string, color: string) {
    const cookieStore = await cookies()
    cookieStore.set(type, color.split('#')[1])
}

export async function getColors(params: string[]) {
    const cookieStore = await cookies()
    const colors: { type: string; color: string }[] = []
    for (let color in params) {
        let colorFromCookie = cookieStore.get(params[color])
        if (colorFromCookie) {
            colors.push({
                type: params[color],
                color: '#' + colorFromCookie.value
            })
        }
    }
    if (colors?.length >= 1) return colors
    return null
}

export async function clearColors(colors: string[]) {
    const cookieStore = await cookies()
    for (let type in colors) {
        cookieStore.delete(colors[type])
    }
}