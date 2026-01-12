var GRIDCAL_PARAM = {
  // experiments with filling in data in cells
  //
  data_fn: "",

  data: {},
  color_cell: [],

  // Putting data in cells can alter the cell/row height,
  // so we allow a user parameter to fiddle with cell height.
  // The parameter here is directly applied to the `tr` style,
  // so values of "1.5em" or "30px" will work.
  //
  cell_height: "",

  // for aligned-weekdays, which day to start (0 indexed)
  //
  //   Monday (1) default
  //
  start_day: 1,

  // calendar format
  //
  //   default
  //   aligned-weekdays
  //
  format: "default",

  // year to start
  //
  //   default this year
  //
  year: new Date().getFullYear(),

  // Text to use for displaying weekdays
  //
  weekday_code: ["su", "m", "tu", "w", "th", "f", "sa"],

  // text to sue for month header
  //
  month_code: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  //
  language: "",

  // start month (0 indexed)
  //
  //   Janurary (0) default
  //
  start_month: 0,

  // number of months to go out to
  //
  n_month: 12,

  // weekend highlight color
  //
  highlight_color: "#99a55e",
  background_color: "#f4e3d2",
  text_color: "#000",

  // today's date highlight color
  //
  today_highlight_color: "",

  // Moon phase display options
  //
  show_moon_phase: false,
  moon_phase_style: "css", // "css", "symbol", "name"
  moon_phase_position: "below", // "below", "inline"
  moon_phase_display: "changes", // "all", "changes"
  //
  // show week numbers
  //
  show_week_numbers: false,

  // weekend days (0=Sunday, 6=Saturday)
  //
  weekend_days: [0, 6],
};

var CIRCLE_SVG = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" xml:space="preserve">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M150,0C67.29,0,0,67.29,0,150s67.29,150,150,150s150-67.29,150-150S232.71,0,150,0z M150,260c-60.654,0-110-49.346-110-110S89.346,40,150,40s110,49.346,110,110S210.654,260,150,260z"></path>
  </g>
</svg>`;

var FULL_CIRCLE_SVG = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" xml:space="preserve">
  <path d="M150,0C67.29,0,0,67.29,0,150s67.29,150,150,150s150-67.29,150-150S232.71,0,150,0z"/>
</svg>`;

