export type Monster = {
    src: string
    position: {
        left: string
        top: string
    },
    coinsForClick: number
    monsterHP: number
    monsterDmg: number
    monsterDamageTimeout: number
    monsterId: number
    callback: <T>(...T) => void
    trigger: (...args) => ({
        timeoutId: NodeJS.Timeout | null
        clearTrigger: () => void
    }),
}

export const monster1: Monster[] = [
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% - 7.5vh)',
            top: '20%',
        },
        coinsForClick: 0,
        monsterHP: 10,
        monsterDmg: 1,
        monsterDamageTimeout: 1000,
        monsterId: 1,
        callback: (...arg) => {},
        trigger: (...args) => ({
            timeoutId: null,
            clearTrigger: () => {}
        }),
    },
]

export const monster2: Monster[] = [
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% - 7.5vh)',
            top: '20%',
        },
        coinsForClick: 0,
        monsterHP: 30,
        monsterDmg: 2,
        monsterDamageTimeout: 1000,
        monsterId: 2,
        callback: (...arg) => {
        },
        trigger: (...args) => ({
            timeoutId: null,
            clearTrigger: () => {}
        }),
    },
]

export const monster3: Monster[] = [
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% - 17vh)',
            top: '20%',
        },
        coinsForClick: 0,
        monsterHP: 30,
        monsterDmg: 2,
        monsterDamageTimeout: 1000,
        monsterId: 3,
        callback: (...arg) => {},
        trigger: (...args) => ({
            timeoutId: null,
            clearTrigger: () => {}
        }),
    },
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% + 2vh)',
            top: '20%',
        },
        coinsForClick: 0,
        monsterHP: 30,
        monsterDmg: 2,
        monsterDamageTimeout: 1000,
        monsterId: 4,
        callback: (...arg) => {},
        trigger: (...args) => ({
            timeoutId: null,
            clearTrigger: () => {}
        }),
    },
]

export const monster4: Monster[] = [
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% - 7.5vh)',
            top: '10%',
        },
        coinsForClick: 0,
        monsterHP: 25,
        monsterDmg: 6,
        monsterDamageTimeout: 1000,
        monsterId: 5,
        callback: (setCallBackIsUsed, monsterHPState, setMonsterHPState, setHpState, setDamageState, setArmorPlayer, setGoldState, setBonusGoldPlayer, monstersState) => {
            if (monsterHPState <= 4) {
                setCallBackIsUsed(true)
                setMonsterHPState(15)
                setGoldState(prev => prev += 10)
            }
        },
        trigger: (
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
        ) => {
            if (monsterHPState <= 8) {
                setTriggerIsUsed(true)
                setIsTriggering(true)
                setDamagePlayer(prev => --prev)
                let timeoutId = setTimeout(() => {
                    setDamagePlayer(prev => ++prev)
                    setIsTriggering(false)
                }, 5000)
                return {
                    timeoutId: timeoutId,
                    clearTrigger: () => {
                        setTimeout(() => {
                            setDamagePlayer(prev => ++prev)
                            setIsTriggering(false)
                        }, 0)
                    },
                }
            }
            return {
                timeoutId: null,
                clearTrigger: () => {}
            }
        },
    },
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% + 7.5vh)',
            top: '50%',
        },
        coinsForClick: 0,
        monsterHP: 15,
        monsterDmg: 1,
        monsterDamageTimeout: 1000,
        monsterId: 6,
        callback: (setCallBackIsUsed, monsterHPState, setMonsterHPState, setHpState, setDamageState, setArmorPlayer, setGoldState, setBonusGoldPlayer, monstersState) => {
            if (monsterHPState <= 8) {
                setCallBackIsUsed(true)
                setMonsterHPState(30)
                setGoldState(prev => prev += 10)
            }
        },
        trigger: (...args) => ({
            timeoutId: null,
            clearTrigger: () => {}
        }),
    },
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% - 22.5vh)',
            top: '50%',
        },
        coinsForClick: 0,
        monsterHP: 15,
        monsterDmg: 1,
        monsterDamageTimeout: 1000,
        monsterId: 7,
        callback: (setCallBackIsUsed, monsterHPState, setMonsterHPState, setHpState, setDamageState, setArmorPlayer, setGoldState, setBonusGoldPlayer, monstersState) => {
            if (monsterHPState <= 8) {
                setCallBackIsUsed(true)
                setMonsterHPState(30)
                setGoldState(prev => prev += 50)
            }
        },
        trigger: (...args) => ({
            timeoutId: null,
            clearTrigger: () => {}
        }),
    },
]

