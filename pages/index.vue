<script setup>
const config = useRuntimeConfig()
const isHomePage = useIsHome()

useHead(
  {
    title: config.public.homeTitle,
    meta: [
      { name: 'description', content: config.public.homeDescription },
    ],
    link: [
      { rel: 'canonical', href: config.public.appUrl },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(
          {
            '@context': 'https://schema.org/',
            '@type': 'WebSite',
            name: 'زیره',
            url: config.public.appUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: config.public.appUrl + '/?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          },
        ),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'زیره',
            url: config.public.appUrl,
            logo: `${config.public.appUrl}/img/logo.png`,
            sameAs: '/',
          },
        ),
      },
    ],
  },
)
</script>

<template>
  <div>
    <HeaderSliderSection class="mb-16" />
    <PlansSection class="mb-14">
      <!-- show h2 only in home page. -->
      <h2
        v-if="isHomePage"
        class="text-base whitespace-nowrap sm:text-2xl font-bold mb-4 sm:mb-11"
        v-text="$t('brandPlans')"
      />
    </PlansSection>
    <IntroVideo
      video="/video/intro.mp4"
      cover="/img/cover.svg"
      :title="$t('whatIsCalorieCountingDiet')"
      class="mb-4 md:mb-14"
    />
    <AchievementSection
      class="mb-14"
    />
    <StepsGetDietSection
      class="mb-14"
    />
    <CalculateForm
      class="mb-14"
    />
    <FeatureAppSection
      class="mb-14"
    />
    <AppLinkFormSection
      class="mb-14"
    />
    <HeroesSection
      class="mb-14"
    />
    <IntroAppSection
      class="mb-14"
    />
    <LatestBlogsSection
      class="mb-14"
    />
    <VideoBlogSection
      class="mb-14"
    />
    <!--    <LazyFaqSection /> -->
  </div>
</template>

<style>
.lg-container {
  direction: ltr;
}
</style>
