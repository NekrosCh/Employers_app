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
import {useGetEmployeesQuery, useCreateEmployeesMutation, useDeleteEmployeesMutation, useTogglePropMutation, useGetEmployeeQuery} from '../../api/apiSlice';



const App = () => {

    const [term, setTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const {
        data: employees = [],
        isFetching,
        isLoading,
        isError,
        isSuccess,
        error
    } = useGetEmployeesQuery();
    const [employeesDelete, {deleteLoading = isLoading}] = useDeleteEmployeesMutation();
    const [employeesCreated, {createLoading = isFetching}] = useCreateEmployeesMutation();
    const [toggleProp, {togglePropLoading = isLoading}] = useTogglePropMutation();
    // let employeeId = '';
    // const {data: employee = []} = useGetEmployeeQuery(employeeId);

    const deleteEmployers = (id) => {
             employeesDelete(id).unwrap();
    }

    const addNewEmployers = (name, salary) => {
        const newEmployees = {
            name,
            salary,
            increase: false,
            promotion: false,
            id: uuidv4()
        }
        employeesCreated(newEmployees).unwrap();
    }

    const onToggleProp = (id, prop, newSalary) => {
            let servId = 0;
            const newEmplList = employees.map((item, i) => {
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
            // employeeId = id;
            toggleProp({id, [prop]: newEmplList[servId][prop]}).unwrap();
            // axios.patch(`http://localhost:3001/employees/${id}/`, {[prop]: newEmplList[servId][prop]})
                
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

    const totalEmployees = employees.length;
    const increase = employees.filter(item => item.increase === true).length;
    const visibleListEmployers = filterPost(searchEmp(employees, term), activeFilter);

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
            onToggleProp={onToggleProp}
            isLoading={isLoading}
            isError={isError}/>
            <EmployersAddForm addNew={addNewEmployers} isLoading={createLoading}/>
        </div>
    );

}

export default App;