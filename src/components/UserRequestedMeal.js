import React from "react";
import ReactHover from "react-hover/dist/ReactHover";
import { Trigger, Hover } from 'react-hover'

export default function UserRequestedMeal(props) {

  const checkData = () => {
    if (!props.requestedMeal.meals) {
      return <h1>Loading...</h1>
    }

    const result = props.requestedMeal.meals.map(eachMeal => {
      return <div key={eachMeal.strMeal} className='m-3'>
        <ReactHover options={{}}>
          <Trigger type="trigger">
            <div style={{border:'4px solid white'}}>
              <img onClick={() => {
                props.showMeal(true)
                props.changeSelectedMeal(eachMeal);
              }} style={{ width: '140x', height: '150px' }} src={eachMeal.strMealThumb} alt={eachMeal.strMeal}/>
            </div>
          </Trigger>
          <Hover type="hover">
            <h3>{eachMeal.strMeal}</h3>
          </Hover>
        </ReactHover>
      </div>
    })
    return result;
  }


  const checkMealData = () => {
    if (!props.meal) {
      return <h5 style={{fontStyle:'italic'}} >'Search for your Meal,You can try word curry,pie etc.'</h5>
    }
    return checkData()
  }


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
      {checkMealData()}
    </div>
  )
}