import './app-info.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AppInfo = () => {

    const getEmployees = async () => {
        const {data} = await axios.get("http://localhost:3001/employees");
        return data;
    }
    const {
        data: employees = [],
    } = useQuery({
        queryKey: ['employees'], 
        queryFn: getEmployees,
        options: {
            keepPreviousData: true
        }
    });
    const total = employees.length;
    const increase = employees.filter(item => item.increase === true).length;
    return (
        <div className="app-info">
            <h1>Учёт сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {total}</h2>
            <h2>Премию получат: {increase}</h2>
        </div>
    )
}

export default AppInfo;