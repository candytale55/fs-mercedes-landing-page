// Main JavaScript file

document.addEventListener('DOMContentLoaded', () => {
    console.log('Mercedes-Benz Landing Page Loaded');
});


/* ===========  NAVBAR LOGIC =========== */
/* Mobile navigation overlay menu handler.
   Features: focus management, keyboard/click closing, auto-close on resize.
   Uses matchMedia API to sync with CSS breakpoints. */

// TODO: Check that all suggested validations are correct. 
// TODO: Make the flashing menu disapear (check scenic-forests solution)

(() => {
    // ===== Grab elements (defensive check to prevent errors) =====
    const openBtn = document.querySelector(".nav-toggle");
    const menu = document.getElementById("primary-menu");

    if (!openBtn || !menu) return; // Exit if elements don't exist

    const closeBtn = menu.querySelector(".nav-close");
    const navLinks = menu.querySelectorAll(".nav-link");

    // Graceful degradation: menu still works even if close button is missing
    const hasCloseBtn = Boolean(closeBtn);

    // Use matchMedia to sync with CSS breakpoint (avoids hardcoded px values)
    const desktopMediaQuery = window.matchMedia("(min-width: 550px)");


    function openMenu() {
        if (desktopMediaQuery.matches) return; // Desktop uses CSS-based layout, no overlay needed

        menu.classList.add("is-open");
        openBtn.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden"; // Prevent background scroll

        // Move focus into menu for keyboard navigation
        if (closeBtn) closeBtn.focus();
    }


    function closeMenu({ returnFocus = true } = {}) {
        menu.classList.remove("is-open");
        openBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";

        // Return focus to burger button (unless user is navigating away)
        if (returnFocus) openBtn.focus();
    }

    // Auto-close menu when switching to desktop layout
    function handleBreakpointChange(e) {
        if (e.matches) {
            // Switched to desktop: close menu if open
            closeMenu({ returnFocus: false });
        }
    }

    // Listen for breakpoint changes (resize events)
    desktopMediaQuery.addEventListener("change", handleBreakpointChange);

    // Prevent flash during resize by temporarily disabling transitions
    let resizeTimer;
    window.addEventListener("resize", () => {
        // Disable transitions during resize
        menu.style.transition = "none";
        
        if (desktopMediaQuery.matches) {
            // Desktop: ensure menu is not in "open" state
            menu.classList.remove("is-open");
            openBtn.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        }
        
        // Re-enable transitions after resize is complete
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            menu.style.transition = "";
        }, 100);
    });

    openBtn.addEventListener("click", () => {
        const isOpen = menu.classList.contains("is-open");
        isOpen ? closeMenu() : openMenu();
    })

    closeBtn?.addEventListener("click", () => closeMenu());

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("is-open")) {
            closeMenu();
        }
    });

    // Close menu after clicking a nav link (smooth mobile UX)
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (menu.classList.contains("is-open")) {
                closeMenu({ returnFocus: false }); // Don't return focus - user is navigating
            }
        });
    });
})();










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
