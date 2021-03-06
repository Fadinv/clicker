export type FlaskType = 'health' | 'armor' | 'attack' | 'gold' | 'god' | 'shadow'

export type flask = {
    flaskId: number
    price: number
    type: FlaskType
    src: string
    title: string
    info: string
}

export type flasks = flask[]

export const flasks: flasks = [
    {
        flaskId: 0,
        price: 10,
        type: 'health',
        src: '/flasks/health.svg',
        title: 'Зелье здоровья',
        info: '+20 здоровья',
    },
    {
        flaskId: 1,
        price: 20,
        type: 'armor',
        src: '/flasks/armor.svg',
        title: 'Зелье брони',
        info: '+1 броня / 10сек',
    },
    {
        flaskId: 2,
        price: 20,
        type: 'attack',
        src: '/flasks/attack.svg',
        title: 'Зелье атаки',
        info: '+1 урон / 10сек',
    },
    {
        flaskId: 3,
        price: 30,
        type: 'gold',
        src: '/flasks/gold.svg',
        title: 'Зелье золота',
        info: '+5 Доп.золота / 10сек',
    },
    {
        flaskId: 4,
        price: 100,
        type: 'god',
        src: '/flasks/god.svg',
        title: 'Зелье бога',
        info: '+50 брони / 10сек',
    },
    {
        flaskId: 5,
        price: 50,
        type: 'shadow',
        src: '/flasks/shadow.svg',
        title: 'Зелье пустоты',
        info: 'Не рискуй...',
    },
]