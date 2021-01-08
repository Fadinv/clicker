import React, {Dispatch, SetStateAction, useRef, useState} from 'react'
import styles from './SoundPanel.module.sass'

interface SoundPanelProps {
    volumeState: number
    setVolumeState: Dispatch<SetStateAction<number>>

    atmosphere: HTMLAudioElement
    setAtmosphere: Dispatch<SetStateAction<HTMLAudioElement>>
    atmosphereIsPlaying: boolean
    setAtmosphereIsPlaying: Dispatch<SetStateAction<boolean>>
}

const SoundPanel: React.FC<SoundPanelProps> = ({
                                                   atmosphere,
                                                   setAtmosphere,
                                                   atmosphereIsPlaying,
                                                   setAtmosphereIsPlaying,
                                                   volumeState,
                                                   setVolumeState,
                                               }) => {

    let shiftX
    let maxValue
    let sliderPosX
    let sliderWidth

    const scrollRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)

    const [prevVolume, setPrevVolume] = useState<number>(30)

    const soundOn = () => {
        setAtmosphereIsPlaying(true)

        const audio = new Audio('/audio/atmosphere.mp3')
        audio.loop = true
        audio.autoplay = true
        audio.volume = volumeState / 10000
        setAtmosphere(audio)
    }

    const onAndOffVolume = (e) => {
        const scroll = scrollRef.current

        if (volumeState === 0) {
            if (prevVolume === 0) {
                console.log('nen')
                setVolumeState(1000)
                //audio
                let volume = 0.1
                if (atmosphere) atmosphere.volume = volume

                scroll.style.left = '10%'

                return
            }

            let value = prevVolume / 100
            let left = `${value}%`
            let volume = prevVolume / 10000

            if (value > 97) {
                left = 'calc(100% - 3vh)'
                volume = 1
            }
            scroll.style.left = left

            setVolumeState(prevVolume)

            //audio
            if (atmosphere) atmosphere.volume = volume

            return
        }

        scroll.style.left = '0'

        if (atmosphere) atmosphere.volume = 0

        setPrevVolume(volumeState)
        setVolumeState(0)

    }

    const scrollEnd = (e) => {
        document.documentElement.removeEventListener('mousemove', scrollMove)
        document.documentElement.removeEventListener('touchmove', scrollMove)

        setTimeout(() => {
            document.documentElement.removeEventListener('mouseup', scrollEnd)
            document.documentElement.removeEventListener('touchend', scrollEnd)
        }, 0)
    }

    const scrollMove = (e) => {
        let result
        if (e.pageX) {
            result = e.pageX - shiftX - sliderPosX
        }
        if (e.touches) {
            result = e.touches[0].pageX - shiftX - sliderPosX
        }

        const left = getPosition(result)

        const scroll = scrollRef.current
        scroll.style.left = left
    }

    const getPosition = (r) => {
        if (r < 0) {
            setVolumeState(0)
            let volume = 0
            atmosphere.volume = volume
            return '0'
        }
        if (r > maxValue - sliderPosX) {
            setVolumeState(10000)
            let volume = 1
            atmosphere.volume = volume
            return 'calc(100% - 3vh)'
        }

        if (r === undefined) r = 0.0001

        let result = Math.round(10000 * r / sliderWidth)

        setVolumeState(result)

        let volume = result / 10000
        atmosphere.volume = volume

        return result / 100 + '%'
    }

    const scrollStart = (e) => {

        const scroll = scrollRef.current.getBoundingClientRect()
        const scrollX = scroll.x

        const slider = sliderRef.current.getBoundingClientRect()
        sliderWidth = slider.width
        sliderPosX = slider.x

        maxValue = sliderWidth + slider.x - scroll.width

        if (e.pageX) {
            shiftX = e.pageX - scrollX
        }
        if (e.touches) {
            shiftX = e.touches[0].pageX - scrollX
        }

        document.documentElement.addEventListener('mousemove', scrollMove)
        document.documentElement.addEventListener('touchmove', scrollMove)
        document.documentElement.addEventListener('mouseup', scrollEnd)
        document.documentElement.addEventListener('touchend', scrollEnd)
    }

    return (
        <div className={styles.SoundPanel}>
            {atmosphereIsPlaying ? <> <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div>volume: {Math.round(volumeState / 100)}</div>

                <button onClick={onAndOffVolume} className={styles.SoundButton}>
                    <img onMouseDown={(e) => {
                        e.preventDefault()
                        return false
                    }} className={styles.SoundImg} src="/volume-on.svg" alt=""/>
                </button>
            </div>

            <div ref={sliderRef} className={styles.slider}>
                <div style={{
                    width: `calc(${1.5 + volumeState / 100}% + 1vh)`,
                }} className={styles.ActiveBackground}>

                </div>

                <div
                    onTouchStart={scrollStart}
                    onMouseDown={scrollStart}

                    ref={scrollRef}
                    className={styles.scroll}

                    style={{
                        left: volumeState < 9700 ? `${volumeState / 10000}` : 'calc(100% - 3vh)'
                    }}
                >
                </div>
            </div> </> : <button onClick={soundOn} className={styles.OnMusic}>Включить звуковое сопровождение</button>}

        </div>
    )
}

export default SoundPanel