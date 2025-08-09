// This script loads profile data from profileData.json and injects it into #parentDiv
fetch("assets/json/profileData.json")
  .then((response) => response.json())
  .then((data) => {
    const parentDiv = document.getElementById("parentDiv");
    if (!parentDiv) return;
    // Profile Header
    let html = `
      <div id="home" class="flexbox-container">
        <div class="flexbox-container2">
          <h1 class="header1" >${data.name}</h1>
          <h2 class="header2">${data.title}</h2>
        </div>
        <div class="flexbox-container2">
          <img class="profile-pic" src="${
            data.profileImage
          }" alt="Profile Picture" width="100" height="100">
        </div>
      </div>
      <h3 class="contact-info">
        <span class="icon-wrapper" aria-hidden="true">${iconMail()}</span> <a href="mailto:${
      data.contact.email
    }">${data.contact.email}</a><br>
        <span class="icon-wrapper" aria-hidden="true">${iconPhone()}</span> <a href="tel:${
      data.contact.phone
    }">${data.contact.phone}</a><br>
        <span class="icon-wrapper" aria-hidden="true">${iconLocation()}</span> ${
      data.location.current.city
    }, ${data.location.current.country}<br>
        <span class="icon-wrapper" aria-hidden="true">${iconGitHub()}</span> <a href="${
      data.github
    }">Venkat Nadella</a><br>
        <span class="icon-wrapper" aria-hidden="true">${iconLinkedIn()}</span> <a href="${
      data.contact.linkedin
    }">Venkata Sai Nadella</a>
      </h3>
      <p>${data.summary}</p>
    `;

    // Experience Section Accordion
    if (data.professionalExperience && data.professionalExperience.length > 0) {
      html += `<section id="experience" class="accordion-section card">
        <button class="accordion-toggle" type="button">
          <span class="accordion-arrow">&#9650;</span>
          <h4>PROFESSIONAL EXPERIENCE</h4>
        </button>
        <div class="accordion-content open">`;
      data.professionalExperience.forEach((exp) => {
        html += `<hr><p><b>${exp.companyName}</b> <span style="font-weight:400;">(${exp.city}, ${exp.country})</span><br>`;
        html += `<b>${exp.designation}</b> | <span>${exp.startDate} - ${exp.endDate}</span></p>`;
        if (exp.projects && exp.projects.length > 0) {
          exp.projects.forEach((proj) => {
            html += `<p><b>${proj.name}</b>`;
            if (proj.techStack) {
              if (Array.isArray(proj.techStack)) {
                html += `<br><b>Tech Stack:</b> ${proj.techStack.join(", ")}`;
              } else {
                html += `<br><b>Tech Stack:</b> ${proj.techStack}`;
              }
            }
            html += `</p>`;
          });
        }
        if (exp.responsibilities && exp.responsibilities.length > 0) {
          html += `<b>Roles:</b><ul>${exp.responsibilities
            .map((r) => `<li>${r}</li>`)
            .join("")}</ul>`;
        }
      });
      html += `</div></section>`;
    }

    // Education Section Accordion
    if (data.education && data.education.length > 0) {
      html += `<section id="education" class="accordion-section card">
        <button class="accordion-toggle" type="button">
          <span class="accordion-arrow">&#9650;</span>
          <h4>EDUCATION</h4>
        </button>
        <div class="accordion-content open"><ul>`;
      data.education.forEach((edu) => {
        const eduPeriod =
          edu.startDate && edu.endDate
            ? `${edu.startDate} - ${edu.endDate}`
            : edu.period || "";
        html += `<hr><li><b>${edu.degree}</b> | <b>${edu.grade}</b> <small><small>(${edu.remarks})</small></small><br><b>${edu.institutionName}</b> <span style="font-weight:400;">(${edu.province}, ${edu.country})</span> | ${eduPeriod}</li>`;
      });
      html += `</ul></div></section>`;
    }

    // Projects Section Accordion
    if (data.projects && data.projects.length > 0) {
      html += `<section id="projects" class="accordion-section card">
        <button class="accordion-toggle" type="button">
          <span class="accordion-arrow">&#9650;</span>
          <h4>PROJECTS</h4>
        </button>
        <div class="accordion-content open"><ul>`;
      data.projects.forEach((proj) => {
        html += `<hr><li><b>${proj.name}</b> - ${proj.description}`;
        if (Array.isArray(proj.techStack)) {
          html += `<br><b>Tech Stack:</b> ${proj.techStack.join(", ")}`;
        } else {
          html += `<br><b>Tech Stack:</b> ${proj.techStack}`;
        }
        if (proj.link) html += `<br><a href="${proj.link}">${proj.link}</a>`;
        if (proj.details && proj.details.length > 0) {
          html += `<br><b>Details:</b><ul>${proj.details
            .map((d) => `<li>${d}</li>`)
            .join("")}</ul>`;
        }
        html += `</li>`;
      });
      html += `</ul></div></section>`;
    }

    html += `<section id="skills" class="accordion-section card">
        <button class="accordion-toggle" type="button">
          <span class="accordion-arrow">&#9650;</span>
          <h4>TECHNICAL SKILLS</h4>
        </button>
        <div class="accordion-content open">
          <ul>
            ${data.technicalSkills
              .map(
                (skillCat) => `
              <hr><li><b>${skillCat.title} -</b> ${skillCat.skills.join(
                  ", "
                )}.</li>
            `
              )
              .join("")}
          </ul>
        </div>
      </section>`;

    parentDiv.innerHTML = html;

    // Icon helper functions returning inline SVG (currentColor fill)
    function iconMail() {
      return `<svg class="icon" viewBox="0 0 24 24" role="img"><path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.5-.5a.5.5 0 0 0-.5.5v.217L12 12.25l8-5.533V6.5a.5.5 0 0 0-.5-.5h-15Zm15.5 3.283-6.93 4.79a1.5 1.5 0 0 1-1.64 0L4.5 9.783V17.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V9.783Z"/></svg>`;
    }
    function iconPhone() {
      return `<svg class="icon" viewBox="0 0 24 24" role="img"><path d="M6.62 10.79a15.054 15.054 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.42 21 3 13.58 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2Z"/></svg>`;
    }
    function iconLocation() {
      return `<svg class="icon" viewBox="0 0 24 24" role="img"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/></svg>`;
    }
    function iconGitHub() {
      return `<svg class="icon" viewBox="0 0 24 24" role="img"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.31 6.84 9.66.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.52 1.05 1.52 1.05.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.5c.85.01 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.21 2.44.1 2.7.64.72 1.02 1.63 1.02 2.75 0 3.95-2.33 4.81-4.56 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>`;
    }
    function iconLinkedIn() {
      return `<svg class="icon" viewBox="0 0 24 24" role="img"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7.5 0h3.839v1.561h.055c.534-1.012 1.839-2.078 3.787-2.078 4.05 0 4.8 2.495 4.8 5.739V21h-4v-5.353c0-1.277-.023-2.92-1.779-2.92-1.781 0-2.054 1.39-2.054 2.828V21h-4V9Z"/></svg>`;
    }

    // Accordion JS
    document.querySelectorAll(".accordion-toggle").forEach((btn) => {
      btn.addEventListener("click", function () {
        const content = this.nextElementSibling;
        const arrow = this.querySelector(".accordion-arrow");
        if (!content.classList.contains("open")) {
          content.classList.add("open");
          content.style.maxHeight = content.scrollHeight + "px";
          if (arrow) arrow.innerHTML = "&#9650;"; // Up arrow
        } else {
          content.classList.remove("open");
          content.style.maxHeight = "0px";
          if (arrow) arrow.innerHTML = "&#9660;"; // Down arrow
        }
      });
      // Set initial arrow state
      const content = btn.nextElementSibling;
      const arrow = btn.querySelector(".accordion-arrow");
      if (content && arrow) {
        if (!content.classList.contains("open")) {
          content.style.maxHeight = "0px";
          arrow.innerHTML = "&#9660;"; // Down arrow
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          arrow.innerHTML = "&#9650;"; // Up arrow
        }
      }
    });
  });
