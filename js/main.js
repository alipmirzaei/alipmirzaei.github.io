/**
 * Clean Minimal Terminal Controller
 * Formspree Live Integration
 */

document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projects-container");
  const skillsContainer = document.getElementById("skills-container");
  const educationContainer = document.getElementById("education-container");
  const toastContainer = document.getElementById("toast-container");
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const contactForm = document.getElementById("contact-form");

  // --- 1. Render Skills ---
  function renderSkills() {
    if (!skillsContainer) return;
    skillsContainer.innerHTML = "";

    portfolioData.skills.forEach(cat => {
      const box = document.createElement("div");
      box.className = "skill-box";
      const listHtml = cat.items.map(item => `<li>${item}</li>`).join("");

      box.innerHTML = `
        <h4 class="skill-cat-name">${cat.category}</h4>
        <ul class="skill-list">${listHtml}</ul>
      `;

      skillsContainer.appendChild(box);
    });
  }

  // --- 2. Render Projects ---
  function renderProjects() {
    if (!projectsContainer) return;
    projectsContainer.innerHTML = "";

    portfolioData.projects.forEach(p => {
      const item = document.createElement("div");
      item.className = "project-item";
      const tagsHtml = p.tags.map(t => `<span class="tech-tag">${t}</span>`).join("");

      item.innerHTML = `
        <div class="project-top-line">
          <h3 class="project-title">${p.title}</h3>
          <span class="project-tag-index">/${p.index}</span>
        </div>
        <p class="project-desc">${p.description}</p>
        <div class="project-tech-tags">${tagsHtml}</div>
        <div class="project-links-row">
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="term-btn">
            github
          </a>
          <a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="term-btn">
            live demo →
          </a>
        </div>
      `;

      projectsContainer.appendChild(item);
    });
  }

  // --- 3. Render Education ---
  function renderEducation() {
    if (!educationContainer) return;
    educationContainer.innerHTML = "";

    portfolioData.experience.forEach(edu => {
      const card = document.createElement("div");
      card.className = "edu-card";
      card.innerHTML = `
        <div class="edu-period">${edu.period}</div>
        <div class="edu-degree">${edu.role}</div>
        <div class="edu-school">${edu.org}</div>
        <div class="edu-desc">${edu.description}</div>
      `;
      educationContainer.appendChild(card);
    });
  }

  // --- 4. Toast Dispatcher ---
  function showToast(msg) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 250);
    }, 4000);
  }

  // --- 5. Copy Email Buffer ---
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const email = portfolioData.personal.social.email;
      navigator.clipboard.writeText(email).then(() => {
        showToast("Email copied to clipboard.");
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }

  // --- 6. Live Formspree Contact Form Submission ---
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const prevText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch("https://formspree.io/f/xaewgppg", {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json"
          }
        });

        if (response.ok) {
          contactForm.reset();
          showToast("✓ Message sent successfully! I will reply soon.");
        } else {
          const data = await response.json();
          if (data && data.errors) {
            showToast("Error: " + data.errors.map(err => err.message).join(", "));
          } else {
            showToast("Problem sending message. Please try again.");
          }
        }
      } catch (err) {
        showToast("Network error. Please email directly to alipmirzaei@gmail.com");
      } finally {
        submitBtn.textContent = prevText;
        submitBtn.disabled = false;
      }
    });
  }

  // Initial Run
  renderSkills();
  renderProjects();
  renderEducation();
});
