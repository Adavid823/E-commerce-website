// Animate the form into view on load
window.addEventListener('load', () => {
  document.querySelector('.auth-form').classList.add('show');
});

// Handle sign-up submission (demo only)
document.getElementById('signup-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target['signup-name'].value.trim();
  const email = e.target['signup-email'].value.trim();
  const pass = e.target['signup-password'].value;
  const confirm = e.target['signup-confirm'].value;

  if (pass !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  // Demo feedback
  alert(`Account created for ${name} (${email})!`);
  // Redirect to login page
  window.location.href = 'login.html';
});
