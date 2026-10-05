
document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuBtn.textContent = isOpen ? "×" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");

        menuBtn.setAttribute("aria-label", "Open menu");
        menuBtn.textContent = "☰";
      });
    });
  }


  /* =========================================================
     PROJECT FILTERS
  ========================================================= */

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      projectCards.forEach((card) => {
        const categories = card.dataset.category || "";

        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "";
          requestAnimationFrame(() => {
            card.classList.remove("project-hidden");
          });
        } else {
          card.classList.add("project-hidden");

          setTimeout(() => {
            if (card.classList.contains("project-hidden")) {
              card.style.display = "none";
            }
          }, 250);
        }
      });
    });
  });


  /* =========================================================
     PROJECT CASE STUDY MODAL
  ========================================================= */

  const projectModal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");

  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTags = document.getElementById("modalTags");
  const modalFeatures = document.getElementById("modalFeatures");
  const modalDemo = document.getElementById("modalDemo");
  const modalGithub = document.getElementById("modalGithub");

  const projectData = {
    crm: {
      category: "01 / Business Application",
      title: "Customer Relationship Management",
      description:
        "A database-driven CRM application designed to organize customer information, simplify business workflows, and provide a centralized platform for managing customer-related operations.",
      tags: [
        "HTML",
        "CSS",
        "JavaScript",
        "ColdFusion",
        "MySQL"
      ],
      features: [
        "Customer information management",
        "Database-driven business workflows",
        "Customer records and organization",
        "Responsive dashboard interface",
        "MySQL database integration"
      ],
      demo: "http://localhost:8500/CRM/views/loginform.cfm",
      github: "https://github.com/superiorx813/CRM-NEW-VERSION"
    },

    "project-management": {
      category: "02 / Management Platform",
      title: "Project Management System",
      description:
        "A React-based project management platform designed to organize projects, track tasks, manage workflows, and provide a structured interface for teams.",
      tags: [
        "React",
        "JavaScript",
        "MySQL",
        "Dashboard"
      ],
      features: [
        "Project organization",
        "Task tracking",
        "Workflow management",
        "Responsive dashboard",
        "Database-backed application"
      ],
      demo: "#",
      github: "#"
    },

    ecommerce: {
      category: "03 / Commerce Experience",
      title: "E-Commerce Application",
      description:
        "A complete e-commerce experience featuring product browsing, shopping cart functionality, responsive interfaces, and database integration.",
      tags: [
        "React",
        "TypeScript",
        "Bootstrap",
        "MySQL"
      ],
      features: [
        "Product browsing",
        "Shopping cart functionality",
        "Responsive e-commerce interface",
        "Product and database integration",
        "Modern customer experience"
      ],
      demo: "#",
      github: "#"
    }
  };


  function openProjectModal(projectKey) {
    if (!projectModal) return;

    const project = projectData[projectKey];

    if (!project) {
      console.warn(`Project "${projectKey}" was not found.`);
      return;
    }

    if (modalCategory) {
      modalCategory.textContent = project.category;
    }

    if (modalTitle) {
      modalTitle.textContent = project.title;
    }

    if (modalDescription) {
      modalDescription.textContent = project.description;
    }

    if (modalTags) {
      modalTags.innerHTML = "";

      project.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;

        modalTags.appendChild(span);
      });
    }

    if (modalFeatures) {
      modalFeatures.innerHTML = "";

      project.features.forEach((feature) => {
        const li = document.createElement("li");
        li.textContent = feature;

        modalFeatures.appendChild(li);
      });
    }

    if (modalDemo) {
      modalDemo.href = project.demo;

      if (project.demo === "#") {
        modalDemo.removeAttribute("target");
      } else {
        modalDemo.setAttribute("target", "_blank");
        modalDemo.setAttribute("rel", "noopener noreferrer");
      }
    }

    if (modalGithub) {
      modalGithub.href = project.github;

      if (project.github === "#") {
        modalGithub.removeAttribute("target");
      } else {
        modalGithub.setAttribute("target", "_blank");
        modalGithub.setAttribute("rel", "noopener noreferrer");
      }
    }

    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
  }


  function closeProjectModal() {
    if (!projectModal) return;

    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
  }


  document.querySelectorAll(".open-modal").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const projectKey = button.dataset.project;

      openProjectModal(projectKey);
    });
  });


  if (modalClose) {
    modalClose.addEventListener("click", (event) => {
      event.preventDefault();
      closeProjectModal();
    });
  }


  if (projectModal) {
    projectModal.addEventListener("click", (event) => {
      if (event.target === projectModal) {
        closeProjectModal();
      }
    });
  }


  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectModal();
    }
  });


  /* =========================================================
     ID CARD FLIP
  ========================================================= */

  const profileCard = document.getElementById("profileCard");
  const flipCardBtn = document.getElementById("flipCardBtn");

  if (profileCard && flipCardBtn) {
    const cardInner = profileCard.querySelector(".id-card-inner");

    if (cardInner) {
      let cardFlipped = false;

      flipCardBtn.addEventListener("click", () => {
        cardFlipped = !cardFlipped;

        cardInner.style.transform = cardFlipped
          ? "rotateY(180deg)"
          : "rotateY(0deg)";

        flipCardBtn.setAttribute(
          "aria-pressed",
          cardFlipped ? "true" : "false"
        );
      });
    }
  }


  /* =========================================================
     SCROLL REVEAL ANIMATION
  ========================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }


  /* =========================================================
     CONTACT FORM
  ========================================================= */

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const subjectInput = document.getElementById("subject");
      const messageInput = document.getElementById("message");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const subject = subjectInput ? subjectInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name || !email || !subject || !message) {
        if (formMessage) {
          formMessage.textContent =
            "Please complete all fields before sending.";
          formMessage.classList.add("error");
          formMessage.classList.remove("success");
        }

        return;
      }

      if (formMessage) {
        formMessage.textContent =
          "Thank you. Your message has been prepared successfully.";
        formMessage.classList.remove("error");
        formMessage.classList.add("success");
      }

      contactForm.reset();
    });
  }


  /* =========================================================
     CURRENT YEAR
  ========================================================= */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =========================================================
     ACTIVE NAVIGATION ON SCROLL
  ========================================================= */

  const sections = document.querySelectorAll("main section[id]");
  const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const currentId = entry.target.getAttribute("id");

          navigationLinks.forEach((link) => {
            const linkTarget = link.getAttribute("href");

            if (linkTarget === `#${currentId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        });
      },
      {
        threshold: 0.25,
        rootMargin: "-20% 0px -55% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });


  /* =========================================================
     MOHAN LETTER INTERACTION
     ========================================================= */

  const mohanLetters = document.querySelectorAll(".mohan-letter");

  mohanLetters.forEach((letter, index) => {
    letter.style.setProperty(
      "--letter-delay",
      `${index * 0.12}s`
    );
  });


  
});

