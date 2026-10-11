/* ============================================================
   PORTFOLIO JAVASCRIPT
   BS Computer Science Student — Premium Developer Portfolio
   ============================================================
   Features:
   1.  Theme toggle (dark/light) with localStorage
   2.  Sticky navbar scroll effect
   3.  Mobile hamburger menu
   4.  Active navigation highlighting on scroll
   5.  Smooth scrolling for nav links
   6.  Scroll reveal animations (IntersectionObserver)
   7.  Scroll progress bar
   8.  Back to top button
   9. Contact form validation
   10. Auto-updating footer year
   ============================================================ */

(function () {
  'use strict';

  /* ============ 1. THEME TOGGLE ============ */

  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', function () {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });

  /* ============ 2. STICKY NAVBAR SCROLL EFFECT ============ */

  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';

    // Back to top button
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active section highlighting
    highlightActiveSection();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ============ 3. MOBILE HAMBURGER MENU ============ */

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close mobile menu after clicking a nav link
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    });
  });

  /* ============ 4 & 5. ACTIVE SECTION HIGHLIGHTING ============ */

  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link[data-section]');

  function highlightActiveSection() {
    let currentSection = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    // If at the very top, highlight home
    if (window.scrollY < 100) {
      currentSection = 'home';
    }

    navItems.forEach(function (item) {
      if (item.getAttribute('data-section') === currentSection) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Smooth scrolling for nav links (enhanced, offset for navbar)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth',
      });
    });
  });

  /* ============ 6. SCROLL REVEAL ANIMATIONS ============ */

  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ============ 8. BACK TO TOP BUTTON ============ */

  backToTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  /* ============ 9. CONTACT FORM VALIDATION & FORMSPREE SUBMISSION ============ */

  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');
  const submitBtn = document.getElementById('submitBtn');

  // ============================================================
  // Contact form submits to a Supabase Edge Function that stores
  // the message in the database. The owner can read submissions
  // from the Supabase dashboard.
  // ============================================================
  const SUPABASE_URL = 'https://isnyqmubsdioluimflrf.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbnlxbXVic2Rpb2x1aW1mbHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyOTI1NzEsImV4cCI6MjEwNjg2ODU3MX0.hG6_IFgN48h-IN8_7T4k8tUrQ6TPZw_acS1bsiFKBGU';
  const CONTACT_ENDPOINT = `${SUPABASE_URL}/functions/v1/contact-submit`;

  function validateName() {
    const value = nameInput.value.trim();
    if (value.length === 0) {
      nameError.textContent = 'Please enter your name.';
      nameInput.classList.add('invalid');
      return false;
    }
    if (value.length < 2) {
      nameError.textContent = 'Name must be at least 2 characters.';
      nameInput.classList.add('invalid');
      return false;
    }
    nameError.textContent = '';
    nameInput.classList.remove('invalid');
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value.length === 0) {
      emailError.textContent = 'Please enter your email.';
      emailInput.classList.add('invalid');
      return false;
    }
    if (!emailRegex.test(value)) {
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.classList.add('invalid');
      return false;
    }
    emailError.textContent = '';
    emailInput.classList.remove('invalid');
    return true;
  }

  function validateSubject() {
    const value = subjectInput.value.trim();
    if (value.length === 0) {
      subjectError.textContent = 'Please enter a subject.';
      subjectInput.classList.add('invalid');
      return false;
    }
    if (value.length < 3) {
      subjectError.textContent = 'Subject must be at least 3 characters.';
      subjectInput.classList.add('invalid');
      return false;
    }
    subjectError.textContent = '';
    subjectInput.classList.remove('invalid');
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (value.length === 0) {
      messageError.textContent = 'Please enter a message.';
      messageInput.classList.add('invalid');
      return false;
    }
    if (value.length < 10) {
      messageError.textContent = 'Message must be at least 10 characters.';
      messageInput.classList.add('invalid');
      return false;
    }
    messageError.textContent = '';
    messageInput.classList.remove('invalid');
    return true;
  }

  function showFormMessage(el, msg) {
    el.textContent = msg;
    el.classList.add('show');
  }

  function hideFormMessages() {
    formSuccess.classList.remove('show');
    formSuccess.textContent = '';
    formError.classList.remove('show');
    formError.textContent = '';
  }

  function setLoading(loading) {
    if (loading) {
      submitBtn.classList.add('loading');
      submitBtn.setAttribute('disabled', 'true');
    } else {
      submitBtn.classList.remove('loading');
      submitBtn.removeAttribute('disabled');
    }
  }

  // Real-time validation
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  subjectInput.addEventListener('input', validateSubject);
  messageInput.addEventListener('input', validateMessage);

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    hideFormMessages();

    const validName = validateName();
    const validEmail = validateEmail();
    const validSubject = validateSubject();
    const validMessage = validateMessage();

    if (!validName || !validEmail || !validSubject || !validMessage) {
      return;
    }

    // Submit to Supabase Edge Function
    setLoading(true);

    fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
      }),
    })
      .then(async function (response) {
        var data;
        try {
          data = await response.json();
        } catch (e) {
          data = {};
        }
        return { ok: response.ok, data: data };
      })
      .then(function (result) {
        if (result.ok && result.data.success) {
          contactForm.reset();
          showFormMessage(formSuccess, result.data.message || "Message sent successfully! I'll get back to you soon.");
          setTimeout(function () {
            formSuccess.classList.remove('show');
            formSuccess.textContent = '';
          }, 6000);
        } else {
          var errMsg = result.data.error || 'Something went wrong. Please try again or email me directly.';
          if (result.data.detail) {
            errMsg += ' (' + result.data.detail + ')';
          }
          showFormMessage(formError, errMsg);
        }
      })
      .catch(function (err) {
        showFormMessage(formError, 'Network error. Please check your connection and try again, or email me directly.');
      })
      .finally(function () {
        setLoading(false);
      });
  });

  /* ============ 11. AUTO-UPDATING FOOTER YEAR ============ */

  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* ============ 12. CGPA COUNTER ANIMATION ============ */

  const cgpaValue = document.querySelector('.cgpa-value');
  if (cgpaValue && 'IntersectionObserver' in window) {
    const targetCGPA = parseFloat(cgpaValue.textContent) || 0;
    let counted = false;

    const cgpaObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            var start = 0;
            var duration = 1200;
            var startTime = null;

            function animate(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              var eased = 1 - Math.pow(1 - progress, 3);
              cgpaValue.textContent = (eased * targetCGPA).toFixed(2);
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                cgpaValue.textContent = targetCGPA.toFixed(2);
              }
            }

            // Respect reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              cgpaValue.textContent = targetCGPA.toFixed(2);
            } else {
              requestAnimationFrame(animate);
            }
            cgpaObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    cgpaObserver.observe(cgpaValue);
  }

  /* ============ INITIAL CALLS ============ */

  // Set initial scroll state
  handleScroll();
  highlightActiveSection();
})();
