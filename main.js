// Shared tutor data used across pages
const tutors = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    subject: "Mathematics",
    expertise: ["Calculus", "Algebra", "Statistics"],
    rate: 850,
    rating: 4.9,
    reviews: 124,
    experience: "8 years",
    qualification: "PhD Mathematics, IIT Delhi",
    badges: ["Top Rated", "IIT Alumni"],
    availability: [1, 2, 3, 5],
    emoji: "👩‍🏫",
    bio: "Specialized in making complex mathematical concepts easy to understand. Former IIT professor with 8 years of tutoring experience."
  },
  {
    id: 2,
    name: "Rahul Mehta",
    subject: "Physics",
    expertise: ["Mechanics", "Electromagnetism", "Optics"],
    rate: 750,
    rating: 4.7,
    reviews: 89,
    experience: "5 years",
    qualification: "M.Sc Physics, BHU",
    badges: ["Verified Expert"],
    availability: [0, 2, 4, 6],
    emoji: "👨‍💼",
    bio: "Physics enthusiast passionate about real-world applications. Specializes in JEE and board exam preparation."
  },
  {
    id: 3,
    name: "Priya Nair",
    subject: "Chemistry",
    expertise: ["Organic Chemistry", "Physical Chemistry", "Biochemistry"],
    rate: 800,
    rating: 4.8,
    reviews: 103,
    experience: "6 years",
    qualification: "M.Tech Chemical Engineering, NITK",
    badges: ["Top Rated", "NIT Alumni"],
    availability: [1, 3, 5],
    emoji: "👩‍🔬",
    bio: "Chemistry tutor with a knack for breaking down complex reactions. Former NITK researcher turned passionate educator."
  },
  {
    id: 4,
    name: "Arjun Kapoor",
    subject: "Computer Science",
    expertise: ["Programming", "Data Structures", "Web Development"],
    rate: 900,
    rating: 4.9,
    reviews: 156,
    experience: "7 years",
    qualification: "B.Tech CSE, VIT",
    badges: ["Top Rated", "Industry Expert"],
    availability: [0, 1, 2, 3, 4],
    emoji: "👨‍💻",
    bio: "Full-stack developer turned educator. Expertise in Python, Java, and modern web technologies."
  },
  {
    id: 5,
    name: "Meena Iyer",
    subject: "English",
    expertise: ["Grammar", "Creative Writing", "IELTS Prep"],
    rate: 650,
    rating: 4.6,
    reviews: 78,
    experience: "10 years",
    qualification: "MA English Literature, Delhi University",
    badges: ["Verified Expert"],
    availability: [2, 3, 4, 5, 6],
    emoji: "📚",
    bio: "Literature graduate with a passion for language. Helped 200+ students improve their English communication and writing skills."
  },
  {
    id: 6,
    name: "Vikram Singh",
    subject: "Economics",
    expertise: ["Microeconomics", "Macroeconomics", "Statistics"],
    rate: 700,
    rating: 4.5,
    reviews: 62,
    experience: "4 years",
    qualification: "MBA Finance, XLRI",
    badges: ["XLRI Alumni"],
    availability: [1, 2, 4],
    emoji: "📊",
    bio: "MBA graduate with corporate finance background. Specializes in economics and business studies for undergraduate students."
  }
];

// Generate star HTML from a numeric rating
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(empty);
}

// Build tutor cards on tutors.html
function renderTutorCards(list) {
  const grid = document.getElementById('tutors-grid');
  if (!grid) return;

  grid.innerHTML = list.map(t => `
    <a href="details.html?id=${t.id}" class="tutor-card fade-in">
      <div class="card-img-placeholder">${t.emoji}</div>
      <div class="card-body">
        <div style="margin-bottom:8px">
          ${t.badges.map(b => `<span class="badge badge-teal">${b}</span>`).join(' ')}
        </div>
        <h3 class="card-name">${t.name}</h3>
        <p class="card-subject">${t.subject} · ${t.expertise[0]}, ${t.expertise[1]}</p>
        <div>
          <span class="stars">${renderStars(t.rating)}</span>
          <span class="rating-text">${t.rating} (${t.reviews} reviews)</span>
        </div>
        <div class="card-footer">
          <span class="card-rate">₹${t.rate}/hr</span>
          <span class="btn btn-outline" style="padding:6px 16px;font-size:0.85rem">View Profile</span>
        </div>
      </div>
    </a>
  `).join('');
}

