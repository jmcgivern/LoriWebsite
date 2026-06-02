function loadHeader() {
  const target = document.getElementById('site-header');
  if (!target || target.hasAttribute('data-loaded')) return;
  
  target.setAttribute('data-loaded', 'true');

  // Dynamically set the tab icon (favicon) on all pages
  if (!document.querySelector("link[rel~='icon']")) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = 'images/Final Transparent Logo.png'; // Make sure this matches your transparent logo file name
    document.head.appendChild(favicon);
  }

  const headerFallback = `
    <header role="banner">
      <nav class="navbar navbar-expand-lg navbar-light fixed-top" role="navigation" aria-label="Primary navigation">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" href="index.html">
            <img src="images/Final Transparent Logo.png" alt="Ursu Holistic Wellness Logo" class="nav-logo">
            <img src="images/UrsuHolisticWellnessTextNoLogo.png" alt="Ursu Holistic Wellness" class="nav-text-img">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#primaryNavbar" aria-controls="primaryNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="primaryNavbar">
            <ul class="navbar-nav ms-auto align-items-lg-center">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="aboutDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">About</a>
                <ul class="dropdown-menu" aria-labelledby="aboutDropdown">
                  <li><a class="dropdown-item" href="meet-lori.html">Meet Lori</a></li>
                  <li><a class="dropdown-item" href="new-patient-experience.html">New Patient Experience</a></li>
                  <li><a class="dropdown-item" href="faq.html">Frequently Asked Questions</a></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="reflexologyDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">About Reflexology Therapy</a>
                <ul class="dropdown-menu" aria-labelledby="reflexologyDropdown">
                  <li><a class="dropdown-item" href="reflexology-vs-massage.html">Reflexology Therapy vs Massage</a></li>
                  <li><a class="dropdown-item" href="benefits-of-reflexology.html">Benefits of Reflexology</a></li>
                </ul>
              </li>
              <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
              <li class="nav-item"><a class="nav-link" href="contact-us.html">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>`;

  const initializeHeader = () => {
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === '') currentPath = 'index.html';

    document.querySelectorAll('#site-header .nav-link, #site-header .dropdown-item').forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
        const parentDropdown = link.closest('.dropdown');
        if (parentDropdown) {
          const toggle = parentDropdown.querySelector('.dropdown-toggle');
          if (toggle) toggle.classList.add('active');
        }
      }
    });

    document.querySelectorAll('#site-header .nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        const mobileNav = document.getElementById('primaryNavbar');
        if (mobileNav && mobileNav.classList.contains('show') && typeof bootstrap !== 'undefined') {
          const bsCollapse = new bootstrap.Collapse(mobileNav, { toggle: false });
          bsCollapse.hide();
        }
      });
    });
  };

  fetch('header.html')
    .then(r => {
      if (!r.ok) throw new Error('Network response was not ok');
      return r.text();
    })
    .then(html => {
      target.innerHTML = html;
      initializeHeader();
    })
    .catch(() => {
      target.innerHTML = headerFallback;
      initializeHeader();
    });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeader);
} else {
  loadHeader();
}