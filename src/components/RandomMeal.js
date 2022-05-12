import React from 'react';

export default function RandomMeal(props){
    return(
        <>{props.showMealDetails(props.dishToShow)}</>
    )
}