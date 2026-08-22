/**
 * Site chrome: theme toggle, keyboard shortcuts, command palette,
 * help dialog, toast, and scroll-to-top. Loaded on every page.
 */

const EMAIL = 'axlcuyugan05@gmail.com';
const CV = '/documents/axl-cuyugan-SWE-CV.pdf';

type Command = { label: string; k: string; run: () => void };

export function setupChrome(): void {
  const $ = <T extends HTMLElement>(id: string) =>
    document.getElementById(id) as T | null;

  const palette = $('palette');
  const paletteInput = $<HTMLInputElement>('palette-input');
  const paletteList = $('palette-list');
  const help = $('help');
  const toast = $('toast');
  const topBtn = $('top-btn');
  const themeBtn = $('theme-toggle');
  const backLink = $<HTMLAnchorElement>('back-link');

  /* ---------- theme ---------- */
  const themeIcon = () =>
    document.documentElement.dataset.theme === 'dark' ? '☀' : '◑';
  const applyTheme = (t: string) => {
    document.documentElement.dataset.theme = t;
    document.documentElement.style.colorScheme = t;
    try {
      localStorage.setItem('ac-theme', t);
    } catch (e) {
      /* private mode */
    }
    if (themeBtn) themeBtn.textContent = themeIcon();
  };
  const toggleTheme = () =>
    applyTheme(
      document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    );
  if (themeBtn) {
    themeBtn.textContent = themeIcon();
    themeBtn.addEventListener('click', toggleTheme);
  }

  /* ---------- toast ---------- */
  let toastTimer: ReturnType<typeof setTimeout> | undefined;
  const showToast = (msg: string) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 2200);
  };

  const copyEmail = () => {
    try {
      navigator.clipboard.writeText(EMAIL);
    } catch (e) {
      /* clipboard unavailable */
    }
    closeAll();
    showToast(`${EMAIL} — copied`);
  };

  /* ---------- overlays ---------- */
  const closeAll = () => {
    if (palette) palette.hidden = true;
    if (help) help.hidden = true;
  };
  const openHelp = () => {
    closeAll();
    if (help) help.hidden = false;
  };

  /* ---------- command palette ---------- */
  const go = (href: string) => () => {
    window.location.href = href;
  };
  const ext = (url: string) => () => {
    window.open(url, '_blank', 'noopener');
    closeAll();
  };
  const commands: Command[] = [
    { label: 'Go home', k: 'h', run: go('/') },
    { label: 'Work & case studies', k: 'w', run: go('/work/') },
    { label: 'Writing', k: 'i', run: go('/writing/') },
    { label: 'About', k: 'a', run: go('/about/') },
    { label: 'Open CV (PDF)', k: 'r', run: ext(CV) },
    {
      label: 'Toggle light / dark theme',
      k: 't',
      run: () => {
        toggleTheme();
        closeAll();
      },
    },
    { label: 'Copy email address', k: '', run: copyEmail },
    {
      label: 'Go back',
      k: 'b',
      run: () => {
        if (backLink) backLink.click();
        else closeAll();
      },
    },
    { label: 'Keyboard shortcuts help', k: '?', run: openHelp },
    { label: `Email — ${EMAIL}`, k: '', run: ext(`mailto:${EMAIL}`) },
    { label: 'GitHub profile', k: '', run: ext('https://github.com/techuila') },
    {
      label: 'LinkedIn profile',
      k: '',
      run: ext('https://www.linkedin.com/in/axlcuyugan/'),
    },
  ];

  let sel = 0;
  let filtered = commands;

  const renderList = () => {
    if (!paletteList) return;
    if (!filtered.length) {
      paletteList.innerHTML =
        '<p class="palette-empty">No matching commands.</p>';
      return;
    }
    paletteList.innerHTML = '';
    filtered.forEach((c, i) => {
      const row = document.createElement('div');
      row.setAttribute('role', 'option');
      row.setAttribute('aria-selected', String(i === sel));
      if (i === sel) row.classList.add('sel');
      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = c.label;
      row.appendChild(label);
      if (c.k) {
        const kbd = document.createElement('kbd');
        kbd.textContent = c.k;
        row.appendChild(kbd);
      }
      row.addEventListener('click', () => c.run());
      row.addEventListener('mouseenter', () => {
        sel = i;
        renderList();
      });
      paletteList.appendChild(row);
    });
  };

  const filter = () => {
    const q = (paletteInput?.value ?? '').trim().toLowerCase();
    filtered = q
      ? commands.filter((c) => c.label.toLowerCase().includes(q))
      : commands;
    sel = Math.min(sel, Math.max(0, filtered.length - 1));
    renderList();
  };

  const openPalette = () => {
    closeAll();
    if (!palette) return;
    palette.hidden = false;
    if (paletteInput) paletteInput.value = '';
    sel = 0;
    filter();
    setTimeout(() => paletteInput?.focus(), 0);
  };

  $('palette-open')?.addEventListener('click', openPalette);
  $('help-open')?.addEventListener('click', openHelp);
  $('help-close')?.addEventListener('click', closeAll);

  [palette, help].forEach((ov) => {
    ov?.addEventListener('click', (e) => {
      if (
        e.target === ov ||
        (e.target as HTMLElement).closest('.panel') === null
      )
        closeAll();
    });
  });
  palette
    ?.querySelector('.panel')
    ?.addEventListener('click', (e) => e.stopPropagation());
  help
    ?.querySelector('.panel')
    ?.addEventListener('click', (e) => e.stopPropagation());

  paletteInput?.addEventListener('input', filter);
  paletteInput?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      sel = Math.min(filtered.length - 1, sel + 1);
      renderList();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      sel = Math.max(0, sel - 1);
      renderList();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[sel]?.run();
    }
  });

  /* ---------- global shortcuts ---------- */
  window.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement | null;
    const tag = (t?.tagName ?? '').toLowerCase();
    const typing =
      tag === 'input' ||
      tag === 'textarea' ||
      tag === 'select' ||
      Boolean(t?.isContentEditable);

    if (e.key === 'Escape') {
      if (palette?.hidden === false || help?.hidden === false) {
        e.preventDefault();
        closeAll();
      }
      return;
    }
    if ((e.metaKey || e.ctrlKey) && String(e.key).toLowerCase() === 'k') {
      e.preventDefault();
      if (palette?.hidden === false) closeAll();
      else openPalette();
      return;
    }
    if (
      typing ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      palette?.hidden === false
    )
      return;

    const nav: Record<string, string> = {
      h: '/',
      w: '/work/',
      i: '/writing/',
      a: '/about/',
    };
    const dest = nav[e.key];
    if (dest) {
      window.location.href = dest;
      return;
    }
    if (e.key === 'b' && backLink) {
      backLink.click();
      return;
    }
    if (e.key === 'j') {
      window.scrollBy({ top: 220, behavior: 'smooth' });
      return;
    }
    if (e.key === 'k') {
      window.scrollBy({ top: -220, behavior: 'smooth' });
      return;
    }
    if (e.key === 'r') {
      window.open(CV, '_blank', 'noopener');
      return;
    }
    if (e.key === 't') {
      toggleTheme();
      return;
    }
    if (e.key === '/') {
      e.preventDefault();
      openPalette();
      return;
    }
    if (e.key === '?') {
      e.preventDefault();
      openHelp();
    }
  });

  /* ---------- scroll to top ---------- */
  if (topBtn) {
    topBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
    window.addEventListener(
      'scroll',
      () => {
        topBtn.hidden = window.scrollY <= 420;
      },
      { passive: true }
    );
  }
}
