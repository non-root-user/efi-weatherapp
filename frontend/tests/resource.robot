*** Settings ***
Documentation        A resource file

Library              SeleniumLibrary

*** Variables ***
${SERVER}            localhost:8000
${BROWSER}           Firefox
${DELAY}             0
${URL}               http://${SERVER}/

*** Keywords ***
Open Browser To Page
    Open Browser    ${URL}    ${BROWSER}


 