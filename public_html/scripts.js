function addGames() {
    var gameMenu = document.getElementById("game");
    var games = ["1896 - Greece - S", "1900 - France - S", "1904 - USA - S", "1908 - UK - S", "1912 - Sweden - S", "1920 - Belgium - S", "1924 - France - W",
        "1924 - France - S","1928 - Switzerland - W", "1928 - Netherlands - S", "1932 - USA - W", "1932 - USA - S", "1936 - Germany - W", "1936 - Germany - S", "1948 - Switzerland - W", "1948 - UK - S", "1952 - Norway - W",
        "1952 - Finland - S", "1956 - Italy - W", "1956 - Australia - S", "1960 - USA - W", "1960 - Italy - S", "1964 - Austria - W",
        "1964 - Japan - S", "1968 - France - W", "1968 - Mexico - S", "1972 - Japan - W", "1972 - Germany - S", "1976 - Austria - W", "1976 - Canada - S",
        "1980 - USA - W", "1980 - Russia - S", "1984 - Russia - W", "1984 - USA - S", "1988 - Canada - W", "1988 - South Korea - S", "1992 - France - W",
        "1992 - Spain - S", "1994 - Norway - W", "1996 - USA - S", "1998 - Japan - W", "2000 - Australia - S", "2002 - USA - W", "2004 - Greece - S",
        "2006 - Italy - W", "2008 - China - S", "2010 - Canada - W", "2012 - UK - S", "2014 - Russia - S", "2016 - Brazil - W"];
    for (var g in games) {
        var year = games[g].substring(0, 4);
        var option = document.createElement("option");
        option.value = year;
        option.text = games[g];
        gameMenu.appendChild(option);
    }
}

function addCountries() {
    var countryMenu = document.getElementsByClassName("country");
    var countries = ["Afghanistan", "Curacao", "Algeria", "Australia", "Argentina", "Armenia", "Austria", "Azerbaijan",
        "Bahamas", "Barbados", "Burundi", "Belgium", "Bermuda", "Belarus,", "Czech Republic", "Botswana", "Brazil",
        "Bahrain", "Bulgaria", "Canada", "Chile", "China", "Ivory Coast", "Cameroon","Colombia", "Costa Rica", "Croatia",
        "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt", "Eritrea",
        "Spain", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Georgia", "Germany", "Ghana", "Greece", 
        "Grenada", "Guatemala", "Guyana", "Haiti", "Hungary", "Indonesia", "India", "Iran", "Ireland", "Israel",
        "Iceland", "Iraq", "Virgin Islands, US", "Italy", "Jamaica", "Jordan", "Japan", "Kazakhstan", "Kenya", 
        "South Korea", "Kosovo", "Saudi Arabia", "Kuwait", "Latvia", "Lebanon", "Liechtenstein", "Lithuania", "Luxembourg",
        "Morocco", "Malaysia", "Moldova", "Mexico", "Mongolia", "Macedonia", "Montenegro", "Monaco", "Mozambique",
        "Mauritius", "Namibia", "Netherlands", "Nepal", "Nigeria", "Niger", "Norway", "New Zealand", "Pakistan", 
        "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "North Korea", "Puerto Rico", "Qatar", 
        "Romania", "South Africa", "Russia", "Serbia", "Senegal", "Slovenia", "Sri Lanka", "Sudan", "Switzerland",
        "Suriname", "Slovakia", "Sweden", "Syria", "Tanzania", "Tonga", "Thailand", "Tajikistan", "Togo", "Taiwan", 
        "Trinidad", "Tunisia", "Turkey", "United Arab Emirates", "Syria", "Uganda", "UK", "Ukraine", "Uruguay",
        "USA", "Uzbekistan", "Venezuela", "Vietnam", "Trinidad", "Zambia", "Zimbabwe"];
    for (var cm in countryMenu) {
        for (var c in countries) {
            var option = document.createElement("option");
            option.value = countries[c];
            option.text = countries[c];
            try {
                countryMenu[cm].appendChild(option);
            } catch (error) {
                console.log("type error");
            }
        }
    }
}

function addSports() {
    var sportMenu = document.getElementsByClassName("sport");
    var sports = ["Archery", "Athletics", "Badminton", "Baseball", "Beach Volleyball", "Bobsleigh", "Boxing", "Croquet",
        "Cross Country Skiing", "Curling", "Cycling", "Diving", "Equestrianism", "Fencing", "Figure Skating",
        "Golf", "Gymnastics", "Handball", "Hockey", "Ice Hockey", "Judo", "Rhythmic Gymnastics", "Rowing", "Rugby",
        "Shooting", "Ski Jumping", "Snowboarding", "Speed Skating", "Swimming", "Synchronized Swimming", "Table Tennis", 
        "Taekwondo", "Tennis", "Triathlon", "Volleyball", "Water Polo", "Weightlifting", "Wrestling"];
    for (var m in sportMenu) {
        for (var s in sports) {
            var option = document.createElement("option");
            option.value = sports[s];
            option.text = sports[s];
            try {
                sportMenu[m].appendChild(option);
            } catch (error) {
                console.log("type error");
            }
        }
    }
}

