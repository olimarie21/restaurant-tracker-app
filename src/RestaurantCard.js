import React from 'react';

export default function RestaurantCard(props) {
    return (
        <div className='restaurantCard'>
            <h3>{props.name}</h3>
            <a href={props.website}>visit website</a>
            <div>{props.category}</div>
            <div>{props.happyHour}</div>
            <a href={`https://www.google.com/maps/place/${props.address}`}>get directions</a>
            <button>delete</button>
        </div>
    )
};