import React, {Dispatch, SetStateAction, useEffect} from 'react'
import styles from './BattleGround.module.sass'
import {myMonsters} from '../../data/monsters'
import Monster from '../Monster/Monster'
import {flasks, FlaskType} from '../../data/flasks'
import {GearType, myGear} from '../../data/gear'
import {FlaskProps} from '../../pages'
import SoundPanel from '../SoundPanel/SoundPanel'

interface BattleGroundProps {
    atmosphere: HTMLAudioElement
    setAtmosphere: Dispatch<SetStateAction<HTMLAudioElement>>
    atmosphereIsPlaying: boolean
    setAtmosphereIsPlaying: Dispatch<SetStateAction<boolean>>

    volumeState: number
    setVolumeState: Dispatch<SetStateAction<number>>

    monstersState: number
    setMonstersState: Dispatch<SetStateAction<number>>

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

    flasksState: FlaskProps
    setFlasksState: Dispatch<SetStateAction<FlaskProps>>
}

const BattleGround: React.FC<BattleGroundProps> = ({
                                                       atmosphere,
                                                       setAtmosphere,
                                                       atmosphereIsPlaying,
                                                       setAtmosphereIsPlaying,

                                                       volumeState,
                                                       setVolumeState,

                                                       monstersState,
                                                       setMonstersState,

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

                                                       flasksState,
                                                       setFlasksState,
                                                   }) => {
    const monster = myMonsters[levelState]

    useEffect(() => {
        if (monstersState === 0 && isBattle) {
            setTimeout(() => {
                setLevelComplete(true)
                setIsBattle(false)
            }, 300)
        }
    })

    const drinkSound = (): void => {
        const drink = new Audio('/audio/samples-flask.mp3')
        drink.volume = volumeState / 10000
        drink.autoplay = true
    }

    const startGame = () => {
        setLevelState(0)
        setLevelComplete(false)
    }

    const reload = () => {
        clearInterval(flasksState.armor.intervalId)
        clearInterval(flasksState.attack.intervalId)
        clearInterval(flasksState.gold.intervalId)
        clearInterval(flasksState.god.intervalId)
        clearInterval(flasksState.shadow.intervalId)

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
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                color: '#f5cb5c',
            }}>
                <div style={{
                    marginBottom: '1em',
                }}>О боже! Проиграть было не сложно
                </div>
                <button className={styles.NextLVL} onClick={reload}>Начать заного!</button>
            </div>
        )
    }

    if (levelComplete === true && levelState + 1 === myMonsters.length) {
        return (

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                color: '#f5cb5c',
            }}>
                <div style={{
                    marginBottom: '1em',
                    textAlign: 'center',
                    width: '100%',
                }}>Поздравляю! Вы прошли эту жестокую игру
                </div>
                <SoundPanel
                    atmosphere={atmosphere}
                    setAtmosphere={setAtmosphere}
                    atmosphereIsPlaying={atmosphereIsPlaying}
                    setAtmosphereIsPlaying={setAtmosphereIsPlaying}

                    volumeState={volumeState}
                    setVolumeState={setVolumeState}
                />


                <button className={styles.NextLVL} onClick={reload}>Начать заного!</button>
            </div>
        )
    }

    if (monster === undefined) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                color: '#f5cb5c',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    marginBottom: '1em',
                    textAlign: 'center',
                    width: '100%',
                }}>Приветствую!
                </div>

                <SoundPanel
                    atmosphere={atmosphere}
                    setAtmosphere={setAtmosphere}
                    atmosphereIsPlaying={atmosphereIsPlaying}
                    setAtmosphereIsPlaying={setAtmosphereIsPlaying}

                    volumeState={volumeState}
                    setVolumeState={setVolumeState}
                />
                <button className={styles.NextLVL} onClick={startGame}>Начать игру</button>
            </div>
        )
    }

    const buyFlask = (e) => {
        const cost = +e.target.dataset.cost as number
        if (cost > goldState) return
        const type = e.target.dataset.flaskType

        setFlasksState(prevState => {
            const sample = new Audio('/audio/samples-buy.mp3')
            sample.volume = volumeState / 10000
            sample.autoplay = true

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

        const sample = new Audio('/audio/samples-buy.mp3')
        sample.volume = volumeState / 10000
        sample.autoplay = true

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
                    drinkSound()
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
                drinkSound()
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
                drinkSound()
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
                drinkSound()
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
                drinkSound()
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
                drinkSound()
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
                                console.log(newState)
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
                    <span className={styles.LVLPanelText}>Уровень {levelState + 1}</span>
                    <span style={{
                        backgroundColor: damagePlayer <= 0 ? 'rgba(255, 55, 35, .7)' : 'rgba(0,0,0,.1)',
                    }} className={styles.LVLPanelText}>Урон: {damagePlayer}</span>
                    <span style={{
                        backgroundColor: armorPlayer <= -1 ? 'rgba(255, 55, 35, .7)' : 'rgba(0,0,0,.1)',
                    }} className={styles.LVLPanelText}>Броня: {armorPlayer}</span>
                    <span style={{
                        backgroundColor: bonusGoldPlayer <= -1 ? 'rgba(255, 55, 35, .7)' : 'rgba(0,0,0,.1)',
                    }} className={styles.LVLPanelText}>Доп. золото: {bonusGoldPlayer}</span>
                </div>


                {/*ПОЛЕ БОЯ С МОНСТРОМ*/}
                <div className={styles.MonsterBar}>
                    {levelComplete
                        ? <div className={styles.ScoreBar}>
                            <div className={styles.Store}>
                                {flasks.map((flask, key) => {
                                    return (
                                        <div key={key} className={styles.StoreItem}>
                                            <img src={flask.src} alt=""/>

                                            <span>{flask.title}</span>

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
                                {myGear.map((gear, key) => {
                                    return (
                                        <div key={key} className={styles.StoreItem}>
                                            <img src={gear.src} alt=""/>

                                            <span>{gear.title}</span>

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


                            </div>
                            <button onClick={nextLVL} className={styles.NextLVL}>Следующий уровень</button>
                        </div>
                        : monster.map((monster, key) => {
                            return <Monster
                                volumeState={volumeState}
                                setVolumeState={setVolumeState}

                                gameOver={gameOver}
                                setGameOver={setGameOver}

                                isBattle={isBattle}
                                setIsBattle={setIsBattle}

                                monstersState={monstersState}
                                setMonstersState={setMonstersState}

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