export const monster5: Monster[] = [
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% - 7.5vh)',
            top: '20%',
        },
        coinsForClick: 1,
        monsterHP: 120,
        monsterDmg: 8,
        monsterDamageTimeout: 1000,
        monsterId: 8,
        callback: (...arg) => {},
        trigger: (
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
        ) => {
            if (monsterHPState <= 60) {
                setTriggerIsUsed(true)
                setIsTriggering(true)
                setArmorPlayer(prev => prev -= 3)
                let timeoutId = setTimeout(() => {
                    setArmorPlayer(prev => prev += 3)
                    setIsTriggering(false)
                }, 5000)
                return ({
                    timeoutId: timeoutId,
                    clearTrigger: () => {
                        setTimeout(() => {
                            setArmorPlayer(prev => prev += 3)
                            setIsTriggering(false)
                        }, 0)
                    }
                })
            }
            return ({
                timeoutId: null,
                clearTrigger: () => {}
            })
        },
    },
]

export const monster6: Monster[] = [
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% - 22.5vh)',
            top: '20%',
        },
        coinsForClick: -1,
        monsterHP: 120,
        monsterDmg: 10,
        monsterDamageTimeout: 1000,
        monsterId: 9,
        callback: (setCallBackIsUsed, monsterHPState, setMonsterHPState, setHpState, setDamageState, setArmorPlayer, setGoldState, setBonusGoldPlayer, monstersState) => {
            if (monstersState < 2) {
                setCallBackIsUsed(true)
                return
            }
            if (monstersState >= 2) {
                setMonsterHPState(120)
            }
        },
        trigger: (...args) => ({
            timeoutId: null,
            clearTrigger: () => {}
        }),
    },
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% + 7.5vh)',
            top: '20%',
        },
        coinsForClick: 1,
        monsterHP: 120,
        monsterDmg: 5,
        monsterDamageTimeout: 1000,
        monsterId: 10,
        callback: (...arg) => {},
        trigger: (...args) => ({
            timeoutId: null,
            clearTrigger: () => {}
        }),
    },
]

export const monster7: Monster[] = [
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% - 7.5vh)',
            top: '10%',
        },
        coinsForClick: 0,
        monsterHP: 150,
        monsterDmg: 8,
        monsterDamageTimeout: 1000,
        monsterId: 11,
        callback: (setCallBackIsUsed, monsterHPState, setMonsterHPState, setHpState, setDamageState, setArmorPlayer, setGoldState, setBonusGoldPlayer, monstersState) => {
            if (monsterHPState <= 10) {
                setCallBackIsUsed(true)
                setMonsterHPState(60)
                setGoldState(prev => prev += 100)
            }
        },
        trigger: (
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
        ) => {
            if (monsterHPState <= 10) {
                setTriggerIsUsed(true)
                setIsTriggering(true)
                setDamagePlayer(prev => prev -= 5)
                let timeoutId = setTimeout(() => {
                    setDamagePlayer(prev => prev += 5)
                    setIsTriggering(false)
                }, 3000)
                return {
                    timeoutId: timeoutId,
                    clearTrigger: () => {
                        setTimeout(() => {
                            setDamagePlayer(prev => prev += 5)
                            setIsTriggering(false)
                        }, 0)
                    },
                }
            }
            return {
                timeoutId: null,
                clearTrigger: () => {}
            }
        },
    },
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% + 7.5vh)',
            top: '50%',
        },
        coinsForClick: 0,
        monsterHP: 100,
        monsterDmg: 5,
        monsterDamageTimeout: 1000,
        monsterId: 12,
        callback: (setCallBackIsUsed, monsterHPState, setMonsterHPState, setHpState, setDamageState, setArmorPlayer, setGoldState, setBonusGoldPlayer, monstersState) => {
            if (monsterHPState <= 10) {
                setCallBackIsUsed(true)
                setMonsterHPState(60)
                setGoldState(prev => prev += 100)
            }
        },
        trigger: (...args) => ({
            timeoutId: null,
            clearTrigger: () => {}
        }),
    },
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% - 22.5vh)',
            top: '50%',
        },
        coinsForClick: 0,
        monsterHP: 100,
        monsterDmg: 5,
        monsterDamageTimeout: 1000,
        monsterId: 13,
        callback: (setCallBackIsUsed, monsterHPState, setMonsterHPState, setHpState, setDamageState, setArmorPlayer, setGoldState, setBonusGoldPlayer, monstersState) => {
            if (monsterHPState <= 10) {
                setCallBackIsUsed(true)
                setMonsterHPState(60)
                setGoldState(prev => prev += 100)
            }
        },
        trigger: (...args) => ({
            timeoutId: null,
            clearTrigger: () => {}
        }),
    },
]

