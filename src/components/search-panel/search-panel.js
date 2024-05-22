import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchTerm } from '../app-filter/filterSlice';

import './search-panel.css';

const SearchPanel = () => {
    const [termSearch, setTermSearch] = useState('');
    const dispatch = useDispatch();
    const UpdateSearch = (e) => {
        const term = e.target.value;
        setTermSearch(term);
        dispatch(searchTerm(term))
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