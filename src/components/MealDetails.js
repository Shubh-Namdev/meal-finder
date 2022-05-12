import React from "react";

export default function MealDetails(props) {
    if(!props.isShowing){
        return <div></div>
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
           {props.showMealDetails(props.selectedMeal)}
        </div>
    )
}