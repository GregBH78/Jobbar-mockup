window.onload = function () {
  const signupSection = document.getElementById("signup");
  const dashboard = document.getElementById("dashboard");
  const splash = document.getElementById("splash");
  const matchList = document.getElementById("matchList");
  const jobsContent = document.getElementById("jobsContent");
  const welcomeUser = document.getElementById("welcomeUser");

  const dummyJobs = [
    { title: "Product Designer", company: "@CreativeX", desc: "Design mobile-first product experiences." },
    { title: "Backend Engineer", company: "@DataNest", desc: "Build secure APIs and database flows." },
    { title: "Marketing Intern", company: "@ZoomBoom", desc: "Help us grow with social and brand campaigns." }
  ];

  function loadUser() {
    const user = JSON.parse(localStorage.getItem("jobbarUser"));
    if (user) {
      splash.style.display = "none";
      signupSection.classList.add("hidden");
      dashboard.classList.remove("hidden");
      welcomeUser.textContent = `Welcome, ${user.name}`;
      renderDashboard(user);
    }
  }

  window.submitSignup = function () {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.querySelector("input[name='role']:checked").value;
    if (!name || !email) return alert("Please fill out all fields.");
    const user = { name, email, role };
    localStorage.setItem("jobbarUser", JSON.stringify(user));
    localStorage.setItem("jobbarMatches", JSON.stringify([]));
    loadUser();
  };

  function renderDashboard(user) {
    jobsContent.innerHTML = "";
    matchList.innerHTML = "";
    if (user.role === "seeker") {
      dummyJobs.forEach((job, i) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h3>${job.title}</h3><p>${job.company}</p><p>${job.desc}</p>
                         <button onclick="matchJob(${i})">Swipe Right</button>`;
        jobsContent.appendChild(div);
      });
    } else {
      jobsContent.innerHTML = "<p>You have 3 applicants interested in your job post.</p>";
      const fakeMatches = ["Alice Johnson", "Bob Smith", "Casey Lee"];
      fakeMatches.forEach(name => {
        const li = document.createElement("li");
        li.textContent = `${name} liked your job!`;
        matchList.appendChild(li);
      });
    }
  }

  window.matchJob = function (index) {
    const matches = JSON.parse(localStorage.getItem("jobbarMatches")) || [];
    matches.push(dummyJobs[index]);
    localStorage.setItem("jobbarMatches", JSON.stringify(matches));
    alert("Matched! Check your Matches tab.");
  };

  window.switchTab = function (tabId) {
    document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
    document.getElementById(tabId).classList.remove("hidden");
    if (tabId === "matchesTab") {
      const matches = JSON.parse(localStorage.getItem("jobbarMatches")) || [];
      matchList.innerHTML = "";
      matches.forEach(m => {
        const li = document.createElement("li");
        li.textContent = `${m.title} at ${m.company}`;
        matchList.appendChild(li);
      });
    }
  };

  window.logout = function () {
    localStorage.clear();
    location.reload();
  };

  loadUser();
};
