import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import styles from './Monster.module.sass'

type Position = {
    left: string
    top: string
}

interface MonsterProps {
    src: string
    position: Position
    coinsForClick: number
    setGoldState: React.Dispatch<React.SetStateAction<number>>

    monsterCallBack: (...args: any[]) => void
    trigger: (...args: any[]) => ({
        timeoutId: NodeJS.Timeout | null
        clearTrigger: () => void
    })

    hitSound: HTMLAudioElement
    setHitSound: Dispatch<SetStateAction<HTMLAudioElement>>
    triggerSound: HTMLAudioElement
    setTriggerSound: Dispatch<SetStateAction<HTMLAudioElement>>

    monstersState: number
    setMonstersState: Dispatch<SetStateAction<number>>
    monstersLoaded: number
    setMonstersLoaded: Dispatch<SetStateAction<number>>
    maxMonstersState: number

    volumeState: number
    setVolumeState: Dispatch<SetStateAction<number>>

    hpState: number
    setHpState: Dispatch<SetStateAction<number>>

    armorPlayer: number
    setArmorPlayer: Dispatch<SetStateAction<number>>

    damagePlayer: number
    setDamagePlayer: Dispatch<SetStateAction<number>>

    bonusGoldPlayer: number
    setBonusGoldPlayer: Dispatch<SetStateAction<number>>

    monsterHP: number
    monsterDmg: number
    monsterDamageTimeout: number

    isBattle: boolean
    setIsBattle: Dispatch<SetStateAction<boolean>>

    gameOver: boolean
    setGameOver: Dispatch<SetStateAction<boolean>>

    levelComplete: boolean
    setLevelComplete: Dispatch<SetStateAction<boolean>>
}

const Monster: React.FC<MonsterProps> = ({
                                             src,
                                             position,
                                             coinsForClick,
                                             setGoldState,

                                             monstersState,
                                             setMonstersState,
                                             monstersLoaded,
                                             setMonstersLoaded,
                                             maxMonstersState,

                                             hitSound,
                                             setHitSound,
                                             triggerSound,
                                             setTriggerSound,

                                             volumeState,
                                             setVolumeState,

                                             isBattle,
                                             setIsBattle,

                                             monsterHP,
                                             monsterDmg,
                                             monsterDamageTimeout,

                                             hpState,
                                             setHpState,

                                             bonusGoldPlayer,
                                             setBonusGoldPlayer,

                                             armorPlayer,
                                             setArmorPlayer,

                                             damagePlayer,
                                             setDamagePlayer,

                                             gameOver,
                                             setGameOver,

                                             levelComplete,
                                             setLevelComplete,
                                             monsterCallBack,
                                             trigger,
                                         }) => {
    const [monsterHPState, setMonsterHPState] = useState(monsterHP)

    const [clearTrigger, setClearTrigger] = useState<() => void | null>(null)

    const [isRendered, setIsRendered] = useState<boolean>(false)

    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>(null)

    const [monsterIsDead, setMonsterIsDead] = useState<boolean>(false)

    const [damageState, setDamageState] = useState<number>(monsterDmg - armorPlayer)

    const [callBackIsUsed, setCallBackIsUsed] = useState<boolean>(false)

    const [triggerIsUsed, setTriggerIsUsed] = useState<boolean>(false)

    const [triggerId, setTriggerId] = useState<NodeJS.Timeout>(null)

    const [isTriggering, setIsTriggering] = useState<boolean>(false)

    const imageLoad = (e) => {
        if (isBattle) return
        setMonstersState(prev => ++prev)
        if (monstersLoaded + 1 === maxMonstersState) {
            setIsBattle(true)
        }
        setMonstersLoaded(prev => ++prev)
    }

    useEffect(() => {
        if (hpState <= 0) {
            setMonstersState(prev => --prev)
            clearInterval(intervalId)
            clearInterval(triggerId)
            setMonstersLoaded(0)
            setTimeout(() => setGameOver(true), 0)
        }

        if (!isRendered && isBattle) {
            setIsRendered(true)
            setIntervalId(() => {
                return setInterval(() => {
                    if (monsterDmg <= armorPlayer) return
                    let dmg = monsterDmg - armorPlayer
                    setHpState(prev => prev - dmg)
                    setDamageState(dmg)
                }, monsterDamageTimeout)
            })
        }

        if (damageState !== monsterDmg - armorPlayer && !monsterIsDead) {
            setDamageState(monsterDmg - armorPlayer)
            setIntervalId(() => {
                clearInterval(intervalId)
                return setInterval(() => {
                    if (monsterDmg <= armorPlayer) return
                    let dmg = monsterDmg - armorPlayer
                    setHpState(prev => prev - dmg)
                }, monsterDamageTimeout)
            })
        }

        if (monsterHPState <= 0 && !monsterIsDead) {
            clearInterval(intervalId)
            clearInterval(triggerId)
            if (isTriggering) clearTrigger()
            setMonstersState(prev => --prev)
            setMonsterIsDead(true)
        }
    })

    const monsterHit = () => {
        if (levelComplete) return
        if (monsterIsDead) return
        if (isTriggering) {
            if (triggerSound) {
                triggerSound.currentTime = 0
                triggerSound.play()
            }
        } else {
            if (hitSound) {
                hitSound.currentTime = 0
                hitSound.play()
            }
        }

        if (!callBackIsUsed) {
            monsterCallBack(setCallBackIsUsed, monsterHPState, setMonsterHPState, setHpState, setDamageState, setArmorPlayer, setGoldState, setBonusGoldPlayer, monstersState)
        }

        if (!triggerIsUsed) {
            let triggerResult = trigger(
                setTriggerIsUsed,
                setIsTriggering,
                monsterHPState,
                setMonsterHPState,
                setHpState,
                setDamagePlayer,
                setArmorPlayer,
                setGoldState,
                setBonusGoldPlayer,
                monstersState,
            )
            setTriggerId(triggerResult.timeoutId)
            setClearTrigger(() => (triggerResult.clearTrigger))
        }
        setGoldState(prev => prev + coinsForClick + damagePlayer + bonusGoldPlayer)
        setMonsterHPState(prev => {
            if (prev - damagePlayer >= monsterHP) return monsterHP
            return prev - damagePlayer
        })
    }

    return (
        <div style={{
            cursor: monsterIsDead || !isBattle ? 'default' : 'pointer',
            opacity: monsterIsDead || !isBattle ? '0' : '1',
            left: position.left,
            top: position.top,
            backgroundColor: isTriggering ? 'rgba(255, 55, 35, .7)' : 'rgba(0,0,0,.1)',
        }} onClick={monsterHit} className={styles.Monster}>
            <div className={styles.MonsterStats}>
                <div className={styles.InfoBox}>{monsterDmg} <img src={'/sword.svg'} alt={''} className={styles.StatsImage}/></div>
                <div className={styles.InfoBox}>{coinsForClick} <img src={'/coin-stats.svg'} alt={''} className={styles.StatsImage}/></div>
            </div>

            <img onMouseDown={(e) => {
                e.preventDefault()
                return false
            }} onLoad={imageLoad} className={styles.MonsterImage} src={src} alt=''/>

            <div style={{
                width: 100 * monsterHPState / monsterHP + '%',
                backgroundColor: monsterHPState / monsterHP <= 0.3 ? 'red' : 'green',
            }} className={styles.MonsterHpBar}/>
        </div>
    )
}

export default Monster