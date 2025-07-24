// This script loads profile data from profileData.json and injects it into #parentDiv
fetch('profileData.json')
    .then(response => response.json())
    .then(data => {
        const parentDiv = document.getElementById('parentDiv');
        if (!parentDiv) return;
        // Profile Header
        let html = `
      <div class="flexbox-container">
        <div class="flexbox-container2">
          <h1 class="header1" id="home">${data.name}</h1>
          <h2 class="header2">${data.title}</h2>
        </div>
        <div class="flexbox-container2">
          <img class="profile-pic" src="${data.profileImage}" alt="Profile Picture" width="100" height="100">
        </div>
      </div>
      <h3>
        Email: <a href="mailto:${data.email}">${data.email}</a><br>
        Mobile: <a href="tel:${data.phone}">${data.phone}</a><br>
        Location: ${data.location && typeof data.location === 'object' ? `${data.location.city}, ${data.location.province}` : data.location}<br>
        GitHub: <a href="${data.github}">Venkat Nadella</a><br>
        Linkedin: <a href="${data.linkedin}">Venkata Sai Nadella</a>
      </h3>
      <p>${data.summary}</p>
    `;

        // Experience Section
        if (data.experience && data.experience.length > 0) {
            html += `<h4 id="experience">PROFESSIONAL EXPERIENCE</h4>`;
            data.experience.forEach(exp => {
                html += `<p><b>${exp.company}</b> - ${exp.location}<br><b>${exp.role}</b> | ${exp.domain} | ${exp.period}</p>`;
                if (exp.projects && exp.projects.length > 0) {
                    exp.projects.forEach(proj => {
                        html += `<p><b>${proj.name}</b>`;
                        if (proj.techStack) html += `<br><b>Tech Stack:</b> ${proj.techStack}`;
                        html += `</p>`;
                    });
                }
                if (exp.responsibilities && exp.responsibilities.length > 0) {
                    html += `<b>Roles:</b><ul>${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>`;
                }
            });
        }

        // Education Section
        if (data.education && data.education.length > 0) {
            html += `<h4 id="education">EDUCATION</h4><ul>`;
            data.education.forEach(edu => {
                html += `<li><b>${edu.degree}</b> - ${edu.specialization}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<b>${edu.grade}</b> <small><small>${edu.remarks}</small></small><br><b>${edu.institution}</b> | ${edu.period}</li>`;
            });
            html += `</ul>`;
        }

        // Projects Section
        if (data.projects && data.projects.length > 0) {
            html += `<h4 id="projects">PROJECTS</h4><ul>`;
            data.projects.forEach(proj => {
                html += `<li><b>${proj.name}</b> - ${proj.summary}`;
                if (proj.description) html += `<ul>`;
                proj.description.forEach(line => {
                    html += `<li>${line}</li>`;})
                html += `</ul>`;
                if (proj.techStack) html += `<b>Tech Stack:</b> ${proj.techStack}`;
                html += `</li><br>`;
            });
            html += `</ul>`;
        }

        html += `<h4 id="skills">TECHNICAL SKILLS</h4>
      <ul>
        ${data.skills.map(skillCat => `
          <li><b>${skillCat.title} -</b> ${skillCat.skills.join(', ')}.</li>
        `).join('')}
      </ul>`;

        parentDiv.innerHTML = html;
    });