export const monster8: Monster[] = [
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% - 7.5vh)',
            top: '10%',
        },
        coinsForClick: 0,
        monsterHP: 400,
        monsterDmg: 15,
        monsterDamageTimeout: 1000,
        monsterId: 14,
        callback: (setCallBackIsUsed, monsterHPState, setMonsterHPState, setHpState, setDamageState, setArmorPlayer, setGoldState, setBonusGoldPlayer, monstersState) => {
            if (monsterHPState <= 20) {
                setCallBackIsUsed(true)
                setMonsterHPState(400)
                setGoldState(prev => prev += 100)
            }
        },
        trigger: (
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
        ) => {
            if (monsterHPState <= 100) {
                setTriggerIsUsed(true)
                setIsTriggering(true)
                setDamagePlayer(prev => prev -= 7)
                let timeoutId = setTimeout(() => {
                    setDamagePlayer(prev => prev += 7)
                    setIsTriggering(false)
                }, 3000)
                return {
                    timeoutId: timeoutId,
                    clearTrigger: () => {
                        setTimeout(() => {
                            setDamagePlayer(prev => prev += 7)
                            setIsTriggering(false)
                        }, 0)
                    },
                }
            }
            return {
                timeoutId: null,
                clearTrigger: () => {}
            }
        },
    },
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% + 7.5vh)',
            top: '50%',
        },
        coinsForClick: 0,
        monsterHP: 200,
        monsterDmg: 7,
        monsterDamageTimeout: 1000,
        monsterId: 15,
        callback: (setCallBackIsUsed, monsterHPState, setMonsterHPState, setHpState, setDamageState, setArmorPlayer, setGoldState, setBonusGoldPlayer, monstersState) => {
            if (monsterHPState <= 20) {
                setCallBackIsUsed(true)
                setMonsterHPState(200)
                setGoldState(prev => prev += 100)
            }
        },
        trigger: (
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
        ) => {
            if (monsterHPState <= 50) {
                setTriggerIsUsed(true)
                setIsTriggering(true)
                setArmorPlayer(prev => prev -= 5)
                let timeoutId = setTimeout(() => {
                    setArmorPlayer(prev => prev += 5)
                    setIsTriggering(false)
                }, 5000)
                return {
                    timeoutId: timeoutId,
                    clearTrigger: () => {
                        setTimeout(() => {
                            setArmorPlayer(prev => prev += 5)
                            setIsTriggering(false)
                        }, 0)
                    },
                }
            }
            return {
                timeoutId: null,
                clearTrigger: () => {}
            }
        },
    },
    {
        src: 'monster1.svg',
        position: {
            left: 'calc(50% - 22.5vh)',
            top: '50%',
        },
        coinsForClick: 0,
        monsterHP: 200,
        monsterDmg: 7,
        monsterDamageTimeout: 1000,
        monsterId: 17,
        callback: (setCallBackIsUsed, monsterHPState, setMonsterHPState, setHpState, setDamageState, setArmorPlayer, setGoldState, setBonusGoldPlayer, monstersState) => {
            if (monsterHPState <= 20) {
                setCallBackIsUsed(true)
                setMonsterHPState(200)
                setGoldState(prev => prev += 100)
            }
        },
        trigger: (
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
        ) => {
            if (monsterHPState <= 50) {
                setTriggerIsUsed(true)
                setIsTriggering(true)
                setArmorPlayer(prev => prev -= 5)
                let timeoutId = setTimeout(() => {
                    setArmorPlayer(prev => prev += 5)
                    setIsTriggering(false)
                }, 5000)
                return {
                    timeoutId: timeoutId,
                    clearTrigger: () => {
                        setTimeout(() => {
                            setArmorPlayer(prev => prev += 5)
                            setIsTriggering(false)
                        }, 0)
                    },
                }
            }
            return {
                timeoutId: null,
                clearTrigger: () => {}
            }
        },
    },
]

export const myMonsters: Monster[][] = [monster1, monster2, monster3, monster4, monster5, monster6, monster7, monster8]