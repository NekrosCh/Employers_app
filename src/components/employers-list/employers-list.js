import EmployersListItem from "../employers-list-item/employers-list-item";
import Spinner from "../spinner/Spinner";
import './employers-list.css';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dataContext from "../../context/context";
import { useContext } from "react";

const EmployersList = () => {
    const queryClient = useQueryClient();
    const {activeFilter, term} =useContext(dataContext);

    const getEmployees = async () => {
        const {data} = await axios.get("http://localhost:3001/employees");

        return data;
    }

    const {
        data: employees = [],
        isLoading,
        isError
    } = useQuery({
        queryKey: ['employees'], 
        queryFn: getEmployees,
        options: {
            keepPreviousData: true
        }
    });

    const deleteEmploees = useMutation({
        mutationFn: async ({id}) => {
            await axios.delete(`http://localhost:3001/employees/${id}`)
            .then(res => console.log(`Employee ${res.data.name} - deleted`))
            .catch(err => console.log(err)); 
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees']})
        }
    });

    const toggleProp = useMutation({
        mutationFn: async ({id, ...prop}) => {
            await axios.patch(`http://localhost:3001/employees/${id}/`, prop)
                .then((res) => console.log(`Data changed ${res}`))
                .catch(err => console.log(err))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees']})
        }
    });


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
        toggleProp.mutate({id, [prop]: newEmplList[servId][prop]});
            
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
            onDelete={() => deleteEmploees.mutate({id})}
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