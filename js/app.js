/* Portfolio interactions — keep project URLs updated in projectData below. */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = [...document.querySelectorAll(".nav-link")];

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  // Reveal sections as they enter the viewport.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Highlight the navigation link for the visible section.
  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Project filters.
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const projectCards = [...document.querySelectorAll(".project-card")];
  filterButtons.forEach(button => button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      const categories = (card.dataset.category || "").split(/\s+/);
      card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  }));

  // Add your real project URLs here when ready.
  const projectData = {
    crm: {
      title: "Customer Management System",
      category: "FULL-STACK WEB APPLICATION",
      description: "A customer management application built around customer records, form validation, search, edit flows, database operations, and a consistent interface. The project helped me practice connecting frontend interactions with server-side functionality.",
      tech: ["ColdFusion", "MySQL", "JavaScript", "CSS"],
      live: "",
      repo: ""
    },
    "project-management": {
      title: "Project Management App",
      category: "FULL-STACK WEB APPLICATION",
      description: "A project and task management application concept with authentication, dashboard pages, project organization, and database-backed features. Built while learning modern Next.js and TypeScript application patterns.",
      tech: ["Next.js", "TypeScript", "React", "MongoDB"],
      live: "",
      repo: ""
    },
    ecommerce: {
      title: "Aurora Commerce",
      category: "E-COMMERCE APPLICATION",
      description: "An e-commerce application with product management, product creation forms, database integration, and an admin area for working with orders and customers. The focus is on practical workflows and a polished user experience.",
      tech: ["Next.js", "TypeScript", "React", "Database"],
      live: "",
      repo: ""
    }
  };

  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalEyebrow = document.getElementById("modalEyebrow");
  const modalDescription = document.getElementById("modalDescription");
  const modalTech = document.getElementById("modalTech");
  const modalLiveLink = document.getElementById("modalLiveLink");
  const modalRepoLink = document.getElementById("modalRepoLink");
  const modalLinkNote = document.getElementById("modalLinkNote");
  let lastFocusedElement = null;

  function openProject(projectKey) {
    const project = projectData[projectKey];
    if (!project || !modal) return;
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = project.title;
    modalEyebrow.textContent = project.category;
    modalDescription.textContent = project.description;
    modalTech.replaceChildren(...project.tech.map(tech => {
      const tag = document.createElement("span");
      tag.textContent = tech;
      return tag;
    }));

    const hasLive = Boolean(project.live);
    const hasRepo = Boolean(project.repo);
    modalLiveLink.href = hasLive ? project.live : "#";
    modalRepoLink.href = hasRepo ? project.repo : "#";
    modalLiveLink.classList.toggle("is-disabled", !hasLive);
    modalRepoLink.classList.toggle("is-disabled", !hasRepo);
    modalLiveLink.setAttribute("aria-disabled", String(!hasLive));
    modalRepoLink.setAttribute("aria-disabled", String(!hasRepo));
    modalLinkNote.textContent = (!hasLive && !hasRepo)
      ? "Project links have not been added yet. Add your live demo and repository URLs in js/app.js."
      : "Use the links above to view the project or source code.";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalClose?.focus();
  }

  function closeProject() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  }

  document.querySelectorAll("[data-open-project]").forEach(button => {
    button.addEventListener("click", () => openProject(button.dataset.openProject));
  });
  modalClose?.addEventListener("click", closeProject);
  modal?.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeProject));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal?.classList.contains("is-open")) closeProject();
  });

  // Make unavailable project links inert until real URLs are supplied.
  [modalLiveLink, modalRepoLink].forEach(link => link?.addEventListener("click", event => {
    if (link.getAttribute("aria-disabled") === "true") event.preventDefault();
  }));

  // 3D profile card: click, Enter, or Space to flip; pointer adds subtle tilt.
  const idCard = document.getElementById("idCard");
  const idCardWrap = document.getElementById("idCardWrap");
  function flipCard() {
    idCard?.classList.toggle("is-flipped");
  }
  idCard?.addEventListener("click", event => {
    if (event.target.closest("a")) return;
    flipCard();
  });
  idCard?.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      flipCard();
    }
  });
  idCardWrap?.addEventListener("pointermove", event => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || idCard?.classList.contains("is-flipped")) return;
    const rect = idCardWrap.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    idCard.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 8}deg)`;
  });
  idCardWrap?.addEventListener("pointerleave", () => {
    if (!idCard) return;
    idCard.style.transform = idCard.classList.contains("is-flipped") ? "rotateY(180deg)" : "";
  });

  // Use a project-relative portrait, never a local Windows file path.
  const profilePhoto = document.getElementById("profilePhoto");
  const photoFallback = document.getElementById("photoFallback");
  if (profilePhoto) {
    profilePhoto.addEventListener("error", () => {
      profilePhoto.style.display = "none";
      if (photoFallback) photoFallback.style.display = "grid";
    });
    profilePhoto.addEventListener("load", () => {
      profilePhoto.style.display = "block";
      if (photoFallback) photoFallback.style.display = "none";
    });
  }

  // Contact form opens the visitor's default email app with the form filled in.
  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:mohan.kasani.420@gmail.com?subject=${subject}&body=${body}`;
  });

  const currentYear = document.getElementById("currentYear");
  if (currentYear) currentYear.textContent = new Date().getFullYear();
});
