function changeYears() {
    var years = {
        "summer": "1896,1900,1904,1906,1908,1912,1920,1924,1928,1932,1936,1948,1952,1956,1960,1964,1968,1972,1976,1980,1984,1988,1992,1996,2000,2004,2008,2012,2016",
        "winter": "1924,1928,1932,1936,1948,1952,1956,1960,1964,1968,1972,1976,1980,1984,1988,1992,1994,1998,2002,2006,2010,2014"
    }
    var seasonMenu = document.getElementById("season");
    var yearMenu = document.getElementById("year");
    yearMenu.innerHTML = "";
    var result = seasonMenu.options[seasonMenu.selectedIndex].value;
    var vals = [];
    switch(result) {
        case "summer":
            vals = years.summer.split(",");
            break;
        case "winter":
            vals = years.winter.split(",");
            break;
        case "base":
            vals = ["Please choose season of game"];
    }
    var yearMenu = document.getElementById("year");
    for (var val of vals) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val;
        yearMenu.appendChild(option);
    }
}