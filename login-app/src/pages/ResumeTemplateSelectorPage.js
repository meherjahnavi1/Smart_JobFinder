// ResumeTemplateSelectorPage.js
import React, { useState } from 'react';
import './ResumeTemplateSelector.css';
import templates from './templateData'; // contains template info array

const ResumeTemplateSelectorPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Junior', 'Mid-Level', 'Senior', 'Executive', 'Creative', 'Technical'];

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="template-builder-page">
      <aside className="filter-sidebar">
        <h2>Occupation</h2>
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </aside>

      <main className="template-gallery">
        <h1>Choose a Resume Template</h1>
        <div className="template-grid">
          {filteredTemplates.map(template => (
            <div
              key={template.id}
              className="template-card"
              onClick={() => window.location.href = `/builder/${template.id}`}
            >
              <img src={template.image} alt={template.title} className="template-img" />
              <h3>{template.title}</h3>
              <p>{template.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ResumeTemplateSelectorPage;