var SVG_MAP = {
  "2026-01-01": `<svg id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg" width="182.62" height="197.09" viewBox="0 0 18.26 19.71"><path d="M8.32,3.06c-.8-.39-1.68-.62-2.6-.7-.22-.02-.43.12-.49.34,0,0-.09.3-.26.9-.03.09-.03.18,0,.26,0,0,.04.13.11.38-.59,1.58-.91,2.4-1.29,3.17t0,0c-.27.55-.58,1.08-1.04,1.83,0,0,0,0,0,.01-.2.33-.44.71-.71,1.15l-.05.08c-.29.46-.55.94-.78,1.42,0,.01-.02.03-.03.04,0,.02-.02.04-.02.06C.53,13.37.16,14.8.04,16.28c0,.02,0,.04,0,.07-.03.42-.04.84-.03,1.27,0,.3.13.56.35.75.98.87,2.24,1.34,3.54,1.34.36,0,.72-.04,1.08-.11.29-.06.53-.22.68-.48.22-.37.42-.74.61-1.12,0-.01.02-.03.02-.05.65-1.35,1.04-2.79,1.17-4.3,0,0,0-.02,0-.03,0,0,0-.01,0-.02.05-.54.06-1.09.04-1.65v-.09c-.12-3.36-.12-3.47.44-6.87.19-.18.29-.28.29-.28.06-.06.1-.14.12-.22l.22-.91c.05-.21-.05-.44-.25-.53h0ZM4.85,18.69c-1.57-.16-2.64-.52-4.09-1.18.12-1.13.64-3.68,1.08-4.73,1.47.65,3.02,1.06,4.62,1.24-.14,1.13-1.61,4.67-1.61,4.67ZM2.25,11.93c.16-.32.34-.63.53-.94l.05-.08c.16-.26.31-.5.44-.72.42.37.8.76,1.15,1.17.09.11.22.17.36.17.05,0,.11,0,.16-.03.52-.18,1.05-.33,1.58-.44,0,.26.02.54.03.85v.09c.02.37.01.73,0,1.08-1.49-.16-2.94-.55-4.3-1.15h0ZM4.46,8.18l2.05.55c-.02.42-.02.85,0,1.38-.53.1-1.06.24-1.57.4-.35-.39-.74-.77-1.16-1.13.27-.45.49-.83.68-1.2h0ZM6.03,3.35c.54.07,1.05.21,1.54.41l-.1.39s-.06.06-.1.1l-1.41-.38c-.02-.05-.03-.1-.04-.14.04-.15.08-.28.11-.38h0ZM5.87,4.83l1.1.29c-.2,1.19-.32,1.98-.39,2.66l-1.7-.46c.28-.63.57-1.37.99-2.49h0ZM18.23,16.35s0-.04,0-.06c-.12-1.49-.5-2.92-1.13-4.29,0-.01,0-.03-.01-.04,0,0-.01-.02-.02-.03-.23-.49-.49-.97-.78-1.44l-.05-.08c-.9-1.44-1.36-2.17-1.75-2.96,0-.02-.02-.04-.03-.06-.37-.76-.69-1.59-1.28-3.15l.11-.38c.02-.09.02-.18,0-.26-.18-.6-.26-.9-.26-.9-.06-.21-.27-.35-.49-.34-.92.07-1.8.31-2.6.7-.2.1-.31.32-.25.54l.22.91c.02.08.06.16.12.22,0,0,.09.09.29.28.27,1.66.41,2.54.47,3.4h0c.06.89.03,1.76-.03,3.47v.09c-.02.55,0,1.1.04,1.63,0,.01,0,.02,0,.04,0,.02,0,.03,0,.05.14,1.5.53,2.92,1.17,4.27,0,.02.02.04.03.06.18.38.38.75.61,1.12.16.25.39.41.67.47.36.07.72.11,1.08.11,1.3,0,2.56-.48,3.54-1.34.22-.19.34-.45.35-.75.01-.43,0-.85-.03-1.26h0ZM11.8,14.02c1.6-.17,3.15-.59,4.62-1.24.44,1.05.91,3.66,1.03,4.78-1.45.65-2.59.95-4.16,1.1-.46-1.03-1.34-3.52-1.49-4.65h0ZM13.8,8.18c.19.37.41.74.68,1.19h0c-.42.36-.8.74-1.16,1.14-.51-.17-1.04-.3-1.57-.4.01-.53.01-.96,0-1.38M11.7,12v-.09c.01-.31.02-.59.03-.85.54.11,1.07.26,1.58.44.05.02.11.03.16.03.14,0,.27-.06.36-.17.35-.41.73-.8,1.15-1.17.14.22.29.46.45.72l.05.08c.19.31.37.62.53.94-1.37.6-2.81.99-4.3,1.15-.02-.36-.02-.72-.01-1.08h0ZM13.39,7.32l-1.7.46c-.07-.68-.19-1.47-.39-2.66l1.1-.29c.42,1.13.71,1.87.99,2.49h0ZM12.23,3.35c.03.11.07.24.11.39l-.04.14-1.41.38s-.08-.07-.1-.1l-.1-.39c.49-.2,1-.34,1.54-.41h0ZM9.6.47v.9c0,.26-.21.47-.47.47s-.47-.21-.47-.47V.47c0-.26.21-.47.47-.47.26,0,.47.21.47.47ZM6.58,1.26c-.18-.18-.18-.48,0-.67.18-.18.48-.18.67,0l.64.64c.18.18.18.48,0,.67-.09.09-.21.14-.33.14s-.24-.05-.33-.14l-.64-.64ZM10.37,1.9c-.18-.18-.18-.48,0-.67l.64-.64c.18-.18.48-.18.67,0,.18.18.18.48,0,.67l-.64.64c-.09.09-.21.14-.33.14-.12,0-.24-.05-.33-.14h0Z" /></svg>`,
  "2026-07-01": `<?xml version="1.0" encoding="UTF-8"?><svg id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg" width="193.93" height="210.24" viewBox="0 0 19.39 21.02"><path d="M9.22,21.02l.11-2.02c.04-.81.13-1.67.14-2.47,0-.3-.22-.52-.52-.54l-4.55.81.63-1.8c0-.18-.14-.27-.27-.38-1.37-1.19-2.87-2.31-4.28-3.45-.14-.11-.33-.25-.45-.37-.01-.01-.04-.01-.03-.04l1.15-.54c.13-.09.16-.24.13-.38l-.97-2.98,2.8.59c.17.02.29,0,.39-.16l.57-1.33,2.24,2.4c.25.18.57,0,.55-.3l-1.07-5.52,1.71.99c.16.08.31.04.42-.09.48-.89.92-1.79,1.38-2.69.12-.23.24-.5.37-.72.01-.02,0-.04.03-.03l1.76,3.44c.11.13.27.17.42.09l1.71-.98-1.07,5.5c-.02.25.2.42.44.37.12-.03.24-.21.34-.29l2.02-2.17.57,1.33c.09.14.23.19.39.16l2.8-.59-.97,2.98c-.03.15,0,.3.13.38l1.15.54s-.09.09-.11.11c-1.49,1.26-3.06,2.43-4.56,3.68-.14.12-.36.25-.36.45l.63,1.8-4.55-.81c-.62.08-.5.54-.48.99.03.67.07,1.35.11,2.02l.11,2.02h-.95Z" /></svg>`,
  "2026-10-12": `<?xml version="1.0" encoding="UTF-8"?><svg id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg" width="198.53" height="126.51" viewBox="0 0 19.85 12.65"><path d="M.63,2.86c.33.27.79.3,1.16.08.06-.04.13-.03.19.01l.85.7c.37.31.56.56.76,1.06.09.22.17.44.25.66.22.61.44,1.24.87,1.83.14.2.31.39.5.54.47.38,1.04.59,1.64.59.09,0,.17,0,.26-.01.69-.07,1.31-.4,1.75-.93.91-1.1.75-2.74-.36-3.64-.19-.16-.41-.29-.63-.38-.67-.3-1.33-.4-1.97-.5-.17-.03-.34-.05-.51-.08-.58-.1-.91-.19-1.38-.57l-.85-.7c-.06-.05-.07-.11-.05-.18.15-.4.02-.85-.3-1.12C2.58.06,2.32-.02,2.05,0c-.27.03-.51.15-.68.36-.17.2-.25.46-.22.72-.26.03-.5.16-.67.36-.17.21-.25.47-.22.73.03.27.16.51.36.68h0ZM.95,1.83c.08-.1.21-.15.34-.15.15,0,.29-.05.39-.17.09-.12.13-.27.09-.41-.03-.13,0-.26.08-.36.07-.08.16-.13.27-.14.11,0,.21.02.29.09.13.11.18.29.12.45-.11.31-.02.65.23.85l.62.51-.41.5-.62-.51c-.14-.12-.31-.18-.48-.18-.14,0-.27.04-.4.11-.15.09-.33.08-.46-.03-.08-.07-.13-.16-.14-.27-.01-.11.02-.21.09-.29h0Z" /><path d="M19.36,10.17H.49c-.27,0-.49.22-.49.49s.22.49.49.49h1.05l.42.73c.28.49.76.77,1.32.77h13.3c.56,0,1.04-.28,1.32-.77l.42-.73h1.05c.27,0,.49-.22.49-.49s-.22-.49-.49-.49h0Z" /><path d="M8.86,3.29c1.36,1.12,1.56,3.13.44,4.49-.54.66-1.3,1.07-2.15,1.15-.1,0-.21.02-.32.02-.73,0-1.45-.26-2.02-.73-.23-.19-.44-.41-.61-.66-.47-.66-.72-1.36-.94-1.97,0-.02-.02-.05-.03-.07-.48.78-1.04,1.79-1.15,2.59-.07.48.11.98.52,1.48h14.49c.54-.77.73-1.67.55-2.61-.2-1.06-.9-1.74-1.63-2.32l-2.69-2.13c-.98-.78-2.2-1.17-3.54-1.12-1.12.04-2.29.37-3.39.96.53.09,1.11.21,1.69.47.28.12.54.28.77.47h0Z" /></svg>`,
  "2026-12-25": `<?xml version="1.0" encoding="UTF-8"?><svg id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg" width="147.63" height="225.17" viewBox="0 0 14.76 22.52"><path d="M14.66,18.89c-1.79-1.88-3.39-4.01-4.69-6.55h2.44c.1,0,.18-.06.22-.16.04-.1.02-.2-.05-.28-1.42-1.49-2.67-3.2-3.65-5.28h1.91c.07,0,.13-.04.15-.11.03-.07.01-.14-.04-.19-1.5-1.57-2.73-3.52-3.42-6.19-.02-.08-.08-.13-.16-.13s-.14.05-.16.13c-.69,2.68-1.92,4.62-3.42,6.19-.05.05-.06.12-.04.19s.08.11.15.11h1.91c-.98,2.08-2.23,3.8-3.65,5.28-.07.07-.09.18-.05.28.04.1.12.16.22.16h2.44c-1.3,2.54-2.9,4.67-4.69,6.55-.1.1-.13.25-.08.39.05.14.17.22.31.22h6.32v3.02h1.46v-3.02h6.32c.14,0,.25-.08.31-.22.05-.14.02-.29-.08-.39Z" /></svg>`,
  "2026-11-11": `<?xml version="1.0" encoding="UTF-8"?><svg id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg" width="182.4" height="182.36" viewBox="0 0 18.24 18.24"><path d="M9.12,10.68c.87,0,1.57-.7,1.57-1.57s-.7-1.57-1.57-1.57c-.87,0-1.57.7-1.57,1.57,0,.87.7,1.57,1.57,1.57Z" /><path d="M1.57,8.59h4.98c.05-.22.13-.44.23-.64.02-.05.05-.1.08-.15s.04-.09.07-.13l-1.85-1.85c-.2-.2-.2-.53,0-.74.2-.2.53-.2.74,0h0l1.85,1.85s.09-.04.13-.07.1-.05.15-.08c.2-.11.42-.18.64-.23h0V1.57c0-.49-.23-.95-.62-1.25-.4-.3-.91-.4-1.39-.26C3.43.95.96,3.42.06,6.58c-.14.48-.04.99.26,1.39.3.39.76.62,1.25.62Z" /><path d="M16.66,9.64h-4.98c-.05.22-.13.44-.23.64-.02.05-.05.1-.08.15s-.04.09-.07.13l1.85,1.85c.2.2.2.54,0,.74s-.54.2-.74,0l-1.85-1.85s-.09.04-.13.07-.1.05-.15.08c-.2.11-.42.18-.64.23h0v4.98c0,.49.23.96.62,1.25.4.3.91.4,1.39.26,3.16-.89,5.63-3.36,6.53-6.52.14-.48.04-.99-.26-1.39-.3-.39-.76-.62-1.25-.62Z" /><path d="M7.95,11.44c-.05-.02-.1-.05-.14-.08s-.09-.04-.13-.07l-1.85,1.85c-.2.2-.53.2-.74,0s-.2-.53,0-.74h0l1.85-1.85s-.04-.09-.07-.13-.05-.1-.08-.15c-.11-.2-.18-.42-.23-.64H1.57C.7,9.64,0,10.34,0,11.21c0,.15.02.29.06.44.89,3.16,3.36,5.63,6.52,6.53.48.14.99.04,1.39-.26.39-.3.62-.76.62-1.25v-4.99h0c-.22-.05-.44-.13-.64-.24Z" /><path d="M11.66.06c-.84-.24-1.71.24-1.95,1.08-.04.14-.06.28-.06.43v4.98h0c.22.05.44.13.64.23.05.03.1.05.15.08s.09.04.13.07l1.85-1.85c.2-.2.53-.2.74,0,.2.2.2.53,0,.74h0l-1.85,1.85s.04.09.07.13.05.1.08.15c.11.2.18.42.23.64h4.98c.87,0,1.57-.71,1.57-1.58,0-.15-.02-.29-.06-.43C17.28,3.42,14.81.96,11.66.06Z" /></svg>`,
  "2026-02-14": `<?xml version="1.0" encoding="UTF-8"?><svg id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg" width="193.48" height="118.25" viewBox="0 0 19.35 11.82"><path d="M19.33,1.86v-.04s.01-.03.01-.04v-.08s0-.01,0-.02c0-.01,0-.03-.01-.04,0-.01,0-.02,0-.03,0,0-.01-.01-.01-.02,0-.01-.01-.03-.02-.04,0,0,0-.01,0-.01,0,0-.01-.01-.02-.02-.01-.01-.03-.03-.04-.04-.01,0-.02-.02-.04-.03s-.03-.01-.04-.02-.03-.01-.05-.02c-.01,0-.03,0-.04-.01-.01,0-.03,0-.04,0h-.08c-.3.05-.61.06-.9.01-.56-.09-.97-.34-1.23-.54-.15-.12-.38-.09-.5.06-.07.09-.15.23.06.5.35.27.75.48,1.17.6l-1.62.75c-.19-.61-.69-1.4-1.18-1.82-1.76-1.5-3.42.16-4.81,1.95-1.02-2.37-1.8-2.9-2.72-2.9-1.05,0-2.04.41-2.78,1.15-1.51,1.51-1.53,3.98-.04,5.53l.03.04.91.91-.54.25-1.43-.88h-.03s-.05-.03-.07-.04-.04-.01-.06-.01h-.07s-.05,0-.07.02c-.01,0-.02,0-.03,0L.2,8.28s-.02.01-.03.02c-.02.01-.04.03-.06.04s-.04.03-.05.05c0,0-.02.01-.02.03,0,.01,0,.02-.01.03-.01.02-.02.04-.03.07,0,.02-.01.04-.01.06v.07s0,.05.02.07c0,.01,0,.02,0,.03,0,.01.01.03.03.04l.02.03s.06.06.09.09l1.39.85-.25,1.61v.1s0,.05.02.07c0,.01,0,.02,0,.03,0,.01.02.03.03.04l.02.03s.05.06.09.08h0s.07.03.11.04c0,0,.01,0,.01,0,.02,0,.04,0,.06,0,.05,0,.09-.01.14-.03h.01l2.82-1.3s.02-.01.03-.02c.03-.01.05-.03.07-.05.01-.01.03-.03.04-.04.01-.02.03-.04.04-.06,0-.02.01-.04.02-.06,0-.01.01-.02.01-.04l.26-1.65.78-.36,3.55,3.55c.07.07.16.1.25.1s.18-.04.25-.1l5.01-5.01s.03-.03.03-.03c0,0,.01-.02.02-.03h0c.71-.73,1.1-1.7,1.1-2.72,0-.15-.01-.3-.03-.44l1.77-.81c-.18.4-.29.83-.31,1.28,0,.2.14.37.34.37h.02c.19,0,.35-.15.36-.34.01-.32.09-.8.39-1.28.16-.26.36-.48.6-.68,0,0,.01-.01.02-.02l.03-.03s.02-.03.03-.04c0-.01.01-.03.02-.04s.01-.03.01-.04h.01ZM14.5,6.15l-.07.07-2.53,2.53-2.22,2.22-3.11-3.11,2.13-.97c.05.13.32.57.51.63.1,0,.27-.05.33-.16.08-.13-.05-.59-.25-1.04-.24-.52-.47-1.18-.81-1.21-.19-.01-.43.09-.44.29s.25.74.3.86l-2.3,1.06-1.11-1.11s-.01-.01-.02-.02l-.02-.02c-1.21-1.25-1.19-3.27.05-4.5.61-.61,1.41-.94,2.28-.94s1.87,2.35,2.47,2.92c0,0,0,0,.01,0l.04.03s.03.02.04.03c0,0,0,0,.01,0,.01,0,.03,0,.04.01.02,0,.03.01.05.01h.1s.03,0,.05-.01c.01,0,.03,0,.04-.01,0,0,0,0,.01,0,.01,0,.03-.02.04-.03.01-.01.03-.02.04-.03,0,0,0,0,.01,0,1.25-1.21,2.54-3.56,4.06-2.18.61.61,1.15,1.62,1.15,2.48s-.32,1.63-.87,2.2h0Z" /></svg>`,
  "2026-03-17": `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1024 1025"><path fill="currentColor" d="M791 485q149 54 202 105q14 14 22.5 38t8.5 55t-17 67.5t-51 70.5q-45 44-100.5 62.5t-96 12.5t-53.5-28q-25-42-72-114t-84-131q10 92 18 203t8 135q0 27-18.5 45.5t-45 18.5t-45.5-18.5t-19-45.5q0-25 8-140.5T475 613q-38 58-86 128.5T317 852q-11 16-36.5 28T222 896t-73.5-9.5t-75-45.5t-53-73t-20-77t6-65T28 584q31-29 99.5-60.5T279 466q-43-15-96.5-30t-91-27.5T22 377Q6 367 2.5 336T8 266t33-84t58-80.5t77.5-60t81-34t68-6.5T368 18q83 102 142 291q46-132 136-286q9-17 44-20t79 6.5t93.5 34T947 102q34 34 53.5 77t22 80t-4.5 66.5t-21 43.5q-57 56-206 116z"/></svg>`,
  "2026-04-05": `<?xml version="1.0" encoding="UTF-8"?><svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" width="123.25" height="209.74" viewBox="0 0 12.33 20.97"><g id="Layer_1-2"><path d="M10.81,13.49c-.31-1.18-1.01-2.22-1.99-2.95,1.1-1.35,1.97-2.88,2.56-4.52.66-1.8.97-3.71.93-5.63,0-.23-.2-.4-.43-.39-.11,0-.21.05-.29.13-2.38,2.73-3.73,6.21-3.83,9.83-1.04-.42-2.2-.42-3.23,0-.04-1.68-.36-3.34-.93-4.92C2.96,3.25,1.97,1.58.72.13.56-.03.3-.05.14.11.05.18,0,.28,0,.4c-.07,3.69,1.17,7.28,3.5,10.15-.98.73-1.69,1.76-2.01,2.95-.21.8-.55,1.56-1.01,2.25-.29.42-.46.93-.47,1.44,0,2.09,2.74,3.79,6.12,3.79s6.11-1.7,6.11-3.79c0-.52-.17-1.02-.47-1.44-.44-.69-.77-1.45-.96-2.25ZM3.41,16.32c-.42,0-.76-.34-.76-.76,0-.42.34-.76.76-.76.42,0,.76.34.76.76s-.34.76-.76.76h0ZM6.97,17.72l-.18.19h0c-.33.31-.85.31-1.17,0h0l-.19-.19c-.08-.09-.11-.21-.07-.33.05-.11.16-.19.28-.19h1.12c.12,0,.23.07.28.19.05.11.02.25-.07.34h0ZM8.9,16.32c-.42,0-.76-.34-.76-.76,0-.42.34-.76.76-.76.42,0,.76.34.76.76s-.34.76-.76.76h0Z" /></g></svg>`,
  "2026-04-22": `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 15a6.96 6.96 0 0 1-2.769-.57l3.643-4.098A.503.503 0 0 0 9 10V8.5a.5.5 0 0 0-.5-.5C6.735 8 4.872 6.165 4.854 6.146A.5.5 0 0 0 4.5 6h-2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .276.447L4 10.809v2.936A6.992 6.992 0 0 1 1 8a6.97 6.97 0 0 1 .674-3H3.5c.133 0 .26-.053.354-.146l2-2A.5.5 0 0 0 6 2.5V1.29A6.989 6.989 0 0 1 8 1c1.1 0 2.141.254 3.067.706A2.98 2.98 0 0 0 10 3.999c0 .801.312 1.555.879 2.121a2.994 2.994 0 0 0 2.268.875c.216.809.605 2.917-.131 5.818a.466.466 0 0 0-.013.082a6.979 6.979 0 0 1-5.002 2.104z"/></svg>`,
  "2026-05-10": `<?xml version="1.0" encoding="UTF-8"?><svg id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg" width="151.43" height="163.54" viewBox="0 0 15.14 16.35"><path d="M8.89,7.72c-.12.1-.26.16-.41.16-.17,0-.33-.07-.45-.2l-1.93-2.14,1.71,6.35c.03.12-.06.23-.18.23H1.45c-.12,0-.21-.11-.18-.23l1.71-6.35-1.93,2.14c-.22.25-.61.27-.86.05-.25-.22-.27-.61-.05-.86l2.73-3.03c.11-.13.28-.2.45-.2h2.42c.17,0,.34.07.45.2l2.73,3.03c.22.25.2.63-.04.86Z" /><path d="M13.02,7.87c0,.67-.54,1.21-1.21,1.21s-1.21-.54-1.21-1.21.54-1.21,1.21-1.21,1.21.54,1.21,1.21Z" /><path d="M1.29,3.09c.64-.7.5-2.04,1.84-2.09.21-.58.76-1,1.42-1,.84,0,1.51.68,1.51,1.51s-.68,1.51-1.51,1.51c-.68,0-1.25-.45-1.44-1.07-.76.29-.64,1.88-1.75,1.42-.12-.05-.15-.2-.06-.29Z" /><path d="M6.74,12.61c.09,1.17.22,3.01.22,3.01.03.4-.25.74-.6.74-.31,0-.58-.27-.6-.62l-.23-3.12h1.22Z" /><path d="M3.56,12.61c-.08,1.13-.23,3.12-.23,3.12-.03.36-.29.62-.6.62-.35,0-.64-.34-.6-.74,0,0,.14-1.84.22-3.01h1.22Z" /><path d="M14.97,12.54c-.12.12-.27.18-.43.18s-.31-.06-.43-.18l-.78-.78v1.53l.3,2.39c.04.33-.19.63-.53.68-.33.04-.64-.19-.68-.53l-.24-1.89h-.75l-.24,1.89c-.04.33-.35.57-.68.53-.33-.04-.57-.34-.53-.68l.3-2.39v-2.67l-1.55-1.03c-.28-.19-.35-.56-.17-.84.19-.28.56-.35.84-.17l1.66,1.11h1.63c.16,0,.31.06.43.18l1.82,1.82c.24.24.24.62,0,.86Z" /></svg>`,
  "2026-06-21": `<?xml version="1.0" encoding="UTF-8"?><svg id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg" width="148.27" height="166.8" viewBox="0 0 14.83 16.68"><path d="M12.66,8.03c0,.68-.55,1.24-1.24,1.24s-1.24-.55-1.24-1.24.55-1.24,1.24-1.24,1.24.55,1.24,1.24Z" /><path d="M14.65,12.79c-.12.12-.28.18-.44.18s-.32-.06-.44-.18l-.8-.8v1.56l.3,2.43c.04.34-.2.65-.54.69-.33.04-.65-.2-.69-.54l-.24-1.93h-.76l-.24,1.93c-.04.34-.36.58-.69.54-.34-.04-.58-.35-.54-.69l.3-2.43v-2.72l-1.58-1.05c-.28-.19-.36-.57-.17-.86.19-.28.57-.36.86-.17l1.7,1.13h1.67c.16,0,.32.07.44.18l1.85,1.85c.24.24.24.63,0,.87Z" /><path d="M5.87,1.54c0,.85-.69,1.54-1.54,1.54s-1.54-.69-1.54-1.54.69-1.54,1.54-1.54,1.54.69,1.54,1.54Z" /><path d="M8.39,7.92c-.11.08-.23.11-.35.11-.19,0-.39-.09-.51-.26l-1.35-1.92v4.65l.31,5.54c.02.34-.24.63-.58.65-.01,0-.02,0-.04,0-.33,0-.6-.25-.62-.58l-.28-4.98h-1.3l-.28,4.98c-.02.33-.29.58-.62.58-.01,0-.02,0-.04,0-.34-.02-.6-.31-.58-.65l.31-5.54v-4.65l-1.35,1.92c-.2.28-.58.35-.86.15-.28-.2-.35-.58-.15-.86l2.16-3.09c.12-.17.3-.26.51-.26h3.09c.2,0,.39.1.51.26l2.16,3.09c.2.28.13.66-.15.86Z" /></svg>`,
  "2026-10-31": `<?xml version="1.0" encoding="UTF-8"?><svg id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg" width="170.28" height="149.43" viewBox="0 0 17.03 14.94"><path d="M6.6,14.62c.63.24,1.31.32,1.94.32s1.32-.09,1.95-.32c.02-.01.04-.02.06-.02,1.43-.57,2.62-1.94,2.62-4.95s-1.11-5.34-2.69-6.47c0,0,0,0,0,0-.59-.42-1.24-.65-1.93-.65s-1.33.23-1.91.64c-.01,0-.02.02-.03.02-1.59,1.13-2.69,3.6-2.69,6.47s1.19,4.38,2.61,4.94c.03,0,.05.02.08.03h0Z" /><path d="M17.03,9.51c0-3.58-1.89-6.5-4.22-6.5-.49,0-.97.13-1.43.39,1.44,1.22,2.41,3.5,2.41,6.11s-.96,4.01-2.11,4.71c.35.07.73.12,1.13.12,1.93,0,4.22-.84,4.22-4.83h0Z" /><path d="M3.34,9.49c0-2.61,1-4.89,2.47-6.11-.47-.26-.97-.39-1.47-.39C1.95,2.99,0,5.91,0,9.49c0,3.99,2.36,4.83,4.34,4.83.41,0,.8-.04,1.16-.12-1.19-.7-2.17-2.07-2.17-4.71h0Z" /><path d="M9.08,2.33v-.55c0-.61.19-1.19.54-1.68l.07-.1h-.51c-.65,0-1.17.52-1.17,1.17v1.16c.18-.03.35-.05.54-.05s.36.02.54.05h0Z" /></svg>`,
  "2026-12-31": `<svg height="200px" width="200px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g> <path class="st0" d="M421.419,129.61c4.908-0.017,9.895-1.801,13.783-5.352l52.474-47.836c4.137-3.768,6.535-9.07,6.663-14.654 l0.009-0.473c0-5.419-2.145-10.629-5.991-14.463l-23.179-23.183c-3.85-3.858-9.061-5.991-14.475-6l-0.469,0.008l0.004,0.008 c-5.606,0.124-10.891,2.522-14.666,6.655l-47.832,52.474c-3.552,3.892-5.348,8.871-5.344,13.783c0,5.211,2.025,10.504,6,14.463 l18.561,18.561C410.926,127.568,416.199,129.593,421.419,129.61z M398.202,90.577c0-1.144,0.381-2.232,1.211-3.136l47.836-52.474 c0.872-0.946,2.071-1.494,3.327-1.51l0.129-0.017c0,0,0,0,0.004,0c1.236,0.017,2.418,0.489,3.282,1.369l23.196,23.192 c0.871,0.863,1.36,2.058,1.373,3.286l-0.013,0.124c-0.024,1.261-0.568,2.481-1.514,3.344l-52.47,47.828 c-0.908,0.829-1.983,1.211-3.14,1.219c-1.216-0.008-2.382-0.448-3.303-1.369L399.562,93.88 C398.642,92.951,398.206,91.789,398.202,90.577z"></path> <polygon class="st0" points="452.004,60.042 451.884,60.067 451.987,60.059 "></polygon> <path class="st0" d="M319.241,145.674c0,0-1.444,1.444-3.866,3.867c-4.186-3.303-10.244-3.062-14.119,0.796 c-3.858,3.867-4.095,9.933-0.805,14.123c-14.077,14.073-32.153,32.154-39.725,39.721c-18.869,18.877-81.201-5.717-151.034,64.116 c-45.302,45.306-77.384,77.385-92.482,92.486c-33.97,33.97-14.21,61.287,29.254,104.75c43.459,43.464,70.783,63.228,104.745,29.258 c15.106-15.102,47.189-47.189,92.486-92.486c69.833-69.833,45.243-132.166,64.12-151.05c7.563-7.56,25.64-25.64,39.725-39.713 c4.186,3.294,10.247,3.062,14.114-0.805c3.867-3.867,4.099-9.932,0.8-14.114c2.415-2.415,3.863-3.867,3.863-3.867 c7.551-7.551,7.708-14.936-12.218-34.867C334.186,137.973,326.792,138.123,319.241,145.674z M97.424,414.569 c-15.106-67.942-18.876-67.942,37.75-124.565c5.659,28.312,20.753,35.862,54.732,32.088c-3.78,33.978,3.776,49.072,32.083,54.731 C165.365,433.446,165.369,429.67,97.424,414.569z"></path> <polygon class="st0" points="367.75,9.277 348.291,0.001 314.644,107.546 326.668,111.936 "></polygon> <polygon class="st0" points="502.719,144.247 400.06,185.329 404.463,197.352 512,163.705 "></polygon> </g> </g></svg>`,
  "2026-04-03": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><path d="M10 21h4v-9h5v-4h-5v-5h-4v5h-5v4h5z" /></svg>`,
  "2026-09-07": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon"><path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd"/><path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z"/><path fill-rule="evenodd" d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>`,
};

