import React, {useState} from 'react';
import "./styles/filter.scss";

export default function Filter(props) {
    const [chosenCategory, setCategory] = useState('');
    const [happyHour, setHappyHour] = useState(false);
    const filterRef = props.getRef;

    const handleCategorySelect = (category) => {
        setCategory(category);
        props.setRadioChecked(category);
    }

    const handleHappyHour = (e) => {
        setHappyHour(e.target.checked ? true : false);
        props.setChecked(e.target.checked ? true : false); 
    }

    const clearFilters = () => {
        props.filterRestaurants("", false);
        props.setChecked(false);
        props.setRadioChecked(false);
    }

    return (
        <div>
            <div className='background'></div>
            <div ref={filterRef} className='filterPopUp'>
                <fieldset>
                    <legend>Food Category:</legend>
                        {props.categories.map(category => (
                            <div className='category' key={category}>
                                <label>
                                    <input type='radio' name='category' value={category} checked={props.radioChecked === category} onChange={()=>handleCategorySelect(category)}></input>
                                    {category}
                                </label>
                            </div>
                        ))}
                </fieldset>
                <fieldset>
                    <legend>Happy hour?</legend>
                    <input type='checkbox' name='happyHour' checked={props.checked} onChange={e => handleHappyHour(e)}></input>
                </fieldset>
                <div className='filterButtons'>
                    <button onClick={(e) => props.filterRestaurants(chosenCategory, happyHour)}>apply</button>
                    <button onClick={e => clearFilters(e)}>clear</button>
                </div>
            </div>
        </div>
    )
};