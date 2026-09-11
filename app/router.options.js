export default {
  scrollBehavior: (to) => {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 120, // Apply top offset equal to navbar height to avoid content overlapping with navbar
      }
    }
    return {
      top: 0,
    }
  },
}
