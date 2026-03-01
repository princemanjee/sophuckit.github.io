    (function() {
      const params = new URLSearchParams(window.location.search);
      const theme = params.get('theme') || 'hybrid';
      const valid = ['light', 'dark', 'hybrid'];
      document.documentElement.classList.add('theme-' + (valid.includes(theme) ? theme : 'hybrid'));
    })();

    // Theme toggle button cycling
    function cycleTheme() {
      const html = document.documentElement;
      const order = ['theme-hybrid', 'theme-light', 'theme-dark'];
      const current = order.find(t => html.classList.contains(t)) || 'theme-hybrid';
      const next = order[(order.indexOf(current) + 1) % order.length];
      order.forEach(t => html.classList.remove(t));
      html.classList.add(next);
      const labels = { 'theme-hybrid': 'Hybrid', 'theme-light': 'Light', 'theme-dark': 'Dark' };
      document.getElementById('theme-toggle').textContent = labels[next];
    }

    // Page navigation
    function showPage(id) {
      document.querySelectorAll('.page').forEach(function(el) {
        el.style.display = 'none';
      });
      var target = document.getElementById(id);
      if (target) target.style.display = 'block';
      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(function(el) {
        el.classList.remove('active');
      });
      var activeLink = document.querySelector('[data-section="' + id + '"]');
      if (activeLink) activeLink.classList.add('active');
      window.scrollTo(0, 0);
      // Close mobile nav if open
      closeNav();
    }

    // Mobile hamburger toggle
    function toggleNav() {
      var menu = document.getElementById('nav-menu');
      var btn = document.getElementById('hamburger-btn');
      var isOpen = menu.classList.contains('nav-open');
      if (isOpen) {
        menu.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        menu.classList.add('nav-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    }

    function closeNav() {
      var menu = document.getElementById('nav-menu');
      var btn = document.getElementById('hamburger-btn');
      if (menu) menu.classList.remove('nav-open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    // Episode search filter
    function filterEpisodes(query) {
      var q = query.toLowerCase().trim();
      var cards = document.querySelectorAll('.episode-card');
      var visibleCount = 0;
      cards.forEach(function(card) {
        var text = card.textContent.toLowerCase();
        var tags = (card.getAttribute('data-tags') || '').toLowerCase();
        var match = !q || text.includes(q) || tags.includes(q);
        card.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });
      var noResults = document.getElementById('no-results');
      if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Guest directory filter
    function filterGuests(query) {
      var q = query.toLowerCase().trim();
      var cards = document.querySelectorAll('.guest-card');
      var visibleCount = 0;
      cards.forEach(function(card) {
        var text = card.textContent.toLowerCase();
        var tags = (card.getAttribute('data-tags') || '').toLowerCase();
        var match = !q || text.includes(q) || tags.includes(q);
        card.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });
      var noResults = document.getElementById('no-guest-results');
      if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Switch between profile display and intake form tabs
    function switchProfileTab(tab) {
      var display = document.getElementById('profile-display');
      var form    = document.getElementById('profile-form');
      var tabDisplay = document.getElementById('tab-display');
      var tabForm    = document.getElementById('tab-form');

      if (tab === 'display') {
        display.classList.remove('profile-view--hidden');
        form.classList.add('profile-view--hidden');
        tabDisplay.classList.add('profile-tab--active');
        tabDisplay.setAttribute('aria-selected', 'true');
        tabForm.classList.remove('profile-tab--active');
        tabForm.setAttribute('aria-selected', 'false');
      } else {
        form.classList.remove('profile-view--hidden');
        display.classList.add('profile-view--hidden');
        tabForm.classList.add('profile-tab--active');
        tabForm.setAttribute('aria-selected', 'true');
        tabDisplay.classList.remove('profile-tab--active');
        tabDisplay.setAttribute('aria-selected', 'false');
      }
    }

    // Guest intake form submit handler
    function submitGuestForm(e) {
      e.preventDefault();
      var form = document.getElementById('guest-intake-form');
      var confirm = document.getElementById('guest-form-confirm');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.style.display = 'none';
      confirm.style.display = 'block';
      confirm.focus();
    }

    // Reset guest form
    function resetGuestForm() {
      var form = document.getElementById('guest-intake-form');
      var confirm = document.getElementById('guest-form-confirm');
      form.reset();
      form.style.display = 'block';
      confirm.style.display = 'none';
    }

    // Switch contact form inquiry type
    function switchContactType(type) {
      var sets = ['guest', 'sponsor', 'feedback'];
      sets.forEach(function(s) {
        var el = document.getElementById('contact-' + s);
        if (el) el.style.display = (s === type) ? '' : 'none';
      });
      hideContactConfirms();
      // Reset error summary
      var summary = document.getElementById('contact-error-summary');
      if (summary) summary.style.display = 'none';
    }

    // Hide all confirmation messages
    function hideContactConfirms() {
      ['guest','sponsor','feedback'].forEach(function(t) {
        var el = document.getElementById('contact-confirm-' + t);
        if (el) el.style.display = 'none';
      });
      var form = document.getElementById('contact-form');
      if (form) form.style.display = '';
    }

    // Validate and submit contact form
    function submitContactForm(e) {
      e.preventDefault();
      var type = document.getElementById('inquiry-type').value;
      var errors = [];

      if (type === 'guest') {
        var name  = document.getElementById('c-guest-name').value.trim();
        var email = document.getElementById('c-guest-email').value.trim();
        var pitch = document.getElementById('c-guest-pitch').value.trim();
        if (!name)  errors.push('Your name is required.');
        if (!email) errors.push('Contact email is required.');
        if (email && !isValidEmail(email)) errors.push('Enter a valid email address.');
        if (!pitch) errors.push('Topic pitch is required.');
      }

      if (type === 'sponsor') {
        var sName    = document.getElementById('c-spon-name').value.trim();
        var sCompany = document.getElementById('c-spon-company').value.trim();
        var sEmail   = document.getElementById('c-spon-email').value.trim();
        var sBudget  = document.getElementById('c-spon-budget').value;
        if (!sName)    errors.push('Your name is required.');
        if (!sCompany) errors.push('Company name is required.');
        if (!sEmail)   errors.push('Contact email is required.');
        if (sEmail && !isValidEmail(sEmail)) errors.push('Enter a valid email address.');
        if (!sBudget)  errors.push('Please select a budget range.');
      }

      if (type === 'feedback') {
        var msg = document.getElementById('c-fb-message').value.trim();
        var fbEmail = document.getElementById('c-fb-email').value.trim();
        if (!msg) errors.push('Message is required.');
        if (fbEmail && !isValidEmail(fbEmail)) errors.push('Enter a valid email address.');
      }

      if (errors.length > 0) {
        showContactErrors(errors);
        return;
      }

      // Hide form, show relevant confirmation
      document.getElementById('contact-form').style.display = 'none';
      var confirm = document.getElementById('contact-confirm-' + type);
      if (confirm) {
        confirm.style.display = 'block';
        confirm.focus();
      }
      // Hide error summary
      var summary = document.getElementById('contact-error-summary');
      if (summary) summary.style.display = 'none';
    }

    // Show validation errors
    function showContactErrors(errors) {
      var summary = document.getElementById('contact-error-summary');
      var list    = document.getElementById('contact-error-list');
      if (!summary || !list) return;
      list.innerHTML = '';
      errors.forEach(function(msg) {
        var li = document.createElement('li');
        li.textContent = msg;
        list.appendChild(li);
      });
      summary.style.display = 'block';
      summary.focus();
    }

    // Reset contact form
    function resetContactForm() {
      var form = document.getElementById('contact-form');
      if (form) {
        form.reset();
        form.style.display = '';
      }
      hideContactConfirms();
      switchContactType('guest');
      document.getElementById('inquiry-type').value = 'guest';
    }

    // Newsletter form submit
    function submitNewsletter(e) {
      e.preventDefault();
      var emailInput = document.getElementById('newsletter-email');
      var errorDiv   = document.getElementById('newsletter-error');
      var errorText  = document.getElementById('newsletter-error-text');
      var email      = emailInput.value.trim();

      // Validate
      if (!email) {
        showNewsletterError('Email address is required.');
        emailInput.focus();
        return;
      }
      if (!isValidEmail(email)) {
        showNewsletterError('Enter a valid email address.');
        emailInput.focus();
        return;
      }

      // Success — hide form, show confirmation
      document.getElementById('newsletter-form').style.display = 'none';
      if (errorDiv) errorDiv.style.display = 'none';
      var confirm = document.getElementById('newsletter-confirm');
      confirm.style.display = 'block';
      confirm.focus();
    }

    function showNewsletterError(msg) {
      var errorDiv  = document.getElementById('newsletter-error');
      var errorText = document.getElementById('newsletter-error-text');
      if (errorText) errorText.textContent = msg;
      if (errorDiv)  errorDiv.style.display = 'block';
    }

    function resetNewsletter() {
      var form    = document.getElementById('newsletter-form');
      var confirm = document.getElementById('newsletter-confirm');
      var errorDiv = document.getElementById('newsletter-error');
      if (form)     { form.reset(); form.style.display = ''; }
      if (confirm)  confirm.style.display = 'none';
      if (errorDiv) errorDiv.style.display = 'none';
    }

    // Simple email validator
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Expand / collapse show notes and transcriptions
    function toggleExpand(btn) {
      var contentId = btn.getAttribute('aria-controls');
      var content = document.getElementById(contentId);
      if (!content) return;
      var isOpen = content.classList.contains('expanded');
      content.classList.toggle('expanded', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      btn.textContent = isOpen
        ? btn.textContent.replace('−', '+').replace('Hide', 'Show')
        : btn.textContent.replace('+', '−').replace('Show', 'Hide');
    }

    // Show hero on initial load
    document.addEventListener('DOMContentLoaded', function() {
      var params = new URLSearchParams(window.location.search);
      var section = params.get('section') || 'hero';
      var validSections = ['hero','episode-library','about','host-bios','subscribe',
        'guest-profile-template','guest-directory','sponsor','contact','newsletter','store'];
      showPage(validSections.includes(section) ? section : 'hero');
    });
  </script>
</body>
