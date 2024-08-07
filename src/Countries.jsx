import React, { useEffect, useState } from 'react'
import "./Countries.css"

function Card({img,imgAlt,name}){
    return <div className='countryCard'>
        <img src={img} alt={imgAlt} style={{width:"100px", height:"100px"}}/>
        <h2>{name}</h2>
    </div>
}
const url="https://restcountries.com/v3.1/all";
function Countries() {

    const[country,setCountry]=useState([]);
    const[searchTerm,setSearchTerm]=useState();

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
        setSearchTerm(event.target.value.toLowerCase())
    }

    const filteredData=country.filter((countries) =>
        countries.name.common.toLowerCase().includes(searchTerm));
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center',backgroundColor:'#f8f8ff'}}>
            <input type='text' onChange={handleSearch} value={searchTerm} className='searchBar'/>
        </div>
        <div style={{display:"flex",
            flexWrap:"wrap"
         }}>
            {(searchTerm?filteredData:country).map((countries)=>(
                <Card key={countries.name.common} img={countries.flags.png} imgAlt={countries.name.common} name={countries.name.common}/>
                // <div className='countryCard' >
                //     <img src={countries.flags.png} alt={countries.name.common} style={{width:"100px", height:"100px"}}/>
                //     <h3>{countries.name.common}</h3>
                // </div>
                
                ))}
        </div>
    </div>
  )
}

export default Countries