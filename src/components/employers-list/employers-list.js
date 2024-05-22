import EmployersListItem from "../employers-list-item/employers-list-item";
import Spinner from "../spinner/Spinner";
import { useGetEmployeesQuery, useDeleteEmployeesMutation, useTogglePropMutation } from "../../api/apiSlice";

import './employers-list.css';
import { useSelector } from "react-redux";

const EmployersList = () => {
    const {
        data: employees = [],
        isLoading,
        isError
    } = useGetEmployeesQuery();
    const [employeesDelete] = useDeleteEmployeesMutation();
    const [toggleProp] = useTogglePropMutation();
    const {activeFilter, term} = useSelector(state => state.filter);

    if (isLoading) {
        return <Spinner/>;
    }
    if (isError) {
        return (<div className="app-list-text"> Не получилось получить доступ к списку сотрудников </div>)
    }
    if (employees.length === 0) {
        return (<div className="app-list-text"> Сотрудники отсутствуют </div>)
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
        toggleProp({id, [prop]: newEmplList[servId][prop]}).unwrap();
            
}

    const searchEmp = (items, term) => {
        if(term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1 
        })
    }


    const visibleListEmployers = filterPost(searchEmp(employees, term), activeFilter);

    const elements = visibleListEmployers.map(item => {
        const {id, ...itemProps} = item;
        return (
            <EmployersListItem 
            key={id} 
            {...itemProps}
            onDelete={() => employeesDelete(id)}
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'), e.target.value)}/>
        )
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployersList;