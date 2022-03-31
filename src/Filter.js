import React, {useState} from 'react';
import "./styles/filter.scss";

export default function Filter(props) {
    const [chosenCategory, setCategory] = useState('');
    const [happyHour, setHappyHour] = useState(false);

    const handleCategorySelect = (category) => {
        setCategory(category);
        console.log(chosenCategory);
    }

    const handleHappyHour = () => {
        setHappyHour(!happyHour);
        console.log(happyHour);
    }

    return (
        <div className='filterPopUp'>
            <fieldset>
                <legend>Food Category:</legend>
                    {props.categories.map(category => (
                        <div className='category' key={category}>
                            <label>
                                <input type='radio' name='category' value={category} onChange={()=>handleCategorySelect(category)}></input>
                                {category}
                            </label>
                        </div>
                    ))}
            </fieldset>
            <fieldset>
                <legend>Happy hour?</legend>
                <input type='checkbox' name='happyHour' checked={happyHour} onChange={handleHappyHour}></input>
            </fieldset>
            <button>apply</button>
            <button>clear</button>
        </div>
    )
};