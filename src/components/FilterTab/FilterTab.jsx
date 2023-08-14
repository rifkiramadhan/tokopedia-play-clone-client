import React from 'react';
import './FilterTab.css';

const FilterTab = ({ tabs, onTabClick }) => {
  return (
    <div className='filter-tab-container'>
      <div className='tabs'>
        {tabs.map((tab) => (
          <button
            className='tab'
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
