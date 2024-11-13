javascript:
if (window.location.href.indexOf('screen=overview_villages&mode=combined') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "overview_villages&mode=combined");
}
else {
    //made by Sophie "Shinko to Kuma"
    //declaring base variables
    var msPerSec = 1000;
    var secsPerMin = 60;
    var minsPerHour = 60;
    var hrsPerDay = 24;
    var msPerMin = msPerSec * secsPerMin;
    var msPerHour = msPerMin * minsPerHour;
    var msPerDay = msPerHour * hrsPerDay;
    var minsPerDay = hrsPerDay * minsPerHour;
    var defaultDate = new Date();

    var coordListOwn = [];
    var testDistances = [];
    var timedFakeList = [];
    var units;
    var ramSpeed;
    var ramSpeedMs;
    var unitSpeedSettings;
    function getUnitSpeeds() {
        let availableUnits = {};
        $.when($.get('/interface.php?func=get_unit_info')).done(function (xml) {
            $(xml).find('config').children().each((index, unit) => {
                availableUnits[$(unit).prop('nodeName')] = $(unit).find('speed').text();
            });
            unitSpeedSettings = availableUnits;
            ramSpeedMs = unitSpeedSettings.ram * 60 * 1000;
        });
    }
    getUnitSpeeds();

    // colors for UI
    var backgroundColor = "#36393f";
    var borderColor = "#3e4147";
    var headerColor = "#202225";
    var titleColor = "#ffffdf";

    //classes CSS
    cssClassesSophie = `
        <style>
        .sophRowA {
        background-color: #32353b;
        color: white;
        }
        .sophRowB {
        background-color: #36393f;
        color: white;
        }
        .sophHeader {
        background-color: #202225;
        font-weight: bold;
        color: white;
        }
        </style>`
    $(".content-border").eq(0).prepend(cssClassesSophie);
    $("#mobileHeader").eq(0).prepend(cssClassesSophie);
    defaultDate.setTime(((Math.floor(defaultDate.getTime() / msPerDay) + 1) * minsPerDay + defaultDate.getTimezoneOffset()) * msPerMin);
    defaultDate = defaultDate.toString().replace(/\w+\s*/i, "").replace(/(\d*:\d*:\d*)(.*)/i, "$1");

    if (localStorage.getItem("timedFakeDate") == null) {
        console.log("No date found, making new one")
        localStorage.setItem("timedFakeDate", defaultDate);
    }
    else {
        console.log("Date found, checking if older than right now");
        var lastDate = localStorage.getItem("timedFakeDate");
        if (Date.parse(lastDate) < Date.parse(defaultDate)) {
            console.log("last date is older than right now: " + defaultDate);

            localStorage.setItem("timedFakeDate", defaultDate);
        }
        else {
            console.log("keep last date: " + lastDate);
            defaultDate = lastDate;
            localStorage.setItem("timedFakeDate", defaultDate);
        }
    }
    $("#arrival_time").value = defaultDate;

    // calculate distances between two coordinates
    function calculateDistance(to, from) {
        var target = extractCoords(to).match(/(\d+)\|(\d+)/);
        var source = extractCoords(from).match(/(\d+)\|(\d+)/);
        var fields = Math.sqrt(Math.pow(source[1] - target[1], 2) + Math.pow(source[2] - target[2], 2));

        return fields;
    }

    //extract coordinates out of text
    function extractCoords(src) {
        var loc = src.match(/\d+\|\d+/ig);
        return (loc ? loc[loc.length - 1] : null);
    }

    //compare dates in unicode
    function compareDates(x) {
        var start = x,
            end = new Date(),
            diff = new Date(end - start),
            hours = diff / 1000 / 60 / 60;
        return hours;
    }

    function createDateBox() {
        Dialog.show("Content", `
                                <div>
                                    <table id="dateBox" class="sophHeader">
                                        <tr>
                                            <td colspan="${game_data.units.length-1}" style="text-align:center">Mass timed fake finder</td>
                                        </tr>
                                        <tr>
                                            <td class="sophHeader">Target Villages:</td>
                                            <td colspan="${game_data.units.length-1}" class="sophRowA"><textarea id="targetCoordinates" value="Insert list of coordinates here." class="text-input" rows="6" cols="50" onFocus="this.select()" ></textarea></td>
                                        </tr>
                                        <tr>
                                            <td class="sophHeader">Hit time:</td>
                                            <td colspan="${game_data.units.length-1}" class="sophRowB"><input id="arrival_time" size="25" class="text-input" value="${defaultDate}"/></td>
                                        </tr>
                                        <tr id="unitRowNames">
                                            <td rowspan="2" class="sophHeader" >Speed:</td>
                                        </tr>
                                        <!--<tr id="unitRow">--!>
                                        </tr>
                                        <tr>
                                            <td class="sophHeader"></td>
                                            <td colspan="${game_data.units.length-1}" class="sophRowA"><center><input type="button" class="btn btn-confirm-yes" value="Go" onClick="calculateTimedAttacks()" /></center></td>
                                        </tr>
                                    </table>
                                </div>`
        );
    }

    function calculateTimedAttacks() {
        console.log("Storing landing time");
        localStorage.setItem("timedFakeDate", new Date($("#arrival_time")[0].value));
        grabVillageData();
        //grab target coordinates
        targetCoords = parseCoordinates();
        //grab target time
        landTime = new Date($("#arrival_time")[0].value);

        //grab servertime from page
        serverTimeTemp = $("#serverDate")[0].innerText + " " + $("#serverTime")[0].innerText;
        serverTime = serverTimeTemp.match(/^([0][1-9]|[12][0-9]|3[01])[\/\-]([0][1-9]|1[012])[\/\-](\d{4})( (0?[0-9]|[1][0-9]|[2][0-3])[:]([0-5][0-9])([:]([0-5][0-9]))?)?$/);
        serverDate = Date.parse(serverTime[2] + "/" + serverTime[1] + "/" + serverTime[3] + serverTime[4]);

        //cycle through all the villages
        for (var i = 0; i < coordListOwn.length; i++) {
            //get distances between the village and each target
            for (var j = 0; j < targetCoords.length; j++) {
                tempDistance = calculateDistance(targetCoords[j], coordListOwn[i].Coord);
                testDistances.push({ "source": coordListOwn[i], "target": targetCoords[j], "distance": tempDistance })
            }
        }
        testDistances.sort((a, b) => (parseInt(a.distance) > parseInt(b.distance)) ? 1 : -1)

        //check runtimes for available units
        for (var i = 0; i < testDistances.length; i++) {
            if (testDistances[i].source.Units.ram > 0 || testDistances[i].source.Units.catapult > 0) {
                //found catapult/ram in source

                //time till launch
                launchTime = landTime - (testDistances[i].distance * ramSpeedMs);
                timeTillLaunch = launchTime - serverDate;
                if (timeTillLaunch > 0) {
                    //time left till fake window
                    timedFakeList.push({ "source": testDistances[i].source, "target": testDistances[i].target, "distance": testDistances[i].distance, "timeTillFake": timeTillLaunch, "launchTime": launchTime });
                }

            }
        }
        timedFakeList.sort((a, b) => (parseInt(a.timeTillFake) > parseInt(b.timeTillFake)) ? 1 : -1);
        Dialog.close();
        html = `
    <div>
        <table class="sophHeader">
            <tr class="sophHeader">
                <td colspan="5" style="text-align:center">Mass timed fake finder</td>
            </tr>
            <tr class="sophHeader">
                <td>Source</td>
                <td>Target</td>
                <td>Distance</td>
                <td>Launch time from now</td>
                <td>Launch time localy</td>
                <td>Link to rally page</td>
            </tr>`;
        for (var i = 0; i < timedFakeList.length; i++) {
            if (i % 2 == 0) {
                tempRow = " id='" + i + "' class='sophRowB'";
            }
            else {
                tempRow = " id='" + i + "' class='sophRowA'";
            }
            tempSecs = Math.floor(parseInt(timedFakeList[i].timeTillFake) / 1000) % 60;
            if (tempSecs < 10) tempSecs = "0" + tempSecs;
            tempMins = Math.floor(parseInt(timedFakeList[i].timeTillFake) / 1000 / 60);
            tempHours = Math.floor(tempMins / 60);
            tempMins = tempMins % 60;
            if (tempMins < 10) tempMins = "0" + tempMins;
            launchDate = new Date(timedFakeList[i].launchTime);
            html += `
        <tr ${tempRow}>
            <td><a href="/game.php?&screen=info_village&id=${timedFakeList[i].source.ID}">${timedFakeList[i].source.Coord}</a></td>
            <td>${timedFakeList[i].target}</td>
            <td>${Math.round(timedFakeList[i].distance)}</td>
            <td><span class="timer">${tempHours + ":" + tempMins + ":" + tempSecs}</span></td>
            <td>${launchDate.toLocaleString()}</td>
            <td onclick="openRallyPage(${i},${timedFakeList[i].source.ID},${timedFakeList[i].target.match(/(\d+)\|(\d+)/)[1]},${timedFakeList[i].target.match(/(\d+)\|(\d+)/)[2]})" style="cursor: pointer;"><font color="#40D0E0">Go to rally point</font></td>
        </tr>`
        }
        html += "</table></div>";
        Dialog.show("Content", html);
        Timing.tickHandlers.timers.init();
    }




    function grabVillageData() {
        //grab village data
        for (var i = 1; i < $("#combined_table tr").length; i++) {
            tempID = $($("#combined_table tr")[i].children[1].children[0]).attr("data-id");
            tempCoord = $("#combined_table tr")[i].children[1].innerText.match(/(\d+\|\d+)/)[0];
            tempUnits = {};
            for (var j = 0; j < game_data.units.length; j++) {
                tempUnits[game_data.units[j]] = $("#combined_table tr")[i].children[8 + j].innerText;
            }
            coordListOwn.push({ "ID": tempID, "Coord": tempCoord, "Units": tempUnits });
        }
    }

    function parseCoordinates() {
        //grab coordinates from textarea
        targetCoords = $("#targetCoordinates")[0].value.match(/\d+\|\d+/g);
        return targetCoords;
    }

    createDateBox();


    function openRallyPage(rowNumber, sourceID, x, y) {
        //<a href="/game.php?village=${timedFakeList[i].source.ID}&screen=place&target=${timedFakeList[i].targetID}"></a>


        temp = $.get("/game.php?village=" + sourceID + "&screen=api&ajax=target_selection&input=" + x + "|" + y + "&type=coord&request_id=1&limit=5&offset=0", function (data) {
            temp = data;
        })
            .done(function (page) {
                $("#" + rowNumber).remove();
                // sessionStorage.setItem("shouldAttack", "true");
                // let newWindow = window.open("/game.php?village=" + sourceID + "&screen=place&target=" + temp.villages[0].id);
                window.open("/game.php?village=" + sourceID + "&screen=place&target=" + temp.villages[0].id);

                // $(newWindow).on('load', function () {
                //     document.forms[0].ram.value = 1;
                //     document.forms[0].light.value = 20;
                //     $("#target_attack").click();
                // });
            });

        
    }

    /**
     471|446 472|446 494|421 489|436 472|445 473|447 491|436 492|437 486|437 491|441 491|440 491|439 492|438 492|439 491|438 493|439 
     481|441 482|439 482|440 480|439 490|437 476|437 476|436 481|435 480|433 471|435 470|432 471|432 474|435 479|430 505|467 506|468 
     506|462 507|462 506|460 504|470 503|473 479|429 481|429 480|429 485|440 479|427 474|424 470|423 494|436 490|418 502|476 505|477
     503|478 503|481 504|481 503|482 502|486 505|484 503|483 499|484 513|478 514|475 514|479 505|464 511|466 512|458 518|459 518|458 
     517|458 519|457 520|453 518|453 509|452 505|471 509|472 492|427 489|425 492|423 491|423 486|423 495|429 491|421 490|417 489|417 
     491|417 468|428 468|429 469|427 470|427 471|429 468|425 467|427 467|424 466|423 464|425 509|471 514|470 499|466 504|464 503|466 
     504|467 505|468 499|475 498|475 498|476 499|476 498|477 497|474 496|474 496|475 495|473 505|486 505|487 513|458 513|457 515|457 
     515|456 516|453 514|452 515|452 513|453 512|451 513|449 517|450 518|471 517|480 521|471 521|472 521|466 494|470 494|469 493|469
     493|468 507|454 507|453 506|455 503|459 490|453 491|453 492|453 486|457 491|459 490|460 491|463 492|463 493|457 494|457 494|458 
     492|460 494|454 494|453 486|460 486|464 487|463 491|474 491|475 498|440 496|440 495|439 497|439 501|435 502|435 501|434 497|433 
     500|409 504|434 525|442 526|441 526|444 523|444 523|443 522|443 522|442 522|440 522|439 522|441 521|442 524|444 525|440 524|441 
     523|441 524|439 519|440 520|440 520|439 523|447 521|448 522|449 523|448 518|456 519|457 517|458 518|458 518|459 518|453 516|453 
     517|452 524|453 525|453 525|452 523|452 522|452 521|452 520|453 518|471 514|470 513|467 511|466 511|462 513|460 519|463 520|464 
     522|463 524|464 524|463 521|466 521|471 521|472 524|469 526|470 526|464 526|463 528|454 527|453 527|450 528|450 531|452 531|451 
     530|451 530|450 532|450 515|452 514|452 512|451 513|449 509|450 515|457 527|461 522|456 523|456 447|429 446|429 446|430 446|431 
     445|428 446|427 447|428 448|429 449|427 450|425 455|430 456|429 451|431 464|442 461|440 463|438 462|439 462|440 518|437 518|438 
     517|438 517|439 532|438 532|437 533|438 523|456
     */

    //TODO: &ram=1 or &catapult=1 skontroluj či to môžem rovno reloadnut na odoslanie uz vyplnené a potom len submit btn to send ak by to išlo
    // https://sk90.divoke-kmene.sk/game.php?village=4430&screen=place&try=confirm -- POST
    // https://sk90.divoke-kmene.sk/game.php?village=4469&screen=place&action=command
    
    // af7e9fdea2e2c759fc94fd: 077524fcaf7e9f
    // template_id: 
    // source_village: 5046
    // spear: 3060
    // sword: 3609
    // axe: 
    // spy: 200
    // light: 
    // heavy: 
    // ram: 
    // catapult: 200
    // knight: 
    // snob: 
    // x: 487
    // y: 431
    // target_type: coord
    // input: 
    // attack: Útok

    //     $.post("demo.asp",      // send HTTP POST request to a page and get the answer
    // {
    // name: "John",       
    // age: 30
    // },
    // function(data, status){ //retreive response
    // console.log("Data: " + data + "\nStatus: " + status);
    // });
    
    // function attack() {
    //     // $("#troop_confirm_submit").click();
    //     console.log("ATTACK")

    //     sessionStorage.removeItem("shouldAttack");
    // }

    // if (sessionStorage.getItem("shouldAttack") === "true") {
    //     console.log("LOAD UNITS NOW")
    //     attack();
        
    // }
}
