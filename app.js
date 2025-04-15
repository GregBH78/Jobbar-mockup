window.onload = function () {
  const jobs = [
    { title: "Frontend Developer", company: "@SwiftTech", desc: "React dev needed." },
    { title: "UX Designer", company: "@DesignCore", desc: "Craft intuitive UI/UX." },
    { title: "Marketing Lead", company: "@ZoomBoom", desc: "Growth and campaigns." }
  ];

  let currentJob = 0;
  const card = document.getElementById("jobCard");
  const matchList = document.getElementById("matchList");
  const badge = document.getElementById("userBadge");

  function renderJob() {
    const job = jobs[currentJob];
    document.getElementById("jobTitle").textContent = job.title;
    document.getElementById("jobCompany").textContent = job.company;
    document.getElementById("jobDesc").textContent = job.desc;
  }

  function saveMatch(job) {
    const matches = JSON.parse(localStorage.getItem("jobbarMatches")) || [];
    matches.push(job);
    localStorage.setItem("jobbarMatches", JSON.stringify(matches));
  }

  function updateMatches() {
    const matches = JSON.parse(localStorage.getItem("jobbarMatches")) || [];
    matchList.innerHTML = "";
    matches.forEach(m => {
      const li = document.createElement("li");
      li.textContent = `${m.title} at ${m.company}`;
      matchList.appendChild(li);
    });
  }

  function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");
    if (sectionId === "matches") updateMatches();
    if (sectionId === "profile") loadProfile();
  }

  window.showSection = showSection;
  window.openProfile = () => showSection("profile");

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
      saveMatch(jobs[currentJob]);
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

  card.addEventListener("touchstart", startSwipe);
  card.addEventListener("touchmove", moveSwipe);
  card.addEventListener("touchend", endSwipe);
  card.addEventListener("mousedown", startSwipe);
  card.addEventListener("mousemove", moveSwipe);
  card.addEventListener("mouseup", endSwipe);

  window.saveProfile = function () {
    const name = document.getElementById("profileName").value;
    const email = document.getElementById("profileEmail").value;
    const interests = Array.from(document.querySelectorAll('#profile input[type=checkbox]:checked')).map(cb => cb.value);
    const profile = { name, email, interests, photo: localStorage.getItem("jobbarPhoto") || "" };
    localStorage.setItem("jobbarProfile", JSON.stringify(profile));
    updateBadge(profile);
    alert("Profile saved!");
  };

  window.handlePhotoUpload = function () {
    const file = document.getElementById("profilePic").files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("jobbarPhoto", e.target.result);
      document.getElementById("profilePreview").src = e.target.result;
      document.getElementById("profilePreview").classList.remove("hidden");
      updateBadge(JSON.parse(localStorage.getItem("jobbarProfile") || "{}"));
    };
    if (file) reader.readAsDataURL(file);
  };

  function loadProfile() {
    const profile = JSON.parse(localStorage.getItem("jobbarProfile") || "{}");
    document.getElementById("profileName").value = profile.name || "";
    document.getElementById("profileEmail").value = profile.email || "";
    if (profile.photo) {
      const img = document.getElementById("profilePreview");
      img.src = profile.photo;
      img.classList.remove("hidden");
    }
  }

  function updateBadge(profile) {
    if (profile.photo) {
      badge.innerHTML = `<img src="${profile.photo}" style="width:100%; height:100%; object-fit:cover;" />`;
    } else if (profile.name) {
      badge.textContent = profile.name[0].toUpperCase();
    } else {
      badge.textContent = "?";
    }
  }

  renderJob();
  updateBadge(JSON.parse(localStorage.getItem("jobbarProfile") || "{}"));
};
