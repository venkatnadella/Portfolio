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
      <h3>
        Email: <a href="mailto:${data.email}">${data.email}</a><br>
        Mobile: <a href="tel:${data.phone}">${data.phone}</a><br>
        Location: ${
          data.location && typeof data.location === "object"
            ? `${data.location.city}, ${data.location.province}`
            : data.location
        }<br>
        GitHub: <a href="${data.github}">Venkat Nadella</a><br>
        Linkedin: <a href="${data.linkedin}">Venkata Sai Nadella</a>
      </h3>
      <p>${data.summary}</p>
    `;

    // Experience Section Accordion
    if (data.experience && data.experience.length > 0) {
      html += `<section id="experience" class="accordion-section card">
        <button class="accordion-toggle" type="button">
          <span class="accordion-arrow">&#9650;</span>
          <h4>PROFESSIONAL EXPERIENCE</h4>
        </button>
        <div class="accordion-content open">`;
      data.experience.forEach((exp) => {
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
        html += `<hr><li><b>${edu.degree}</b> | <b>${edu.grade}</b> <small><small>(${edu.remarks})</small></small><br><b>${edu.institutionName}</b> <span style="font-weight:400;">(${edu.province}, ${edu.country})</span> | ${edu.period}</li>`;
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
            ${data.skills
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
