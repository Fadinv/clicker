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
        src: '/flask1.svg',
        title: 'Зелье здоровья',
        info: '+20 здоровья',
    },
    {
        flaskId: 1,
        price: 20,
        type: 'armor',
        src: '/flask1.svg',
        title: 'Зелье брони',
        info: '+1 броня / 10сек',
    },
    {
        flaskId: 2,
        price: 20,
        type: 'attack',
        src: '/flask1.svg',
        title: 'Зелье атаки',
        info: '+1 урон / 10сек',
    },
    {
        flaskId: 3,
        price: 30,
        type: 'gold',
        src: '/flask1.svg',
        title: 'Зелье золота',
        info: '+5 Доп.золота / 10сек',
    },
    {
        flaskId: 4,
        price: 100,
        type: 'god',
        src: '/flask1.svg',
        title: 'Зелье бога',
        info: '+50 брони / 10сек',
    },
    {
        flaskId: 5,
        price: 50,
        type: 'shadow',
        src: '/flask1.svg',
        title: 'Зелье пустоты',
        info: 'Не рискуй...',
    },
]