var MARKS_MAP = {
  "2026-01-01": "New Year's Day",
  "2026-04-03": "Good Friday",
  "2026-05-18": "Victoria Day",
  "2026-07-01": "Canada Day",
  "2026-09-07": "Labour Day",
  "2026-10-12": "Thanksgiving Day",
  "2026-11-11": "Remembrance Day",
  "2026-12-25": "Christmas Day",
};

// simple HTML convenience functions
//
var H = {
  text: function (txt) {
    return document.createTextNode(txt);
  },
  div: function () {
    return document.createElement("div");
  },
  tr: function () {
    return document.createElement("tr");
  },
  th: function (v) {
    let th = document.createElement("th");
    if (typeof v !== "undefined") {
      th.innerHTML = v;
    }
    return th;
  },
  td: function () {
    return document.createElement("td");
  },
  span: function (v, _class) {
    let s = document.createElement("span");
    if (typeof v !== "undefined") {
      s.innerHTML = v;
    }
    if (typeof _class !== "undefined") {
      s.classList.add(_class);
    }
    return s;
  },
};

// Probably overkill but have parameters to fiddle with the weekend text, weekday text,
// date (day in month) text, month text, week number (if specified) and dates that fall
// on the weekend (day in month that are also weekends).
// Logic is in each of the render functions but the idea is that date stylings happens
// first then weekend_date stylings are applied.
//
// ele is the HTML element that class stylings are being applied.
// _type is one of "weekend", "weekday", "date", "month", "week", "weekend_date"
//
// _type is checked for validity from the `valid_types` array.
// If not found, returns.
//
// If found, each of the parameter variables is enumerated by tacking on the suffix
// in the `sfx_param` array and testing to see if specified in the GRIDCAL_PARAM list.
// If found, the class stylings are applied to the HTML element using the `class_key`
// value specified.
//
// Styling functions removed

