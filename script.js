// display country Info
const displayInfo = document.querySelector(".country-container");
const displayFlag = document.getElementById("country-name");
const displayPopulation = document.getElementById("country-population");
const displayRegion = document.getElementById("country-region");
const displayCapital = document.getElementById("country-capital");

// NIGHTMODE START
const nightModeBody = document.querySelector(".darkblue-mode");
const nightModeBtn = document.querySelector(".dark-mode-container");
const countryBg = document.querySelector(".country");

nightModeBtn.addEventListener("click", () => {
    nightModeBody.classList.toggle("darkblue-night");
    const nightMode = document.querySelectorAll(".lightblue-mode");
    nightMode.forEach((item) => {
        item.classList.toggle("lightblue-night");
    });
});

// NIGHTMODE END

// Fetchar api från hemsida
async function fetchCountrydata() {
    const contryData = await fetch("https://restcountries.com/v3.1/all");
    return await contryData.json();
}

function displayInnerHtml(countryData, region, search) {
    displayInfo.innerHTML = "";
    countryData.forEach((country) => {
        let name = country.name.common;
        if (!region && !search) {
            displayInfo.innerHTML += `<!-- Country Start -->
            <div class="country lightblue-mode">
                <img class="country-flag" src="${country.flags.png}" alt="${country.name.official}">
                <div class="country-info">
                    <h2 id="country-name">${country.name.common}</h2>
                    <p>
                        Population:
                        <span id="country-population">${country.population}</span>
                    </p>
                    <p>Region: <span id="country-region">${country.region}</span></p>
                    <p>
                        Capital: <span id="country-capital">${country.capital}</span>
                    </p>
                </div>
            </div>
            <!-- Country End -->`;
        } else if (region === country.region) {
            displayInfo.innerHTML += `<!-- Country Start -->
                <div class="country lightblue-mode">
                    <img class="country-flag" src="${country.flags.png}" alt="${country.name.official}">
                    <div class="country-info">
                        <h2 id="country-name">${country.name.common}</h2>
                        <p>
                            Population:
                            <span id="country-population">${country.population}</span>
                        </p>
                        <p>Region: <span id="country-region">${country.region}</span></p>
                        <p>
                            Capital: <span id="country-capital">${country.capital}</span>
                        </p>
                    </div>
                </div>
                <!-- Country End -->`;
        } else if (search.toUpperCase() === name.toUpperCase()) {
            displayInfo.innerHTML += `<!-- Country Start -->
            <div class="country lightblue-mode">
                <img class="country-flag" src="${country.flags.png}" alt="${country.name.official}">
                <div class="country-info">
                    <h2 id="country-name">${country.name.common}</h2>
                    <p>
                        Population:
                        <span id="country-population">${country.population}</span>
                    </p>
                    <p>Region: <span id="country-region">${country.region}</span></p>
                    <p>
                        Capital: <span id="country-capital">${country.capital}</span>
                    </p>
                </div>
            </div>
            <!-- Country End -->`;
        }
    });
    if (!displayInfo.innerHTML) {
        displayInfo.innerHTML = `<!-- Country Start -->
        <div class="country lightblue-mode">
            <h3 class="error">We could not find any results for your search.</h3>
        </div>
        <!-- Country End -->`;
    }
}

// hämta value från selectvalue!
function fetchCountryInfo(region, search) {
    fetchCountrydata().then((countryData) => {
        displayInnerHtml(countryData, region, search);
    });
}

fetchCountryInfo();

// filter by region
const filterRegionSelect = document.querySelector(".region-container");

filterRegionSelect.addEventListener("change", function (region) {
    fetchCountryInfo(region.target.value, "");
});

// search for country name
const searchInput = document.getElementById("search-bar");
searchInput.addEventListener("change", function () {
    fetchCountryInfo("", searchInput.value);
});
