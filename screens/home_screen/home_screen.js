
// let countriesContainer = document.getElementById("countries-container");

// Fetch countries data from Rest Countries API
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    // Loop through the countries data and create a card for each country
    data.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.className = "country-card";
      countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="${country.name.common} Flag">
        <h3>${country.name.common}</h3>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
      `;
      // Add click event listener to open modal on card click
      countryCard.addEventListener("click", () => {
        // Set modal content
        const modalCountryName = document.getElementById("modal-country-name");
        const modalFlag = document.getElementById("modal-flag");
        const modalPopulation = document.getElementById("modal-population");
        const modalRegion = document.getElementById("modal-region");
        const modalCapital = document.getElementById("modal-capital");

        modalCountryName.textContent = country.name.common;
        modalFlag.src = country.flags.svg;
        modalFlag.alt = `${country.name.common} Flag`;
        modalPopulation.textContent = country.population;
        modalRegion.textContent = country.region;
        modalCapital.textContent = country.capital;

        // Display modal
        const modal = document.getElementById("country-details-modal");
        modal.style.display = "block";

        // Close modal when the user clicks on the close button or outside the modal content
        const closeModal = document.getElementsByClassName("close")[0];
        window.onclick = function (event) {
          if (event.target == modal || event.target == closeModal) {
            modal.style.display = "none";
          }
        };
      });

      // Append country card to container
      document.getElementById("countries-container").appendChild(countryCard);
    });
  })
  .catch((error) => {
    console.error("Error fetching countries data:", error);
  });

  