// Moon phase calculation functions
// Reference: Known new moon on Jan 6, 2000, 18:14 UTC (Julian Day 2451550.26)
//
function calculateLunarAge(year, month, day) {
  // Calculate days since reference new moon (Jan 6, 2000)
  //
  let refDate = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
  let targetDate = new Date(Date.UTC(year, month, day, 0, 0, 0));

  let daysSince = (targetDate - refDate) / (1000 * 60 * 60 * 24);

  // Lunar synodic period (new moon to new moon)
  //
  let lunarCycle = 29.53058867;

  // Calculate lunar age (days since last new moon)
  //
  let lunarAge = daysSince % lunarCycle;
  if (lunarAge < 0) {
    lunarAge += lunarCycle;
  }

  return lunarAge;
}

function getMoonPhase(lunarAge) {
  // Returns phase index 0-7
  // 0: New Moon, 1: Waxing Crescent, 2: First Quarter, 3: Waxing Gibbous
  // 4: Full Moon, 5: Waning Gibbous, 6: Last Quarter, 7: Waning Crescent
  //
  let phase = Math.round((lunarAge / 29.53058867) * 8) % 8;

  return phase;
}

function getMoonIllumination(lunarAge) {
  // Returns illumination percentage 0-100
  let cycle = 29.53058867;
  let percent = ((1 - Math.cos((lunarAge / cycle) * 2 * Math.PI)) / 2) * 100;
  return Math.round(percent);
}

