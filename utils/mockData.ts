export const mockData: Record<string, any> = {
  'BlogBanner/get-by-type': {
    Data: {
      Slider: [
        {
          PlaceType: 1,
          Title: 'رژیم غذایی سالم با زیره',
          URL: '/',
          Image: '/img/cover.svg',
          TagId: 'slide-1',
          MobileImage: '/img/female.svg',
        },
        {
          PlaceType: 1,
          Title: 'کاهش وزن اصولی و پایدار',
          URL: '/',
          Image: '/img/male.svg',
          TagId: 'slide-2',
          MobileImage: '/img/male.svg',
        },
        {
          PlaceType: 1,
          Title: 'بدون رژیم سخت، لاغر شو!',
          URL: '/',
          Image: '/img/female.svg',
          TagId: 'slide-3',
          MobileImage: '/img/female.svg',
        },
      ],
      TopStickyBanners: [],
      Popup: [],
      StickyBanners: [],
    },
  },

  '/hero/getlist': {
    Data: [
      {
        Video: { Url: '/video/intro.mp4' },
        Name: 'سارا',
        Cover: { Url: '/img/female.svg' },
        UserId: 1,
        RecordWeight: 8,
        BeforeWeight: 75,
        AfterWeight: 67,
      },
      {
        Video: { Url: '/video/intro.mp4' },
        Name: 'محمد',
        Cover: { Url: '/img/male.svg' },
        UserId: 2,
        RecordWeight: 12,
        BeforeWeight: 90,
        AfterWeight: 78,
      },
      {
        Video: { Url: '/video/intro.mp4' },
        Name: 'زهرا',
        Cover: { Url: '/img/female.svg' },
        UserId: 3,
        RecordWeight: 6,
        BeforeWeight: 68,
        AfterWeight: 62,
      },
      {
        Video: { Url: '/video/intro.mp4' },
        Name: 'علی',
        Cover: { Url: '/img/male.svg' },
        UserId: 4,
        RecordWeight: 15,
        BeforeWeight: 95,
        AfterWeight: 80,
      },
      {
        Video: { Url: '/video/intro.mp4' },
        Name: 'مریم',
        Cover: { Url: '/img/female.svg' },
        UserId: 5,
        RecordWeight: 10,
        BeforeWeight: 72,
        AfterWeight: 62,
      },
      {
        Video: { Url: '/video/intro.mp4' },
        Name: 'رضا',
        Cover: { Url: '/img/male.svg' },
        UserId: 6,
        RecordWeight: 18,
        BeforeWeight: 102,
        AfterWeight: 84,
      },
    ],
  },

  '/hero/get-newest': {
    Data: {
      Name: 'سارا احمدی',
      LandingCover: { Url: '/img/female.svg' },
    },
  },

  '/public/ZirehSoFar': {
    Data: {
      AppInstallCount: 1700000,
      WeightLossSum: 45000,
      WomenCount: 980000,
      MenCount: 720000,
    },
  },

  '/content/get-by-type': {
    Data: [
      {
        ContentDetails: [
          {
            Title: 'شمارش کالری دقیق',
            Description: 'با زیره می‌توانید کالری غذاهای خود را به صورت دقیق محاسبه کنید و برنامه غذایی مناسب خود را دریافت کنید.',
            Image: '/img/female.svg',
          },
          {
            Title: 'رژیم غذایی شخصی‌سازی شده',
            Description: 'بر اساس وزن، قد، سن و هدف شما، بهترین برنامه غذایی برایتان طراحی می‌شود.',
            Image: '/img/male.svg',
          },
          {
            Title: 'پیگیری پیشرفت',
            Description: 'وزن خود را ثبت کنید و پیشرفتتان را در طول زمان مشاهده کنید.',
            Image: '/img/cover.svg',
          },
        ],
      },
    ],
  },

  'BlogProduction/get-all': {
    Data: [
      {
        Title: 'رژیم کتوژنیک',
        Route: 'keto',
        Icon: '/img/icon-keto.svg',
      },
      {
        Title: 'رژیم مدیترانه‌ای',
        Route: 'mediterranean',
        Icon: '/img/icon-mediterranean.svg',
      },
      {
        Title: 'رژیم گیاهخواری',
        Route: 'vegetarian',
        Icon: '/img/icon-vegetarian.svg',
      },
      {
        Title: 'رژیم پروتئین',
        Route: 'protein',
        Icon: '/img/icon-protein.svg',
      },
      {
        Title: 'رژیم دوکان',
        Route: 'dukan',
        Icon: '/img/icon-dukan.svg',
      },
    ],
  },

  'blog/getlist': {
    Data: [
      {
        Id: 1,
        Title: '۱۰ روش ساده برای کاهش وزن',
        Url: '/',
        Image: '/img/blog-weight.svg',
        ImageAlt: 'کاهش وزن',
        BlogImage: [
          { Url: '/img/blog-weight.svg', ImageSize: 0 },
          { Url: '/img/female.svg', ImageSize: 1 },
          { Url: '/img/male.svg', ImageSize: 2 },
        ],
        CreatedAt: '2024-01-15T10:00:00Z',
        ReadingDuration: 5,
        Name: 'دکتر',
        Family: 'احمدی',
        Duration: 12,
        Video: '/video/intro.mp4',
      },
      {
        Id: 2,
        Title: 'بهترین غذاها برای صبحانه',
        Url: '/',
        Image: '/img/blog-food.svg',
        ImageAlt: 'صبحانه سالم',
        BlogImage: [
          { Url: '/img/blog-food.svg', ImageSize: 0 },
          { Url: '/img/male.svg', ImageSize: 1 },
          { Url: '/img/cover.svg', ImageSize: 2 },
        ],
        CreatedAt: '2024-01-14T10:00:00Z',
        ReadingDuration: 4,
        Name: 'سارا',
        Family: 'محمدی',
        Duration: 8,
        Video: '/video/intro.mp4',
      },
      {
        Id: 3,
        Title: 'اهمیت آب در رژیم غذایی',
        Url: '/',
        Image: '/img/blog-water.svg',
        ImageAlt: 'آب نوشیدن',
        BlogImage: [
          { Url: '/img/blog-water.svg', ImageSize: 0 },
          { Url: '/img/cover.svg', ImageSize: 1 },
          { Url: '/img/female.svg', ImageSize: 2 },
        ],
        CreatedAt: '2024-01-13T10:00:00Z',
        ReadingDuration: 3,
        Name: 'علی',
        Family: 'رضایی',
        Duration: 10,
        Video: '/video/intro.mp4',
      },
      {
        Id: 4,
        Title: 'ورزش‌های مناسب برای لاغری',
        Url: '/',
        Image: '/img/blog-exercise.svg',
        ImageAlt: 'ورزش لاغری',
        BlogImage: [
          { Url: '/img/blog-exercise.svg', ImageSize: 0 },
          { Url: '/img/female.svg', ImageSize: 1 },
          { Url: '/img/male.svg', ImageSize: 2 },
        ],
        CreatedAt: '2024-01-12T10:00:00Z',
        ReadingDuration: 6,
        Name: 'مریم',
        Family: 'کریمی',
        Duration: 15,
        Video: '/video/intro.mp4',
      },
      {
        Id: 5,
        Title: 'خواب و تاثیر آن بر وزن',
        Url: '/',
        Image: '/img/blog-sleep.svg',
        ImageAlt: 'خواب سالم',
        BlogImage: [
          { Url: '/img/blog-sleep.svg', ImageSize: 0 },
          { Url: '/img/male.svg', ImageSize: 1 },
          { Url: '/img/cover.svg', ImageSize: 2 },
        ],
        CreatedAt: '2024-01-11T10:00:00Z',
        ReadingDuration: 4,
        Name: 'رضا',
        Family: 'حیدری',
        Duration: 7,
        Video: '/video/intro.mp4',
      },
    ],
  },
}
