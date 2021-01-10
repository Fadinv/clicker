export type GearTitle = 'Черное зеркало' | 'Шапка Санты' | 'Меч' | 'Кольцо' | 'Плащ' | 'Футбольчик?'

export type GearType = 'health' | 'armor' | 'attack' | 'gold' | 'armorAndAttack' | 'nothing'

export type gear = {
    src: string
    type: GearType
    bonus: number
    price: number
    title: GearTitle
    info: string
}

export type myGear = gear[]

export const myGear: myGear = [
    {
        src: '/gear/hand-mirror.svg',
        type: 'health',
        bonus: 50,
        price: 200,
        title: 'Черное зеркало',
        info: '+50 к макс. здровоью'
    },
    {
        src: '/gear/santa-hat.svg',
        type: 'armor',
        bonus: 1,
        price: 250,
        title: 'Шапка Санты',
        info: '+1 к броне'
    },
    {
        src: '/gear/fighting-game.svg',
        type: 'attack',
        bonus: 1,
        price: 250,
        title: 'Меч',
        info: '+1 к урону'
    },
    {
        src: '/gear/ring.svg',
        type: 'gold',
        bonus: 5,
        price: 500,
        title: 'Кольцо',
        info: '+5 к доп. золоту'
    },
    {
        src: '/gear/cloak.svg',
        type: 'armorAndAttack',
        bonus: 1,
        price: 400,
        title: 'Плащ',
        info: '+1 к броне и атаке'
    },
    {
        src: '/gear/football-boots.svg',
        type: 'nothing',
        bonus: 1,
        price: 500,
        title: 'Футбольчик?',
        info: '+1 к броне, атаке и доп. золоту'
    },
]