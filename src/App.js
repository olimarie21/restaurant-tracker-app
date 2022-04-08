import React, { useState, useEffect, useRef } from 'react';
import './styles/app.scss';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import RestaurantForm from './RestaurantForm';
import add from './graphics/add.svg';
import Filter from './Filter';
import search from './graphics/search.svg';

export default function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [addRestaurant, setAddRestaurant] = useState(false);
    const [filter, setShowFilter] = useState(false);
    const filterRef = useRef();

    const categories = ["Thai", "Chinese", "Brazilian", "Japanese", "Mexican", "Cuban", "Korean", "American", "Fast food", "Vietnamese", "Vegan", "Vegetarian", "Indian", "Breakfast", "Other"];
    
    const getRestaurants = () => {
        axios.get('https://wmdd4936-ounderdah00.herokuapp.com/api/v1/restaurants/')
        .then(results => {
            setRestaurants(results.data);
            setLoading(false);
        })
        .catch(error => console.log(error));
    }

    const filterRestaurants = (chosenCategory, happyHour) => {
        let url;

        if(chosenCategory && happyHour === true) {
            url = `https://wmdd4936-ounderdah00.herokuapp.com/api/v1/restaurants/?type=${chosenCategory}&happyHour=${happyHour}`;
        } else if(chosenCategory === "" && happyHour === true) {
            url = `https://wmdd4936-ounderdah00.herokuapp.com/api/v1/restaurants/?happyHour=true`;
        } else if(chosenCategory != "" && happyHour === false) {
            url = `https://wmdd4936-ounderdah00.herokuapp.com/api/v1/restaurants/?type=${chosenCategory}`;
        } else if(chosenCategory === "" && happyHour === false) {
            url = 'https://wmdd4936-ounderdah00.herokuapp.com/api/v1/restaurants';
        } 

        axios.get(url)
        .then(res => {
            setRestaurants(res.data);
            setShowFilter(false);
        })
        .catch(error => console.log(error));
    }

    const searchRestaurants = (searchTerm) => {
        axios.get(`https://wmdd4936-ounderdah00.herokuapp.com/api/v1/search?term=${searchTerm}`)
        .then(res => {
            console.log(res.data)
            setRestaurants(res.data);
            setShowFilter(false);
        })
        .catch(error => console.log(error));
    }

    const keydownEvent = (e, term) => {
        if(e.key === "Enter") {
            console.log('enter')
            return searchRestaurants(term);
        }
    }

    useEffect(() => {
        getRestaurants();
    }, [loading]);

    const getSearchTerm = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
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

    
    useEffect(()=> {
        const clickOut = e => {
            if(filter && filterRef.current && !filterRef.current.contains(e.target)) {
                setShowFilter(false);
            }
        }
        document.addEventListener("mousedown", clickOut);

        return () => {
            document.removeEventListener("mousedown", clickOut);
        }
    }, [filter])

    const deleteRestaurant = (e, id) => {
        e.preventDefault();

        axios.get(`https://wmdd4936-ounderdah00.herokuapp.com/api/v1/restaurants/${id}`, {params: {_id: id}})
        .then(results => {
            console.log(results);
            getRestaurants();
        })
        .catch(error => console.log(error));
    }

    return (
        <div className='app'>
            <div className='header'>
                <h1>Food Finder</h1>
            </div>
            <div className='mainContent'>
                <h4>Browse, categorize and save restaurants to simplify your future dining decisions.</h4>
                <button className='greyBlock addRestaurantBtn' onClick={e => toggleForm(e)}>add restaurant<img src={add}/></button>
                {addRestaurant ? (
                    <RestaurantForm categories={categories} getRestaurants={getRestaurants} showForm={setAddRestaurant}/>
                ) : null}
                
                <div className='greyBlock'><h2>saved restaurants</h2></div>
                <div className='savedRestaurants'>
                
                    <div className='searchInput'>
                        <div>
                            <input type="text" placeholder="enter search term" value={searchTerm} onKeyDown={(e) => keydownEvent(e, searchTerm)} onChange={(e) => getSearchTerm(e)}></input>
                            <button className='submitSearch' onClick={(e) => searchRestaurants(searchTerm)}><img src={search}/></button>
                        </div>
                        <button className='filterBtn' onClick={(e) => showFilter(e)}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7324 1H17C17.5523 1 18 1.44769 18 2C18 2.55231 17.5523 3 17 3H14.7324C14.3866 3.59778 13.7403 4 13 4C12.2597 4 11.6134 3.59778 11.2676 3H1C0.447723 3 0 2.55231 0 2C0 1.44769 0.447723 1 1 1H11.2676C11.6134 0.402222 12.2597 0 13 0C13.7403 0 14.3866 0.402222 14.7324 1Z" fill="white"/>
                            <path d="M1 8C0.447723 8 0 8.44769 0 9C0 9.55231 0.447723 10 1 10H4.26758C4.61337 10.5978 5.2597 11 6 11C6.7403 11 7.38663 10.5978 7.73242 10H17C17.5523 10 18 9.55231 18 9C18 8.44769 17.5523 8 17 8H7.73242C7.38663 7.40222 6.7403 7 6 7C5.2597 7 4.61337 7.40222 4.26758 8H1Z" fill="white"/>
                            <path d="M0 16C0 15.4477 0.447723 15 1 15H11.2676C11.6134 14.4022 12.2597 14 13 14C13.7403 14 14.3866 14.4022 14.7324 15H17C17.5523 15 18 15.4477 18 16C18 16.5523 17.5523 17 17 17H14.7324C14.3866 17.5978 13.7403 18 13 18C12.2597 18 11.6134 17.5978 11.2676 17H1C0.447723 17 0 16.5523 0 16Z" fill="white"/>
                            </svg>
                        </button>
                    </div>

                    {filter ? (
                        <Filter getRef={filterRef} categories={categories} filterRestaurants={filterRestaurants} />
                    ) : null}
                    
                    {restaurants.length === 0 ? (
                        <p>Sorry, no restaurants matched your search...try adding some!</p>
                    ) : (
                        restaurants.map((option) =>
                            <RestaurantCard
                                id={option._id}
                                key={option._id}
                                name={option.restaurant}
                                website={option.website}
                                category={option.type}
                                happyHour={option.happyHour}
                                address={option.address}
                                delete={deleteRestaurant}
                            />
                        )
                    )}
                </div>

            </div>
        </div>
    )
}


