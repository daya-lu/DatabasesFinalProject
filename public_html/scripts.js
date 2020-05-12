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
        "Archery": ["Archery Men's Target Archery, 50 metres, Individual", "Archery Men's Target Archery, 50 metres, Team",
            "Archery Men's Team", "Archery Men's Team Round", "Archery Women's Double Columbia Round", "Archery Women's Double National Round",
            "Archery Women's Individual", "Archery Women's Team", "Archery Women's Team Round"],
        "Athletics":["Athletics Men's 1,500 metres", "Athletics Men's 10 mile Walk", "Athletics Men's 200 metres", "Athletics Women's 4 x 100 metres Relay",
            "Athletics Women's High Jump", "Athletics Women's Marathon", "Athletics Women's Shot Put"],
        "Badminton": ["Badminton Men's Doubles", "Badminton Men's Singles", "Badminton Mixed Doubles", "Badminton Women's Doubles", "Badminton Women's Singles"],
        "Baseball": ["Baseball Men's Baseball"],
        "Beach Volleyball": ["Beach Volleyball Men's Beach Volleyball", "Beach Volleyball Women's Beach Volleyball"],
        "Bobsleigh": ["Bobsleigh Men's Four", "Bobsleigh Men's Four/Five", "Bobsleigh Men's Two", "Bobsleigh Women's Two"],
        "Boxing": ["Boxing Men's Featherweight", "Boxing Men's Light-Flyweight", "Boxing Women's Flyweight", "Boxing Women's Middleweight"],
        "Croquet": ["Croquet Mixed Doubles", "Croquet Mixed Singles, One Ball", "Croquet Mixed Singles, Two Balls"],
        "Cross Country Skiing": ["Cross Country Skiing Men's Sprint", "Cross Country Skiing Men's 30 kilometres", 
            "Cross Country Skiing Women's 15 km Skiathlon", "Cross Country Skiing Women's Team Sprint"],
        "Curling": ["Curling Men's Curling", "Curling Women's Curling"],
        "Cycling": ["Cycling Men's 1 mile", "Cycling Men's 12-Hours Race", "Cycling Women's Individual Pursuit, 3,000 metres", "Cycling Women's Mountainbike, Cross-Country"],
        "Diving": ["Diving Men's Plain High", "Diving Men's Springboard", "Diving Women's Platform", "Diving Women's Synchronized Springboard"],
        "Equestrianism": ["Equestrianism Men's Vaulting, Team", "Equestrianism Mixed Hacks And Hunter Combined", "Equestrianism Mixed Long Jump"],
        "Fencing": ["Fencing Men's Foil, Individual", "Fencing Men's Foil, Masters, Individual", "Fencing Women's Sabre, Individual"],
        "Figure Skating": ["Figure Skating Men's Singles", "Figure Skating Men's Special Figures", "Figure Skating Mixed Ice Dancing",
            "Figure Skating Mixed Pairs", "Figure Skating Mixed Team", "Figure Skating Women's Singles"],
        "Golf": ["Golf Men's Individual", "Golf Men's Team", "Golf Women's Individual"],
        "Gymnastics": ["Gymnastics Men's Horse Vault", "Gymnastics Men's Side Horse", "Gymnastics Women's Uneven Bars", "Gymnastics Women's Balance Beam"],
        "Handball": ["Handball Men's Handball", "Handball Women's Handball"],
        "Hockey": ["Hockey Men's Hockey", "Hockey Women's Hockey"],
        "Ice Hockey": ["Ice Hockey Men's Ice Hockey", "Ice Hockey Women's Ice Hockey"],
        "Judo": ["Judo Men's Heavyweight", "Judo Men's Open Class", "Judo Women's Lightweight", "Judo Women's Half-Heavyweight"],
        "Rhythmic Gymnastics": ["Rhythmic Gymnastics Women's Group","Rhythmic Gymnastics Women's Individual"],
        "Rowing": ["Rowing Men's 17-Man Naval Rowing Boats", "Rowing Women's Lightweight Double Sculls"],
        "Rugby": ["Rugby Men's Rugby"],
        "Shooting": ["Shooting Men's Free Pistol, 30 metres", "Shooting Men's Free Rifle, 1,000 Yards", "Shooting Mixed Trap"],
        "Ski Jumping": ["Ski Jumping Men's Large Hill, Individual", "Ski Jumping Men's Large Hill, Team", 
            "Ski Jumping Men's Normal Hill, Individual", "Ski Jumping Women's Normal Hill, Individual"],
        "Snowboarding":["Snowboarding Men's Boardercross","Snowboarding Men's Giant Slalom", "Snowboarding Women's Boardercross"],
        "Speed Skating": ["Speed Skating Men's 1,000 metres", "Speed Skating Women's 5,000 metres"],
        "Swimming": ["Swimming Men's 1,000 metres Freestyle", "Swimming Men's 100 metres Butterfly", 
            "Swimming Men's 400 metres Individual Medley", "Swimming Women's 300 metres Freestyle"],
        "Synchronized Swimming": ["Synchronized Swimming Women's Duet", "Synchronized Swimming Women's Solo", "Synchronized Swimming Women's Team"],
        "Table Tennis": ["Table Tennis Men's Doubles", "Table Tennis Men's Singles", "Table Tennis Men's Team",
            "Table Tennis Women's Doubles", "Table Tennis Women's Singles", "Table Tennis Women's Team"],
        "Taekwondo": ["Taekwondo Men's Flyweight", "Taekwondo Women's Featherweight", "Taekwondo Women's Welterweight"],
        "Tennis": ["Tennis Men's Doubles", "Tennis Men's Singles","Tennis Women's Doubles", "Tennis Women's Singles, Covered Courts"],
        "Triathlon": ["Triathlon Men's Olympic Distance", "Triathlon Women's Olympic Distance"],
        "Volleyball": ["Volleyball Men's Volleyball", "Volleyball Women's Volleyball"],
        "Water Polo": ["Water Polo Men's Water Polo", "Water Polo Women's Water Polo"],
        "Weightlifting": ["Weightlifting Men's All-Around Dumbbell Contest","Weightlifting Men's Flyweight",
            "Weightlifting Men's Unlimited, One Hand", "Weightlifting Women's Flyweight","Weightlifting Women's Super-Heavyweight"],
        "Wrestling": ["Wrestling Men's Bantamweight, Greco-Roman", "Wrestling Men's Lightweight, Freestyle",
            "Wrestling Women's Heavyweight, Freestyle", "Wrestling Women's Middleweight, Freestyle"]
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