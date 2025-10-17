// templates/default.js
export const DefaultTemplate = {
  meta: {
    id: 'default',
    name: 'Default (Two-column)',
    fonts: {
      heading: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      body:    "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      meta:    "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      hWeight: 600,
      subWeight: 500
    },
    accent: "#2563eb"
  },

  seed: () => ({
    header:{ name:"JOHN DOE", role:"Data Scientist / Biomedical Engineer", email:"john.doe@example.com", phone:"+39 333 0000000", residence:"Milan, Italy", birthdate:"01/01/1995", avatar:"" },
    summary:"Biomedical Engineer and Data Scientist passionate about AI-powered healthcare innovation.",
    sectionNames:{ experience:"Experience", education:"Education", volunteering:"Volunteering", projects:"Projects", certifications:"Certifications", awards:"Awards", skills:"Skills", languages:"Languages", strengths:"Strengths", hobbies:"Hobbies", online:"Online", laws:"Laws" },
    experience:[{ id:r(), title:"Medical Advisor Intern", company:"Sanofi Oncology", period:"03/2025 – Present", location:"Milan, Italy", logo:"", bullets:["Managed MAPs (compassionate use).","Supported local studies and data collection."] }],
    education:[
      { id:r(), degree:"M.Sc. in Biomedical Engineering", school:"Politecnico di Milano", period:"03/2021 – 04/2024", location:"Milan, Italy", gpa:"105/110" },
      { id:r(), degree:"B.Sc. in Biomedical Engineering", school:"Politecnico di Milano", period:"09/2017 – 03/2021", location:"Milan, Italy", gpa:"88/100" }
    ],
    volunteering:[{ id:r(), role:"Social Media Volunteer", org:"Green Association", period:"2019 – 2020", location:"Milan, Italy", logo:"", bullets:["Events support and social graphics."] }],
    projects:[{ id:r(), name:"Alexa skill for cognitive training of stroke patients", domain:"E-Health", period:"09/2022 – 12/2022", location:"Politecnico di Milano", logo:"", bullets:["Digital empowering & testing skill for MCI patients","Voice interface via Alexa Developer Console (JS)","Patient reminders and notifications"] }],
    certifications:[{ id:r(), icon:"certificate", logo:"", line1:"First Certificate Exam (B2)", line2:"Novartis" }],
    awards:[{ id:r(), icon:"award", logo:"", line1:"Best Thesis Prize", line2:"Politecnico di Milano" }],
    skills:[{ id:r(), group:"Programming", items:["Python","C/C++","JavaScript"] }, { id:r(), group:"AI / ML", items:["Classification","Regression","Clustering"] }],
    languages:[{ id:r(), name:"Italian", score:5, level:"Native" },{ id:r(), name:"English", score:4, level:"C1" }],
    strengths:[{ id:r(), icon:"bulb", logo:"", label:"Problem solving" }],
    hobbies:[{ id:r(), icon:"camera", logo:"", label:"Photography" }],
    online:{ website:{label:"johndoe.com",url:"https://example.com"}, linkedin:{label:"/in/johndoe",url:"https://linkedin.com/in/johndoe"}, github:{label:"github.com/johndoe",url:"https://github.com/johndoe"} },
    laws:["I authorize the processing of personal data in accordance with GDPR 2016/679."],
    _orders:{
      left:  ["laws","skills","languages","strengths","hobbies","online","certifications","awards"],
      right: ["experience","education","volunteering","projects"]
    }
  }),

  // renderers for each section (consumed by editor.html)
  renderers: {
    Title: ({accent, headingFont, hWeight, children}) => (
      <div className="mb-2">
        <div className="uppercase tracking-widest text-xs" style={{color:accent, fontFamily:headingFont, fontWeight:hWeight}}>{children}</div>
        <div className="title-divider"></div>
      </div>
    )
  }
};

function r(){ return Math.random().toString(36).slice(2)+Date.now().toString(36); }