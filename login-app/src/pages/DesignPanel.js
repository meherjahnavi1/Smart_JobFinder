// Updated DesignPanel.js for better UX & professional layout
import React from 'react';
import './DesignPanel.css';

const DesignPanel = ({ themeColor, setThemeColor, fontSize, setFontSize }) => {
  return (
    <div className="design-panel-card">
      <h3>🎨 Design & Formatting</h3>

      <div className="design-control">
        <label htmlFor="colorPicker">Theme Color</label>
        <input
          id="colorPicker"
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
        />
      </div>

      <div className="design-control">
        <label htmlFor="fontSize">Font Size</label>
        <select
          id="fontSize"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        >
          <option value="small">Small</option>
          <option value="normal">Normal</option>
          <option value="large">Large</option>
        </select>
      </div>
    </div>
  );
};

export default DesignPanel;
