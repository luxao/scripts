var names = []

Array.from(document.querySelector("#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(3)").childNodes[1].children).forEach(
    item => {if (typeof(item.children[0].children[1]) != 'undefined') {
        names.push(item.children[0].children[1].textContent.trim())
    }
})