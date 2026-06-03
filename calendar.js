/* ══════════════════════════════════════════════════
   NSBE B-Section · Kettering University
   calendar.js — event data + calendar renderer
══════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────
   EDIT YOUR EVENTS HERE
   Format: "YYYY-M-D" (no leading zeros on month/day)
   Types:  "meeting" | "workshop" | "social" | "career"
──────────────────────────────────────────────────*/
const EVENTS = {
  "2026-6-3":  [
    { name: "General Meeting",        time: "6:00 PM", loc: "AB 2-301",        type: "meeting"  }
  ],
  "2026-6-9":  [
    { name: "Resume Workshop",        time: "5:30 PM", loc: "C-Building Lab",  type: "volunteer" },
    { name: "Exec Check-in",          time: "8:00 PM", loc: "Online",          type: "meeting"  }
  ],
  "2026-6-15": [
    { name: "Industry Panel",         time: "4:00 PM", loc: "Mott Auditorium", type: "career"   }
  ],
  "2026-6-18": [
    { name: "End-of-Term Social",     time: "7:00 PM", loc: "Campus Rec",      type: "social"   }
  ],
  "2026-6-22": [
    { name: "General Meeting",        time: "6:00 PM", loc: "AB 2-301",        type: "meeting"  }
  ],
  "2026-6-25": [
    { name: "Scholarship Info Session", time: "5:00 PM", loc: "Online",        type: "career"   }
  ],
  "2026-7-7":  [
    { name: "General Meeting",        time: "6:00 PM", loc: "AB 2-301",        type: "meeting"  }
  ],
  "2026-7-12": [
    { name: "Coding Workshop",        time: "2:00 PM", loc: "CS Lab",          type: "volunteer" }
  ],
  "2026-7-19": [
    { name: "Networking Mixer",       time: "6:30 PM", loc: "IMC",             type: "social"   }
  ],
  "2026-7-26": [
    { name: "Career Fair Prep",       time: "5:00 PM", loc: "AB 1-101",        type: "career"   }
  ],
};

/* ── CALENDAR RENDERER ── */
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const today     = new Date();
let   viewYear  = today.getFullYear();
let   viewMonth = today.getMonth(); // 0-indexed

function buildCalendar(year, month) {
  const grid   = document.getElementById('cal-grid');
  const label  = document.getElementById('cal-label');
  const yearEl = document.getElementById('cal-year');

  grid.innerHTML = '';
  label.childNodes[0].textContent = MONTHS[month] + ' ';
  yearEl.textContent = year;

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells  = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - firstDay + 1;
    const cell   = document.createElement('div');
    cell.className = 'cal-day';

    if (dayNum < 1 || dayNum > daysInMonth) {
      cell.classList.add('empty');
    } else {
      // Highlight today
      if (year === today.getFullYear() && month === today.getMonth() && dayNum === today.getDate()) {
        cell.classList.add('today');
      }

      // Day number
      const numEl = document.createElement('div');
      numEl.className = 'cal-day-num';
      numEl.textContent = dayNum;
      cell.appendChild(numEl);

      // Events for this day
      const key  = `${year}-${month + 1}-${dayNum}`;
      const evts = EVENTS[key];

      if (evts && evts.length) {
        cell.classList.add('has-event');

        // Pip row
        const pipWrap = document.createElement('div');
        pipWrap.className = 'cal-event-pip';
        evts.forEach(ev => {
          const pip = document.createElement('div');
          pip.className = `cal-pip type-${ev.type}`;
          pip.textContent = ev.name;
          pipWrap.appendChild(pip);
        });
        cell.appendChild(pipWrap);

        // Hover tooltip
        const tip = document.createElement('div');
        tip.className = 'cal-tooltip';
        tip.innerHTML = `<div class="tooltip-date">${MONTHS[month].slice(0,3)} ${dayNum}, ${year}</div>`;
        evts.forEach(ev => {
          tip.innerHTML += `
            <div class="tooltip-event">
              <div class="tooltip-event-type type-label-${ev.type}">${ev.type}</div>
              <div class="tooltip-event-name">${ev.name}</div>
              <div class="tooltip-event-time">⏱ ${ev.time}</div>
              <div class="tooltip-event-loc">📍 ${ev.loc}</div>
            </div>`;
        });
        cell.appendChild(tip);

        // Flip tooltip down for first 2 rows so it doesn't clip nav
        if (Math.floor(i / 7) < 2) cell.classList.add('flip-down');
      }
    }

    grid.appendChild(cell);
  }
}

/* ── NAV BUTTONS ── */
document.getElementById('cal-prev').addEventListener('click', () => {
  if (--viewMonth < 0) { viewMonth = 11; viewYear--; }
  buildCalendar(viewYear, viewMonth);
});
document.getElementById('cal-next').addEventListener('click', () => {
  if (++viewMonth > 11) { viewMonth = 0; viewYear++; }
  buildCalendar(viewYear, viewMonth);
});

/* ── INIT ── */
buildCalendar(viewYear, viewMonth);
