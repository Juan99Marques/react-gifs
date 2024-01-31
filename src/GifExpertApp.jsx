import React, { useState } from 'react'
import { AddCategory, GifGrid } from './components';

export const GifExpertApp = () => {

    //NO USAR HOOKS DENTRO DE UNA CONDICIONAL
    const [categories, setCategories] = useState(['One Punch']);

    const handleAdd = () => {
        const newCategory = document.getElementById('newCategory').value;
        if (newCategory.trim().length > 2 && !categories.includes(newCategory)) {
            setCategories([newCategory, ...categories]);
        } else {
            alert('La categoria debe tener al menos 3 caracteres y no debe estar repetida');
        }

    }

    return (
        <>
            <h1>GifExpertApp</h1>

            <AddCategory onNewCategory={handleAdd} />

            {
                categories.map(category => (
                    <GifGrid
                        key={category}
                        category={category}
                    />
                ))
            }
        </>
    )

}
