/* ============================================
   Simple Digital — Main JavaScript
   Handles mobile navigation & contact form
   ============================================ */

/**
 * Wait for the DOM to be fully loaded before running scripts.
 */
document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------
     MOBILE NAVIGATION TOGGLE
     Opens and closes the hamburger menu on
     small screens (below 640px).
  ------------------------------------------ */
  var navToggle  = document.getElementById('nav-toggle');
  var navLinks   = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      /* Toggle the "open" class on both the button and the nav list */
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');

      /* Update the aria-expanded attribute for accessibility */
      var isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    /* Close the menu if the user clicks a link (better mobile UX) */
    var links = navLinks.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------
     CONTACT FORM VALIDATION
     Validates required fields before showing
     a success message. The form does NOT
     submit data to a server.
  ------------------------------------------ */
  var contactForm   = document.getElementById('contact-form');
  var successMsg    = document.getElementById('form-success');

  if (contactForm && successMsg) {
    contactForm.addEventListener('submit', function (event) {
      /* Prevent the default form submission */
      event.preventDefault();

      /* Get input values */
      var nameInput    = document.getElementById('contact-name');
      var emailInput   = document.getElementById('contact-email');
      var messageInput = document.getElementById('contact-message');

      /* Track if form is valid */
      var isValid = true;

      /* --- Validate Name --- */
      if (nameInput.value.trim() === '') {
        showError(nameInput, 'name-error', 'Please enter your name.');
        isValid = false;
      } else {
        hideError(nameInput, 'name-error');
      }

      /* --- Validate Email --- */
      if (emailInput.value.trim() === '') {
        showError(emailInput, 'email-error', 'Please enter your email address.');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'email-error', 'Please enter a valid email address.');
        isValid = false;
      } else {
        hideError(emailInput, 'email-error');
      }

      /* --- Validate Message --- */
      if (messageInput.value.trim() === '') {
        showError(messageInput, 'message-error', 'Please enter a message.');
        isValid = false;
      } else {
        hideError(messageInput, 'message-error');
      }

      /* --- If valid, show success --- */
      if (isValid) {
        contactForm.style.display = 'none';
        successMsg.classList.add('visible');
      }
    });
  }

  /* ------------------------------------------
     HELPER: Show an error message
     Adds the 'error' class to the input and
     makes the error text visible.
  ------------------------------------------ */
  function showError(input, errorId, message) {
    input.classList.add('error');
    var errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  /* ------------------------------------------
     HELPER: Hide an error message
  ------------------------------------------ */
  function hideError(input, errorId) {
    input.classList.remove('error');
    var errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  /* ------------------------------------------
     HELPER: Basic email format check
     Uses a simple regex pattern.
  ------------------------------------------ */
  function isValidEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

});
