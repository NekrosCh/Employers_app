
import { useState } from 'react';
import './employers-list-item.css'

const EmployersListItem = (props) => {

    const {name, salary, onDelete, onToggleProp, increase, promotion} = props;

    const [employersSalary, setEmployersSalary] = useState(salary);

    let className = "list-group-item d-flex justify-content-between";
    if (increase) {
        className += ' increase';
    }
    if (promotion) {
        className += ' like';
    }

    return (
        <li className={className}>
            <span className="list-group-item-label" onClick={onToggleProp} data-toggle="promotion">{name}</span>
            <input 
                type="text" 
                data-toggle="salary" 
                className="list-group-item-input" 
                value={`${employersSalary}$`} 
                onChange={e => setEmployersSalary(e.target.value.replace(/\D/gi, ''))}
                onBlur={onToggleProp}/>
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    className="btn-cookie btn-sm "
                    onClick={onToggleProp}
                    data-toggle="increase">
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>        
    )

}

export default EmployersListItem;