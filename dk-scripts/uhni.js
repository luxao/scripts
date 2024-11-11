// ==UserScript==
// @name        test
// @namespace   http://tampermonkey.net/
// @version     2024-11-07
// @description try to take over the world!
// @author      You
// @match       https://*/game.php?*screen=place
// @match       https://*/game.php?*screen=place&try=confirm
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
   // var counter = 0;
   var date = "13:06:00";
   //var timestamp = date.getTime()
    function checkTime() {
        //console.log($("#serverTime")[0].textContent)
       if ($("#serverTime")[0].textContent == date) {
            // Nastav v sessionStorage flag, že sa má spustiť attack
            sessionStorage.setItem("shouldAttack", "true");

            // Klikne na buttony pre útok
            $("#selectAllUnits").click();
            $("#place_target > input")[0].value = "487|431";
            $("#target_attack").click();
        } else {
            //counter += 1;
            setTimeout(checkTime, 1000);
        }
        //console.log(counter);
    }

    function attack() {
        $("#troop_confirm_submit").click();
    }

    // Skontroluj, či má spustiť funkciu attack po reloade
    if (sessionStorage.getItem("shouldAttack") === "true") {
        attack();
        // Vymaž flag po spustení útoku
        sessionStorage.removeItem("shouldAttack");
    } else {
        checkTime();
    }

})();