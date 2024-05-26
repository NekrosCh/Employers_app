import { useContext, useState } from 'react';
import './search-panel.css';
import dataContext from '../../context/context';

const SearchPanel = () => {
    const {searchTerm} = useContext(dataContext);
    const [termSearch, setTermSearch] = useState('');
    const UpdateSearch = (e) => {
        const term = e.target.value;
        setTermSearch(term);
        searchTerm(term);
    }

        return (
            <input 
                type="text"
                className="form-control search-input"
                placeholder="Найти сотрудника" 
                value={termSearch}
                onChange={UpdateSearch}/>
        )

}

export default SearchPanel;