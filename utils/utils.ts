import {Dispatch, SetStateAction} from 'react'

export const refreshSound = (
    volume: number,
    ...args: Dispatch<SetStateAction<HTMLAudioElement>>[]
): void => {
    for (let set of args) {
        set(prev => {
            if (!prev) return
            if (volume / 10000 !== prev.volume) {
                prev.volume = volume / 10000
                return prev
            }
            return prev
        })
    }
}