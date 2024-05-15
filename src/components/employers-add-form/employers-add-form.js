import {useState} from 'react';

import './employers-add-form.css';

const EmployersAddForm = ({addNew, isLoading}) => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name: '',
    //         salary: '',
    //         valid: true
    //     };
    // }
    const [name, setName] = useState('');
    const [salary, setSalary] = useState('');
    const [valid, setValid] = useState(true);

    const onValueChange = (e) => {
            if(e.target.name === 'name') {
                setName(e.target.value);
            }
            if(e.target.name === 'salary') {
                setSalary(e.target.value)
            }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(name.length > 2 && salary.length > 0){
            addNew(name, salary);
            setName('');
            setSalary('');
            setValid(true);
        } else {
                setValid(false);
        }
    }

        let validClassName = 'valid-text';
        if(!valid) {
            validClassName += ' active';
        }
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name"
                        value={name}
                        disabled={isLoading}
                        onChange={onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        value={salary}
                        disabled={isLoading}
                        onChange={onValueChange}/>
    
                    <button type="submit"
                            className="btn btn-outline-light" disabled={isLoading}>Добавить</button>
                </form>
                <span className={validClassName}>Введите больше 3 букв в имя или добавьте зп</span>
            </div>        
        )
}

export default EmployersAddForm;