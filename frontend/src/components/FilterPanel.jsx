import React from 'react';
import { categoryList, CompanyList } from '../assets/Filter';
import CheckboxProton from '../assets/CheckboxProton';
import FilterListToggle from '../assets/FilterListToggle';

import './Search.css';

const FilterPanel = ({
  selectedDifficulty,
  selectDifficulty,
  selectedCompany,
  selectCompany,
  topics,
  changeChecked
}) => (
  <div>
    <div className='input-group'>
      <p className='label'>Difficulty Level</p>
      <FilterListToggle
        options={difficultyList}
        value={selectedDifficulty}
        selectToggle={selectDifficulty}
      />
    </div>
    <div className='input-group'>
      <p className='label'>Cuisine</p>
      {topics.map((cuisine) => (
        <CheckboxProton
          key={cuisine.id}
          cuisine={cuisine}
          changeChecked={changeChecked}
        />
      ))}
    </div>
    <div className='input-group'>
      <p className='label'>Company Names</p>
      <FilterListToggle
        options={CompanyList}
        value={selectedCompany}
        selectToggle={selectCompany}
      />
    </div>
  </div>
);

export default FilterPanel;