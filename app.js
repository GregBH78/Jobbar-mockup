
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}
function toggleProfileMenu() {
  showSection('profile');
}
function signUp() {
  const username = document.getElementById('authUsername').value;
  const password = document.getElementById('authPassword').value;
  const profilePic = document.getElementById('authProfilePic').files[0];

  if (!username || !password) {
    alert('Please enter a username and password');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageData = e.target.result;
    localStorage.setItem('jobbar_user', JSON.stringify({
      username,
      password,
      profileImage: imageData
    }));
    logIn();
  };
  if (profilePic) {
    reader.readAsDataURL(profilePic);
  } else {
    localStorage.setItem('jobbar_user', JSON.stringify({ username, password, profileImage: null }));
    logIn();
  }
}
function logIn() {
  const savedUser = JSON.parse(localStorage.getItem('jobbar_user'));
  const username = document.getElementById('authUsername').value;
  const password = document.getElementById('authPassword').value;

  if (!savedUser || savedUser.username !== username || savedUser.password !== password) {
    alert('Invalid credentials');
    return;
  }

  document.getElementById('authSection').classList.add('hidden');
  document.getElementById('appMain').classList.remove('hidden');
  document.getElementById('profileNameDisplay').textContent = savedUser.username;

  const avatar = document.getElementById('userAvatar');
  const initial = document.getElementById('userInitial');
  const preview = document.getElementById('profilePreview');

  if (savedUser.profileImage) {
    avatar.src = savedUser.profileImage;
    avatar.classList.remove('hidden');
    initial.classList.add('hidden');
    preview.src = savedUser.profileImage;
    preview.classList.remove('hidden');
  } else {
    initial.textContent = savedUser.username.charAt(0).toUpperCase();
  }
}
