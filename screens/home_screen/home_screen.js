let countriesContainer = document.getElementById("countries-container");
let countriesData = [];

// Fetch countries data from Rest Countries API
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    countriesData = data;
    displayCountries(countriesData);
  })
  .catch((error) => {
    console.error("Error fetching countries data:", error);
  });

function displayCountries(countries) {
  // Clear existing content in countriesContainer
  document.getElementById("countries-container").innerHTML = "";

  // Loop through the countries data and create a card for each country
  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.className = "country-card";
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} Flag">
      <h3 style="padding-left:20px">${country.name.common}</h3>
      <p style="padding-left:20px"><strong>Population:</strong> ${country.population}</p>
      <p style="padding-left:20px"><strong>Region:</strong> ${country.region}</p>
      <p style="padding-left:20px"><strong>Capital:</strong> ${country.capital}</p>
    `;

    // Add click event listener to open modal on card click
    countryCard.addEventListener("click", () => {
      // Get the country name
      const countryName = country.name.common;

      // Navigate to the detail screen with the country name as a query parameter
      window.location.href = `screens/details_screen/detail_screen.html?name=${encodeURIComponent(
        countryName
      )}`;
    });

    // Append country card to container
    document.getElementById("countries-container").appendChild(countryCard);
  });
}

function search() {
  const input = document.querySelector("input").value.toLowerCase();
  const regionSelect = document.getElementById("region-select");
  const region = regionSelect.value;

  // Filter countries data based on search input and region
  const filteredCountries = countriesData.filter(
    (country) =>
      country.name.common.toLowerCase().includes(input) &&
      (region === "all" || country.region === region)
  );

  // Display filtered countries
  if (filteredCountries.length === 0) {
    document.getElementById("countries-container").innerHTML =
      "<p class='no-results'>No results found</p>";
  } else {
    displayCountries(filteredCountries);
  }
}

function filterByRegion(region) {
  // Filter countries data based on region
  const filteredCountries = countriesData.filter(
    (country) => country.region.toLowerCase() === region.toLowerCase()
  );
  console.log(filteredCountries);
  // Display filtered countries
  if (filteredCountries.length === 0) {
    document.getElementById("countries-container").innerHTML =
      "<p class='no-results'>No results found</p>";
  } else {
    displayCountries(filteredCountries);
  }
}

// Add event listeners to region filter buttons
const regionFilterButtons = document.querySelectorAll(".region-filter");
regionFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedRegion = button.textContent.toLowerCase();
    filterByRegion(selectedRegion);
  });
});

// Reset countries to display all countries when the search input is cleared
const searchInput = document.querySelector("input");
searchInput.addEventListener("input", () => {
  if (!searchInput.value) {
    displayCountries(countriesData);
  }
});

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}
