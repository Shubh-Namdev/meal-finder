import React, { useEffect, useState } from 'react';
import './App.css'
import Search from './components/Search';
import RandomMeal from './components/RandomMeal';
import UserRequestedMeal from './components/UserRequestedMeal';
import MealDetails from './components/MealDetails';
import './components/MealDetails.css'



export default function App() {
  const [meal, setMeal] = useState();
  const [requestedMeal, changeRequestedMeal] = useState('');
  const [selectedMeal, changeSelectedMeal] = useState();
  const [randomDish, changeRandomDish] = useState(false);
  const [dishToShow, setDishToShow] = useState();
  const [isShowing, showMeal] = useState(false);


  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
      .then(response => {
        return response.json();
      }).then(data => {
        changeRequestedMeal(data)
      }).catch(err => {
        console.log('Error from data log is:', err)
      })
      .catch(error => {
        console.log('Error from response is:', error)
      })
  })

  const showMealDetails = (mealSelected) => {
    if (!mealSelected) {
      return <div></div>
    }

    const showIngredientDetails = (mealSelected) => {
      const ingredDetails = [];
      for (let i = 1; i <= 20; i++) {
        const ingredName = `${mealSelected[`strIngredient${i}`]}`;
        const measureName = `${mealSelected[`strMeasure${i}`]}`;
        if (!ingredName) {
          break
        }

        ingredDetails.push(
          <div key={`ingredDetail${i}`} className='eachIngred'>
            <span>{ingredName}</span> -
            <span>{measureName}</span>
          </div>
        )
      }
      return ingredDetails
    }

    return <div className='details-container container'>
      <h1 className='head'>{mealSelected.strMeal}</h1>
      <div className='image'><img style={{ width: '250px', height: '250px' }} src={mealSelected.strMealThumb} alt={mealSelected.strMeal} /></div>
      <div className='category'>
        <h4>{mealSelected.strCategory}</h4>
        <h4>{mealSelected.strArea}</h4>
      </div>
      <div className='description'>{mealSelected.strInstructions}</div>
      <div className='ingred'>
        <h3>Ingredients</h3>
        <div className='ingredDetails'>
          {showIngredientDetails(mealSelected)}
        </div>
      </div>
    </div>
  }


  return (
    <div className='main'>
      <div className='container mt-2 w-50'>
        <Search changeRandomDish={changeRandomDish} meal={meal} setMeal={setMeal}
          setDishToShow={setDishToShow} changeRequestedMeal={changeRequestedMeal}
          showMeal={showMeal}
        />

        <div className='mt-3' style={{ textAlign: 'center' }}>
          {
            randomDish ? <RandomMeal showMealDetails={showMealDetails} dishToShow={dishToShow} /> :
              <UserRequestedMeal meal={meal} requestedMeal={requestedMeal} changeSelectedMeal={changeSelectedMeal} 
                                 showMeal={showMeal}
              />
          }
        </div>

        <MealDetails showMealDetails={showMealDetails} selectedMeal={selectedMeal} isShowing={isShowing}/>
      </div>
    </div>
  )
}