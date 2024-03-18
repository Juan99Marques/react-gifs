import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { GifExpertApp } from './GifExpertApp.jsx'
import {useTracker} from "apache-unomi-tracker";

(function () {
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
})();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GifExpertApp />
  </React.StrictMode>,
)


// apiKey = zajFyXdIXLeESCRuXE2iwDqRKPT9JCZD