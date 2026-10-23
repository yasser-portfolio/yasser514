
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const role = document.getElementById("role");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const backToTop = document.getElementById("back-to-top");

  // Automatically update the footer year.
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // Mobile navigation.
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close mobile navigation after clicking a link.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  // Rotate professional roles.
  if (role) {
    const roles = [
      "UI/UX Design",
      "Graphic Design",
      "Front-End Development",
      "Creative Branding"
    ];

    let currentRole = 0;

    window.setInterval(() => {
      currentRole = (currentRole + 1) % roles.length;
      role.textContent = roles[currentRole];
    }, 2500);
  }

  // Highlight the active navigation section.
  const sections = document.querySelectorAll("main section[id]");
  const navigationLinks = navLinks.querySelectorAll("a[href^='#']");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navigationLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      });
    }, {
      rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach((section) => observer.observe(section));
  }

  // Back-to-top button.
  function updateBackToTop() {
    backToTop.classList.toggle("visible", window.scrollY > 350);
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Prepare an email using the visitor's default email application.
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please complete all fields.";
      return;
    }

    const subject = encodeURIComponent(
      `Portfolio inquiry from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    formStatus.textContent =
      "Opening your email application. Please send the email to complete your message.";

    window.location.href =
      `mailto:Kaleemnasir85@gmail.com?subject=${subject}&body=${body}`;
  });
});
