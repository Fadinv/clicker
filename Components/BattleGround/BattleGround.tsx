import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import styles from './BattleGround.module.sass'
import {myMonsters} from '../../data/monsters'
import Monster from '../Monster/Monster'
import {flasks, FlaskType} from '../../data/flasks'
import {GearType, myGear} from '../../data/gear'
import {FlaskProps} from '../../pages'
import SoundPanel from '../SoundPanel/SoundPanel'
import StoreBar from '../StoreBar/StoreBar'
import Store from '../Store/Store'
import StoreFlasks from '../StoreFlasks/StoreFlasks'
import {refreshSound} from '../../utils/utils'
import MenuPage from '../MenuPage/MenuPage'

interface BattleGroundProps {
    atmosphere: HTMLAudioElement
    setAtmosphere: Dispatch<SetStateAction<HTMLAudioElement>>
    atmosphereIsPlaying: boolean
    setAtmosphereIsPlaying: Dispatch<SetStateAction<boolean>>
    drinkSound: HTMLAudioElement
    setDrinkSound: Dispatch<SetStateAction<HTMLAudioElement>>
    buySound: HTMLAudioElement
    setBuySound: Dispatch<SetStateAction<HTMLAudioElement>>
    hitSound: HTMLAudioElement
    setHitSound: Dispatch<SetStateAction<HTMLAudioElement>>
    triggerSound: HTMLAudioElement
    setTriggerSound: Dispatch<SetStateAction<HTMLAudioElement>>

    volumeState: number
    setVolumeState: Dispatch<SetStateAction<number>>

    monstersState: number
    setMonstersState: Dispatch<SetStateAction<number>>

    monstersLoaded: number
    setMonstersLoaded: Dispatch<SetStateAction<number>>

    levelState: number
    setLevelState: Dispatch<SetStateAction<number>>

    hpState: number
    maxHpState: number
    setHpState: Dispatch<SetStateAction<number>>
    setMaxHpState: Dispatch<SetStateAction<number>>

    armorPlayer: number
    setArmorPlayer: Dispatch<SetStateAction<number>>

    damagePlayer: number
    setDamagePlayer: Dispatch<SetStateAction<number>>

    bonusGoldPlayer: number
    setBonusGoldPlayer: Dispatch<SetStateAction<number>>

    goldState: number
    setGoldState: Dispatch<SetStateAction<number>>

    gameOver: boolean
    setGameOver: Dispatch<SetStateAction<boolean>>

    levelComplete: boolean
    setLevelComplete: Dispatch<SetStateAction<boolean>>

    isBattle: boolean
    setIsBattle: Dispatch<SetStateAction<boolean>>

    numOfItemsLoaded: number
    setNumOfItemsLoaded: Dispatch<SetStateAction<number>>
    itemsIsLoaded: boolean
    setItemsIsLoaded: Dispatch<SetStateAction<boolean>>
    flasksState: FlaskProps
    setFlasksState: Dispatch<SetStateAction<FlaskProps>>
}