// Filter logic for tutors page
function initFilters() {
  const subjectFilter = document.getElementById('filter-subject');
  const rateFilter    = document.getElementById('filter-rate');
  const searchInput   = document.getElementById('filter-search');

  if (!subjectFilter) return;

  function applyFilters() {
    let filtered = [...tutors];

    const subject = subjectFilter.value;
    if (subject) filtered = filtered.filter(t => t.subject === subject);

    const maxRate = parseInt(rateFilter.value);
    if (maxRate) filtered = filtered.filter(t => t.rate <= maxRate);

    const query = searchInput.value.toLowerCase().trim();
    if (query) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.subject.toLowerCase().includes(query) ||
        t.expertise.some(e => e.toLowerCase().includes(query))
      );
    }

    renderTutorCards(filtered);
  }

  subjectFilter.addEventListener('change', applyFilters);
  rateFilter.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);

  renderTutorCards(tutors);
}

// ── DETAILS PAGE ──
function initDetailsPage() {
  if (!document.getElementById('det-emoji')) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const tutor = tutors.find(t => t.id === id) || tutors[0];

  if (!tutor) return;

  document.getElementById('det-emoji').textContent      = tutor.emoji;
  document.getElementById('det-name').textContent       = tutor.name;
  document.getElementById('det-subject').textContent    = tutor.subject;
  document.getElementById('det-rate').textContent       = `₹${tutor.rate}/hr`;
  document.getElementById('det-exp').textContent        = tutor.experience;
  document.getElementById('det-qual').textContent       = tutor.qualification;
  document.getElementById('det-bio').textContent        = tutor.bio;
  document.getElementById('det-stars').innerHTML        = renderStars(tutor.rating);
  document.getElementById('det-reviews').textContent    = `${tutor.rating} (${tutor.reviews} reviews)`;
  document.getElementById('det-expertise').innerHTML    = tutor.expertise.map(e => `<span class="badge badge-teal">${e}</span>`).join(' ');
  document.getElementById('det-badges').innerHTML       = tutor.badges.map(b => `<span class="badge badge-gold">${b}</span>`).join(' ');

  // Book button passes tutor id to booking page
  const bookBtn = document.getElementById('book-btn');
  if (bookBtn) bookBtn.href = `booking.html?id=${tutor.id}`;

  // Availability calendar (day labels)
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const grid = document.getElementById('avail-grid');
  if (grid) {
    grid.innerHTML = days.map((d, i) => `
      <div class="avail-day ${tutor.availability.includes(i) ? 'available' : 'unavailable'}">
        ${d}
        <span>${tutor.availability.includes(i) ? 'Open' : 'Off'}</span>
      </div>
    `).join('');
  }
}

// ── BOOKING PAGE ──
function initBookingPage() {
  const params  = new URLSearchParams(window.location.search);
  const id      = parseInt(params.get('id'));
  const tutor   = tutors.find(t => t.id === id) || tutors[0];

  // Populate tutor selector or pre-select
  const tutorSelect = document.getElementById('tutor-select');
  if (tutorSelect) {
    // Clear any existing options first
    tutorSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '— Select a tutor —';
    placeholder.disabled = true;
    tutorSelect.appendChild(placeholder);

    tutors.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = `${t.name} — ${t.subject}`;
      if (t.id === tutor.id) opt.selected = true;
      tutorSelect.appendChild(opt);
    });
    tutorSelect.addEventListener('change', updateSummary);
  }

  buildCalendar();
  updateSummary();

  // Form submission
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleBooking();
    });
  }
}

let selectedDate = null;
let selectedTime = null;

// Pre-booked slots (simulation)
const bookedSlots = {
  '2026-03-12': ['10:00 AM', '2:00 PM'],
  '2026-03-13': ['11:00 AM'],
  '2026-03-15': ['9:00 AM', '3:00 PM', '4:00 PM']
};

const timeSlotOptions = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'];

function buildCalendar() {
  const calGrid    = document.getElementById('cal-grid');
  const monthLabel = document.getElementById('cal-month');
  if (!calGrid) return;

  const now   = new Date();
  const year  = now.getFullYear();
  const month = now.getMonth();

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  monthLabel.textContent = `${monthNames[month]} ${year}`;

  // Day headers
  const dayHeaders = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  let html = dayHeaders.map(d => `<div class="cal-header">${d}</div>`).join('');

  const firstDay  = new Date(year, month, 1).getDay();
  const daysCount = new Date(year, month + 1, 0).getDate();
  const today     = now.getDate();

  // Empty cells before the 1st
  html += Array(firstDay).fill('<div></div>').join('');

  for (let d = 1; d <= daysCount; d++) {
    const isPast    = d < today;
    const isToday   = d === today;
    const dateStr   = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    let cls = 'cal-day';
    if (isPast)  cls += ' past';
    if (isToday) cls += ' today';

    html += `<div class="${cls}" data-date="${dateStr}" onclick="selectDate(this)">${d}</div>`;
  }

  calGrid.innerHTML = html;
}

