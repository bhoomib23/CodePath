const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

const headMatch = content.match(/(<!DOCTYPE html>\s*<html.*?>\s*<head>.*?<\/head>)/s);
const navMatch = content.match(/(<nav.*?<\/nav>)/s);
const footerMatch = content.match(/(<footer.*?<\/footer>)/s);
const scriptMatch = content.match(/(<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@5\.3\.3\/dist\/js\/bootstrap\.bundle\.min\.js"><\/script>.*?<\/script>\s*<\/body>\s*<\/html>)/s);

if (!headMatch || !navMatch || !footerMatch || !scriptMatch) {
  console.error("Could not find all parts!");
  process.exit(1);
}

let head = headMatch[1];
const nav = navMatch[1];
const footer = footerMatch[1];
const script = scriptMatch[1];

const customCss = `
    /* ════ AUTHS ════ */
    .auth-section {
      padding: 6rem 0;
      min-height: calc(100vh - 150px);
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .auth-section::before {
      content: '';
      position: absolute;
      top: -100px;
      right: -100px;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(37, 99, 235, .08) 0%, transparent 70%);
      pointer-events: none;
    }
    [data-theme="dark"] .auth-section::before {
      background: radial-gradient(circle, rgba(79, 142, 247, .1) 0%, transparent 70%);
    }
    .auth-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 3rem 2.5rem;
      box-shadow: 0 8px 32px var(--shadow);
      width: 100%;
      max-width: 440px;
      margin: 0 auto;
      transition: background 0.35s, border-color 0.35s, box-shadow 0.35s, transform 0.3s;
      position: relative;
      z-index: 1;
    }
    .auth-card:hover {
      box-shadow: 0 16px 48px var(--shadow-hover);
      transform: translateY(-2px);
    }
    .auth-title {
      font-family: var(--mono);
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 0.5rem;
      text-align: center;
    }
    .auth-sub {
      color: var(--muted);
      font-size: 0.95rem;
      text-align: center;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1.25rem;
    }
    .form-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 0.4rem;
      display: block;
    }
    .form-control {
      background: var(--toggle-bg) !important;
      border: 1px solid var(--toggle-border) !important;
      color: var(--text) !important;
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      transition: all 0.3s;
      width: 100%;
    }
    .form-control:focus {
      background: var(--surface) !important;
      border-color: var(--accent) !important;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15) !important;
      outline: none;
    }
    .form-control::placeholder {
      color: var(--muted);
      opacity: 0.7;
    }
    .btn-auth {
      font-family: var(--mono);
      font-weight: 700;
      width: 100%;
      padding: 0.8rem;
      border-radius: 8px;
      margin-top: 1rem;
      font-size: 1rem;
      background: var(--accent);
      color: #fff !important;
      border: none;
      transition: all 0.25s;
    }
    .btn-auth:hover {
      background: var(--accent2);
      transform: translateY(-2px);
    }
    .auth-link {
      color: var(--accent);
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s;
    }
    .auth-link:hover {
      text-decoration: underline;
    }
    .auth-footer {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.85rem;
      color: var(--muted);
    }
  </style>
`;

head = head.replace('</style>', customCss);

const loginMain = `
<body>
  ${nav}

  <main class="auth-section">
    <div class="container">
      <div class="auth-card">
        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-sub">Log in to track your learning paths.</p>
        
        <form action="#" method="GET">
          <div class="form-group">
            <label class="form-label" for="login-email">Email Address</label>
            <input type="email" id="login-email" class="form-control" placeholder="you@example.com" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <input type="password" id="login-password" class="form-control" placeholder="••••••••" required>
          </div>
          
          <div class="d-flex justify-content-between align-items-center mb-3 mt-2" style="font-size: 0.82rem;">
            <label class="d-flex align-items-center gap-2" style="color: var(--text); cursor: pointer;">
              <input type="checkbox" style="accent-color: var(--accent);">
              Remember me
            </label>
            <a href="#" class="auth-link">Forgot password?</a>
          </div>

          <button type="submit" class="btn-auth">Log In <i class="fas fa-sign-in-alt ms-1"></i></button>
        </form>
        
        <div class="auth-footer">
          Don't have an account? <a href="signup.html" class="auth-link">Sign up</a>
        </div>
      </div>
    </div>
  </main>

  ${footer}
  ${script}
`;

const signupMain = `
<body>
  ${nav}

  <main class="auth-section">
    <div class="container">
      <div class="auth-card">
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-sub">Join CodePath and start learning today.</p>
        
        <form action="#" method="GET">
          <div class="form-group">
            <label class="form-label" for="signup-name">Full Name</label>
            <input type="text" id="signup-name" class="form-control" placeholder="John Doe" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="signup-email">Email Address</label>
            <input type="email" id="signup-email" class="form-control" placeholder="you@example.com" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="signup-password">Password</label>
            <input type="password" id="signup-password" class="form-control" placeholder="••••••••" required>
          </div>
          
          <button type="submit" class="btn-auth">Sign Up <i class="fas fa-user-plus ms-1"></i></button>
        </form>
        
        <div class="auth-footer">
          Already have an account? <a href="login.html" class="auth-link">Log in</a>
        </div>
      </div>
    </div>
  </main>

  ${footer}
  ${script}
`;

fs.writeFileSync('login.html', head + loginMain, 'utf8');
fs.writeFileSync('signup.html', head + signupMain, 'utf8');

console.log('Created login.html and signup.html successfully with Node.js');
