const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Set the current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

// Toggle the mobile navigation menu.
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after clicking a navigation link.
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Highlight the navigation link for the current section.
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navigationLinks.forEach((link) => {
                        const active =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", active);
                    });
                }
            });
        },
        { rootMargin: "-25% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
}

// Frontend-only contact form demonstration.
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    formStatus.textContent =
        "Demo only: your message was not sent or stored. Connect an email service to receive messages.";

    contactForm.reset();
});