/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  // @ts-expect-error -- vitest/config type augmentation doesn't reach Astro's internal Vite UserConfig
  test: {
    // Vitest configuration options
  },
});