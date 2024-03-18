import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

export const AddCategory = ({onNewCategory}) => {

    const [inputValue, setInputValue] = useState('')

    const onInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(inputValue.trim().length <= 2) return;


        onNewCategory(inputValue);
        setInputValue('');
    }
  return (
    <form onSubmit={onSubmit} aria-label='form'>  
        <input
        type="text" 
        id='newCategory'
        placeholder='Buscar gifs...'   
        value={inputValue}     
        onChange={onInputChange}
        />
    </form>
  )
}


AddCategory.propTypes = {
    onNewCategory: PropTypes.func.isRequired
}