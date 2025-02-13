// ==UserScript==
// @name         Neopets Questlog Quick Links
// @namespace    http://tampermonkey.net/
// @version      2025-01-27
// @description  Adds quick links to the questlog to help my RSI :3 Use Crtl+Click to open tabs in the background
// @author       https://github.com/FluffDerg
// @match        *.neopets.com/questlog/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const links = {
        "customise": "/customise",
        "feed": "/inventory.phtml",
        "groom": "/inventory.phtml",
        "play": "/games/h5game.phtml?game_id=1392",
        "purchase": "/generalstore.phtml",
        "excitement": "/faerieland/wheel.phtml",
        "extravagance": "/desert/extravagance.phtml",
        "knowledge": "/medieval/knowledge.phtml",
        "mediocrity": "/prehistoric/mediocrity.phtml",
        "misfortune": "/halloween/wheel/index.phtml",
    };

    document.querySelectorAll('div[class="ql-quest-details"]').forEach(x => {
        const description = x.getElementsByClassName('ql-quest-description')[0].innerText.toLowerCase();
        for (const key in links) {
            if (!description.includes(key)) continue;

            const container = x.getElementsByClassName('ql-quest-buttons')[0];
            const buttons = container.children;

            const button = buttons[0].cloneNode();
            button.className = "button-default__2020 button-blue__2020 ql-skip";
            button.innerText = "Quick Link";
            button.onclick = () => window.open(links[key]);

            container.appendChild(button);
            container.style = "display: flex";
            break;
        }
    });

    // Open Jellyneo search window when clicking on quest rewards
    const baseUrl = "https://items.jellyneo.net/search/?name=";
    const name = document.querySelector('div[class="ql-bonus-item"]').firstChild.data;
    const url = baseUrl + encodeURI(name);
    document.querySelector('img[class="ql-bonus-img"]').onclick = () => window.open(url);

    document.querySelectorAll('div[class="ql-reward-label"]').forEach(x => {
        const name = x.firstChild.data;
        if (name.endsWith(" NP")) return;
        const url = baseUrl + encodeURI(name);
        x.parentNode.firstChild.onclick = () => window.open(url);
    });

    // Add Trudy's Surprise gift box button
    const container = document.createElement("div");
    container.id = "alerts"
    container.classList = "alerts-tab-content__2020"
    container.style = "height: auto"

    const button = document.createElement("div");
    button.classList = "alerts-tab-item-icon__2020 alerts-tab-eventcode-12000";
    button.onclick = () => window.open("/trudys_surprise.phtml");
    button.title = "Trudy's Surprise";

    container.appendChild(button);
    document.querySelector('div[class="questlog-top"]').appendChild(container);
})();
