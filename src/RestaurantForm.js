import React, { useState } from 'react';
import axios from 'axios';
import "./styles/restaurantForm.scss";


export default function RestaurantForm(props) {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState("");
    const [visited, setVisited] = useState(false);
    const [happyHour, setHappyHour] = useState(false);


    const handleCategory = (event) => {
        setCategory(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitted" + name + website + address + visited);
    }

    // const addRestaurant = (e) => {
    //     e.preventDefault();
    //     setName(e.target.value);
    //     console.log(searchTerm);
    // }


    return (
        <form className="addRestaurant" onSubmit={handleSubmit}>
            <label>
                restaurant:
                <input type="text" onChange={e => setName(e.target.value)}></input>
            </label>

            <label>
                website:
                <input type="text" onChange={e => setWebsite(e.target.value)}></input>
            </label>

            <label>
                address:
                <input type="text" onChange={e => setAddress(e.target.value)}></input>
            </label>

            <label>
                category:
                <select value={category} onChange={event => handleCategory(event)}>
                    {props.categories.map(category => 
                        <option key={category} value={category}>{category}</option>
                    )}
                </select>
            </label>
            <div className='checkContainer'>
                <label className='check'>
                    <input name="visited" type="checkbox" onChange={e => setVisited(e.target.value)}></input>
                    visited?
                </label>

                <label className='check'>
                    happy hour?
                    <input name='happyHour' type="checkbox" onChange={e => setHappyHour(e.target.value)}></input>
                </label>
            </div>

            <button>add restaurant</button> 
        </form>
    )
};