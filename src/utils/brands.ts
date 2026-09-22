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
  /** Text color override for `text` (default white) */
  textColor?: string;
  /** Render `text` as a large product wordmark instead of a small label */
  big?: boolean;
  /** Small accent dot in the bottom-right corner, e.g. a brand's highlight */
  accent?: string;
  /** Extra class on the text, for a brand-specific wordmark style */
  textClass?: string;
  /** Decoration pinned to the pane's top edge (e.g. the Top.Notch notch) */
  topImg?: string;
  /** Width of `topImg` relative to the pane */
  topImgWidth?: string;
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
  // Bunbuy's orange, sampled from their LinkedIn logo
  'bunbuy-marketplace': {
    panes: [
      {
        img: '/images/work/bunbuy_logo.jpg',
        from: '#ff560b',
        to: '#ff560b',
        logoWidth: '22%',
        alt: 'Bunbuy Marketplace',
      },
    ],
  },
  // RightJob's full-color wordmark on white, like the Monark pane
  'rightjob-solutions': {
    panes: [
      {
        img: '/images/work/rightjob_logo.png',
        from: '#ffffff',
        to: '#e6e8ee',
        logoWidth: '56%',
        alt: 'RightJob Solutions',
      },
    ],
  },
  // No logo exists for ZARI; their blue is the same royal blue as PH Live Music
  'zamboanga-amusement': {
    panes: [
      {
        text: 'Zamboanga Amusement & Recreational Inc.',
        from: '#054dbc',
        to: '#012ba4',
        alt: 'Zamboanga Amusement & Recreational Inc.',
      },
    ],
  },
  // Finova's mark (white, no tile) on the app's blue-to-violet balance gradient.
  // Project cards show a screenshot instead; this is for the facts panel.
  finova: {
    panes: [
      {
        img: '/images/work/finova_mark.svg',
        from: '#4f6bff',
        to: '#7c3aed',
        logoWidth: '18%',
        alt: 'Finova',
      },
    ],
  },
  // Top.Notch: ink, cream and the orange accent from the app and its site
  'top-notch': {
    panes: [
      {
        text: 'top.notch',
        big: true,
        topImg: '/images/work/top-notch_notch.svg',
        topImgWidth: '46%',
        textColor: '#141312',
        accent: '#ff4d00',
        from: '#faf8f3',
        to: '#e8e3d8',
        alt: 'Top.Notch',
      },
    ],
  },
  // Guhit Studio: blueprint navy field, white plan-frame mark with the teal
  // door swing, and the wide-tracked GUHIT wordmark from the landing page
  'guhit-studio': {
    panes: [
      {
        img: '/images/work/guhit-studio_mark.svg',
        text: 'GUHIT',
        textClass: 'guhit',
        textColor: '#f7f5f0',
        from: '#2a3b58',
        to: '#1f2d44',
        logoWidth: '17%',
        alt: 'Guhit Studio',
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
