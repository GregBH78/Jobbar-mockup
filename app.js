window.onload = function () {
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
  const card = document.getElementById("jobCard");
  let startX = 0;

  function swipeCard(event) {
    const moveX = event.clientX - startX;
    card.style.transform = `translateX(${moveX}px) rotate(${moveX / 20}deg)`;
  }

  function endSwipe(event) {
    const moveX = event.clientX - startX;
    if (Math.abs(moveX) > 120) {
      card.style.transition = "transform 0.3s ease";
      card.style.transform = `translateX(${moveX > 0 ? 1000 : -1000}px) rotate(${moveX / 10}deg)`;
      setTimeout(() => {
        card.style.transition = "none";
        card.style.transform = "translateX(0)";
        currentJob = (currentJob + 1) % jobs.length;
        renderJob();
      }, 300);
    } else {
      card.style.transform = "translateX(0)";
    }
    card.removeEventListener("pointermove", swipeCard);
    card.removeEventListener("pointerup", endSwipe);
  }

  card.addEventListener("pointerdown", e => {
    startX = e.clientX;
    card.setPointerCapture(e.pointerId);
    card.addEventListener("pointermove", swipeCard);
    card.addEventListener("pointerup", endSwipe);
  });

  function renderJob() {
    const job = jobs[currentJob];
    document.getElementById("jobTitle").textContent = job.title;
    document.getElementById("jobCompany").textContent = job.company;
    document.getElementById("jobDesc").textContent = job.desc;
    card.style.transform = "none";
    card.style.transition = "none";
    card.style.left = "0";
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

  window.switchTab = switchTab;
  window.saveProfile = saveProfile;

  renderJob();
};
 - startX;

    if (Math.abs(deltaX) > 100) {
      card.style.transition = "transform 0.3s ease";
      card.style.transform = `translateX(${deltaX > 0 ? 1000 : -1000}px) rotate(${deltaX / 10}deg)`;
      setTimeout(() => {
        card.style.transition = "none";
        card.style.transform = "translateX(0)";
        currentJob = (currentJob + 1) % jobs.length;
        renderJob();
      }, 300);
    } else {
      card.style.transition = "transform 0.3s ease";
      card.style.transform = "translateX(0)";
    }

    startX = null;
  }

  function renderJob() {
    const job = jobs[currentJob];
    document.getElementById("jobTitle").textContent = job.title;
    document.getElementById("jobCompany").textContent = job.company;
    document.getElementById("jobDesc").textContent = job.desc;
    card.style.transform = "none";
    card.style.transition = "none";
    card.style.left = "0";
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

  card.addEventListener("touchstart", startSwipe);
  card.addEventListener("touchmove", moveSwipe);
  card.addEventListener("touchend", endSwipe);
  card.addEventListener("mousedown", startSwipe);
  card.addEventListener("mousemove", moveSwipe);
  card.addEventListener("mouseup", endSwipe);

  window.switchTab = switchTab;
  window.saveProfile = saveProfile;

  renderJob();
};
