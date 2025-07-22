import React from 'react';
import { useParams } from 'react-router-dom';
import './TemplateLibraryPage.css';

const allTemplates = {
  '1-3-years': ['Cascade', 'Enfold'],
  '3-7-years': ['Iconic', 'Concept'],
  '10-plus-years': ['Cubic', 'Diamond'],
  'entry-level': ['Simple', 'Creative'],
};

const TemplateLibraryPage = () => {
  const { experienceLevel } = useParams();
  const templates = allTemplates[experienceLevel] || [];

  return (
    <div className="template-library-container">
      <aside className="filters">
        <h4>Occupation</h4>
        <ul>
          <li>General</li>
          <li>Executives</li>
          <li>New Graduates</li>
        </ul>
        <h4>Style</h4>
        <ul>
          <li>Simple</li>
          <li>Professional</li>
          <li>Modern</li>
        </ul>
      </aside>

      <main className="templates-grid">
        <h2>{experienceLevel.replace(/-/g, ' ')} Templates</h2>
        <div className="grid">
          {templates.map((name, i) => (
            <div className="template-card" key={i}>
              <div className="template-thumbnail">{/* add image here */}</div>
              <h4>{name}</h4>
              <button className="use-btn">Use This Template</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TemplateLibraryPage;
