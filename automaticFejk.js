// ==UserScript==
// @name        test
// @namespace   http://tampermonkey.net/
// @version     2024-11-07
// @description try to take over the world!
// @author      You
// @match       https://*/game.php?*screen=place
// @match       https://*/game.php?*screen=place&try=confirm
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
   
   var timeToAttack = "08:00:05";
    //TODO:
    // check error box -> #content_value > div.error_box > div
    
    
    // function checkTime() {
    //    if ($("#serverTime")[0].textContent == date) {
    //         sessionStorage.setItem("shouldAttack", "true");

    //         $("#selectAllUnits").click();
    //         $("#place_target > input")[0].value = "487|431";
    //         $("#target_attack").click();
    //     } else {
    //         setTimeout(checkTime, 1000);
    //     }
    // }

    // function attack() {
    //     $("#troop_confirm_submit").click();
    // }

    // if (sessionStorage.getItem("shouldAttack") === "true") {
    //     attack();

    //     sessionStorage.removeItem("shouldAttack");
    // } else {
    //     checkTime();
    // }

})();

// $("#quickbar_contents > ul:nth-child(4) > li:nth-child(2) > span > a").click()
//$("#date_arrival > span")[0].textContent