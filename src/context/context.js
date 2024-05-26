import { createContext } from "react";

const dataContext = createContext({
    activeFilter: 'all',
    term: '',
    toggleFilter: () => {},
    searchTerm: () => {}
})
export default dataContext;