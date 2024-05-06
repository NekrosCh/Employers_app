import { useState } from 'react';

import './search-panel.css';

const SearchPanel = (props) => {
    const {onUpdateSearch} = props;
    const [termSearch, setTermSearch] = useState('');
    const UpdateSearch = (e) => {
        const term = e.target.value;
        setTermSearch(term);
        onUpdateSearch(term);
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