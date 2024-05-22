import './app-info.css';
import { useGetEmployeesQuery} from "../../api/apiSlice";

const AppInfo = () => {

    const {
        data: employees = []
    } = useGetEmployeesQuery();
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