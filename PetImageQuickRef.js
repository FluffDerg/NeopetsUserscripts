// ==UserScript==
// @name         PetImageQuickRef
// @namespace    http://tampermonkey.net/
// @version      2025-02-13
// @description  Click your pet icon in the sidebar to go to the quickref page :3
// @author       https://github.com/FluffDerg
// @match        *.neopets.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const petBox = document.getElementById("navProfilePetBox__2020");
    if (!petBox) return;

    const a = document.createElement("a");
    a.href = "/quickref.phtml";

    const petImage = document.getElementById("navProfilePet__2020");
    a.appendChild(petImage);
    petBox.appendChild(a);
})();
