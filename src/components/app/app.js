import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './app.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployers, employersCreated, employersDelete, employersUpdate } from '../employers-list/employersSlice';


const App = () => {

    const dispatch = useDispatch();

    // const [employers, setEmployers] = useState([]);
    const employers = useSelector(state => state.employers.employers);
    const [term, setTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        // axios.get("http://localhost:3001/employers")
        //     .then(data => setEmployers(data.data));
        dispatch(fetchEmployers());
    }, []);

    const deleteEmployers = (id) => {
        axios.delete(`http://localhost:3001/employers/${id}`)
            .then(dispatch(employersDelete(id)))
            .catch(err => console.log(err));      
    }

    const addNewEmployers = (name, salary) => {
        const newEmployers = {
            name,
            salary,
            increase: false,
            promotion: false,
            id: uuidv4()
        }
        axios.post("http://localhost:3001/employers", newEmployers)
            .then(dispatch(employersCreated(newEmployers)))
            .catch(err => console.log(err));
    }

    const onToggleProp = (id, prop, newSalary) => {
            let servId = 0;
            const newEmplList = employers.map((item, i) => {
                if (item.id === id) {
                    servId = i;
                    if (prop === 'salary') {
                        return {...item, [prop]: newSalary.replace(/\D/gi, '')}
                    } else {
                        return {...item, [prop]: !item[prop]}
                    }                    
                }
                return item;
            });
            axios.patch(`http://localhost:3001/employers/${id}/`, {[prop]: newEmplList[servId][prop]})
                .then(dispatch(employersUpdate(newEmplList)));
    }
    

    const searchEmp = (items, term) => {
        if(term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1 
        })
    }
    
    const onUpdateSearch = (term) => {
        setTerm(term);
    }

    const filterPost = (items, activeFilter) => {
        switch (activeFilter) {
            case 'promotion':
                return items.filter(item => item.promotion);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    const onFilterSelect = (activeFilter) => {
        setActiveFilter(activeFilter);
    }

    const totalEmployees = employers.length;
    const increase = employers.filter(item => item.increase === true).length;
    const visibleListEmployers = filterPost(searchEmp(employers, term), activeFilter);

    return (
        <div className="app">
            <AppInfo
            total={totalEmployees}
            increase={increase}/>

            <div className="search-panel">
                <SearchPanel onUpdateSearch={onUpdateSearch}/>
                <AppFilter filter={activeFilter} onFilterSelect={onFilterSelect}/>
            </div>

            <EmployersList 
            data={visibleListEmployers}
            onDelete={deleteEmployers}
            onToggleProp={onToggleProp}/>
            <EmployersAddForm addNew={addNewEmployers}/>
        </div>
    );

}

export default App;