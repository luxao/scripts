javascript:
var names = [];

cssClassesLuxao = `
<style>
    #tribe-names-wrapper {
        width: 300px;
        height: auto;
        background-color: #fff;
        color: #000;
        border: 2px solid #000;
        margin: 15px 15px;
    }
</style>`

$("#contentContainer").eq(0).prepend(cssClassesLuxao);
$("#mobileHeader").eq(0).prepend(cssClassesLuxao);

var dataDiv = document.createElement("div")
dataDiv.id = "tribe-names-wrapper"


Array.from($("#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(3)")[0].childNodes[1].children).forEach(
    item => {if (typeof(item.children[0].children[1]) != 'undefined') {
        names.push(item.children[0].children[1].textContent.trim())
    }
})

dataDiv.innerText = names.join(";")

$("#contentContainer").prepend(dataDiv);
$("#mobileHeader").prepend(dataDiv);