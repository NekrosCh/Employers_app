import './app-filter.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleActiveFilter } from './filterSlice';

const AppFilter = () => {
  const activeFilter = useSelector((state) => state.filter.activeFilter);
  const dispatch = useDispatch();

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
      onClick={() => dispatch(toggleActiveFilter(name))}>
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