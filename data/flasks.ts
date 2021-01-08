export type FlaskType = 'health' | 'armor' | 'attack' | 'gold' | 'god' | 'shadow'

export type flask = {
    flaskId: number
    price: number
    type: FlaskType
    src: string
    title: string
}

export type flasks = flask[]

export const flasks: flasks = [
    {
        flaskId: 0,
        price: 10,
        type: 'health',
        src: '/flask1.svg',
        title: 'Зелье здоровья',
    },
    {
        flaskId: 1,
        price: 20,
        type: 'armor',
        src: '/flask1.svg',
        title: 'Зелье брони',
    },
    {
        flaskId: 2,
        price: 20,
        type: 'attack',
        src: '/flask1.svg',
        title: 'Зелье атаки',
    },
    {
        flaskId: 3,
        price: 30,
        type: 'gold',
        src: '/flask1.svg',
        title: 'Зелье золота',
    },
    {
        flaskId: 4,
        price: 100,
        type: 'god',
        src: '/flask1.svg',
        title: 'Зелье бога',
    },
    {
        flaskId: 5,
        price: 50,
        type: 'shadow',
        src: '/flask1.svg',
        title: 'Зелье пустоты',
    },
]