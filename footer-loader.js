function loadFooter() {
  const target = document.getElementById('site-footer');
  if (!target || target.hasAttribute('data-loaded')) return;
  
  target.setAttribute('data-loaded', 'true');

  const footerFallback = `
    <!-- Featurable Reviews Widget -->
    <div id="featurable-97efa460-851d-4f8c-ac15-4dbc9edbcdf0" data-featurable-async></div>

    <!-- Footer Bottom Section -->
    <div class="footer-bottom fade-in">
      <p>3335 Dougall Ave | Windsor, ON N9E 1S8 | Phone: (519) 996-8429 | UrsuHolisticWellness@gmail.com</p>
      <nav class="footer-sitemap" aria-label="Footer site navigation">
        <a href="index.html">Home</a>
        <a href="meet-lori.html">Meet Lori</a>
        <a href="benefits-of-reflexology.html">Benefits of Reflexology Therapy</a>
        <a href="reflexology-vs-massage.html">Reflexology Therapy vs. Massage</a>
        <a href="how-reflexology-therapy-works.html">How Reflexology Therapy Works</a>
        <a href="services.html">Services</a>
        <a href="faq.html">New Clients &amp; FAQ</a>
        <a href="contact-us.html">Contact Us</a>
      </nav>
      <p>&copy; 2026 Ursu Holistic Wellness. All rights reserved.</p>
    </div>`;

  const loadFeaturable = () => {
    if (!document.querySelector('script[src*="slider_default.min.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://featurable.com/assets/v2/slider_default.min.js';
      script.defer = true;
      script.charset = 'UTF-8';
      document.body.appendChild(script);
    }
  };

  fetch('footer.html')
    .then(r => r.text())
    .then(html => {
      target.innerHTML = html || footerFallback;
      document.querySelectorAll('#site-footer .fade-in').forEach((el) => {
        el.classList.add('visible');
      });
      loadFeaturable();
    })
    .catch(() => {
      target.innerHTML = footerFallback;
      document.querySelectorAll('#site-footer .fade-in').forEach((el) => {
        el.classList.add('visible');
      });
      loadFeaturable();
    });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadFooter);
} else {
  loadFooter();
}