function getMoonPhaseName(phase) {
  const names = [
    "New",
    "Wax Cres",
    "First Qtr",
    "Wax Gibb",
    "Full",
    "Wan Gibb",
    "Last Qtr",
    "Wan Cres",
  ];
  return names[phase];
}

function getMoonPhaseSymbol(phase) {
  const symbols = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
  return symbols[phase];
}

// Counter for unique mask IDs
//
var MOON_PHASE_COUNTER = 0;

function createMoonPhaseCSS(phase, lunarAge) {
  // Create an inline SVG moon phase visualization with unique mask IDs
  //
  let span = H.span("", "moon-phase");
  let uid = ++MOON_PHASE_COUNTER;

  // SVG moon phase definitions using masks for curved terminators
  //
  const svgs = [
    // 0: New Moon
    //
    "<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><circle cx='32' cy='32' r='30' fill='#404040'/></svg>",

    // 1: Waxing Crescent
    //
    `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><defs><mask id='m1-${uid}'><circle cx='32' cy='32' r='30' fill='white'/><circle cx='22' cy='32' r='30' fill='black'/></mask></defs><circle cx='32' cy='32' r='30' fill='#404040'/><circle cx='32' cy='32' r='30' fill='#d0d0d0' mask='url(#m1-${uid})'/></svg>`,

    // 2: First Quarter
    //
    `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><defs><mask id='m2-${uid}'><rect x='32' y='0' width='32' height='64' fill='white'/></mask></defs><circle cx='32' cy='32' r='30' fill='#404040'/><circle cx='32' cy='32' r='30' fill='#d0d0d0' mask='url(#m2-${uid})'/></svg>`,

    // 3: Waxing Gibbous
    //
    `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><defs><mask id='m3-${uid}'><circle cx='32' cy='32' r='30' fill='white'/><circle cx='42' cy='32' r='30' fill='black'/></mask></defs><circle cx='32' cy='32' r='30' fill='#d0d0d0'/><circle cx='32' cy='32' r='30' fill='#404040' mask='url(#m3-${uid})'/></svg>`,

    // 4: Full Moon
    //
    "<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><circle cx='32' cy='32' r='30' fill='#d0d0d0'/></svg>",

    // 5: Waning Gibbous
    //
    `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><defs><mask id='m5-${uid}'><circle cx='32' cy='32' r='30' fill='white'/><circle cx='22' cy='32' r='30' fill='black'/></mask></defs><circle cx='32' cy='32' r='30' fill='#d0d0d0'/><circle cx='32' cy='32' r='30' fill='#404040' mask='url(#m5-${uid})'/></svg>`,

    // 6: Last Quarter (Third Quarter)
    //
    `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><defs><mask id='m6-${uid}'><rect x='0' y='0' width='32' height='64' fill='white'/></mask></defs><circle cx='32' cy='32' r='30' fill='#404040'/><circle cx='32' cy='32' r='30' fill='#d0d0d0' mask='url(#m6-${uid})'/></svg>`,

    // 7: Waning Crescent
    //
    `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><defs><mask id='m7-${uid}'><circle cx='32' cy='32' r='30' fill='white'/><circle cx='42' cy='32' r='30' fill='black'/></mask></defs><circle cx='32' cy='32' r='30' fill='#404040'/><circle cx='32' cy='32' r='30' fill='#d0d0d0' mask='url(#m7-${uid})'/></svg>`,
  ];

  span.innerHTML = svgs[phase];
  return span;
}

