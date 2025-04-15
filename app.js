window.onload = function () {
  const jobs = [
    {
      title: "Frontend Developer",
      company: "@SwiftTech",
      desc: "Looking for a React dev who loves building sleek interfaces and fast prototypes."
    },
    {
      title: "UX Designer",
      company: "@DesignCore",
      desc: "Create delightful, user-first product experiences across web and mobile."
    },
    {
      title: "Marketing Coordinator",
      company: "@ZoomBoom",
      desc: "Help us grow with social campaigns and brand storytelling."
    }
  ];

  let currentJob = 0;
  const card = document.getElementById("jobCard");
  let startX = null;

  function startSwipe(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
  }

  function moveSwipe(e) {
    if (startX === null) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - startX;
    card.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 20}deg)`;
  }

  function endSwipe(e) {
    if (startX === null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 100) {
      card.style.transition = "transform 0.3s ease";
      card.style.transform = `translateX(${deltaX > 0 ? 1000 : -1000}px) rotate(${deltaX / 10}deg)`;
      setTimeout(() => {
        currentJob = (currentJob + 1) % jobs.length;
        renderJob();
        card.style.transition = "none";
        card.style.transform = "translateX(0)";
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
  }

  card.addEventListener("touchstart", startSwipe);
  card.addEventListener("touchmove", moveSwipe);
  card.addEventListener("touchend", endSwipe);
  card.addEventListener("mousedown", startSwipe);
  card.addEventListener("mousemove", moveSwipe);
  card.addEventListener("mouseup", endSwipe);

  renderJob();
};