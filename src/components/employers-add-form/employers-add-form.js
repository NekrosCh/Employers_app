import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './employers-add-form.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const EmployersAddForm = () => {
    const queryClient = useQueryClient();
    const [name, setName] = useState('');
    const [salary, setSalary] = useState('');
    const [valid, setValid] = useState(true);
    const employeesCreated = useMutation({
        mutationFn: async (newEmployees) => {
           await axios.post("http://localhost:3001/employees", newEmployees)
                .then(() => console.log('New employee create'))
                .catch((err) => console.log(err));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['employees']});
        }
    })


    const addNewEmployers = (name, salary) => {
        const newEmployees = {
            name,
            salary,
            increase: false,
            promotion: false,
            id: uuidv4()
        }
        employeesCreated.mutate(newEmployees);
    }
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
            addNewEmployers(name, salary);
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
                        disabled={employeesCreated.isPending}
                        onChange={onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        value={salary}
                        disabled={employeesCreated.isPending}
                        onChange={onValueChange}/>
    
                    <button type="submit"
                            className="btn btn-outline-light" disabled={employeesCreated.isPending}>Добавить</button>
                </form>
                <span className={validClassName}>Введите больше 3 букв в имя или добавьте зп</span>
            </div>        
        )
}

export default EmployersAddForm;