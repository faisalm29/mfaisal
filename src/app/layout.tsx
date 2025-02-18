import type { Metadata } from "next";
import localFont from "next/font/local";
import { globalCss } from "@pigment-css/react";
import "@pigment-css/react/styles.css";

globalCss`
  /*! modern-normalize v3.0.1 | MIT License | https://github.com/sindresorhus/modern-normalize */

/*
Document
========
*/

/**
Use a better box model (opinionated).
*/

*,
::before,
::after {
	box-sizing: border-box;
}

html {
	/* Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3) */
	font-family:
		system-ui,
		'Segoe UI',
		Roboto,
		Helvetica,
		Arial,
		sans-serif,
		'Apple Color Emoji',
		'Segoe UI Emoji';
	line-height: 1.15; /* 1. Correct the line height in all browsers. */
	-webkit-text-size-adjust: 100%; /* 2. Prevent adjustments of font size after orientation changes in iOS. */
	tab-size: 4; /* 3. Use a more readable tab size (opinionated). */
}

/*
Sections
========
*/

body {
	margin: 0; /* Remove the margin in all browsers. */
}

/*
Text-level semantics
====================
*/

/**
Add the correct font weight in Chrome and Safari.
*/

b,
strong {
	font-weight: bolder;
}

/**
1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
2. Correct the odd 'em' font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
	font-family:
		ui-monospace,
		SFMono-Regular,
		Consolas,
		'Liberation Mono',
		Menlo,
		monospace; /* 1 */
	font-size: 1em; /* 2 */
}

/**
Add the correct font size in all browsers.
*/

small {
	font-size: 80%;
}

/**
Prevent 'sub' and 'sup' elements from affecting the line height in all browsers.
*/

sub,
sup {
	font-size: 75%;
	line-height: 0;
	position: relative;
	vertical-align: baseline;
}

sub {
	bottom: -0.25em;
}

sup {
	top: -0.5em;
}

/*
Tabular data
============
*/

/**
Correct table border color inheritance in Chrome and Safari. (https://issues.chromium.org/issues/40615503, https://bugs.webkit.org/show_bug.cgi?id=195016)
*/

table {
	border-color: currentcolor;
}

/*
Forms
=====
*/

/**
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
*/

button,
input,
optgroup,
select,
textarea {
	font-family: inherit; /* 1 */
	font-size: 100%; /* 1 */
	line-height: 1.15; /* 1 */
	margin: 0; /* 2 */
}

/**
Correct the inability to style clickable types in iOS and Safari.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
	-webkit-appearance: button;
}

/**
Remove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.
*/

legend {
	padding: 0;
}

/**
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
	vertical-align: baseline;
}

/**
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
	height: auto;
}

/**
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
	-webkit-appearance: textfield; /* 1 */
	outline-offset: -2px; /* 2 */
}

/**
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
	-webkit-appearance: none;
}

/**
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to 'inherit' in Safari.
*/

::-webkit-file-upload-button {
	-webkit-appearance: button; /* 1 */
	font: inherit; /* 2 */
}

/*
Interactive
===========
*/

/*
Add the correct display in Chrome and Safari.
*/

summary {
	display: list-item;
}
`;

const inter = localFont({
  src: [
    {
      path: "../InterVariable.woff2",
      style: "normal",
    },
    {
      path: "../InterVariable-Italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-inter",
});

const jakartaSans = localFont({
  src: [
    {
      path: "../PlusJakartaSans-Regular.woff2",
      style: "normal",
    },
    {
      path: "../PlusJakartaSans-Italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-jakarta-sans",
});

const uncutSans = localFont({
  src: [
    {
      path: "../UncutSans-Light.woff2",
      weight: "300", //light
      style: "normal",
    },
    {
      path: "../UncutSans-LightItalic.woff2",
      weight: "300", //light italic
      style: "italic",
    },
    {
      path: "../UncutSans-Book.woff2",
      weight: "350", //book
      style: "normal",
    },
    {
      path: "../UncutSans-BookItalic.woff2",
      weight: "350", //book italic
      style: "italic",
    },
    {
      path: "../UncutSans-Regular.woff2",
      weight: "400", //regular
      style: "normal",
    },
    {
      path: "../UncutSans-RegularItalic.woff2",
      weight: "400", //regular italic
      style: "italic",
    },
    {
      path: "../UncutSans-Medium.woff2",
      weight: "500", //medium
      style: "normal",
    },
    {
      path: "../UncutSans-MediumItalic.woff2",
      weight: "500", //medium italic
      style: "italic",
    },
    {
      path: "../UncutSans-Semibold.woff2",
      weight: "600", //semibold
      style: "normal",
    },
    {
      path: "../UncutSans-SemiboldItalic.woff2",
      weight: "600", //semibold italic
      style: "italic",
    },
    {
      path: "../UncutSans-Bold.woff2",
      weight: "700", //bold
      style: "normal",
    },
    {
      path: "../UncutSans-BoldItalic.woff2",
      weight: "700", //bold italic
      style: "italic",
    },
  ],
  variable: "--font-uncut-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${uncutSans} ${inter} ${jakartaSans}`}>{children}</body>
    </html>
  );
}
