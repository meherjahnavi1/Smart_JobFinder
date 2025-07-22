import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TemplateLibrary.css';

const templates = [
  { name: 'Cascade', img: '/templates/cascade.png', style: 'professional' },
  { name: 'Iconic', img: '/templates/iconic.png', style: 'professional' },
  { name: 'Cubic', img: '/templates/cubic.png', style: 'modern' },
  { name: 'Diamond', img: '/templates/diamond.png', style: 'modern' },
  { name: 'Concept', img: '/templates/concept.png', style: 'simple' },
  { name: 'Enfold', img: '/templates/enfold.png', style: 'traditional' },
  { name: 'Ortone', img: '/templates/ortone.png', style: 'professional' },
  { name: 'Comtra', img: '/templates/comtra.png', style: 'professional' },
  { name: 'Creative Template', img: '/templates/creative1.png', style: 'creative' }, 
  { name: 'Creative Red', img: '/templates/creative2np.png' },
// <-- Added
];

const JuniorTemplateLibrary = () => {
  const navigate = useNavigate();

  return (
    <div className="template-library-container">
      <aside className="filter-sidebar">
        <h2>Occupation</h2>
        <ul>
          <li className="active">General</li>
          <li>Executives</li>
          <li>New Graduates</li>
          <li>Students</li>
        </ul>
        <h2>Style</h2>
        <div className="style-tabs">
          <button className="active">All</button>
          <button>Simple</button>
          <button>Creative</button>
          <button>Modern</button>
          <button>Professional</button>
          <button>Traditional</button>
        </div>
      </aside>

      <main className="template-listing">
        <h1>1–3 Years Templates</h1>
        <div className="template-grid">
          {templates.map((tpl, i) => (
            <div className="template-card" key={i}>
              <img src={tpl.img} alt={tpl.name} />
              <p className="template-name">{tpl.name}</p>
              <button
                className="use-template-button"
                onClick={() => navigate('/resume-builder', { state: { selectedTemplate: tpl.name } })}
              >
                Use This Template
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JuniorTemplateLibrary;
