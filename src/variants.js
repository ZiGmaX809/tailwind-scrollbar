/**
 * Tailwind's JIT engine assumes that hover variants always mean the element's
 * :hover selector should be targeted, but that's not the case when it comes
 * to webkit scrollbars. The remedy here is to inject our own scrollbar-aware
 * version of the hover variant. It's super brittle, but hopefully the JIT
 * engine will expose more options as it matures.
 */
const scrollbarAwareHover = e => {
  return ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      let pseudoEl = '';

      if (className.match(/^scrollbar-thumb-/)) {
        pseudoEl = '::-webkit-scrollbar-thumb';
      }

      return `.${e(`hover${separator}${className}`)}${pseudoEl}:hover`;
    });
  };
};

module.exports = {
  scrollbarAwareHover
};