import React, { useEffect, useState } from 'react'
import "./Countries.css"

const url="https://restcountries.com/v3.1/all";
function Countries() {

    const[country,setCountry]=useState([]);
    const[searchTerm,setSearchTerm]=useState('');

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await fetch(url);
                const jsonRes=await response.json();
                setCountry(jsonRes);
            }
            catch(error){
                console.error("Error fetching data:",error);
            }
           

        }
        fetchData();
    },[])

    const handleSearch=(event)=>{
        setSearchTerm(event.target.value)
    }

    const filteredData=country.filter((countries) =>
        countries.name.common.includes(searchTerm));
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center',backgroundColor:'#f8f8ff'}}>
            <input type='text' onChange={handleSearch} value={searchTerm} className='searchBar' placeholder='Search for Countries'/>
        </div>
        <div style={{display:"flex",
            flexWrap:"wrap"
         }}>
            {(searchTerm?filteredData:country).map((countries)=>(
                // <Card key={countries.name.common} img={countries.flags.png} imgAlt={countries.name.common} name={countries.name.common}/>
                <div className='countryCard' key={countries.name.common}>
                    <img src={countries.flags.png} alt={countries.name.common} style={{width:"100px", height:"100px"}}/>
                    <h2>{countries.name.common}</h2>
                </div>
                
                ))}
        </div>
    </div>
  )
}

export default Countries