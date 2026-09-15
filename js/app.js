const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  menuBtn.textContent = navLinks.classList.contains("open")
    ? "×"
    : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

/* Scroll reveal animation */
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealItems.forEach(item => {
  revealObserver.observe(item);
});

/* Project filtering */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;

      if (filter === "all" || category.includes(filter)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* Project data */
const projectData = {
  crm: {
    category: "01 / Business Application",
    title: "Customer Relationship Management",
    description:
      "A CRM platform created to help businesses organize customer information, manage internal workflows, and access important data from a centralized system.",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "ColdFusion",
      "MySQL"
    ],
    features: [
      "Customer record management",
      "Search and filtering functionality",
      "Database-driven workflows",
      "Structured business data",
      "Responsive dashboard interface"
    ],
    demo: "https://example.com",
    github: "https://github.com/"
  },

  "project-management": {
    category: "02 / Management Platform",
    title: "Project Management System",
    description:
      "A React-based project management application designed to help teams organize projects, monitor tasks, and track progress through an intuitive dashboard.",
    tags: [
      "React",
      "MySQL",
      "JavaScript",
      "Dashboard"
    ],
    features: [
      "Project and task organization",
      "Task status tracking",
      "Centralized project dashboard",
      "Responsive application layout",
      "MySQL-backed data structure"
    ],
    demo: "https://example.com",
    github: "https://github.com/"
  },

  ecommerce: {
    category: "03 / Commerce Experience",
    title: "Full-Length E-Commerce Application",
    description:
      "A complete e-commerce experience featuring product browsing, product details, shopping cart functionality, responsive layouts, and structured database integration.",
    tags: [
      "React",
      "TypeScript",
      "HTML",
      "CSS",
      "Bootstrap",
      "MySQL"
    ],
    features: [
      "Product listing and details",
      "Shopping cart experience",
      "Responsive product layouts",
      "Type-safe React components",
      "Database-driven product data"
    ],
    demo: "https://example.com",
    github: "https://github.com/"
  }
};

/* Project modal */
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
const modalFeatures = document.getElementById("modalFeatures");
const modalDemo = document.getElementById("modalDemo");
const modalGithub = document.getElementById("modalGithub");

function openProjectModal(projectId) {
  const project = projectData[projectId];

  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  modalTags.innerHTML = project.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join("");

  modalFeatures.innerHTML = project.features
    .map(feature => `<li>${feature}</li>`)
    .join("");

  modalDemo.href = project.demo;
  modalGithub.href = project.github;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".open-modal").forEach(button => {
  button.addEventListener("click", () => {
    openProjectModal(button.dataset.project);
  });
});

modalClose.addEventListener("click", closeProjectModal);

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeProjectModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeProjectModal();
  }
});

/* Contact form */
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    formMessage.style.color = "#ff7c91";
    formMessage.textContent = "Please complete all fields.";
    return;
  }

  const recipient = "mohan.kasani.420@gmail.com";

  const mailSubject = encodeURIComponent(subject);

  const mailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  window.location.href =
    `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;

  formMessage.style.color = "#c7f36b";
  formMessage.textContent = "Opening your email application...";

  contactForm.reset();
});

/* Current year */
document.getElementById("year").textContent =
  new Date().getFullYear();

/* Active navigation link */
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(
  ".nav-links a:not(.nav-cta)"
);

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach(item => {
    item.classList.remove("active");

    if (item.getAttribute("href") === `#${currentSection}`) {
      item.classList.add("active");
    }
  });
});