const BattleGround: React.FC<BattleGroundProps> = ({
                                                       atmosphere,
                                                       setAtmosphere,
                                                       atmosphereIsPlaying,
                                                       setAtmosphereIsPlaying,
                                                       drinkSound,
                                                       setDrinkSound,
                                                       buySound,
                                                       setBuySound,
                                                       hitSound,
                                                       setHitSound,
                                                       triggerSound,
                                                       setTriggerSound,

                                                       volumeState,
                                                       setVolumeState,

                                                       monstersState,
                                                       setMonstersState,
                                                       monstersLoaded,
                                                       setMonstersLoaded,

                                                       levelState,
                                                       setLevelState,

                                                       hpState,
                                                       maxHpState,
                                                       setHpState,
                                                       setMaxHpState,

                                                       armorPlayer,
                                                       setArmorPlayer,

                                                       damagePlayer,
                                                       setDamagePlayer,

                                                       bonusGoldPlayer,
                                                       setBonusGoldPlayer,

                                                       goldState,
                                                       setGoldState,

                                                       gameOver,
                                                       setGameOver,

                                                       levelComplete,
                                                       setLevelComplete,

                                                       isBattle,
                                                       setIsBattle,
                                                       numOfItemsLoaded,
                                                       setNumOfItemsLoaded,
                                                       itemsIsLoaded,
                                                       setItemsIsLoaded,
                                                       flasksState,
                                                       setFlasksState,
                                                   }) => {
    const monsters = myMonsters[levelState]
    let i = 0

    const itemsLoader = () => {
        if (itemsIsLoaded) return
        if (numOfItemsLoaded + 1 === flasks.length + myGear.length) {
            setItemsIsLoaded(true)
        }

        setNumOfItemsLoaded(prev => ++prev)
    }

    useEffect(() => {
        if (monstersState === 0 && isBattle) {
            setMonstersLoaded(() => 0)
            setTimeout(() => {
                setLevelComplete(true)
                setIsBattle(false)
            }, 0)
        }
    })

    const startGame = () => {

        refreshSound(volumeState, setHitSound, setDrinkSound, setBuySound, setTriggerSound, setHitSound)
        setLevelState(0)
        setLevelComplete(false)
    }

    const reload = () => {
        clearInterval(flasksState.armor.intervalId)
        clearInterval(flasksState.attack.intervalId)
        clearInterval(flasksState.gold.intervalId)
        clearInterval(flasksState.god.intervalId)
        clearInterval(flasksState.shadow.intervalId)
        refreshSound(volumeState, setHitSound, setDrinkSound, setBuySound, setTriggerSound, setHitSound)

        setItemsIsLoaded(false)
        setNumOfItemsLoaded(0)

        setLevelState(0)
        setMaxHpState(100)
        setHpState(100)
        setBonusGoldPlayer(0)
        setDamagePlayer(1)
        setGoldState(0)
        setArmorPlayer(0)
        setFlasksState(prev => ({
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
        }))
        setLevelState(0)
        setMonstersState(0)
        setIsBattle(false)
        setLevelComplete(false)
        setGameOver(false)
    }

    if (gameOver) {
        return (
            <MenuPage text={'О боже! Проиграть было не сложно...'}>
                <SoundPanel
                    atmosphere={atmosphere}
                    setAtmosphere={setAtmosphere}
                    atmosphereIsPlaying={atmosphereIsPlaying}
                    setAtmosphereIsPlaying={setAtmosphereIsPlaying}
                    drinkSound={drinkSound}
                    setDrinkSound={setDrinkSound}
                    buySound={buySound}
                    setBuySound={setBuySound}
                    hitSound={hitSound}
                    setHitSound={setHitSound}
                    triggerSound={triggerSound}
                    setTriggerSound={setTriggerSound}

                    volumeState={volumeState}
                    setVolumeState={setVolumeState}
                />

                <button className={styles.NextLVL} onClick={reload}>Начать заного!</button>
            </MenuPage>
        )
    }

    if (levelComplete === true && levelState + 1 === myMonsters.length) {
        return (

            <MenuPage text={'Поздравляю! Вы прошли эту жестокую игру'}>
                <SoundPanel
                    atmosphere={atmosphere}
                    setAtmosphere={setAtmosphere}
                    atmosphereIsPlaying={atmosphereIsPlaying}
                    setAtmosphereIsPlaying={setAtmosphereIsPlaying}
                    drinkSound={drinkSound}
                    setDrinkSound={setDrinkSound}
                    buySound={buySound}
                    setBuySound={setBuySound}
                    hitSound={hitSound}
                    setHitSound={setHitSound}
                    triggerSound={triggerSound}
                    setTriggerSound={setTriggerSound}

                    volumeState={volumeState}
                    setVolumeState={setVolumeState}
                />

                <button className={styles.NextLVL} onClick={reload}>Начать заного!</button>
            </MenuPage>
        )
    }

    if (monsters === undefined) {
        return (
            <MenuPage text={'Приветствую!'}>
                <SoundPanel
                    atmosphere={atmosphere}
                    setAtmosphere={setAtmosphere}
                    atmosphereIsPlaying={atmosphereIsPlaying}
                    setAtmosphereIsPlaying={setAtmosphereIsPlaying}
                    drinkSound={drinkSound}
                    setDrinkSound={setDrinkSound}
                    buySound={buySound}
                    setBuySound={setBuySound}
                    hitSound={hitSound}
                    setHitSound={setHitSound}
                    triggerSound={triggerSound}
                    setTriggerSound={setTriggerSound}

                    volumeState={volumeState}
                    setVolumeState={setVolumeState}
                />

                <button className={styles.NextLVL} onClick={startGame}>Начать игру</button>
            </MenuPage>
        )
    }

    const buyFlask = (e) => {
        const cost = +e.target.dataset.cost as number
        if (cost > goldState) return
        const type = e.target.dataset.flaskType

        setFlasksState(prevState => {
            if (buySound) {
                buySound.currentTime = 0
                buySound.play()
            }

            let newState = Object.assign({}, prevState)
            newState[type].value += 1
            return newState
        })

        setGoldState(prevState => {
            prevState -= cost
            return prevState
        })
    }

    const buyGear = (e) => {
        const cost = +e.target.dataset.cost as number
        if (cost > goldState) return
        const type = e.target.dataset.gearType as GearType
        const bonus = +e.target.dataset.bonus as number

        if (buySound) {
            buySound.currentTime = 0
            buySound.play()
        }

        switch (type) {
            case 'health':
                setMaxHpState(prev => prev += bonus)
                setGoldState(prev => prev -= cost)
                break
            case 'armor':
                setArmorPlayer(prev => prev += bonus)
                setGoldState(prev => prev -= cost)
                break
            case 'attack':
                setDamagePlayer(prev => prev += bonus)
                setGoldState(prev => prev -= cost)
                break
            case 'gold':
                setBonusGoldPlayer(prev => prev += bonus)
                setGoldState(prev => prev -= cost)
                break
            case 'armorAndAttack':
                setArmorPlayer(prev => prev += bonus)
                setDamagePlayer(prev => prev += bonus)
                setGoldState(prev => prev -= cost)
                break
            case 'nothing':
                setMaxHpState(prev => prev += 50 * bonus)
                setArmorPlayer(prev => prev += bonus)
                setDamagePlayer(prev => prev += bonus)
                setBonusGoldPlayer(prev => prev += bonus)
                setGoldState(prev => prev -= cost)
                break
            default:
                return
        }
    }

    const nextLVL = () => {
        setItemsIsLoaded(false)
        setNumOfItemsLoaded(0)
        setLevelComplete(false)
        setLevelState(prev => ++prev)
    }

    const useFlask = (e) => {
        if (!isBattle) return
        let num = e.target.dataset.num
        if (num === undefined) {
            num = e.target.parentNode.dataset.num
        }
        num = +num
        if (num === 0) return
        let type = e.target.dataset.flaskType as FlaskType
        if (type === undefined) type = e.target.parentNode.dataset.flaskType as FlaskType

        if (flasksState[type].active) return

        switch (type) {
            case 'health':
                setHpState(prev => {
                    if (prev === maxHpState) {
                        return maxHpState
                    }
                    if (drinkSound) {
                        drinkSound.currentTime = 0
                        drinkSound.play()
                    }
                    setFlasksState(prevState => {
                        let newState = Object.assign({}, prevState)
                        newState[type].value -= 1
                        return newState
                    })
                    let newHp = prev + 20
                    if (newHp > maxHpState) return maxHpState
                    return newHp
                })
                break
            case 'armor':
                if (drinkSound) {
                    drinkSound.currentTime = 0
                    drinkSound.play()
                }
                setFlasksState(prevState => {
                    let newState = Object.assign({}, prevState)
                    newState[type].value -= 1
                    newState[type].active = true
                    newState[type].intervalId = setTimeout(() => {
                        setArmorPlayer(prev => --prev)

                        setFlasksState(prev => {
                            let newState = Object.assign({}, prev)
                            newState[type].intervalId = null
                            newState[type].active = false
                            return newState
                        })
                    }, 10000)
                    return newState
                })
                setArmorPlayer(prev => ++prev)
                break
            case 'attack':
                if (drinkSound) {
                    drinkSound.currentTime = 0
                    drinkSound.play()
                }
                setFlasksState(prevState => {
                    let newState = Object.assign({}, prevState)
                    newState[type].value -= 1
                    newState[type].active = true
                    newState[type].intervalId = setTimeout(() => {
                        setDamagePlayer(prev => --prev)
                        setFlasksState(prev => {
                            let newState = Object.assign({}, prev)
                            newState[type].intervalId = null
                            newState[type].active = false
                            return newState
                        })
                    }, 10000)
                    return newState
                })
                setDamagePlayer(prev => ++prev)
                break
            case 'gold':
                if (drinkSound) {
                    drinkSound.currentTime = 0
                    drinkSound.play()
                }
                setFlasksState(prevState => {
                    let newState = Object.assign({}, prevState)
                    newState[type].value -= 1
                    newState[type].active = true
                    newState[type].intervalId = setTimeout(() => {
                        setBonusGoldPlayer(prev => prev -= 5)
                        setFlasksState(prev => {
                            let newState = Object.assign({}, prev)
                            newState[type].intervalId = null
                            newState[type].active = false
                            return newState
                        })
                    }, 10000)
                    return newState
                })
                setBonusGoldPlayer(prev => prev += 5)
                break
            case 'god':
                if (drinkSound) {
                    drinkSound.currentTime = 0
                    drinkSound.play()
                }
                setFlasksState(prevState => {
                    let newState = Object.assign({}, prevState)
                    newState[type].value -= 1
                    newState[type].active = true
                    newState[type].intervalId = setTimeout(() => {
                        setArmorPlayer(prev => prev -= 50)
                        setFlasksState(prev => {
                            let newState = Object.assign({}, prev)
                            newState[type].intervalId = null
                            newState[type].active = false
                            return newState
                        })
                    }, 10000)
                    return newState
                })
                setArmorPlayer(prev => prev += 50)
                break
            case 'shadow':
                if (drinkSound) {
                    drinkSound.currentTime = 0
                    drinkSound.play()
                }
                let random = Math.round(Math.random() * 2 + 1)
                setFlasksState(prevState => {
                    let newState = Object.assign({}, prevState)
                    newState[type].value -= 1
                    newState[type].active = true

                    if (random === 1) {
                        setBonusGoldPlayer(prev => prev += 20)
                        newState[type].intervalId = setTimeout(() => {
                            setBonusGoldPlayer(prev => prev -= 20)
                            setFlasksState(prev => {
                                let newState = Object.assign({}, prev)
                                newState[type].intervalId = null
                                newState[type].active = false
                                return newState
                            })
                        }, 10000)
                    }
                    if (random === 2) {
                        setDamagePlayer(prev => prev += 5)
                        newState[type].intervalId = setTimeout(() => {
                            setDamagePlayer(prev => prev -= 5)
                            setFlasksState(prev => {
                                let newState = Object.assign({}, prev)
                                newState[type].intervalId = null
                                newState[type].active = false
                                return newState
                            })
                        }, 10000)
                    }
                    if (random === 3) {
                        setDamagePlayer(prev => prev -= 2)
                        setArmorPlayer(prev => prev -= 2)
                        newState[type].intervalId = setTimeout(() => {
                            setDamagePlayer(prev => prev += 2)
                            setArmorPlayer(prev => prev += 2)
                            setFlasksState(prev => {
                                let newState = Object.assign({}, prev)
                                newState[type].intervalId = null
                                newState[type].active = false
                                return newState
                            })
                        }, 10000)
                    }
                    return newState
                })
                break
            default:
                return
        }
    }

    return (
        <div className={styles.BattleGround}>
            <div className={styles.LeftSideBar}>
                {/*ТЕКУЩИЙ УРОВЕНЬ*/}
                <div className={styles.LVLPanel}>
                    <span className={styles.LVLPanelText}>Уровень {levelState + 1}
                        <img src={'/skull.svg'} alt={''} className={styles.StatsImage}/>
                    </span>
                    <span style={{
                        backgroundColor: damagePlayer <= 0 ? 'rgba(255, 55, 35, .7)' : 'rgba(0,0,0,.1)',
                    }} className={styles.LVLPanelText}>Урон: {damagePlayer}
                        <img src={'/sword.svg'} alt={''} className={styles.StatsImage}/>
                    </span>
                    <span style={{
                        backgroundColor: armorPlayer <= -1 ? 'rgba(255, 55, 35, .7)' : 'rgba(0,0,0,.1)',
                    }} className={styles.LVLPanelText}>Броня: {armorPlayer}
                        <img src={'/shield.svg'} alt={''} className={styles.StatsImage}/>
                    </span>
                    <span style={{
                        backgroundColor: bonusGoldPlayer <= -1 ? 'rgba(255, 55, 35, .7)' : 'rgba(0,0,0,.1)',
                    }} className={styles.LVLPanelText}>Доп. золото: {bonusGoldPlayer}
                        <img src={'/coin-stats.svg'} alt={''} className={styles.StatsImage}/>
                    </span>
                </div>


                {/*ПОЛЕ БОЯ С МОНСТРОМ*/}
                <div className={styles.MonsterBar}>
                    {levelComplete
                        ? <StoreBar itemsIsLoaded={itemsIsLoaded}>
                            <Store>
                                <StoreFlasks>
                                    {flasks.map((flask, key) => {
                                        return (
                                            <div onLoad={itemsLoader} key={key} className={styles.StoreItem}>
                                                <img src={flask.src} alt=""/>

                                                <span>{flask.title}</span>
                                                <span>{flask.info}</span>

                                                <button
                                                    data-flask-type={flask.type}
                                                    data-cost={flask.price}
                                                    onClick={buyFlask}
                                                >
                                                    купить {flask.price}
                                                    <img className={styles.GoldIcon}
                                                         data-flask-type={flask.type}
                                                         data-cost={flask.price}
                                                         src={'/coin.svg'}
                                                         alt={''}/>
                                                </button>
                                            </div>
                                        )
                                    })}
                                </StoreFlasks>
                                <StoreFlasks>
                                    {myGear.map((gear, key) => {
                                        return (
                                            <div onLoad={itemsLoader} key={key} className={styles.StoreItem}>
                                                <img src={gear.src} alt=""/>

                                                <span>{gear.title}</span>
                                                <span>{gear.info}</span>

                                                <button
                                                    onClick={buyGear}
                                                    data-gear-type={gear.type}
                                                    data-bonus={gear.bonus}
                                                    data-cost={gear.price}
                                                >купить {gear.price}
                                                    <img className={styles.GoldIcon}
                                                         data-gear-type={gear.type}
                                                         data-bonus={gear.bonus}
                                                         data-cost={gear.price}
                                                         src={'/coin.svg'}
                                                         alt={''}/>
                                                </button>
                                            </div>
                                        )
                                    })}
                                </StoreFlasks>
                            </Store>
                            <button onClick={nextLVL} className={styles.NextLVL}>Следующий уровень</button>
                        </StoreBar>
                        : monsters.map(monster => {
                            return <Monster
                                hitSound={hitSound}
                                setHitSound={setHitSound}
                                triggerSound={triggerSound}
                                setTriggerSound={setTriggerSound}

                                volumeState={volumeState}
                                setVolumeState={setVolumeState}

                                gameOver={gameOver}
                                setGameOver={setGameOver}

                                isBattle={isBattle}
                                setIsBattle={setIsBattle}

                                monstersState={monstersState}
                                setMonstersState={setMonstersState}
                                monstersLoaded={monstersLoaded}
                                setMonstersLoaded={setMonstersLoaded}
                                maxMonstersState={monsters.length}

                                hpState={hpState}
                                setHpState={setHpState}
                                monsterDamageTimeout={monster.monsterDamageTimeout}

                                armorPlayer={armorPlayer}
                                setArmorPlayer={setArmorPlayer}

                                bonusGoldPlayer={bonusGoldPlayer}
                                setBonusGoldPlayer={setBonusGoldPlayer}

                                levelComplete={levelComplete}
                                setLevelComplete={setLevelComplete}

                                damagePlayer={damagePlayer}
                                setDamagePlayer={setDamagePlayer}

                                monsterHP={monster.monsterHP}
                                monsterDmg={monster.monsterDmg}

                                setGoldState={setGoldState}

                                trigger={monster.trigger}
                                monsterCallBack={monster.callback}
                                coinsForClick={monster.coinsForClick}
                                key={monster.monsterId}
                                src={monster.src}
                                position={monster.position}/>
                        })}
                </div>


                {/*ПАНЕЛЬ ЗДОРОВЬЯ*/}
                <div className={styles.HPBar}>
                    <span className={styles.HPBarText}>Здоровье {hpState}/{maxHpState}</span>
                    <div style={{
                        width: 100 * hpState / maxHpState + '%',
                    }} className={styles.ActiveBackground}>

                    </div>
                </div>

                {/*СКОЛЬКО СЕЙЧАС АКТИВНОГО ЗОЛОТА*/}
                <div className={styles.GoldBar}>
                    <span className={styles.GoldBarText}>Золото: {goldState}</span>
                    <img className={styles.GoldIcon}
                         src={'/coin.svg'}
                         alt={''}/>
                </div>

                {/*МОИ ПРЕДМЕТЫ*/}
                <div className={styles.ItemBar}>
                    <div className={styles.ItemBarTop}>
                        <div className={styles.FlaskBox}>
                            <div onClick={useFlask} data-num={flasksState.health.value} data-flask-type={'health'}
                                 className={styles.FlaskClick}>
                                <span className={styles.NumberOfFlasks}>{flasksState.health.value}</span>
                                <img className={styles.FlaskImage} src="/flask2.svg" alt=""/>
                                <span className={styles.FlaskText}>Зелье здоровья</span>
                            </div>
                        </div>

                        <div className={styles.FlaskBox}>
                            <div onClick={useFlask} data-num={flasksState.armor.value} data-flask-type={'armor'}
                                 className={styles.FlaskClick}>
                                <span className={styles.NumberOfFlasks}>{flasksState.armor.value}</span>
                                <img className={styles.FlaskImage} src="/flask3.svg" alt=""/>
                                <span className={styles.FlaskText}>Зелье брони</span>
                            </div>
                        </div>

                        <div className={styles.FlaskBox}>
                            <div onClick={useFlask} data-num={flasksState.attack.value} data-flask-type={'attack'}
                                 className={styles.FlaskClick}>
                                <span className={styles.NumberOfFlasks}>{flasksState.attack.value}</span>
                                <img className={styles.FlaskImage} src="/flask1.svg" alt=""/>
                                <span className={styles.FlaskText}>Зелье атаки</span>
                            </div>
                        </div>
                    </div>


                    <div className={styles.ItemBarTop}>
                        <div className={styles.FlaskBox}>
                            <div onClick={useFlask} data-num={flasksState.gold.value} data-flask-type={'gold'}
                                 className={styles.FlaskClick}>
                                <span className={styles.NumberOfFlasks}>{flasksState.gold.value}</span>
                                <img className={styles.FlaskImage} src="/flask1.svg" alt=""/>
                                <span data-use={'gold'} className={styles.FlaskText}>Зелье золота</span>
                            </div>
                        </div>

                        <div className={styles.FlaskBox}>
                            <div onClick={useFlask} data-num={flasksState.god.value} data-flask-type={'god'}
                                 className={styles.FlaskClick}>
                                <span className={styles.NumberOfFlasks}>{flasksState.god.value}</span>
                                <img className={styles.FlaskImage} src="/flask1.svg" alt=""/>
                                <span className={styles.FlaskText}>Зелье бога</span>
                            </div>
                        </div>

                        <div className={styles.FlaskBox}>
                            <div onClick={useFlask} data-num={flasksState.shadow.value} data-flask-type={'shadow'}
                                 className={styles.FlaskClick}>
                                <span className={styles.NumberOfFlasks}>{flasksState.shadow.value}</span>
                                <img className={styles.FlaskImage} src="/flask1.svg" alt=""/>
                                <span className={styles.FlaskText}>Зелье пустоты</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BattleGround