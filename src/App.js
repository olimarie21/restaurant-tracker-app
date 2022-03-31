import React, { useState, useEffect } from 'react';
import './styles/app.scss';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import RestaurantForm from './RestaurantForm';
import headerRestaurant from './graphics/headerRestaurant.svg';
import add from './graphics/add.svg';
import filterIcon from './graphics/filterIcon.svg';
import Filter from './Filter';

export default function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [addRestaurant, setAddRestaurant] = useState(false);
    const [filter, setShowFilter] = useState(false);

    const categories = ["Thai", "Chinese", "Japanese", "Mexican", "American", "Fast food", "Vietnamese", "Vegan", "Vegetarian", "Indian", "Breakfast", "Other"];
    
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

    const getSearchTerm = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
        console.log(searchTerm);
    }

    const toggleForm = (e) => {
        e.preventDefault();

        if(!addRestaurant) {
            setAddRestaurant(true);
        } else {
            setAddRestaurant(false);
        }
    }

    const showFilter = (e) => {
        e.preventDefault();

        if(!filter) {
            setShowFilter(true);
        } else {
            setShowFilter(false);
        }
    }

    return (
        <div className='app'>
            <div className='header'>
                <h1>Food Finder</h1>
            </div>

            <h4>Browse, categorize and save restaurants to simplify your future dining decisions.</h4>
            <button className='greyBlock' onClick={e => toggleForm(e)}>add restaurant<img/></button>
            {addRestaurant ? (
                <RestaurantForm categories={categories}/>
            ) : null}
            
            <div className='greyBlock'><h2>saved restaurants</h2></div>
        
            <div className='savedRestaurants'>
              
                <div className='searchInput'>
                    <input type="text" placeholder="enter search term" onChange={(e) => getSearchTerm(e)}></input>
                    <button className='filterBtn' onClick={(e) => showFilter(e)}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.7324 1H17C17.5523 1 18 1.44769 18 2C18 2.55231 17.5523 3 17 3H14.7324C14.3866 3.59778 13.7403 4 13 4C12.2597 4 11.6134 3.59778 11.2676 3H1C0.447723 3 0 2.55231 0 2C0 1.44769 0.447723 1 1 1H11.2676C11.6134 0.402222 12.2597 0 13 0C13.7403 0 14.3866 0.402222 14.7324 1Z" fill="white"/>
                        <path d="M1 8C0.447723 8 0 8.44769 0 9C0 9.55231 0.447723 10 1 10H4.26758C4.61337 10.5978 5.2597 11 6 11C6.7403 11 7.38663 10.5978 7.73242 10H17C17.5523 10 18 9.55231 18 9C18 8.44769 17.5523 8 17 8H7.73242C7.38663 7.40222 6.7403 7 6 7C5.2597 7 4.61337 7.40222 4.26758 8H1Z" fill="white"/>
                        <path d="M0 16C0 15.4477 0.447723 15 1 15H11.2676C11.6134 14.4022 12.2597 14 13 14C13.7403 14 14.3866 14.4022 14.7324 15H17C17.5523 15 18 15.4477 18 16C18 16.5523 17.5523 17 17 17H14.7324C14.3866 17.5978 13.7403 18 13 18C12.2597 18 11.6134 17.5978 11.2676 17H1C0.447723 17 0 16.5523 0 16Z" fill="white"/>
                        </svg>
                    </button>
                </div>

                {filter ? (
                    <Filter categories={categories}/>
                ) : null}

                {restaurants.map((option, index) =>
                    <RestaurantCard
                        key={index}
                        name={option.name}
                        website={option.website}
                        category={option.type}
                        happyHour={option.happyHour}
                        address={option.address}
                    />
                )}
            </div>
        </div>
    )
}


