import React, { useState, useEffect } from 'react';
import { AddCategory, GifGrid } from './components';

// Función auxiliar para enviar eventos a Unomi
const sendEventToUnomi = (eventType, details) => {
  fetch('http://localhost:8181/cxs/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('karaf:karaf') // Asegúrate de que la autenticación es correcta para tu instancia Unomi
    },
    body: JSON.stringify({
      events: [{
        eventType: eventType,
        properties: details,
        source: {
          itemId: 'GifExpertApp',
          itemType: 'site',
          scope: 'GifExpertApp'
        },
        target: {
          itemId: 'unknown',
          itemType: 'visitor',
          scope: 'GifExpertApp'
        },
        // Asume que tienes una forma de generar/manejar un ID de sesión único
        sessionId: '1234'
      }]
    })
  }).then(response => {
    if (response.ok) {
      console.log('Evento enviado con éxito');
    }
  }).catch(error => {
    console.error('Error al enviar evento a Unomi', error);
  });
};

export const GifExpertApp = () => {
    const [categories, setCategories] = useState(['One Punch']);

    useEffect(() => {
      // Rastrear la carga de la aplicación
      sendEventToUnomi('appLoad', { pagePath: window.location.pathname });
    }, []);

    const handleAdd = () => {
        const newCategory = document.getElementById('newCategory').value;
        if (newCategory.trim().length > 2 && !categories.includes(newCategory)) {
            setCategories([newCategory, ...categories]);
            // Rastrear la adición de una nueva categoría
            sendEventToUnomi('newCategoryAdded', { categoryName: newCategory });
        } else {
            alert('La categoría debe tener al menos 3 caracteres y no debe estar repetida');
        }
    }

    return (
        <>
            <h1>GifExpertApp</h1>
            <AddCategory onNewCategory={handleAdd} />
            {categories.map(category => (
                <GifGrid key={category} category={category} />
            ))}
        </>
    );
};
