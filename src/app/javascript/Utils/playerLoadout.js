const STARTER_CAR_NAMES = [
    'Kybertruck',
    'Charger Power Bank',
    'Wreckslinger',
    'Gangover',
    'McLaren',
    '240 GTI',
    'Goodwing',
    'Howler Packard',
    'RC TraxShark',
    'Pusher Crowd',
    'Impactus',
    'Crushinator'
]

const RANDOM_BODY_MATCAPS = [
    'black',
    'metal',
    'blueGlass',
    'volcano',
    'amazon',
    'blacksea',
    'elevator'
]

function pickRandom(items)
{
    return items[Math.floor(Math.random() * items.length)]
}

export function createRandomStarterMatcaps()
{
    const sharedBodyMatcap = pickRandom(RANDOM_BODY_MATCAPS)

    return {
        chassis: sharedBodyMatcap,
        chassisbottom: sharedBodyMatcap,
        window: sharedBodyMatcap,
        windows: sharedBodyMatcap,
        spoiler: sharedBodyMatcap,
        roof: sharedBodyMatcap,
        brake: sharedBodyMatcap,
        mirrors: sharedBodyMatcap,
        foglights: sharedBodyMatcap,
        chassisstructure: sharedBodyMatcap,
        wheels: 'shadeMetal',
        tire: 'shadeBlack'
    }
}

export function createRandomStarterLoadout()
{
    return {
        carName: pickRandom(STARTER_CAR_NAMES),
        matcaps: createRandomStarterMatcaps()
    }
}
