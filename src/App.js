import React, { useState, useEffect } from 'react';
import './app.scss';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import RestaurantForm from './RestaurantForm';

export default function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        const getRestaurants = () => {
            axios.get('http://localhost:8080/api/v1')
            .then(results => {
                setRestaurants(results.data);
                setLoading(false);
            })
            .catch(error => console.log(error));
        }
        
        getRestaurants();
        console.log(restaurants);
    }, [loading]);

    return (
        <>
            <h1>Food Finder</h1>
            <h2>Browse, categorize and save restaurants to simplify your future dining decisions.</h2>
            <button>add restaurant</button>
            <RestaurantForm/>
            <div>
                <h3>saved restaurants</h3>
                <input type="text" value={searchTerm} placeholder="enter search term"></input>
                <button>Filter</button>
                {restaurants.map(option =>
                    <RestaurantCard
                        name={option.name}
                        website={option.website}
                        category={option.category}
                        happyHour={option.happyHour}
                        address={option.address}
                    />
                )}
            </div>
        </>
    )
}