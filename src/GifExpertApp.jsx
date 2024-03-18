import React, { useState, useEffect } from 'react';
import { AddCategory, GifGrid } from './components';

export const GifExpertApp = () => {
    const [categories, setCategories] = useState(['One Punch']);

    useEffect(() => {
        // Función para enviar el evento a Unomi
        const sendEventToUnomi = async () => {
            try {
                const response = await fetch('http://localhost:8181/context.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Aquí deberías agregar la autenticación si es necesaria
                    },
                    body: JSON.stringify({
                        // Esta es la estructura básica de un evento, ajusta según tus necesidades
                        events: [{
                            eventType: 'view',
                            properties: {
                                pagePath: window.location.pathname,
                                pageTitle: document.title,
                            },
                            // Ajusta estos valores según la configuración de tu Unomi
                            source: {
                                itemId: 'website',
                                itemType: 'site',
                                scope: 'myWebsiteScope'
                            },
                            target: {
                                itemId: 'visitorId',
                                itemType: 'visitor',
                                scope: 'myWebsiteScope'
                            },
                        }],
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Evento enviado con éxito a Unomi');
            } catch (error) {
                console.error('Error al enviar evento a Unomi:', error);
            }
        };

        // Llama a la función cuando el componente se monta
        sendEventToUnomi();
    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

    const handleAdd = () => {
        const newCategory = document.getElementById('newCategory').value;
        if (newCategory.trim().length > 2 && !categories.includes(newCategory)) {
            setCategories([newCategory, ...categories]);
        } else {
            alert('La categoría debe tener al menos 3 caracteres y no debe estar repetida');
        }
    };

    return (
        <>
            <h1>GifExpertApp</h1>
            <AddCategory onNewCategory={handleAdd} />
            {categories.map(category => (
                <GifGrid
                    key={category}
                    category={category}
                />
            ))}
        </>
    );
};
