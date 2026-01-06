// Main JavaScript file

document.addEventListener('DOMContentLoaded', () => {
    console.log('Mercedes-Benz Landing Page Loaded');
});



/* ===========  MODAL LOGIC =========== */
/* Handles newsletter form submission and success modal display.
   Features: focus management, keyboard/click closing, accessibility. */

(() => {
  const form = document.getElementById("newsletter-form");
  const modal = document.getElementById("newsletter-modal");
  if (!form || !modal) return;

  const modalCard = modal.querySelector(".modal-card");
  const closeBtn = modal.querySelector(".modal-close");
  const okBtn = modal.querySelector(".modal-ok");
  const emailInput = document.getElementById("newsletter-email");

  // Save where focus was before opening modal (for restoration on close)
  let lastFocusEl = null;

  function openModal() {
    lastFocusEl = document.activeElement;
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    modalCard?.focus(); // Move focus into modal
  }

  function closeModal() {
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scrolling
    (lastFocusEl || emailInput)?.focus?.(); // Return focus to original element
  }

  form.addEventListener("submit", (e) => {
  e.preventDefault(); // we control submission UX

  // This shows native messages (email required/invalid, checkbox required, etc.)
  const ok = form.reportValidity();
  if (!ok) return;

  form.reset();
  openModal();
});

  closeBtn?.addEventListener("click", closeModal);
  okBtn?.addEventListener("click", closeModal);

  // Close when clicking outside the modal card (backdrop click)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-visible")) {
      closeModal();
    }
  });
})();
