const STORAGE_KEY = 'playerIdentity'

function randomHex(length)
{
    const bytes = new Uint8Array(Math.ceil(length / 2))
    window.crypto.getRandomValues(bytes)
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, length)
}

export function createFakeEthereumAddress()
{
    return `0x${randomHex(40)}`
}

export function getPlayerDisplayName(playerId)
{
    if(!playerId || typeof playerId !== 'string')
    {
        return 'Unknown'
    }

    return `${playerId.slice(0, 4)}...${playerId.slice(-4)}`
}

export function getOrCreatePlayerIdentity()
{
    if(typeof window === 'undefined')
    {
        return null
    }

    try
    {
        const storedIdentity = window.localStorage.getItem(STORAGE_KEY)
        if(storedIdentity)
        {
            const parsedIdentity = JSON.parse(storedIdentity)

            if(parsedIdentity?.playerId)
            {
                const identity = {
                    playerId: parsedIdentity.playerId,
                    username: getPlayerDisplayName(parsedIdentity.playerId)
                }

                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(identity))
                return identity
            }
        }
    }
    catch(error)
    {
        console.error('Failed to read stored player identity', error)
    }

    const playerId = createFakeEthereumAddress()
    const identity = {
        playerId,
        username: getPlayerDisplayName(playerId)
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(identity))
    return identity
}
