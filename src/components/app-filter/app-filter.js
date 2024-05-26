import { useContext, useState } from 'react';
import './app-filter.css';
import dataContext from '../../context/context';

const AppFilter = () => {
  const {activeFilter, toggleFilter} = useContext(dataContext);
  const buttonsData = [
    {name: 'all', label: 'Все сотрудники'},
    {name: 'promotion', label: 'На повышение'},
    {name: 'moreThen1000', label: 'З/П больше 1000$'}
  ];

  const buttons = buttonsData.map(({name, label}) => {
    const active = activeFilter === name;
    const clazz = active ? 'btn-light' : 'btn-outline-light';
    return (
    <button 
      className={`btn ${clazz}`}
      type="button"
      key={name}
      onClick={() => toggleFilter(name)}>
          {label}
    </button>
    )
  })
  
  return (
    <div className="btn-group">
      {buttons}
    </div>  
  );
}

export default AppFilter;