function renderMoonPhase(td, year, month, day) {
  if (!GRIDCAL_PARAM.show_moon_phase) {
    return;
  }

  let lunarAge = calculateLunarAge(year, month, day);
  let phase = getMoonPhase(lunarAge);

  // If only showing phase changes, check if phase is different from previous day
  //
  if (GRIDCAL_PARAM.moon_phase_display === "changes") {
    // Calculate previous day
    //
    let prevDate = new Date(year, month, day - 1);
    let prevLunarAge = calculateLunarAge(
      prevDate.getFullYear(),
      prevDate.getMonth(),
      prevDate.getDate()
    );
    let prevPhase = getMoonPhase(prevLunarAge);

    // Skip if phase hasn't changed
    //
    if (phase === prevPhase) {
      return;
    }
  }

  let moonElement;

  if (GRIDCAL_PARAM.moon_phase_style === "symbol") {
    moonElement = H.span(getMoonPhaseSymbol(phase), "moon-symbol");
  } else if (GRIDCAL_PARAM.moon_phase_style === "name") {
    moonElement = H.span(getMoonPhaseName(phase), "moon-name");
  } else {
    // Default to CSS
    //
    moonElement = createMoonPhaseCSS(phase, lunarAge);
  }

  if (GRIDCAL_PARAM.moon_phase_position === "inline") {
    // Add inline after a space
    //
    moonElement.classList.add("moon-inline");
    td.appendChild(H.text(" "));
    td.appendChild(moonElement);
  } else {
    // Add below in its own container
    //
    let moonContainer = H.div();
    moonContainer.classList.add("moon-container");
    moonContainer.appendChild(moonElement);
    td.appendChild(moonContainer);
  }
}

// localized_day and localized_month restored with default format
function localized_day(locale, day_idx) {
  let iday = 17 + day_idx;
  let s = "1995-12-" + iday.toString() + "T12:00:01Z";
  let d = new Date(s);
  return d.toLocaleDateString(locale, {
    weekday: "short",
  });
}

function localized_month(locale, mo_idx) {
  let imo = 1 + mo_idx;
  let imo_str = imo < 10 ? "0" + imo.toString() : imo.toString();
  let s = "1995-" + imo_str + "-18T12:00:01Z";
  let d = new Date(s);
  return d.toLocaleDateString(locale, { month: "short" });
}

function neatocal_default(params) {
  let { w_holidays = false, w_marks = false } = params;

  let year = parseInt(GRIDCAL_PARAM.year);
  let start_mo = GRIDCAL_PARAM.start_month;
  let n_mo = GRIDCAL_PARAM.n_month;

  let tbody = document.getElementById("ui_tbody");
  tbody.innerHTML = "";

  // Each row is a month
  for (let i_mo = start_mo; i_mo < start_mo + n_mo; i_mo++) {
    let tr = H.tr();

    if (GRIDCAL_PARAM.cell_height) {
      tr.style.height = GRIDCAL_PARAM.cell_height;
    }

    let cur_year = year + Math.floor(i_mo / 12);
    let cur_mo = i_mo % 12;
    let nday_in_mo = new Date(cur_year, cur_mo + 1, 0).getDate();

    // Month label cell
    let th = H.th(GRIDCAL_PARAM.month_code[cur_mo]);
    tr.appendChild(th);

    // Day cells
    for (let day = 1; day <= 31; day++) {
      let td = H.td();
      let span_day_box = H.span();
      let span_cell_box = H.span();
      td.style.width = (100 / 32).toString() + "%";
      span_day_box.classList.add("day_box");
      span_cell_box.classList.add("cell_box");

      if (day <= nday_in_mo) {
        let dt = new Date(cur_year, cur_mo, day);
        let weekday = GRIDCAL_PARAM.weekday_code[dt.getDay()];

        // Add ID for interactivity lookup
        let loop_date_str = fmt_date(cur_year, cur_mo + 1, day);
        td.id = "ui_" + loop_date_str;

        if (GRIDCAL_PARAM.weekend_days.includes(dt.getDay())) {
          td.classList.add("weekend");
        }

        // Check for passed days and current day, conditional on localStorage key
        if (localStorage.getItem("gridcal_day_enabled") === "true") {
          let today = new Date();
          today.setHours(0, 0, 0, 0);
          if (dt < today) {
            td.classList.add("passed-day");
          } else if (dt.getTime() === today.getTime()) {
            td.classList.add("current-day");
          }
        }

        let mark_box = H.div();
        let mark_box_inner = H.div();
        mark_box_inner.classList.add("mark_box_inner");
        mark_box.appendChild(mark_box_inner);
        mark_box.classList.add("mark_box");

        let yyyy_mm_dd = loop_date_str;

        if (yyyy_mm_dd in MARKS_MAP && w_marks) {
          mark_box_inner.innerHTML = FULL_CIRCLE_SVG;
        }

        let txt = H.div();
        if (yyyy_mm_dd in SVG_MAP && w_holidays) {
          let span = H.span("", "day_icon");
          span.innerHTML = SVG_MAP[yyyy_mm_dd];
          txt.classList.add("cell_text");
          txt.appendChild(span);
        }
        let span_date = H.span(day.toString(), "date");
        let span_day = H.span(weekday, "day");

        span_day_box.appendChild(span_day);
        span_day_box.appendChild(span_date);

        span_cell_box.appendChild(mark_box);
        span_cell_box.appendChild(txt);
        span_cell_box.appendChild(span_day_box);

        td.appendChild(span_cell_box);

        if (dt.getDay() === 1 && GRIDCAL_PARAM.show_week_numbers) {
          let span_week_no = H.span(getISOWeekNumber(dt), "date");
          span_week_no.style.float = "right";
          td.appendChild(span_week_no);
        }

        renderMoonPhase(td, cur_year, cur_mo, day);
      } else {
        td.classList.add("empty-day");
      }

      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }
}

function fmt_date(y, m, d) {
  let res = y.toString() + "-";
  if (m < 10) {
    res += "0";
  }
  res += m.toString() + "-";
  if (d < 10) {
    res += "0";
  }
  res += d.toString();
  return res;
}

function getISOWeekNumber(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );

  // Set to nearest Thursday: current date + 4 - current day number (Mon=1, Sun=7)
  //

  // Convert Sunday from 0 to 7
  //
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);

  // Get first day of year
  //
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

  // Calculate full weeks from year start to nearest Thursday
  //
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

// Interactivity & Persistence (Milestone 1)

var NEATOCAL_MARKS_KEY = "gridcal_marks";

function loadMarks() {
  try {
    let marks = localStorage.getItem(NEATOCAL_MARKS_KEY);
    return marks ? JSON.parse(marks) : {};
  } catch (e) {
    console.error("Failed to load marks", e);
    return {};
  }
}

function saveMark(date, state) {
  let marks = loadMarks();
  if (state === 0) {
    delete marks[date];
  } else {
    marks[date] = state;
  }
  localStorage.setItem(NEATOCAL_MARKS_KEY, JSON.stringify(marks));
}

function applyMarkClasses(ele, state) {
  ele.classList.remove("mark-1", "mark-2", "mark-3");
  if (state === 1) ele.classList.add("mark-2"); // outlined dot
  if (state === 2) ele.classList.add("mark-3"); // filled dot
}

const GRIDCAL_TEXT_LIMIT = 120;

function handleDayClick(e) {
  // Find the closest TD
  let td = e.target.closest("td");
  if (!td || td.classList.contains("empty-day")) return;

  // Get date from ID
  let dateId = td.id.replace("ui_", "");

  // Get current state
  let currentState = 0;
  if (td.classList.contains("mark-2")) currentState = 1; // outlined
  else if (td.classList.contains("mark-3")) currentState = 2; // filled

  // Calculate next state (cycle 0 -> 1 -> 2 -> 0)
  let nextState = (currentState + 1) % 3;

  // Apply visual change
  applyMarkClasses(td, nextState);

  // Persist
  saveMark(dateId, nextState);
}

