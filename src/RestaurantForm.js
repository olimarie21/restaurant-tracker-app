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
    const [formError, setError] = useState(null);


    const handleCategory = (event) => {
        setCategory(event.target.value)
    }

    const restaurant = {
        restaurant: name,
        website: website,
        address: address,
        type: category,
        visited: visited,
        happyHour: happyHour
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('https://wmdd4936-ounderdah00.herokuapp.com/api/v1/restaurants/', restaurant)
        .then(res => {
            console.log(res);
            props.getRestaurants();
            setName('');
            setWebsite('');
            setAddress('');
            setCategory('');
            setHappyHour(false);
            setVisited(false);
        })
        .catch(error => {
            if(error.response.data.errors) {
                setError({
                    restaurantErr: error.response.data.errors.restaurant ? error.response.data.errors.restaurant.message : null,
                    websiteErr: error.response.data.errors.website ? error.response.data.errors.website.message : null,
                    addressErr: error.response.data.errors.address ? error.response.data.errors.address.message : null,
                    typeErr: error.response.data.errors.type ? error.response.data.errors.type.message : null
                });
            } else { 
                setError(null)
                props.getRestaurants();
                setName('');
                setWebsite('');
                setAddress('');
                setCategory('');
                setHappyHour(false);
                setVisited(false);
            };
            console.log(error);
        });
    }
    
    return (
        <form className="addRestaurant" onSubmit={handleSubmit}>
            <label>
                restaurant:
                <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
            </label>
            {formError != null && formError.restaurantErr != null ? (
                <div className='error'>{formError.restaurantErr}</div>
            ) : (
                null
            )}

            <label>
                website:
                <input type="text" value={website} onChange={e => setWebsite(e.target.value)}></input>
            </label>
            {formError != null && formError.websiteErr != null ? (
                <div className='error'>{formError.websiteErr}</div>
            ) : (
                null
            )}

            <label>
                address:
                <input type="text" value={address} onChange={e => setAddress(e.target.value)}></input>
            </label>
            {formError != null && formError.addressErr != null? (
                <div className='error'>{formError.addressErr}</div>
            ) : (
                null
            )}

            <label>
                category:
                <select value={category} onChange={event => handleCategory(event)}>
                    <option defaultValue={category}>Select Category</option>
                    {props.categories.map(category => 
                        <option key={category} value={category}>{category}</option>
                    )}
                </select>
            </label>
            {formError != null && formError.typeErr != null ? (
                <div className='error'>{formError.typeErr}</div>
            ) : (
                null
            )}

            <div className='checkContainer'>
                <label className='check'>
                    visited?
                    <input name="visited" type="checkbox" value={visited} checked={visited} onChange={e => setVisited(e.target.checked ? true : false)}></input>
                </label>

                <label className='check'>
                    happy hour?
                    <input name='happyHour' type="checkbox" value={happyHour} checked={happyHour} onChange={e => setHappyHour(e.target.checked ? true : false)}></input>
                </label>
            </div>

            <button>add restaurant</button> 
        </form>
    )
};