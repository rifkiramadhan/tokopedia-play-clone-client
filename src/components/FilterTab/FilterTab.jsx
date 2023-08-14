import React from 'react';
import './FilterTab.css';

const FilterTab = ({ tabs, onTabClick, activeTabId }) => {
  return (
    <div className='filter-tab-container'>
      <div className='tabs'>
        {tabs.map((tab) => (
          <button
            className={`tab ${tab._id === activeTabId ? 'selected' : ''}`}
            key={tab._id}
            onClick={() => onTabClick(tab._id)}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTab;
