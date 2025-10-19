// templates/default.template.js  (UMD/IIFE, no JSX)
(function () {
  const id = 'default';
  const name = 'Default (Two-column)';
  const desc = 'Two-column layout, thin gray section rule, accent-colored icons.';

  const rid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

  function seed() {
    return {
      header: {
        name: "JOHN DOE",
        role: "Data Scientist / Biomedical Engineer",
        email: "john.doe@example.com",
        phone: "+39 333 0000000",
        residence: "Milan, Italy",
        birthdate: "01/01/1995",
        avatar: ""
      },
      summary: "Biomedical Engineer and Data Scientist passionate about AI-powered healthcare innovation.",
      sectionNames: {
        experience: "Experience",
        education: "Education",
        volunteering: "Volunteering",
        projects: "Projects",
        certifications: "Certifications",
        awards: "Awards",
        skills: "Skills",
        languages: "Languages",
        strengths: "Strengths",
        hobbies: "Hobbies",
        online: "Online",
        laws: "Laws"
      },
      experience: [
        {
          id: rid(),
          title: "Medical Advisor Intern",
          company: "Sanofi Oncology",
          period: "03/2025 – Present",
          location: "Milan, Italy",
          logo: "",
          bullets: [
            "Managed MAPs (compassionate use).",
            "Supported local studies and data collection."
          ]
        }
      ],
      education: [
        { id: rid(), degree: "M.Sc. in Biomedical Engineering", school: "Politecnico di Milano", period: "03/2021 – 04/2024", location: "Milan, Italy", gpa: "105/110" },
        { id: rid(), degree: "B.Sc. in Biomedical Engineering", school: "Politecnico di Milano", period: "09/2017 – 03/2021", location: "Milan, Italy", gpa: "88/100" }
      ],
      volunteering: [
        {
          id: rid(),
          role: "Social Media Volunteer",
          org: "Green Association",
          period: "2019 – 2020",
          location: "Milan, Italy",
          logo: "",
          bullets: ["Events support and social graphics."]
        }
      ],
      projects: [
        {
          id: rid(),
          name: "Alexa skill for cognitive training of stroke patients",
          domain: "E-Health",
          period: "09/2022 – 12/2022",
          location: "Politecnico di Milano",
          logo: "",
          bullets: [
            "Digital empowering & testing skill for MCI patients",
            "Voice interface via Alexa Developer Console (JS)",
            "Patient reminders and notifications"
          ]
        }
      ],
      certifications: [
        { id: rid(), icon: "certificate", logo: "", line1: "First Certificate Exam (B2)", line2: "Novartis" }
      ],
      awards: [
        { id: rid(), icon: "award", logo: "", line1: "Best Thesis Prize", line2: "Politecnico di Milano" }
      ],
      skills: [
        { id: rid(), group: "Programming", items: ["Python", "C/C++", "JavaScript"] },
        { id: rid(), group: "AI / ML", items: ["Classification", "Regression", "Clustering"] }
      ],
      languages: [
        { id: rid(), name: "Italian", score: 5, level: "Native" },
        { id: rid(), name: "English", score: 4, level: "C1" }
      ],
      strengths: [{ id: rid(), icon: "bulb", logo: "", label: "Problem solving" }],
      hobbies: [{ id: rid(), icon: "camera", logo: "", label: "Photography" }],
      online: {
        website: { label: "johndoe.com", url: "https://example.com" },
        linkedin: { label: "/in/johndoe", url: "https://linkedin.com/in/johndoe" },
        github: { label: "github.com/johndoe", url: "https://github.com/johndoe" }
      },
      laws: ["I authorize the processing of personal data in accordance with GDPR 2016/679."],

      // layout orders
      _orders: {
        left: ["laws", "skills", "languages", "strengths", "hobbies", "online", "certifications", "awards"],
        right: ["experience", "education", "volunteering", "projects"]
      },

      // style defaults
      _theme: {
        accent: "#2563eb",
        rule: "#d1d5db",
        fonts: {
          heading: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
          body: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
          meta: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
          hWeight: 600,
          subWeight: 500
        },
        fontSize: 11,
        lineHeight: 1.45
      },

      // section title style hints (no JSX)
      _titleStyle: { uppercase: true, tracking: '0.1em', size: '12px' }
    };
  }

  function migrate(old) {
    const s = seed();
    return {
      ...s,
      ...old,
      _orders: old && old._orders ? old._orders : s._orders,
      sectionNames: { ...s.sectionNames, ...(old?.sectionNames || {}) },
      _theme: { ...s._theme, ...(old?._theme || {}) }
    };
  }

  // simple registry (idempotent)
  window.CV_TEMPLATES = window.CV_TEMPLATES || {
    _all: {},
    list() { return Object.values(this._all).map(({ id, name, desc }) => ({ id, name, desc })); },
    get(tid) { return this._all[tid]; }
  };
  window.CV_TEMPLATES._all[id] = { id, name, desc, seed, migrate };
})();
