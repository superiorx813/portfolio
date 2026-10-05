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
    demo: "http://localhost:8500/CRM/views/loginform.cfm",
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

/* =========================================================
   MOHAN HANGING LETTER PHYSICS
   ========================================================= */

const mohanName = document.getElementById("mohanName");
const mohanLetters = document.querySelectorAll(".mohan-letter");

if (mohanName && mohanLetters.length) {

  const letterPhysics = [];

  mohanLetters.forEach((letter, index) => {

    letterPhysics.push({
      element: letter,

      index,

      x: 0,
      y: 0,
      rotation: 0,

      targetX: 0,
      targetY: 0,
      targetRotation: 0,

      velocityX: 0,
      velocityY: 0,
      velocityRotation: 0,

      hover: false,

      phase:
        index * 0.8 +
        Math.random() * 0.5
    });

  });


  let mouseX = 0;
  let mouseY = 0;

  let nameRect = null;


  function updateNameRect() {
    nameRect = mohanName.getBoundingClientRect();
  }


  function calculateLetterTargets() {

    if (!nameRect) {
      updateNameRect();
    }

    letterPhysics.forEach((item, index) => {

      const rect =
        item.element.getBoundingClientRect();

      const centerX =
        rect.left + rect.width / 2;

      const centerY =
        rect.top + rect.height / 2;

      const distanceX =
        mouseX - centerX;

      const distanceY =
        mouseY - centerY;

      const distance =
        Math.sqrt(
          distanceX * distanceX +
          distanceY * distanceY
        );

      const interactionRadius = 115;


      if (distance < interactionRadius) {

        const influence =
          1 - distance / interactionRadius;

        const direction =
          distanceX >= 0 ? 1 : -1;

        /*
         * Horizontal movement.
         * The closer the mouse is to a letter,
         * the stronger the movement.
         */
        item.targetX =
          direction *
          influence *
          Math.min(
            Math.abs(distanceX) * 0.24,
            17
          );


        /*
         * Small vertical movement.
         */
        item.targetY =
          Math.sin(
            performance.now() * 0.006 +
            item.phase
          ) *
          influence *
          3;


        /*
         * Rotation creates the hanging-letter effect.
         */
        item.targetRotation =
          direction *
          influence *
          Math.min(
            Math.abs(distanceX) * 0.08,
            13
          );

        item.hover = true;

      } else {

        /*
         * When mouse leaves,
         * letters naturally return.
         */
        item.targetX = 0;
        item.targetY = 0;
        item.targetRotation = 0;

        item.hover = false;
      }

    });

  }


  function animateLetters() {

    calculateLetterTargets();


    letterPhysics.forEach(item => {

      /*
       * Spring force.
       */
      const spring = 0.075;

      /*
       * Damping creates physical inertia.
       */
      const damping = 0.82;


      const forceX =
        (item.targetX - item.x) * spring;

      const forceY =
        (item.targetY - item.y) * spring;

      const forceRotation =
        (item.targetRotation - item.rotation) *
        spring;


      item.velocityX += forceX;
      item.velocityY += forceY;
      item.velocityRotation += forceRotation;


      item.velocityX *= damping;
      item.velocityY *= damping;
      item.velocityRotation *= damping;


      item.x += item.velocityX;
      item.y += item.velocityY;
      item.rotation += item.velocityRotation;


      item.element.style.setProperty(
        "--letter-x",
        `${item.x.toFixed(2)}px`
      );

      item.element.style.setProperty(
        "--letter-y",
        `${item.y.toFixed(2)}px`
      );

      item.element.style.setProperty(
        "--letter-rotation",
        `${item.rotation.toFixed(2)}deg`
      );

    });


    requestAnimationFrame(animateLetters);
  }


  /*
   * Track mouse movement.
   */
  mohanName.addEventListener(
    "pointermove",
    event => {

      mouseX = event.clientX;
      mouseY = event.clientY;

    }
  );


  /*
   * Give the letters a small physical impulse
   * when the pointer enters the name.
   */
  mohanName.addEventListener(
    "pointerenter",
    event => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      letterPhysics.forEach((item, index) => {

        const impulse =
          index % 2 === 0
            ? 1
            : -1;

        item.velocityRotation +=
          impulse * 0.35;

      });

    }
  );


  /*
   * Reset mouse position when leaving.
   */
  mohanName.addEventListener(
    "pointerleave",
    () => {

      mouseX = -10000;
      mouseY = -10000;

    }
  );


  window.addEventListener(
    "resize",
    updateNameRect
  );


  updateNameRect();

  /*
   * Start physics loop.
   */
  animateLetters();

}


