import React,{useState} from 'react';


const Search = ({ onSearch }) => {

    const [search, setSearch]= useState('');

    const onInputChange = (value) => {
        setSearch(value);
        onSearch(value)
    }

    return(
        <input
            type="text"
            style={{width: "400px", height:"50px", border:"1px solid black", borderRadius:"5px", padding:"8px"}}
            placeholder="Search Everything"
            value={search}
            onChange={(e) => onInputChange(e.target.value)}
        />
    )
}

export default Search;