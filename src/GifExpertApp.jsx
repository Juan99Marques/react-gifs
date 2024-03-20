import React, { useEffect, useState } from 'react'
import { AddCategory, GifGrid } from './components';
import {useTracker} from 'apache-unomi-tracker';
import { Buffer } from 'buffer';
// Hacer Buffer global para que esté disponible en todo el proyecto
window.Buffer = Buffer;


    
export const GifExpertApp = () => {
    //NO USAR HOOKS DENTRO DE UNA CONDICIONAL
    const [categories, setCategories] = useState(['One Punch']);
    useEffect(() => {
    const unomiWebTracker = useTracker();
    const unomiTrackerTestConf = {
        "scope": "unomi-tracker-test",
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
        "events": [],
        "wemInitConfig": {
            "contextServerUrl": 'http://localhost:8181',
            "contextServerEndpoint": "/context.json",
            "timeoutInMilliseconds": "1500",
            "contextServerCookieName": "context-profile-id",
            "activateWem": true,
            "trackerSessionIdCookieName": "unomi-tracker-test-session-id",
            "trackerProfileIdCookieName": "unomi-tracker-test-profile-id"
        }
    };

    // Genera una nueva sesión
    if (unomiWebTracker.getCookie(unomiTrackerTestConf.wemInitConfig.trackerSessionIdCookieName) == null) {
        unomiWebTracker.setCookie(unomiTrackerTestConf.wemInitConfig.trackerSessionIdCookieName, unomiWebTracker.generateGuid(), 1);
    }

    // Inicia el rastreador con nuestra configuración
    unomiWebTracker.initTracker(unomiTrackerTestConf);

    unomiWebTracker._registerCallback(() => {
        console.log("Unomi tracker test successfully loaded context", unomiWebTracker.getLoadedContext());
    }, 'Unomi tracker test callback example');

    // Inicia el rastreador
    unomiWebTracker.startTracker();
    // Registra un evento
    const event = unomiWebTracker.buildEvent({
        eventType: "view",
        scope: "unomi-tracker-test",
        source: {
            sourceType: "web",
            sourceId: "unomi-tracker-test-source"
        },
        target: {
            targetType: "page",
            targetId: "unomi-tracker-test-page",
        }
    });
    unomiWebTracker._completeEvent(event);
    console.log(event.target);
    console.log("Unomi tracker test event", event);
    // Envia el evento
    unomiWebTracker.collectEvent(event, () => {
        console.log("Unomi tracker test event successfully collected");
    }, (error) => {
        console.error("Unomi tracker test event failed to be collected" 
        + error.message ? ": " + error.message : "", error);
    });
    unomiWebTracker._registerEvent(event, true);
    }, []);
   
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
