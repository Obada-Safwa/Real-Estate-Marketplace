let currentFilters = {
  keyword: "",
  type: "",
  category: "",
  minPrice: null,
  price: null,
  bedrooms: null,
  minArea: null,
  area: null,
  bathrooms: null,
};

let propertiesCount = 0;
// Add pagination variables
let currentPage = 1;
let propertiesPerPage = 9; // Show 9 properties per page (3x3 grid)
let filteredProperties = [];

const properties = Utils.get_from_sessionstorage("properties");

var PropertiesServices = {
  filterInit: function () {
    let elements = {
      keyword: document.getElementById("locationInput"),
      category: document.getElementById("propertyTypeSelect"),
      price: document.getElementById("priceRangeSelect"),
      type: document.getElementById("saleRentSelect"),
      bedrooms: document.getElementById("bedrooms"),
      bathrooms: document.getElementById("bathrooms"),
      area: document.getElementById("area"),
    };

    function parsePriceRange(priceRange) {
      if (!priceRange) return { min: null, max: null };

      if (priceRange === "0-100000") return { min: 0, max: 100000 };
      if (priceRange === "100000-250000") return { min: 100000, max: 250000 };
      if (priceRange === "250000-500000") return { min: 250000, max: 500000 };
      if (priceRange === "500000-1000000") return { min: 500000, max: 1000000 };
      if (priceRange === "1000000+") return { min: 1000000, max: null };

      return { min: null, max: null };
    }

    function parseAreaRange(areaRange) {
      if (!areaRange || areaRange === "any") return { min: null, max: null };

      if (areaRange === "0-30") return { min: 0, max: 30 };
      if (areaRange === "30-80") return { min: 30, max: 80 };
      if (areaRange === "80-130") return { min: 80, max: 130 };
      if (areaRange === "130+") return { min: 130, max: null };

      return { min: null, max: null };
    }

    for (const key in elements) {
      elements[key].addEventListener("change", function () {
        if (key === "price") {
          const selectedValue = this.value;
          const priceRangeObj = parsePriceRange(selectedValue);
          currentFilters.minPrice = priceRangeObj.min;
          currentFilters.price = priceRangeObj.max;
          console.log("Selected value:", selectedValue);
        } else if (key === "bedrooms" || key === "bathrooms") {
          const selectedValue = this.value;
          currentFilters[key] =
            typeof currentFilters[key] === "number"
              ? parseInt(selectedValue)
              : selectedValue;
          console.log("Selected value:", selectedValue);
        } else if (key === "area") {
          const selectedValue = this.value;
          const areaRangeObj = parseAreaRange(selectedValue);
          currentFilters.minArea = areaRangeObj.min;
          currentFilters.area = areaRangeObj.max;
          console.log("Selected value:", selectedValue);
        } else {
          const selectedValue = this.value;
          currentFilters[key] = selectedValue;
          console.log("Selected value:", selectedValue);
        }
      });
    }

    const priceRangeObj = parsePriceRange(currentFilters.price);
    currentFilters.minPrice = priceRangeObj.min;
    currentFilters.price = priceRangeObj.max;
    // const areaRangeObj = parseAreaRange(areaValue);

    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn) {
      searchBtn.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("Search button clicked!");
        console.log(currentFilters);
        const cardSelector = document.getElementById("card-selector");
        cardSelector.innerHTML = "";

        // Reset pagination when filtering
        currentPage = 1;
        filteredProperties = [];
        propertiesCount = 0;

        // Filter properties based on criteria
        properties.forEach((property) => {
          // console.log(property);
          // Check if property matches all the filters
          // Only filter if the filter value is actually set (not empty, null, or undefined)
          const matchesType =
            !currentFilters.type || property.type === currentFilters.type;
          const matchesCategory =
            !currentFilters.category ||
            property.category === currentFilters.category;
          const matchesMinPrice =
            currentFilters.minPrice === null ||
            property.price >= currentFilters.minPrice;
          const matchesMaxPrice =
            currentFilters.price === null ||
            property.price <= currentFilters.price;
          const matchesBedrooms =
            currentFilters.bedrooms === null ||
            currentFilters.bedrooms === "any" ||
            property.bedrooms >= currentFilters.bedrooms;
          const matchesMinArea =
            currentFilters.minArea === null ||
            property.area >= currentFilters.minArea;
          const matchesMaxArea =
            currentFilters.area === null ||
            property.area <= currentFilters.area;
          const matchesBathrooms =
            currentFilters.bathrooms === null ||
            currentFilters.bathrooms === "any" ||
            property.bathrooms >= currentFilters.bathrooms;

          // If all conditions match, add to filtered properties
          if (
            matchesType &&
            matchesCategory &&
            matchesMinPrice &&
            matchesMaxPrice &&
            matchesBedrooms &&
            matchesMinArea &&
            matchesMaxArea &&
            matchesBathrooms
          ) {
            propertiesCount++;
            filteredProperties.push(property);
          }
        });

        console.log("Filtered properties count:", filteredProperties.length);

        // Display first page of properties
        displayProperties(filteredProperties, 1);

        // Show or hide load more button based on number of properties
        toggleLoadMoreButton();
      });
    } else {
      console.log("searchBtn not found");
    }

    // Initialize load more button
    initLoadMoreButton();
  },

  // Function to display properties with pagination
  displayProperties: function (propertiesToDisplay, page = 1) {
    displayProperties(propertiesToDisplay, page);
  }
  
  // Function to navigate to property details page
  // viewPropertyDetails: function(propertyId) {
  //   // Get the property from session storage
  //   const properties = Utils.get_from_sessionstorage("properties");
  //   const property = properties.find(p => p.id === propertyId);
    
  //   if (property) {
  //     // Navigate to the standalone property details page with the property ID
  //     window.location.href = `property-details.html?id=${propertyId}`;
  //   } else {
  //     console.error("Property not found with ID:", propertyId);
  //   }
  // }
};

