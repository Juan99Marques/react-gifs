import React, { useState, useEffect } from 'react';
import { AddCategory, GifGrid } from './components';
import { useTracker } from "apache-unomi-tracker";
import { Buffer } from 'buffer';
window.Buffer = Buffer;



export const GifExpertApp = () => {
    const [categories, setCategories] = useState(['One Punch']);

    useEffect(() => {
        // Este bloque se ejecutará una vez que el componente se monte
        const unomiWebTracker = useTracker();
        const unomiTrackerTestConf = {
            "scope": "systemscope",
            "site": {
                "siteInfo": {
                    "siteID": "unomi-tracker-test"
                }
            },
            "page": {
                "pageInfo": {
                    "pageID": "unomi-tracker-test-page",
                    "pageName": document.title,
                    "pagePath": document.location.pathname,
                    "destinationURL": document.location.origin + document.location.pathname,
                    "language": "en",
                    "categories": [],
                    "tags": []
                },
                "attributes": {},
                "consentTypes": []
            },
            "events": [
                    {
                        "eventType":"view",
                        "scope": "systemscope",
                        "source":{
                            "itemType": "tracker",
                            "scope":"systemscope",
                            "itemId": "systemscope",
                        },
                        "target":{
                            "itemType":"page",
                            "scope":"systemscope",
                            "itemId":"homepage",
                            "properties":{
                                "pageInfo":{
                                    "referringURL": document.referrer,
                                }
                            }
                        }
                    }
                ]
            , // Asegúrate de que no hay un typo aquí. Debe ser "events", no "events:".
            "wemInitConfig": {
                "contextServerUrl": document.location.origin,
                "timeoutInMilliseconds": "1500",
                "contextServerCookieName": "context-profile-id",
                "activateWem": true,
                "trackerSessionIdCookieName": "unomi-tracker-test-session-id",
                "trackerProfileIdCookieName": "unomi-tracker-test-profile-id",
            }
        };

        // Generar una nueva sesión
        if (unomiWebTracker.getCookie(unomiTrackerTestConf.wemInitConfig.trackerSessionIdCookieName) === null) {
            unomiWebTracker.setCookie(unomiTrackerTestConf.wemInitConfig.trackerSessionIdCookieName, unomiWebTracker.generateGuid(), 1);
        }

        // Iniciar el tracker con nuestra configuración
        unomiWebTracker.initTracker(unomiTrackerTestConf);

        unomiWebTracker._registerCallback(() => {
            console.log("Unomi tracker test successfully loaded context", unomiWebTracker.getLoadedContext());
        }, 'Unomi tracker test callback example');

        // Registrar un evento de vista y loguear en consola

        const event = {
            eventType: "view",
            scope: "systemscope",
            source: {
                itemType: "tracker",
                scope: "systemscope",
                itemId: "systemscope",
            },
            target: {
                itemType: "page",
                scope: "systemscope",
                itemId: "homepage",
                properties: {
                    pageInfo: {
                        referringURL: document.referrer,
                    }
                }
            }
        };
        unomiWebTracker.buildEvent(event.eventType,event.source, event.target);
        unomiWebTracker.loadContext();
        

        //Chequear que el evento se haya registrado

       
        

        // Iniciar el tracker
        unomiWebTracker.startTracker();
        unomiWebTracker._registerEvent(event);
        console.log("Unomi tracker test successfully registered event", event);
     
    }, []); // El arreglo vacío asegura que este efecto solo se ejecute una vez.



    const handleAdd = () => {
        const newCategory = document.getElementById('newCategory').value;
        if (newCategory.trim().length > 2 && !categories.includes(newCategory)) {
            setCategories([newCategory, ...categories]);
        } else {
            alert('La categoria debe tener al menos 3 caracteres y no debe estar repetida');
        }
    };

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
