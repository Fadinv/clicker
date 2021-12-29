import styles from '../styles/Home.module.sass'
import BattleGround from '../Components/BattleGround/BattleGround'
import {useEffect, useState} from 'react'

interface AloneFlaskProps {
    value: number
    intervalId: NodeJS.Timeout | null
    active: boolean
}

export interface FlaskProps {
    health: AloneFlaskProps
    armor: AloneFlaskProps
    attack: AloneFlaskProps
    gold: AloneFlaskProps
    god: AloneFlaskProps
    shadow: AloneFlaskProps
}

const loadedAudio = async (src) => {

}

export default function Home() {

    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const [volumeState, setVolumeState] = useState<number>(3000)

    const [atmosphereIsPlaying, setAtmosphereIsPlaying] = useState<boolean>(false)
    const [atmosphere, setAtmosphere] = useState<HTMLAudioElement | null>(null)

    const [drinkSound, setDrinkSound] = useState<HTMLAudioElement | null>(null)
    const [buySound, setBuySound] = useState<HTMLAudioElement | null>(null)
    const [hitSound, setHitSound] = useState<HTMLAudioElement | null>(null)
    const [triggerSound, setTriggerSound] = useState<HTMLAudioElement | null>(null)

    const [levelState, setLevelState] = useState<number>(-1)
    const [maxHpState, setMaxHpState] = useState<number>(100)
    const [hpState, setHpState] = useState<number>(100)
    const [goldState, setGoldState] = useState<number>(0)
    const [levelComplete, setLevelComplete] = useState<boolean>(true)
    const [gameOver, setGameOver] = useState<boolean>(false)

    const [damagePlayer, setDamagePlayer] = useState<number>(1)
    const [armorPlayer, setArmorPlayer] = useState<number>(0)
    const [bonusGoldPlayer, setBonusGoldPlayer] = useState<number>(0)

    const [monstersState, setMonstersState] = useState<number>(0)
    const [monstersLoaded, setMonstersLoaded] = useState<number>(0)
    const [isBattle, setIsBattle] = useState<boolean>(false)

    const [numOfItemsLoaded, setNumOfItemsLoaded] = useState<number>(0)
    const [itemsIsLoaded, setItemsIsLoaded] = useState<boolean>(false)

    const [flasksState, setFlasksState] = useState<FlaskProps>({
        health: {
            value: 0,
            intervalId: null,
            active: false,
        },
        armor: {
            value: 0,
            intervalId: null,
            active: false,
        },
        attack: {
            value: 0,
            intervalId: null,
            active: false,
        },
        gold: {
            value: 0,
            intervalId: null,
            active: false,
        },
        god: {
            value: 0,
            intervalId: null,
            active: false,
        },
        shadow: {
            value: 0,
            intervalId: null,
            active: false,
        },
    })

    useEffect(() => {
        if (levelComplete) setHpState(prev => maxHpState)
        if (isLoaded) return
        setIsLoaded(true)
    })

    return (
        <div className={styles.Home}>

            {isLoaded ? <BattleGround
                drinkSound={drinkSound}
                setDrinkSound={setDrinkSound}
                buySound={buySound}
                setBuySound={setBuySound}
                hitSound={hitSound}
                setHitSound={setHitSound}
                triggerSound={triggerSound}
                setTriggerSound={setTriggerSound}
                atmosphere={atmosphere}
                setAtmosphere={setAtmosphere}
                atmosphereIsPlaying={atmosphereIsPlaying}
                setAtmosphereIsPlaying={setAtmosphereIsPlaying}

                volumeState={volumeState}
                setVolumeState={setVolumeState}

                isBattle={isBattle}
                setIsBattle={setIsBattle}

                monstersState={monstersState}
                setMonstersState={setMonstersState}
                monstersLoaded={monstersLoaded}
                setMonstersLoaded={setMonstersLoaded}

                armorPlayer={armorPlayer}
                setArmorPlayer={setArmorPlayer}
                bonusGoldPlayer={bonusGoldPlayer}
                setBonusGoldPlayer={setBonusGoldPlayer}

                numOfItemsLoaded={numOfItemsLoaded}
                setNumOfItemsLoaded={setNumOfItemsLoaded}
                itemsIsLoaded={itemsIsLoaded}
                setItemsIsLoaded={setItemsIsLoaded}

                flasksState={flasksState}
                setFlasksState={setFlasksState}

                gameOver={gameOver}
                setGameOver={setGameOver}
                levelComplete={levelComplete}
                setLevelComplete={setLevelComplete}

                damagePlayer={damagePlayer}
                setDamagePlayer={setDamagePlayer}

                levelState={levelState}
                setLevelState={setLevelState}

                hpState={hpState}
                maxHpState={maxHpState}
                setHpState={setHpState}
                setMaxHpState={setMaxHpState}

                goldState={goldState}
                setGoldState={setGoldState}
            /> : null}


        </div>
    )
}
