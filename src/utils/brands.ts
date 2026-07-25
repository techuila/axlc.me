/**
 * Brand covers for work cards and company pages: company logos on
 * gradients derived from each company's own colors. Keyed by the work
 * entry id (content/work/<id>.mdx). Remove an entry here to fall back to
 * the `image`/`logo` frontmatter or the plain placeholder.
 */
export interface BrandPane {
  /** Logo under public/ */
  img?: string;
  /** Text fallback when no logo exists */
  text?: string;
  /** Gradient start / end */
  from: string;
  to: string;
  /** Recolor the logo to white via CSS filter */
  invert?: boolean;
  /** Logo width relative to the pane */
  logoWidth?: string;
  alt?: string;
}

export const BRANDS: Record<string, { panes: BrandPane[] }> = {
  // Split cover: Viyahe (blue-600 → blue-900) / Monark (white → soft gray)
  'viyahe-monark': {
    panes: [
      {
        img: '/images/work/viyahe_logo_white.png',
        from: '#2563eb',
        to: '#1e3a8a',
        logoWidth: '32%',
        alt: 'Viyahe',
      },
      {
        img: '/images/work/monark_logo.svg',
        from: '#ffffff',
        to: '#e2e3e8',
        logoWidth: '28%',
        alt: 'Monark',
      },
    ],
  },
  // NOVARE's own logo gradient colors (teal → deep blue)
  'mdi-novare': {
    panes: [
      {
        img: '/images/work/novare_logo.svg',
        from: '#16d1d3',
        to: '#1c47a5',
        invert: true,
        logoWidth: '48%',
        alt: 'MDI Novare',
      },
    ],
  },
  // exact construct's crimson brand red
  'exact-construct': {
    panes: [
      {
        img: '/images/work/exact_logo.webp',
        from: '#c62031',
        to: '#70101c',
        invert: true,
        logoWidth: '52%',
        alt: 'exact construct',
      },
    ],
  },
  // PH Live Music's royal blue, sampled from their brand asset
  'ph-live-music': {
    panes: [
      {
        img: '/images/work/ph_live_music_ltd_logo.png',
        from: '#054dbc',
        to: '#012ba4',
        logoWidth: '48%',
        alt: 'PH Live Music',
      },
    ],
  },
  // Conose's coral (#FF6B47) + lowercase wordmark, per conose.ph
  'conose-ph': {
    panes: [
      {
        img: '/images/work/conose_logo.svg',
        text: 'conose',
        from: '#ff6b47',
        to: '#d63c1c',
        logoWidth: '11%',
        alt: 'Conose',
      },
    ],
  },
};
