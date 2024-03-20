import React, { useEffect, useState } from 'react'
import { AddCategory, GifGrid } from './components';
import {useTracker} from 'apache-unomi-tracker';
import { Buffer } from 'buffer';
// Hacer Buffer global para que esté disponible en todo el proyecto
window.Buffer = Buffer;


export const GifExpertApp = () => {

    //NO USAR HOOKS DENTRO DE UNA CONDICIONAL
    const [categories, setCategories] = useState(['One Punch']);


    const sendEvent =  async (event) => {
        const response = await fetch('http://localhost:8181/cxs/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        });
        return response.json();
    }


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
                "events:": [],
                "wemInitConfig": {
                    "contextServerUrl": document.location.origin,
                    "timeoutInMilliseconds": "1500",
                    "contextServerCookieName": "context-profile-id",
                    "activateWem": true,
                    "trackerSessionIdCookieName": "unomi-tracker-test-session-id",
                    "trackerProfileIdCookieName": "unomi-tracker-test-profile-id"
                }
            }
        
            // generate a new session
            if (unomiWebTracker.getCookie(unomiTrackerTestConf.wemInitConfig.trackerSessionIdCookieName) == null) {
                unomiWebTracker.setCookie(unomiTrackerTestConf.wemInitConfig.trackerSessionIdCookieName, unomiWebTracker.generateGuid(), 1);
            }
        
            // init tracker with our conf
            unomiWebTracker.initTracker(unomiTrackerTestConf);
        
            unomiWebTracker._registerCallback(() => {
                console.log("Unomi tracker test successfully loaded context", unomiWebTracker.getLoadedContext());
                
            }, 'Unomi tracker test callback example');
        
            // start the tracker
            unomiWebTracker.startTracker();

            const event = {
                "eventType": "view",
                "scope": "unomi-tracker-test",
                "source": {
                    "sourceType": "web",
                    "sourceInfo": {
                        "sourceID": "unomi-tracker-test-source"
                    }
                },
                "target": {
                    "targetType": "page",
                    "targetInfo": {
                        "pageID": "unomi-tracker-test-page",
                        "pageName": document.title,
                        "pagePath": document.location.pathname,
                        "destinationURL": document.location.origin + document.location.pathname,
                        "language": "en",
                        "categories": [],
                        "tags": []
                    }
                },
                "properties": {
                    "pageViewEvent": {
                        "pageViewID": unomiWebTracker.generateGuid(),
                        "referrer": document.referrer,
                        "duration": 0,
                        "search": "",
                        "searchResultCount": 0,
                        "searchResultPage": 0,
                        "pageType": "content",
                        "scrollDepth": 0
                    }
                }
            }
            // track the event
            unomiWebTracker._registerEvent(event);
            // See the events tracked in console
            console.log("Unomi tracker test successfully tracked event", event);
            const eventSent = sendEvent(event);
            console.log(eventSent);
            // log the event that has been sent

            
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
