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
  highlight_color: "#eee",

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

function neatocal_default() {
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

        let yyyy_mm_dd = loop_date_str;
        if (
          yyyy_mm_dd in GRIDCAL_PARAM.data &&
          localStorage.getItem("gridcal_text_enabled") === "true"
        ) {
          let txt = H.div();
          txt.innerHTML = GRIDCAL_PARAM.data[yyyy_mm_dd];
          txt.classList.add("cell_text");
          span_cell_box.appendChild(txt);
          span_cell_box.style.gridTemplateRows = "1fr 20px";
        }

        let span_date = H.span(day.toString(), "date");
        let span_day = H.span(weekday, "day");

        span_day_box.appendChild(span_day);
        span_day_box.appendChild(span_date);
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
  if (state === 1) ele.classList.add("mark-1");
  if (state === 2) ele.classList.add("mark-2");
  if (state === 3) ele.classList.add("mark-3");
}

function handleDayClick(e) {
  // Find the closest TD
  let td = e.target.closest("td");
  if (!td || td.classList.contains("empty-day")) return;

  // Get date from ID
  let dateId = td.id.replace("ui_", "");

  // Get current state
  let currentState = 0;
  if (td.classList.contains("mark-1")) currentState = 1;
  else if (td.classList.contains("mark-2")) currentState = 2;
  else if (td.classList.contains("mark-3")) currentState = 3;

  // Calculate next state (cycle 0 -> 1 -> 2 -> 3 -> 0)
  let nextState = (currentState + 1) % 4;

  // Apply visual change
  applyMarkClasses(td, nextState);

  // Persist
  saveMark(dateId, nextState);
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
  let marks = loadMarks();
  for (let date in marks) {
    let ele = document.getElementById("ui_" + date);
    if (ele) {
      applyMarkClasses(ele, marks[date]);
    }
  }

  // Attach event listener
  let tbody = document.getElementById("ui_tbody");
  // Remove existing listener if any to avoid duplicates (though difficult without named ref,
  // relying on neatocal_post_process usually running once per render)
  tbody.removeEventListener("click", handleDayClick);
  tbody.addEventListener("click", handleDayClick);
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

function neatocal_init() {
  let sp = new URLSearchParams(window.location.search);

  // peel off parameters from URL
  //

  let help_param = sp.get("help");
  let year_param = sp.get("year");
  let start_month_param = sp.get("start_month");
  let n_month_param = sp.get("n_month");
  let start_day_param = sp.get("start_day");
  let highlight_color_param = sp.get("highlight_color");
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
    console.log("Loaded gridcal_data from localStorage:", localData);
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

  // no data file, just render
  //
  neatocal_render();
}

function neatocal_render() {
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
  neatocal_default();

  neatocal_post_process();
}
