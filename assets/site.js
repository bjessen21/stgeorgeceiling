(function () {
    'use strict';

   // ---- Mobile nav toggle ----
   var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.navlinks');
    if (navToggle && navLinks) {
          navToggle.addEventListener('click', function () {
                  var isOpen = navLinks.classList.toggle('open');
                  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          });
    }

 // ---- Services dropdown (click/tap toggle, hover still works via CSS) ----
 var toggles = document.querySelectorAll('.dropdown-toggle');
  toggles.forEach(function (btn) {
    var menu = btn.parentElement.querySelector('.menu');
    if (!menu) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

 document.addEventListener('click', function (e) {
   document.querySelectorAll('.dropdown .menu.open').forEach(function (menu) {
     if (!menu.parentElement.contains(e.target)) {
       menu.classList.remove('open');
       var btn = menu.parentElement.querySelector('.dropdown-toggle');
       if (btn) btn.setAttribute('aria-expanded', 'false');
     }
   });
 });

 document.addEventListener('keydown', function (e) {
   if (e.key === 'Escape') {
     document.querySelectorAll('.dropdown .menu.open').forEach(function (menu) {
       menu.classList.remove('open');
     });
     document.querySelectorAll('.dropdown-toggle').forEach(function (btn) {
       btn.setAttribute('aria-expanded', 'false');
     });
     if (navLinks) navLinks.classList.remove('open');
     if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
   }
 });

 // ---------------------------------------------------------------
 // Lead form submission — Google Apps Script Web App.
 // Paste your deployed Web App URL below. See
 // apps-script-lead-form.gs.txt for deployment steps.
 // ---------------------------------------------------------------
 var APPS_SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';

 document.querySelectorAll('form.lead-form').forEach(function (form) {
   var status = form.querySelector('.form-status');

                                                     form.addEventListener('submit', function (e) {
                                                       e.preventDefault();

                                                                           if (APPS_SCRIPT_URL.indexOf('PASTE_YOUR') === 0) {
                                                                             if (status) {
                                                                               status.textContent = 'This form is not connected yet — add your Apps Script Web App URL in assets/site.js.';
                                                                               status.className = 'form-status error';
                                                                               status.hidden = false;
                                                                             }
                                                                             return;
                                                                           }

                                                                           var btn = form.querySelector('button[type="submit"]');
                                                       var originalText = btn ? btn.textContent : '';
                                                       if (btn) {
                                                         btn.disabled = true;
                                                         btn.textContent = 'Sending…';
                                                       }
                                                       if (status) status.hidden = true;

                                                                           var data = new FormData(form);

                                                                           // Apps Script Web Apps don't return CORS headers, so the response
                                                                           // body can't be read from fetch(). mode:"no-cors" lets the POST
                                                                           // go through and land in the Sheet; a successful fetch (no network
                                                                           // error) is treated as success here. Check the Sheet directly for
                                                                           // guaranteed delivery confirmation.
                                                                           fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: data })
                                                       .then(function () {
                                                         form.reset();
                                                         form.style.display = 'none';
                                                         if (status) {
                                                           status.textContent = "Thanks — we've got your request and will call you back within one business day.";
                                                           status.className = 'form-status success';
                                                           status.hidden = false;
                                                         }
                                                       })

                                                                           .catch(function () {
                                                                             if (status) {
                                                                               status.textContent = 'Something went wrong sending your request. Please call us directly at 435-334-2921.';
                                                                               status.className = 'form-status error';
                                                                               status.hidden = false;
                                                                             }
                                                                             if (btn) {
                                                                               btn.disabled = false;
                                                                               btn.textContent = originalText;
                                                                             }
                                                                           });
                                                     });
 });
})();
