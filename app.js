const jobs = [
  {
    title: "Frontend Developer",
    company: "@SwiftTech",
    desc: "Looking for a React dev who loves building sleek interfaces and fast prototypes."
  },
  {
    title: "Marketing Coordinator",
    company: "@Brandly",
    desc: "Social-savvy creative to support campaigns, reels, and growth marketing efforts."
  },
  {
    title: "Junior UX Designer",
    company: "@NeoUI",
    desc: "Work on wireframes, user research, and A/B testing for our wellness app."
  }
];

let currentJob = 0;

function swipe(direction) {
  const card = document.getElementById("jobCard");
  card.classList.add(direction === 'yes' ? 'swipe-right' : 'swipe-left');

  setTimeout(() => {
    card.classList.remove('swipe-left', 'swipe-right');
    currentJob = (currentJob + 1) % jobs.length;
    renderJob();
  }, 600);
}

function renderJob() {
  const job = jobs[currentJob];
  document.getElementById("jobTitle").textContent = job.title;
  document.getElementById("jobCompany").textContent = job.company;
  document.getElementById("jobDesc").textContent = job.desc;
}

function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

function saveProfile() {
  const name = document.getElementById("profileName").value;
  const interests = Array.from(document.querySelectorAll('#profile input[type=checkbox]:checked'))
    .map(cb => cb.value);
  localStorage.setItem("jobbarProfile", JSON.stringify({ name, interests }));
  document.getElementById("saveMsg").textContent = "Profile saved!";
}

renderJob();