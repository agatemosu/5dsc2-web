import { definePageMetaTags } from 'svelte-meta-tags';

export const load = () => {
  const pageTags = definePageMetaTags({
    title: 'Jugadores',
  });


  return { ...pageTags };
};
