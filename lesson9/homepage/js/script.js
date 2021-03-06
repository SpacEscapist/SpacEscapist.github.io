// JavaScript code to toggle "hide" for the dropdown menu

function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}

//==================================================================================================
// Code for Date

const datefield = document.querySelector(".date");

const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);   // "now" is using the created variable... 
                                                                                            // ... for new Date on line #11

// instead of "full" for dateStyle, you can also use options of "long", "medium", or "short"

datefield.textContent = fulldate;

// .textContent will work just like .innerHTML.
    // However, .innerHTML will support embedded html code (such as <em></em>, <strong></strong>, etc.).
    // .textContent does not support embedded html code.


//==================================================================================================
// Code for bannerMessage toggle

const today = new Date();
const dayNumber = today.getDay();

const element = document.getElementById("bannerMessage");
if (dayNumber == 5) {                             // Day "5" is Friday
    element.classList.add("showme");
} 
else {
    element.classList.add("hideme")
}


//==================================================================================================
// Code for Last Visited

let visitNow = new Date();
let visitLast = new Date(localStorage.getItem("lastVisit"));
const oneDay = 1000 * 60 * 60 * 24;
const timeDiff = visitLast.getTime() - visitNow.getTime();
const daysDiff = Math.round(timeDiff / oneDay);

if (daysDiff == 1) {
    document.getElementById('lastVisit').innerHTML = "1 day ago";
}
else if (daysDiff < 0) {
    document.getElementById('lastVisit').innerHTML = "0 days ago";
}
else {
    document.getElementById('lastVisit').innerHTML = daysDiff + " days ago";
}

localStorage.setItem("lastVisit", visitNow);


//==================================================================================================
// Town Data

const requestURL = "https://byui-cit230.github.io/weather/data/towndata.json"

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    // console.table(jsonObject);  // temporary checking for valid response and data parsing
    const townData = jsonObject["towns"];

    const towns = townData.filter(town => town.name == "Preston" || town.name == "Fish Haven" || town.name == "Soda Springs");

    towns.forEach(town => {
        let card = document.createElement('section');
        let dataDiv = document.createElement('div');
        let h2 = document.createElement('h2');
        let h3 = document.createElement('h3');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let img = document.createElement('img');

        h2.textContent = `${town.name}`;
        h3.textContent = `${town.motto}`;
        p1.textContent = `Year Founded: ${town.yearFounded}`;
        p2.textContent = `Current Population: ${town.currentPopulation}`;
        p3.textContent = `Annual Rain Fall: ${town.averageRainfall}`;
        img.setAttribute('src', `images/${town.photo}`);
        img.setAttribute('alt', `${town.name} town image`);

        card.appendChild(dataDiv);
        dataDiv.appendChild(h2);
        dataDiv.appendChild(h3);
        dataDiv.appendChild(p1);
        dataDiv.appendChild(p2);
        dataDiv.appendChild(p3);
        card.appendChild(img)

        document.querySelector('div.townsDiv').appendChild(card);
    })
  });