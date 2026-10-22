import { css, Global } from '@emotion/react';
import { useTheme } from '@wci-tech/core-ui-premium';

const GlobalStyles = () => {
  const {
    theme: { spacing, fonts },
  } = useTheme();

  return (
    <Global
      styles={css`
        :root {
          font-size: 100%; /* 1rem = 16px */
          --focus-ring-color: #005fcc;
          --focus-ring-width: 2px;
          --focus-ring-offset: 2px;
        }

        /* 1) Box sizing: safe on everything */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        /* 2) Remove default margins on block elements only (safer than * { margin:0 }) */
        :where(h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd) {
          margin: 0;
        }

        /* 3) Base typography on the root, not on * */
        html {
          /* 100% = respect user preference (usually 16px) */
          font-size: 100%;
        }

        body {
          margin: 0;
          min-height: 100dvh;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          font-family: ${fonts.family.default};
        }

        :where(h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd) {
          margin: 0;
        }

        /* Mono usage */
        code,
        pre,
        kbd,
        samp {
          font-family: ${fonts.family.mono};
        }

        /* 4) Links: keep underline by default for a11y; style intentionally */
        a {
          color: inherit;
          text-decoration: underline;
        }
        a:hover {
          text-decoration-thickness: from-font;
        }

        /* 5) Images/media: prevent overflow and align nicely */
        img,
        picture,
        video,
        canvas,
        svg {
          display: block;
          max-width: 100%;
        }

        /* 6) Forms: inherit fonts but do not nuke borders/padding globally */
        input,
        button,
        textarea,
        select {
          color: inherit;
          font: inherit;
        }

        /* 7) Buttons: reset only what you mean to */
        button {
          cursor: pointer;
          border: none; /* only if your design system supplies borders elsewhere */
          background: none;
        }

        /* 8) Lists: opt-in list-style removal when used for UI lists */
        ul[role='list'],
        ol[role='list'] {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        /* 9) Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* 10) Optional: tighter headings with predictable spacing */
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          line-height: 1.2;
        }

        :where(
          button,
          [href],
          [role='button'],
          [role='list'],
          input,
          textarea,
          select,
          summary,
          [tabindex]:not([tabindex='-1'])
        ):focus {
          outline: var(--focus-ring-width) solid var(--focus-ring-color);
          outline-offset: var(--focus-ring-offset);
        }

        :where(
            button,
            [href],
            input,
            textarea,
            select,
            summary,
            [tabindex]:not([tabindex='-1'])
          ):focus:not(:focus-visible):not([data-programmatic-focus]) {
          outline: none;
        }

        /* Swiper is not built with Emotion, so Emotion css or styled props will not apply to Swiper internal DOM structure */
        .custom-swiper {
          width: 100%;
          margin-right: 0;
          box-sizing: border-box;
        }

        .custom-swiper.with-nav {
          width: 97%;
        }

        .custom-swiper.no-nav {
          width: 100%;
        }

        .auto-width-slide {
          width: auto !important;
        }

        /* for map tooltip styles */
        .gm-style-iw-ch {
          padding-top: ${spacing.get(10)};
        }

        .gm-ui-hover-effect {
          display: none !important; /* hide Google default close button */
        }
      `}
    />
  );
};

export default GlobalStyles;