function handleDayContextMenu(e) {
  // e.preventDefault();
  // let td = e.target.closest("td");
  // if (!td || td.classList.contains("empty-day")) return;
  // let dateId = td.id.replace("ui_", "");
  // // Prevent multiple editors
  // if (td.querySelector("textarea")) return;
  // let existing = GRIDCAL_PARAM.data[dateId] || "";
  // let textarea = document.createElement("textarea");
  // textarea.classList.add("cell-editor");
  // textarea.maxLength = GRIDCAL_TEXT_LIMIT;
  // textarea.value = existing;
  // let cancelled = false;
  // textarea.addEventListener("keydown", (ev) => {
  //   if (ev.key === "Enter") {
  //     ev.preventDefault();
  //     textarea.blur();
  //   }
  //   if (ev.key === "Escape") {
  //     ev.preventDefault();
  //     cancelled = true;
  //     neatocal_render();
  //   }
  // });
  // textarea.addEventListener("blur", () => {
  //   if (cancelled) return;
  //   let val = textarea.value.trim();
  //   if (val) {
  //     GRIDCAL_PARAM.data[dateId] = val;
  //   } else {
  //     delete GRIDCAL_PARAM.data[dateId];
  //   }
  //   localStorage.setItem("gridcal_data", JSON.stringify(GRIDCAL_PARAM.data));
  //   neatocal_render();
  // });
  // td.appendChild(textarea);
  // textarea.focus();
}

function neatocal_post_process() {
  let x = document.getElementsByClassName("weekend");
  for (let i = 0; i < x.length; i++) {
    x[i].classList.add("weekend-highlight");
  }

  // Highlight today's date
  if (GRIDCAL_PARAM.today_highlight_color) {
    let today = new Date();
    let today_str = fmt_date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
    let today_ele = document.getElementById("ui_" + today_str);
    if (today_ele) {
      today_ele.style.background = GRIDCAL_PARAM.today_highlight_color;
    }
  }

  if ("color_cell" in GRIDCAL_PARAM) {
    let color_cell = GRIDCAL_PARAM.color_cell;

    for (let i = 0; i < color_cell.length; i++) {
      let ele = document.getElementById("ui_" + color_cell[i].date);
      if (typeof ele === "undefined" || ele == null) {
        continue;
      }
      ele.style.background = color_cell[i].color;
    }
  }

  // Milestone 1: Load and apply saved marks
  let marks = MARKS_MAP;
  for (let date in marks) {
    let ele = document.getElementById("ui_" + date);
    if (ele) {
      applyMarkClasses(ele, 1);
    }
  }

  // Attach event listeners
  let tbody = document.getElementById("ui_tbody");
  tbody.removeEventListener("click", handleDayClick);
  tbody.removeEventListener("contextmenu", handleDayContextMenu);
  // tbody.addEventListener("click", handleDayClick);
  // tbody.addEventListener("contextmenu", handleDayContextMenu);
}

function loadXHR(url, _cb, _errcb) {
  let xhr = new XMLHttpRequest();

  if (typeof _errcb !== "undefined") {
    xhr.addEventListener("error", _errcb);
  }

  xhr.addEventListener("loadend", _cb);
  xhr.open("GET", url);
  xhr.send();
  return xhr;
}

function neatocal_parse_data_error(raw) {
  console.log("error:", raw);
}

function neatocal_override_param(param, data) {
  let admissible_param = [
    "help",

    "weekend_days",

    "language",

    "show_moon_phase",
    "moon_phase_style",
    "moon_phase_position",
    "moon_phase_display",

    "cell_height",
    "highlight_color",
    "today_highlight_color",
  ];

  for (let idx = 0; idx < admissible_param.length; idx++) {
    let key = admissible_param[idx];

    if (key in data) {
      param[key] = data[key];
    }
  }

  if ("color_cell" in data) {
    param.color_cell = data.color_cell;
  }

  return param;
}

function neatocal_parse_data(raw) {
  if (raw.type == "loadend") {
    if (raw.target.readyState == 4 && raw.target.status == 200) {
      try {
        let json_data = JSON.parse(raw.target.response);
        GRIDCAL_PARAM.data = json_data;

        if (typeof GRIDCAL_PARAM.data.param !== "undefined") {
          neatocal_override_param(GRIDCAL_PARAM, GRIDCAL_PARAM.data.param);
        }
      } catch (e) {
        console.log("error parsing data file:", e);
      }

      neatocal_render();
    }

    // default to render
    //
    if (raw.target.readyState == 4 && raw.target.status == 404) {
      neatocal_render();
    }
  }
}