function addEvents(result) {
    var events = {
        "Archery": ["Archery Mens Target Archery - 50 metres - Individual", "Archery Mens Target Archery - 50 metres - Team",
            "Archery Mens Team", "Archery Mens Team Round", "Archery Womens Double Columbia Round", "Archery Womens Double National Round",
            "Archery Womens Individual", "Archery Womens Team", "Archery Womens Team Round"],
        "Athletics":["Athletics Mens 1500 metres", "Athletics Mens 10 mile Walk", "Athletics Mens 200 metres", "Athletics Womens 4 x 100 metres Relay",
            "Athletics Womens High Jump", "Athletics Womens Marathon", "Athletics Womens Shot Put"],
        "Badminton": ["Badminton Mens Doubles", "Badminton Mens Singles", "Badminton Mixed Doubles", "Badminton Womens Doubles", "Badminton Womens Singles"],
        "Baseball": ["Baseball Mens Baseball"],
        "Beach Volleyball": ["Beach Volleyball Mens Beach Volleyball", "Beach Volleyball Womens Beach Volleyball"],
        "Bobsleigh": ["Bobsleigh Mens Four", "Bobsleigh Mens Four/Five", "Bobsleigh Mens Two", "Bobsleigh Womens Two"],
        "Boxing": ["Boxing Mens Featherweight", "Boxing Mens Light-Flyweight", "Boxing Womens Flyweight", "Boxing Womens Middleweight"],
        "Croquet": ["Croquet Mixed Doubles", "Croquet Mixed Singles, One Ball", "Croquet Mixed Singles, Two Balls"],
        "Cross Country Skiing": ["Cross Country Skiing Mens Sprint", "Cross Country Skiing Mens 30 kilometres", 
            "Cross Country Skiing Womens 15 km Skiathlon", "Cross Country Skiing Womens Team Sprint"],
        "Curling": ["Curling Mens Curling", "Curling Womens Curling"],
        "Cycling": ["Cycling Mens 1 mile", "Cycling Mens 12-Hours Race", "Cycling Womens Individual Pursuit - 3000 metres", "Cycling Womens Mountainbike - Cross-Country"],
        "Diving": ["Diving Mens Plain High", "Diving Mens Springboard", "Diving Womens Platform", "Diving Womens Synchronized Springboard"],
        "Equestrianism": ["Equestrianism Mens Vaulting - Team", "Equestrianism Mixed Hacks And Hunter Combined", "Equestrianism Mixed Long Jump"],
        "Fencing": ["Fencing Mens Foil - Individual", "Fencing Mens Foil - Masters - Individual", "Fencing Womens Sabre - Individual"],
        "Figure Skating": ["Figure Skating Mens Singles", "Figure Skating Mens Special Figures", "Figure Skating Mixed Ice Dancing",
            "Figure Skating Mixed Pairs", "Figure Skating Mixed Team", "Figure Skating Womens Singles"],
        "Golf": ["Golf Mens Individual", "Golf Mens Team", "Golf Womens Individual"],
        "Gymnastics": ["Gymnastics Mens Horse Vault", "Gymnastics Mens Side Horse", "Gymnastics Womens Uneven Bars", "Gymnastics Womens Balance Beam"],
        "Handball": ["Handball Mens Handball", "Handball Womens Handball"],
        "Hockey": ["Hockey Mens Hockey", "Hockey Womens Hockey"],
        "Ice Hockey": ["Ice Hockey Mens Ice Hockey", "Ice Hockey Womens Ice Hockey"],
        "Judo": ["Judo Mens Heavyweight", "Judo Mens Open Class", "Judo Womens Lightweight", "Judo Womens Half-Heavyweight"],
        "Rhythmic Gymnastics": ["Rhythmic Gymnastics Womens Group","Rhythmic Gymnastics Womens Individual"],
        "Rowing": ["Rowing Mens 17-Man Naval Rowing Boats", "Rowing Womens Lightweight Double Sculls"],
        "Rugby": ["Rugby Mens Rugby"],
        "Shooting": ["Shooting Mens Free Pistol - 30 metres", "Shooting Mens Free Rifle - 1000 Yards", "Shooting Mixed Trap"],
        "Ski Jumping": ["Ski Jumping Mens Large Hill - Individual", "Ski Jumping Mens Large Hill - Team", 
            "Ski Jumping Mens Normal Hill - Individual", "Ski Jumping Womens Normal Hill - Individual"],
        "Snowboarding":["Snowboarding Mens Boardercross","Snowboarding Mens Giant Slalom", "Snowboarding Womens Boardercross"],
        "Speed Skating": ["Speed Skating Mens 1000 metres", "Speed Skating Womens 5000 metres"],
        "Swimming": ["Swimming Mens 1000 metres Freestyle", "Swimming Mens 100 metres Butterfly", 
            "Swimming Mens 400 metres Individual Medley", "Swimming Womens 300 metres Freestyle"],
        "Synchronized Swimming": ["Synchronized Swimming Womens Duet", "Synchronized Swimming Womens Solo", "Synchronized Swimming Womens Team"],
        "Table Tennis": ["Table Tennis Mens Doubles", "Table Tennis Mens Singles", "Table Tennis Mens Team",
            "Table Tennis Womens Doubles", "Table Tennis Womens Singles", "Table Tennis Womens Team"],
        "Taekwondo": ["Taekwondo Mens Flyweight", "Taekwondo Womens Featherweight", "Taekwondo Womens Welterweight"],
        "Tennis": ["Tennis Mens Doubles", "Tennis Mens Singles","Tennis Womens Doubles", "Tennis Womens Singles - Covered Courts"],
        "Triathlon": ["Triathlon Mens Olympic Distance", "Triathlon Womens Olympic Distance"],
        "Volleyball": ["Volleyball Mens Volleyball", "Volleyball Womens Volleyball"],
        "Water Polo": ["Water Polo Mens Water Polo", "Water Polo Womens Water Polo"],
        "Weightlifting": ["Weightlifting Mens All-Around Dumbbell Contest","Weightlifting Mens Flyweight",
            "Weightlifting Mens Unlimited - One Hand", "Weightlifting Womens Flyweight","Weightlifting Womens Super-Heavyweight"],
        "Wrestling": ["Wrestling Mens Bantamweight - Greco-Roman", "Wrestling Mens Lightweight - Freestyle",
            "Wrestling Womens Heavyweight - Freestyle", "Wrestling Womens Middleweight - Freestyle"]
    }
    var eventMenu = document.getElementsByClassName("event");
    var vals = [];
    switch(result) {
        case "Archery":
            vals = events.Archery.slice();
            break;
        case "Athletics":
            vals = events.Athletics.slice();
            break;
        case "Badminton":
            vals = events.Badminton.slice();
            break;
        case "Baseball":
            vals = events.Baseball.slice();
            break;
        case "Beach Volleyball":
            vals = events["Beach Volleyball"].slice();
            break;
        case "Bobsleigh":
            vals = events.Bobsleigh.slice();
            break;
        case "Boxing":
            vals = events.Boxing.slice();
            break;
        case "Croquet":
            vals = events.Croquet.slice();
            break;
        case "Cross Country Skiing":
            vals = events["Cross Country Skiing"].slice();
            break;
        case "Curling":
            vals = events.Curling.slice();
            break;
        case "Cycling":
            vals = events.Cycling.slice();
            break;
        case "Diving":
            vals = events.Diving.slice();
            break;
        case "Equestrianism":
            vals = events.Equestrianism.slice();
            break;
        case "Fencing":
            vals = events.Fencing.slice();
            break;
        case "Figure Skating":
            vals = events["Figure Skating"].slice();
            break;
        case "Golf":
            vals = events.Golf.slice();
            break;
        case "Gymnastics":
            vals = events.Gymnastics.slice();
            break;
        case "Handball":
            vals = events.Handball.slice();
            break;
        case "Hockey":
            vals = events.Hockey.slice();
            break;
        case "Ice Hockey":
            vals = events["Ice Hockey"].slice();
            break;
        case "Judo":
            vals = events.Judo.slice();
            break;
        case "Rhythmic Gymnastics":
            vals = events["Rhythmic Gymnastics"].slice();
            break;
        case "Rowing":
            vals = events.Rowing.slice();
            break;
        case "Rugby":
            vals = events.Rugby.slice();
            break;
        case "Shooting":
            vals = events.Shooting.slice();
            break;
        case "Ski Jumping":
            vals = events["Ski Jumping"].slice();
            break;
        case "Snowboarding":
            vals = events.Snowboarding.slice();
            break;
        case "Speed Skating":
            vals = events["Speed Skating"].slice();
            break;
        case "Swimming":
            vals = events.Swimming.slice();
            break;
        case "Synchronized Swimming":
            vals = events["Synchronized Swimming"].slice();
            break;
        case "Table Tennis":
            vals = events["Table Tennis"].slice();
            break;
        case "Taekwondo":
            vals = events.Taekwondo.slice();
            break;
        case "Tennis":
            vals = events.Tennis.slice();
            break;
        case "Triathlon":
            vals = events.Triathlon.slice();
            break;
        case "Volleyball":
            vals = events.Volleyball.slice();
            break;
        case "Water Polo":
            vals = events["Water Polo"].slice();
            break;
        case "Weightlifting":
            vals = events.Weightlifting.slice();
            break;
        case "Wrestling":
            vals = events.Wrestling.slice();
            break;
        default:
            vals = ["Select event"];
    }
    for (var em of eventMenu) {
        em.innerHTML = "";
        for (var val of vals) {
            var option = document.createElement("option");
            option.value = val;
            option.text = val;
            em.appendChild(option);
        }
    }
}

function validateYear() {
    var y1 = document.getElementById("year1").value;
    var y2 = document.getElementById("year2").value;
    if (y1 > y2) {
        alert("year 1 must be less than year 2.");
    }
}