// Animate the form into view on load
window.addEventListener('load', () => {
  const form = document.querySelector('.auth-form');
  form.classList.add('show');
});

// Handle login submission (demo only)
document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target['login-email'].value;
  alert(`Logged in as ${email} (demo)!`);
  // In a real app you'd validate & redirect here:
  // window.location.href = 'index.html';
});
