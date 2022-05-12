import React, { useRef } from "react";
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { BiSearchAlt2 } from 'react-icons/bi';
import { ImShuffle } from 'react-icons/im'

export default function Search(props) {

  const userWish = useRef('')

  const showRandomDish = () => {
    const dishToReflect = Math.floor(Math.random() * 25)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${''}`)
      .then(response => {
        return response.json();
      }).then(data => {
        props.setDishToShow(data.meals[dishToReflect])
      }).catch(err => {
        console.log('Error from data log is:', err)
      })
      .catch(error => {
        console.log('Error from response is:', error)
      })
  }

  return (
    <div className='second-main mt-2'>
      <div className='search-container'>
        <h2 style={{ textAlign: 'center', margin: '0.5rem', fontWeight: 'bolder' }}>Meal Finder</h2>

        <InputGroup className="m-2">
          <FormControl style={{ marginLeft: '1rem' }} ref={userWish}
            placeholder="Search for Meal"
            aria-label="Search for Meal"
            aria-describedby="basic-addon2"
          />

          <Button variant="outline-light" onClick={(e) => {
            if (userWish.current.value) {
              props.showMeal(false)
              props.changeRandomDish(false)
              props.setMeal(userWish.current.value)
            }
          }}>
            <BiSearchAlt2 />
          </Button>

          <Button style={{ marginLeft: '1rem', marginRight: '1rem' }} variant="outline-light" onClick={() => {
            props.showMeal(false)
            props.changeRandomDish(true)
            showRandomDish()
          }} >
            <ImShuffle />
          </Button>
        </InputGroup>
      </div>
    </div>
  )
}