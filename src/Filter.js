import React, {useState, useRef} from 'react';
import "./styles/filter.scss";

export default function Filter(props) {
    const [chosenCategory, setCategory] = useState(null);
    const [happyHour, setHappyHour] = useState(false);
    const filterRef = props.getRef;
    const [categories, setCategories] = useState(props.categories);


    const handleCategorySelect = (e, category) => {
        setCategory(category);
        console.log(chosenCategory);
    }

    const handleHappyHour = () => {
        setHappyHour(!happyHour);
        console.log(happyHour);
    }

    return (
        <div>
            <div className='background'></div>
            <div ref={filterRef} className='filterPopUp'>
                <fieldset>
                    <legend>Food Category:</legend>
                        {categories.map((category) => (
                            <div className='category' key={category}>
                                <label>
                                    <input type='radio' name='category' value={category} onChange={(e)=>handleCategorySelect(e, category)}></input>
                                    {category}
                                </label>
                            </div>
                        ))}
                </fieldset>
                <fieldset>
                    <legend>Happy hour?</legend>
                    <input type='checkbox' name='happyHour' checked={happyHour} onChange={handleHappyHour}></input>
                </fieldset>
                <div className='filterButtons'>
                    <button onClick={(e) => props.filterRestaurants(chosenCategory, happyHour)}>apply</button>
                    <button onClick={e => props.filterRestaurants("", false)}>clear</button>
                </div>
            </div>
        </div>
    )
};