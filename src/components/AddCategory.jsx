import React from 'react'
import { useState } from 'react'

export const AddCategory = ({onNewCategory}) => {

    const [inputValue, setInputValue] = useState('One Punch')

    const onInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onNewCategory(inputValue);
        setInputValue('');
    }
  return (
    <form onSubmit={onSubmit}>  
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


