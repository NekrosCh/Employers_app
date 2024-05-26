import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';
import './app.css';
import dataContext from '../../context/context';
import { useState } from 'react';

const App = () => {
    const {Provider} = dataContext;
    const [data, setData] = useState({
        activeFilter: 'all',
        term: '',
        toggleFilter: toggleFilter,
        searchTerm: searchTerm
    });
    function toggleFilter(filter) {
        setData({...data, activeFilter: filter})
    }
    function searchTerm(term) {
        setData({...data, term});
    }
    return (
        <Provider value={data}>
            <div className="app">
            <AppInfo/>
            <div className="search-panel">
                <SearchPanel/>
                <AppFilter/>
            </div>
            <EmployersList/>
            <EmployersAddForm/>
        </div>
        </Provider>

    );

}

export default App;