// Function to display properties with pagination
function displayProperties(propertiesToDisplay, page) {
  const cardSelector = document.getElementById("card-selector");
  const startIndex = (page - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const paginatedProperties = propertiesToDisplay.slice(startIndex, endIndex);

  // Clear container if it's the first page
  if (page === 1) {
    cardSelector.innerHTML = "";
  }

  // Display properties
  paginatedProperties.forEach((property) => {
    const card = document.createElement("div");
    card.classList.add("box", "mb-4");
    card.innerHTML = `
      <div class="top">
        <img
          src="https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271__340.jpg"
          alt="Property Image"
        />
        <span>
          <a href="javascript:void(0)" class="flag-icon" title="Report Property">
            <i class="fas fa-flag"></i>
          </a>
        </span>
      </div>
      <div class="bottom">
        <h3>${property.title}</h3>
        <p>
              ${property.description}
        </p>
        <div class="advants">
          <div>
            <span>Bedrooms</span>
            <div><i class="fas fa-th-large"></i><span>${
              property.bedrooms
            }</span></div>
          </div>
          <div>
            <span>Bathrooms</span>
            <div><i class="fas fa-shower"></i><span>${
              property.bathrooms
            }</span></div>
          </div>
          <div>
            <span>Area</span>
            <div>
                  <i class="fas fa-vector-square"></i
                  ><span>${property.area}<span>Sq Ft</span></span>
            </div>
          </div>
        </div>
        <div class="price">
              <span>${property.type.toUpperCase()}</span>
              <span>${property.price} BAM</span>
        </div>
      </div>
    `;
    
    cardSelector.appendChild(card);
  });
}

// Function to initialize load more button
function initLoadMoreButton() {
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      currentPage++;
      displayProperties(filteredProperties, currentPage);
      toggleLoadMoreButton();
    });
  }
}

// Function to toggle load more button visibility
function toggleLoadMoreButton() {
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    if (currentPage >= totalPages) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }
  }
}

RestClient.get("properties", (response) => {
  // Store all properties in session storage
  Utils.set_to_sessionstorage("properties", response);
  console.log("Properties stored in session storage:", response);

  // Set filtered properties to all properties initially
  filteredProperties = response;

  // Display first page of properties
  displayProperties(filteredProperties, 1);

  // Show or hide load more button based on number of properties
  toggleLoadMoreButton();
});
