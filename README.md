# Zireh Website

A modern corporate website built with **Nuxt 3** — showcasing the Zireh calorie counter and diet planning application. Designed as a portfolio-ready single-page application with full RTL/Farsi support.

## Features

- **Single-page showcase** — all routes redirect to the homepage
- **RTL & Farsi-first** — default language is Farsi with English switcher
- **Responsive design** — mobile-first with Tailwind CSS
- **SEO optimized** — meta tags, Open Graph, schema.org JSON-LD
- **Component-based architecture** — clean, reusable Vue components
- **Multi-site theming** — per-site colors and config via `websites/` directory

## Screenshots

> Want to see how the website looks? Check the [`screenshots/`](./screenshots) folder for desktop and mobile previews.

## Tech Stack

- [Nuxt 3](https://nuxt.com) — Vue framework
- [Tailwind CSS](https://tailwindcss.com) — utility-first CSS
- [nuxt-i18n-micro](https://github.com/mohamad-morteza/nuxt-i18n-micro) — internationalization
- [Nuxt Icons](https://github.com/gitfoxlab/nuxt-icons) — icon system
- [Nuxt Image](https://image.nuxtjs.org) — image optimization
- [Swiper](https://swiperjs.com) — carousel/slider
- [LightGallery](https://www.lightgalleryjs.com) — image gallery

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

```bash
git clone https://github.com/mohamad-morteza/zireh.git
cd zireh-website
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:9090](http://localhost:9090)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
zireh-website/
├── app.vue                    # Root app component
├── error.vue                  # Error page
├── nuxt.config.ts             # Nuxt configuration
├── tailwind.config.js         # Tailwind CSS config
├── eslint.config.mjs          # ESLint config
├── tsconfig.json              # TypeScript config
│
├── app/
│   └── router.options.js      # Custom router options
│
├── assets/
│   ├── css/
│   │   └── main.css           # Global styles, fonts, scrollbar
│   └── icons/                 # SVG icons (20 files)
│
├── components/
│   ├── AppHeader.vue          # Site header with navigation
│   ├── AppFooter.vue          # Site footer with store links
│   ├── HeaderMenuDrawer.vue   # Mobile menu drawer
│   ├── HeaderSliderSection.vue# Hero slider
│   ├── HeroesSection.vue      # Features carousel
│   ├── AchievementSection.vue # Stats/achievements display
│   ├── IntroAppSection.vue    # App download section
│   ├── IntroVideo.vue         # Intro video section
│   ├── FeatureAppSection.vue  # App features showcase
│   ├── PlansSection.vue       # Diet plans display
│   ├── StepsGetDietSection.vue# How-to-get-diet steps
│   ├── CalculateForm.vue      # Calorie calculator form
│   ├── AppLinkFormSection.vue # App link form
│   ├── LatestBlogsSection.vue # Latest blog posts
│   ├── VideoBlogSection.vue   # Video blog section
│   ├── GalleryWrapper.vue     # LightGallery wrapper
│   │
│   ├── blog/
│   │   ├── PopupBanner.vue    # Popup advertisement banner
│   │   ├── StickyBanner.vue   # Sticky bottom banner
│   │   └── TopStickyBanner.vue# Top sticky banner
│   │
│   └── ui-kit/
│       ├── Carousel.vue       # Swiper carousel
│       ├── LightCarousel.vue  # Light image carousel
│       ├── PlayButton.vue     # Animated play button
│       ├── RadialProgress.vue # Radial progress indicator
│       ├── CounterInput.vue   # Numeric counter input
│       ├── CInput.vue         # Custom input component
│       ├── CButton.vue        # Custom button
│       ├── CModal.vue         # Custom modal
│       └── CDrawer.vue        # Custom drawer
│
├── composables/
│   ├── useAPI.ts              # API request composable
│   ├── useDomain.ts           # Domain/store links composable
│   └── useIsHome.ts           # Home page detection
│
├── layouts/
│   └── default.vue            # Default layout with banners
│
├── locales/                   # i18n translation files
│   ├── fa.json                # Farsi translations
│   ├── en.json                # English translations
│   ├── ar.json                # Arabic translations
│   └── pages/index/           # Page-specific translations
│
├── middleware/
│   └── 02.redirect-trailing-slash.global.js
│
├── pages/
│   └── index.vue              # Homepage (only page)
│
├── plugins/
│   └── api.js                 # API plugin with auth headers
│
├── public/                    # Static assets
│   ├── favicon-zireh.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── fonts/                 # YekanBakh font
│   ├── img/                   # Images (logo, cover, gender)
│   ├── stores/                # Store badge images
│   └── video/                 # Video files
│
├── server/
│   └── assets/_locales/       # Server-side locale files
│
├── types/                     # TypeScript type definitions
│
├── utils/
│   ├── utils.js               # Utility functions
│   ├── enum.js                # Enumerations
│   └── imageHelper.js         # Image helper utilities
│
└── websites/                  # Per-site configuration
    ├── zireh/
    │   ├── .env               # Environment variables
    │   ├── .env.example       # Env template
    │   ├── colors.js          # Theme colors
    │   └── images/logo.png    # Site logo
    └── english/
        ├── .env
        ├── colors.js
        └── images/logo.png
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp websites/zireh/.env.example websites/zireh/.env
```

| Variable | Description |
|----------|-------------|
| `BASE_URL` | Backend API URL |
| `DOMAIN` | Site domain |
| `I18N_LOCALE` | Default locale (`fa`) |
| `NUXT_PUBLIC_GOOGLE_PLAY` | Google Play store link |
| `NUXT_PUBLIC_CAFE_BAZAR` | Cafe Bazaar store link |
| `NUXT_PUBLIC_WEB_APP` | Web app URL |
| `NUXT_PUBLIC_SIB_IRANI` | SibIrani store link |
| `NUXT_PUBLIC_SIB_APP` | SibApp store link |
| `NUXT_PUBLIC_IAPPS` | iApps store link |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 9090 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |

## License

Private — for portfolio demonstration purposes only.
