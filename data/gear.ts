export type GearTitle = 'Черное зеркало' | 'Шапка Санты' | 'Меч' | 'Кольцо' | 'Плащ' | 'Футбольчик?'

export type GearType = 'health' | 'armor' | 'attack' | 'gold' | 'armorAndAttack' | 'nothing'

export type gear = {
    src: string
    type: GearType
    bonus: number
    price: number
    title: GearTitle
}

export type myGear = gear[]

export const myGear: myGear = [
    {
        src: '/gear/hand-mirror.svg',
        type: 'health',
        bonus: 50,
        price: 200,
        title: 'Черное зеркало',
    },
    {
        src: '/gear/santa-hat.svg',
        type: 'armor',
        bonus: 1,
        price: 250,
        title: 'Шапка Санты',
    },
    {
        src: '/gear/fighting-game.svg',
        type: 'attack',
        bonus: 1,
        price: 250,
        title: 'Меч',
    },
    {
        src: '/gear/ring.svg',
        type: 'gold',
        bonus: 5,
        price: 500,
        title: 'Кольцо',
    },
    {
        src: '/gear/cloak.svg',
        type: 'armorAndAttack',
        bonus: 1,
        price: 400,
        title: 'Плащ',
    },
    {
        src: '/gear/football-boots.svg',
        type: 'nothing',
        bonus: 1,
        price: 500,
        title: 'Футбольчик?',
    },
]