function neatocal_init(params) {
  let sp = new URLSearchParams(window.location.search);

  // peel off parameters from URL
  //
  let highlight_color_param = sp.get("hl_color");
  let background_color_param = sp.get("bg_color");
  let text_color_param = sp.get("text_color");

  let help_param = sp.get("help");
  let year_param = sp.get("year");
  let start_month_param = sp.get("start_month");
  let n_month_param = sp.get("n_month");
  let start_day_param = sp.get("start_day");
  let today_highlight_color_param = sp.get("today_highlight_color");
  let cell_height_param = sp.get("cell_height");
  let weekday_code_param = sp.get("weekday_code");
  let month_code_param = sp.get("month_code");
  let language_param = sp.get("language");
  let show_week_numbers_param = sp.get("show_week_numbers");

  let weekend_days_param = sp.get("weekend_days");

  // Moon phase parameters
  //
  let show_moon_phase_param = sp.get("show_moon_phase");
  let moon_phase_style_param = sp.get("moon_phase_style");
  let moon_phase_position_param = sp.get("moon_phase_position");
  let moon_phase_display_param = sp.get("moon_phase_display");

  // fiddly stylings
  //
  // fiddly stylings removed

  // JSON data file
  //
  let datafn_param = sp.get("data");

  //---

  let data_fn = "";
  if (datafn_param != null && typeof datafn_param !== "undefined") {
    data_fn = datafn_param;
  }
  GRIDCAL_PARAM.data_fn = data_fn;

  //---

  let year = new Date().getFullYear();
  if (year_param != null && typeof year_param !== "undefined") {
    year = year_param;
  }
  GRIDCAL_PARAM.year = year;

  //---

  // layout logic removed

  //---

  let start_month = GRIDCAL_PARAM.start_month;
  if (start_month_param != null && typeof start_month_param !== "undefined") {
    start_month = parseInt(start_month_param);
    if (isNaN(start_month)) {
      start_month = 0;
    }
  }
  GRIDCAL_PARAM.start_month = start_month;

  //---

  let n_month = GRIDCAL_PARAM.n_month;
  if (n_month_param != null && typeof n_month_param !== "undefined") {
    n_month = parseInt(n_month_param);
    if (isNaN(n_month)) {
      n_month = 0;
    }
  }
  GRIDCAL_PARAM.n_month = n_month;

  //---

  let start_day = GRIDCAL_PARAM.start_day;
  if (start_day_param != null && typeof start_day_param !== "undefined") {
    start_day = parseInt(start_day_param);
    if (isNaN(start_day)) {
      start_day = 0;
    }
  }
  GRIDCAL_PARAM.start_day = start_day;

  //---

  let highlight_color = GRIDCAL_PARAM.highlight_color;
  if (
    highlight_color_param != null &&
    typeof highlight_color_param !== "undefined"
  ) {
    highlight_color = highlight_color_param;
    if (highlight_color.match(/^[\da-fA-F]+/)) {
      highlight_color = "#" + highlight_color;
    }
  }
  GRIDCAL_PARAM.highlight_color = highlight_color;

  //---

  let background_color = GRIDCAL_PARAM.background_color;
  if (
    background_color_param != null &&
    typeof background_color_param !== "undefined"
  ) {
    background_color = background_color_param;
    if (background_color.match(/^[\da-fA-F]+/)) {
      background_color = "#" + background_color;
    }
  }
  GRIDCAL_PARAM.background_color = background_color;

  //---

  let text_color = GRIDCAL_PARAM.text_color;
  if (text_color_param != null && typeof text_color_param !== "undefined") {
    text_color = text_color_param;
    if (text_color.match(/^[\da-fA-F]+/)) {
      text_color = "#" + text_color;
    }
  }
  GRIDCAL_PARAM.text_color = text_color;

  //---

  let today_highlight_color = GRIDCAL_PARAM.today_highlight_color;
  if (
    today_highlight_color_param != null &&
    typeof today_highlight_color_param !== "undefined"
  ) {
    today_highlight_color = today_highlight_color_param;
    if (today_highlight_color.match(/^[\da-fA-F]+/)) {
      today_highlight_color = "#" + today_highlight_color;
    }
  }
  GRIDCAL_PARAM.today_highlight_color = today_highlight_color;

  //---

  let cell_height = GRIDCAL_PARAM.cell_height;
  if (cell_height_param != null && typeof cell_height_param !== "undefined") {
    cell_height = cell_height_param;
  }
  GRIDCAL_PARAM.cell_height = cell_height;

  //---

  // weekday_format / month_format removed

  //---

  // language fills out the month/day codes and happens
  // before so it can be overriden by month day code
  // specification.
  //
  if (language_param != null && typeof language_param !== "undefined") {
    for (let day_idx = 0; day_idx < 7; day_idx++) {
      GRIDCAL_PARAM.weekday_code[day_idx] = localized_day(
        language_param,
        day_idx
      );
    }

    for (let mo_idx = 0; mo_idx < 12; mo_idx++) {
      GRIDCAL_PARAM.month_code[mo_idx] = localized_month(
        language_param,
        mo_idx
      );
    }
  }

  //---

  let weekday_code = GRIDCAL_PARAM.weekday_code;
  if (weekday_code_param != null && typeof weekday_code_param !== "undefined") {
    weekday_code = weekday_code_param.split(",");

    // padd out with blank
    //
    for (let i = weekday_code.length; i < 7; i++) {
      weekday_code.push("");
    }
  }
  GRIDCAL_PARAM.weekday_code = weekday_code;

  //---

  let month_code = GRIDCAL_PARAM.month_code;
  if (month_code_param != null && typeof month_code_param !== "undefined") {
    month_code = month_code_param.split(",");

    // padd out with blank
    //
    for (let i = month_code.length; i < 7; i++) {
      month_code.push("");
    }
  }
  GRIDCAL_PARAM.month_code = month_code;

  //---

  // thanks to https://github.com/fawaz-alesayi/neatocal
  //
  if (weekend_days_param != null && typeof weekend_days_param !== "undefined") {
    let days = weekend_days_param.split(",").map((d) => parseInt(d.trim()));
    GRIDCAL_PARAM.weekend_days = days.filter(
      (d) => !isNaN(d) && d >= 0 && d <= 6
    );
  }

  // hallon-almanackan defaults to showing week numbers.
  // If the showing week numbers is specified, use user specified value,
  // whether true or false, otherwise, leave it alone.
  //
  if (
    show_week_numbers_param != null &&
    typeof show_week_numbers_param !== "undefined"
  ) {
    GRIDCAL_PARAM.show_week_numbers = show_week_numbers_param === "true";
  }

  //---

  // Moon phase parameters
  //
  let show_moon_phase = GRIDCAL_PARAM.show_moon_phase;
  if (
    show_moon_phase_param != null &&
    typeof show_moon_phase_param !== "undefined"
  ) {
    show_moon_phase =
      show_moon_phase_param === "true" || show_moon_phase_param === "1";
  }
  GRIDCAL_PARAM.show_moon_phase = show_moon_phase;

  //---

  let moon_phase_style = GRIDCAL_PARAM.moon_phase_style;
  if (
    moon_phase_style_param != null &&
    typeof moon_phase_style_param !== "undefined"
  ) {
    if (
      moon_phase_style_param === "css" ||
      moon_phase_style_param === "symbol" ||
      moon_phase_style_param === "name"
    ) {
      moon_phase_style = moon_phase_style_param;
    }
  }
  GRIDCAL_PARAM.moon_phase_style = moon_phase_style;

  //---

  let moon_phase_position = GRIDCAL_PARAM.moon_phase_position;
  if (
    moon_phase_position_param != null &&
    typeof moon_phase_position_param !== "undefined"
  ) {
    if (
      moon_phase_position_param === "below" ||
      moon_phase_position_param === "inline"
    ) {
      moon_phase_position = moon_phase_position_param;
    }
  }
  GRIDCAL_PARAM.moon_phase_position = moon_phase_position;

  //---

  let moon_phase_display = GRIDCAL_PARAM.moon_phase_display;
  if (
    moon_phase_display_param != null &&
    typeof moon_phase_display_param !== "undefined"
  ) {
    if (
      moon_phase_display_param === "all" ||
      moon_phase_display_param === "changes"
    ) {
      moon_phase_display = moon_phase_display_param;
    }
  }
  GRIDCAL_PARAM.moon_phase_display = moon_phase_display;

  //---

  // if we have a data file, short circuit to wait till load.
  // neatocal_parse_data will call neatocal_render to render the
  // calendar.
  //
  if (GRIDCAL_PARAM.data_fn) {
    loadXHR(
      GRIDCAL_PARAM.data_fn,
      neatocal_parse_data,
      neatocal_parse_data_error
    );
    return;
  }

  // Load data from localStorage if available and valid, otherwise default to empty object
  try {
    const localData = localStorage.getItem("gridcal_data");
    if (localData) {
      const parsedData = JSON.parse(localData);
      GRIDCAL_PARAM.data =
        parsedData && typeof parsedData === "object" ? parsedData : {};
    } else {
      GRIDCAL_PARAM.data = {};
    }
  } catch (e) {
    console.error("Failed to load gridcal_data from localStorage", e);
    GRIDCAL_PARAM.data = {};
  }

  // Apply highlight color from localStorage if present
  if (highlight_color) {
    const color = highlight_color.startsWith("#")
      ? highlight_color
      : "#" + highlight_color;
    document.documentElement.style.setProperty("--highlight-color", color);
  }

  if (background_color) {
    const bgColor = background_color.startsWith("#")
      ? background_color
      : "#" + background_color;
    document.documentElement.style.setProperty("--bg-page", bgColor);
  }

  if (text_color) {
    const txtColor = text_color.startsWith("#") ? text_color : "#" + text_color;
    document.documentElement.style.setProperty("--text-color", txtColor);
    document.documentElement.style.setProperty("--border-color", txtColor);
  }

  // no data file, just render
  //
  neatocal_render(params);
}

function neatocal_render(params) {
  let cur_start_month = GRIDCAL_PARAM.start_month;
  let month_remain = GRIDCAL_PARAM.n_month;
  let s_year = parseInt(GRIDCAL_PARAM.year);
  let e_year =
    parseInt(GRIDCAL_PARAM.year) +
    Math.floor((cur_start_month + month_remain - 1) / 12);

  let year_fraction_tot = 0;
  let year_fraction = [];
  for (let y = s_year; y <= e_year; y++) {
    let del_mo =
      cur_start_month + month_remain > 12 ? 12 - cur_start_month : month_remain;
    year_fraction.push(del_mo);
    cur_start_month = 0;
    month_remain -= del_mo;

    year_fraction_tot += del_mo;
  }

  for (let i = 0; i < year_fraction.length; i++) {
    year_fraction[i] /= year_fraction_tot;
  }

  // if we only have one year, put it in the center
  // otherwise find the proportion of other years
  //   and adjust the year header appropriately

  let ui_year = document.getElementById("ui_year");
  ui_year.innerHTML = "";

  for (let y = s_year, idx = 0; y <= e_year; y++, idx++) {
    let span = H.span(y.toString(), "year-label");
    span.style.width = (100 * year_fraction[idx]).toString() + "%";

    ui_year.appendChild(span);
  }

  //---

  // Row-wise version supports default layout only
  neatocal_default(params);

  neatocal_post_process();
}
