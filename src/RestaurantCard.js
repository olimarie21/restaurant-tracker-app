import React from 'react';
import happyHour from './graphics/happyHour.svg';
import location from './graphics/location.svg';
import "./styles/restaurantCard.scss";
import deleteBtn from './graphics/deleteBtn.svg';

export default function RestaurantCard(props) {
    return (
        <div className='cardContainer'>
            <div className='restaurantCard' id={props.id}>
                <a className="website" href={props.website}>
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="9.01361" y="10.263" width="2.27215" height="9.36841" transform="rotate(27.6021 9.01361 10.263)" fill="white"/>
                    <path d="M14.2314 2.73513L12.3566 19.0617L7.91485 14.8164L1.89393 13.5915L14.2314 2.73513Z" fill="white"/>
                    </svg>
                </a>
                <div className='cardHeader'>
                    <h3>{props.name}</h3>
                    <div>{props.category}
                        {props.happyHour ? 
                            <img src={happyHour}></img>
                        : null 
                        } 
                    </div>
                </div>
                <a className="location" href={`https://www.google.com/maps/place/${props.address}`}><img src={location}/></a>
            </div>
            <img src={deleteBtn} className='delete'onClick={(e) => props.delete(e, props.id)}/>
        </div>
    )
};