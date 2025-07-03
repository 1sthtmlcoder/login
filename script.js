// Replace this with your ngrok HTTPS URL, e.g. 'https://abcd1234.ngrok.io'
const backendUrl = 'https://4bed-2600-6c55-4800-e3-9d10-4bd2-c91c-7d56.ngrok-free.app';

const signupSection = document.getElementById('signup-section');
const verifySection = document.getElementById('verify-section');
const loginSection = document.getElementById('login-section');

const signupBtn = document.getElementById('signup-btn');
const verifyBtn = document.getElementById('verify-btn');
const loginBtn = document.getElementById('login-btn');

const signupMsg = document.getElementById('signup-message');
const verifyMsg = document.getElementById('verify-message');
const loginMsg = document.getElementById('login-message');

signupBtn.addEventListener('click', async () => {
  signupMsg.textContent = '';
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  const email = document.getElementById('signup-email').value.trim();

  if (!username || !password || !email) {
    signupMsg.textContent = 'Please fill all fields';
    signupMsg.className = 'message error';
    return;
  }

  try {
    const res = await fetch(`${backendUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: `${username}:${password}:${email}`,
    });
    const data = await res.json();
    signupMsg.textContent = data.message;
    signupMsg.className = data.success ? 'message success' : 'message error';

    if (data.success) {
      signupSection.style.display = 'none';
      verifySection.style.display = 'block';
      document.getElementById('verify-username').value = username;
    }
  } catch {
    signupMsg.textContent = 'Failed to connect to server';
    signupMsg.className = 'message error';
  }
});

verifyBtn.addEventListener('click', async () => {
  verifyMsg.textContent = '';
  const username = document.getElementById('verify-username').value.trim();
  const code = document.getElementById('verify-code').value.trim();

  if (!username || !code) {
    verifyMsg.textContent = 'Please enter username and code';
    verifyMsg.className = 'message error';
    return;
  }

  try {
    const res = await fetch(`${backendUrl}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: `${username}:${code}`,
    });
    const data = await res.json();
    verifyMsg.textContent = data.message;
    verifyMsg.className = data.success ? 'message success' : 'message error';

    if (data.success) {
      verifySection.style.display = 'none';
      loginSection.style.display = 'block';
      document.getElementById('login-username').value = username;
    }
  } catch {
    verifyMsg.textContent = 'Failed to connect to server';
    verifyMsg.className = 'message error';
  }
});

loginBtn.addEventListener('click', async () => {
  loginMsg.textContent = '';
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!username || !password) {
    loginMsg.textContent = 'Please enter username and password';
    loginMsg.className = 'message error';
    return;
  }

  try {
    const res = await fetch(`${backendUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: `${username}:${password}`,
    });
    const data = await res.json();
    loginMsg.textContent = data.message;
    loginMsg.className = data.success ? 'message success' : 'message error';
  } catch {
    loginMsg.textContent = 'Failed to connect to server';
    loginMsg.className = 'message error';
  }
});
