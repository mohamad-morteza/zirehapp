type StoreLinkKey =
    | 'googlePlay'
    | 'cafeBazar'
    | 'webApp'
    | 'sibIrani'
    | 'sibApp'
    | 'iApps'

const DEFAULT_DOMAIN = 'localhost:9090'

const seoRobot: Record<string, any> = {
    'localhost:9090': 'index,follow',
    'yourdomain.com': 'index,follow',
}

const normalizeDomain = (url?: string): string => {
    if (!url) return DEFAULT_DOMAIN

    return url
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '')
}

export const useDomain = () => {
    const config = useRuntimeConfig()
    const currentDomain = normalizeDomain(config.public.appUrl)

    const robots  = seoRobot[currentDomain]

    const getStoreLink = (key: StoreLinkKey): string => {
        const links: Record<StoreLinkKey, string> = {
            googlePlay: config.public.googlePlay ?? '',
            cafeBazar: config.public.cafeBazar ?? '',
            webApp:
                currentDomain === DEFAULT_DOMAIN
                    ? config.public.webApp ?? ''
                    : `https://web.${currentDomain}`,
            sibIrani: config.public.sibIrani ?? '',
            sibApp: config.public.sibApp ?? '',
            iApps: config.public.iApps ?? '',
        }
        return links[key]
    }

    return {
        currentDomain,
        getStoreLink,
        robots
    }
}
