'use client'

import { useEffect } from 'react'

const NOISY_CONSOLE_PATTERNS = [
    'SES Removing unpermitted intrinsics',
    'Partitioned cookie or storage access was provided',
    'Feature Policy: Skipping unsupported feature name',
    'Cookie "x-locale" has been rejected because it has the "Partitioned" attribute',
    'Content-Security-Policy: Ignoring',
    'Ignoring unsupported entryTypes: longtask',
    '[LaunchDarkly] LaunchDarkly client initialized',
    'fonts.reown.com',
    'looks like it points into the shape?'
]

const NOISY_STACK_PATTERNS = [
    'lockdown-install.js',
    'secure.walletconnect.org',
    'auth.magic.link',
    'reown.com',
    'cannon.js'
]

function shouldSuppressConsoleMessage(args: unknown[])
{
    const joinedMessage = args
        .map((value) => {
            if (typeof value === 'string')
            {
                return value
            }

            if (value instanceof Error)
            {
                return `${value.message}\n${value.stack || ''}`
            }

            try
            {
                return JSON.stringify(value)
            }
            catch (_error)
            {
                return String(value)
            }
        })
        .join(' ')

    return [...NOISY_CONSOLE_PATTERNS, ...NOISY_STACK_PATTERNS].some((pattern) => joinedMessage.includes(pattern))
}

export default function ConsoleNoiseFilter()
{
    useEffect(() => {
        const originalConsole = {
            error: console.error,
            warn: console.warn,
            log: console.log,
            info: console.info
        }

        const wrapConsoleMethod = (methodName: keyof typeof originalConsole) => (...args: unknown[]) => {
            if (shouldSuppressConsoleMessage(args))
            {
                return
            }

            originalConsole[methodName](...args)
        }

        console.error = wrapConsoleMethod('error')
        console.warn = wrapConsoleMethod('warn')
        console.log = wrapConsoleMethod('log')
        console.info = wrapConsoleMethod('info')

        return () => {
            console.error = originalConsole.error
            console.warn = originalConsole.warn
            console.log = originalConsole.log
            console.info = originalConsole.info
        }
    }, [])

    return null
}
