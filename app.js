
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function toggleAuthPopup() {
  document.getElementById('authPopup').classList.toggle('hidden');
}
function closeAuthPopup() {
  document.getElementById('authPopup').classList.add('hidden');
}
function signUp() {
  const username = document.getElementById('authUsername').value;
  const password = document.getElementById('authPassword').value;
  const file = document.getElementById('authProfilePic').files[0];

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const userData = {
      username,
      password,
      profileImage: e.target.result || null
    };
    localStorage.setItem('jobbar_user', JSON.stringify(userData));
    logIn();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    localStorage.setItem('jobbar_user', JSON.stringify({ username, password, profileImage: null }));
    logIn();
  }
}
function logIn() {
  const stored = JSON.parse(localStorage.getItem('jobbar_user'));
  const username = document.getElementById('authUsername').value;
  const password = document.getElementById('authPassword').value;

  if (!stored || stored.username !== username || stored.password !== password) {
    alert("Invalid credentials");
    return;
  }

  document.getElementById('profileName').textContent = `Welcome, ${stored.username}`;
  const avatar = document.getElementById('userAvatar');
  const initial = document.getElementById('userInitial');
  const pic = document.getElementById('profilePic');

  if (stored.profileImage) {
    avatar.src = stored.profileImage;
    avatar.classList.remove('hidden');
    initial.classList.add('hidden');
    pic.src = stored.profileImage;
    pic.classList.remove('hidden');
  } else {
    initial.textContent = stored.username[0].toUpperCase();
  }

  closeAuthPopup();
}
function handleGuestAction() {
  const user = localStorage.getItem('jobbar_user');
  if (!user) {
    alert("Please sign in to swipe or match");
    toggleAuthPopup();
  }
}
