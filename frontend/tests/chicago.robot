*** Settings***

Library              geo.py
Library              SeleniumLibrary

Suite Setup          Open Browser    ${URL}   ${BROWSER} 

*** Variables ***
${SERVER}            localhost:8000
${BROWSER}           Chrome
${URL}               http://${SERVER}/

*** Test Cases ***
Page Entry
    [Setup]    set geolocation    41.8781    -87.6298    100
    Reload Page
    Wait Until Element Does Not Contain    class=locationDetails    Loading    timeout=20
    Page Should Contain    Chicago