function selectDate(el) {
  if (el.classList.contains('past') || el.classList.contains('disabled')) return;

  // Remove previous selection
  document.querySelectorAll('.cal-day.selected').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');

  selectedDate = el.dataset.date;
  selectedTime = null;

  buildTimeSlots(selectedDate);
  updateSummary();
}

function buildTimeSlots(dateStr) {
  const container = document.getElementById('time-slots');
  if (!container) return;

  const booked = bookedSlots[dateStr] || [];

  container.innerHTML = timeSlotOptions.map(t => {
    const isBooked = booked.includes(t);
    return `<div class="time-slot ${isBooked ? 'booked' : ''}" 
                 data-time="${t}" 
                 onclick="selectTime(this)">
              ${t}${isBooked ? '<br><small>Booked</small>' : ''}
            </div>`;
  }).join('');
}

function selectTime(el) {
  if (el.classList.contains('booked')) return;

  document.querySelectorAll('.time-slot.selected').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');

  selectedTime = el.dataset.time;
  updateSummary();
}

function updateSummary() {
  const tutorSelect = document.getElementById('tutor-select');
  const id = tutorSelect ? parseInt(tutorSelect.value) : NaN;
  const tutor = tutors.find(t => t.id === id);

  if (!tutor) {
    ['sum-tutor','sum-subject','sum-date','sum-time','sum-cost'].forEach(el => {
      const node = document.getElementById(el);
      if (node) node.textContent = '—';
    });
    return;
  }

  const nameEl    = document.getElementById('sum-tutor');
  const subjectEl = document.getElementById('sum-subject');
  const dateEl    = document.getElementById('sum-date');
  const timeEl    = document.getElementById('sum-time');
  const costEl    = document.getElementById('sum-cost');

  if (nameEl)    nameEl.textContent    = tutor.name;
  if (subjectEl) subjectEl.textContent = tutor.subject;
  if (dateEl)    dateEl.textContent    = selectedDate || '—';
  if (timeEl)    timeEl.textContent    = selectedTime || '—';
  if (costEl)    costEl.textContent    = `₹${tutor.rate}`;
}

function handleBooking() {
  if (!selectedDate || !selectedTime) {
    alert('Please select a date and time slot before booking.');
    return;
  }

  const tutorSelect = document.getElementById('tutor-select');
  const id = parseInt(tutorSelect ? tutorSelect.value : 1);
  const tutor = tutors.find(t => t.id === id) || tutors[0];

  // Mark the selected slot as booked
  if (!bookedSlots[selectedDate]) bookedSlots[selectedDate] = [];
  bookedSlots[selectedDate].push(selectedTime);

  // Show confirmation
  const conf = document.getElementById('booking-confirmation');
  if (conf) {
    document.getElementById('conf-tutor').textContent   = tutor.name;
    document.getElementById('conf-subject').textContent = tutor.subject;
    document.getElementById('conf-date').textContent    = selectedDate;
    document.getElementById('conf-time').textContent    = selectedTime;
    document.getElementById('conf-cost').textContent    = `₹${tutor.rate}`;
    conf.style.display = 'block';
    conf.scrollIntoView({ behavior: 'smooth' });
  }

  // Reset selections
  document.querySelectorAll('.cal-day.selected').forEach(d => d.classList.remove('selected'));
  buildTimeSlots(selectedDate);
  selectedDate = null;
  selectedTime = null;
  updateSummary();

  document.getElementById('booking-form').reset();
}

// ── FEATURED TUTORS on homepage ──
function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const featured = tutors.slice(0, 3);
  grid.innerHTML = featured.map(t => `
    <a href="details.html?id=${t.id}" class="tutor-card fade-in">
      <div class="card-img-placeholder">${t.emoji}</div>
      <div class="card-body">
        <div style="margin-bottom:8px">
          ${t.badges.map(b => `<span class="badge badge-teal">${b}</span>`).join(' ')}
        </div>
        <h3 class="card-name">${t.name}</h3>
        <p class="card-subject">${t.subject} · ${t.expertise[0]}</p>
        <div>
          <span class="stars">${renderStars(t.rating)}</span>
          <span class="rating-text">${t.rating} (${t.reviews})</span>
        </div>
        <div class="card-footer">
          <span class="card-rate">₹${t.rate}/hr</span>
          <span class="btn btn-outline" style="padding:6px 16px;font-size:0.85rem">View Profile</span>
        </div>
      </div>
    </a>
  `).join('');
}

// Highlight active nav link
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
  setActiveNav();
  renderFeatured();
  initFilters();
  initDetailsPage();
  initBookingPage();
});