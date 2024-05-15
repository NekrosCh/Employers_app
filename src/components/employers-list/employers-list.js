import EmployersListItem from "../employers-list-item/employers-list-item";
import Spinner from "../spinner/Spinner";

import './employers-list.css';

const EmployersList = ({data, onDelete, onToggleProp, isLoading, isError}) => {
    if (isLoading) {
        return <Spinner/>;
    }
    if (isError) {
        return (<div className="app-list-text"> Не получилось получить доступ к списку сотрудников </div>)
    }
    if (data.length === 0) {
        return (<div className="app-list-text"> Сотрудники отсутствуют </div>)
    }

    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            <EmployersListItem 
            key={id} 
            {...itemProps}
            onDelete={() => onDelete(id)}
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