/* =========================================================
   ID CARD 3D FLIP
   ========================================================= */

const profileCard =
  document.getElementById("profileCard");

const flipCardBtn =
  document.getElementById("flipCardBtn");


if (profileCard && flipCardBtn) {

  flipCardBtn.addEventListener(
    "click",
    () => {

      const isFlipped =
        profileCard.classList.toggle("flipped");

      flipCardBtn.classList.toggle(
        "active",
        isFlipped
      );

      flipCardBtn.setAttribute(
        "aria-pressed",
        isFlipped ? "true" : "false"
      );

    }
  );

}


/* =========================================================
   ID CARD PHYSICAL HOVER SWING
   ========================================================= */

const idCardScene =
  document.querySelector(".id-card-scene");


if (idCardScene) {

  let swingTimeout;


  idCardScene.addEventListener(
    "pointerenter",
    () => {

      /*
       * Restart animation cleanly every time.
       */
      idCardScene.classList.remove(
        "card-swing"
      );

      void idCardScene.offsetWidth;

      idCardScene.classList.add(
        "card-swing"
      );


      clearTimeout(swingTimeout);

      swingTimeout =
        setTimeout(() => {

          idCardScene.classList.remove(
            "card-swing"
          );

        }, 1150);

    }
  );


  idCardScene.addEventListener(
    "animationend",
    () => {

      idCardScene.classList.remove(
        "card-swing"
      );

    }
  );

}


/* =========================================================
   ID CARD POINTER-BASED SWING
   Adds subtle physical response to mouse position.
   ========================================================= */

if (
  idCardScene &&
  window.matchMedia("(hover: hover)").matches
) {

  let cardMouseX = 0;
  let cardCurrentRotation = 0;


  idCardScene.addEventListener(
    "pointermove",
    event => {

      const rect =
        idCardScene.getBoundingClientRect();

      const relativeX =
        (event.clientX - rect.left) /
        rect.width;

      const rotation =
        (relativeX - 0.5) * 8;


      cardMouseX = rotation;

    }
  );


  idCardScene.addEventListener(
    "pointerleave",
    () => {

      cardMouseX = 0;

    }
  );


  function animateIdCardSwing() {

    /*
     * Smooth interpolation.
     */
    cardCurrentRotation +=
      (cardMouseX - cardCurrentRotation) *
      0.08;


    /*
     * Don't interfere with the CSS swing
     * animation while it is running.
     */
    if (
      !idCardScene.classList.contains(
        "card-swing"
      )
    ) {

      idCardScene.style.transform =
        `rotate(${cardCurrentRotation.toFixed(2)}deg)`;

    }


    requestAnimationFrame(
      animateIdCardSwing
    );
  }


  animateIdCardSwing();

}

/* =========================================================
   PROFILE PHOTO FALLBACK
   ========================================================= */

const profilePhoto =
  document.querySelector(".profile-photo");

const photoPlaceholder =
  document.querySelector(".photo-placeholder");

if (profilePhoto && photoPlaceholder) {

  profilePhoto.addEventListener(
    "error",
    () => {

      profilePhoto.style.display = "none";
      photoPlaceholder.style.display = "flex";

    }
  );

}