// // Store all properties from the API call
// let allProperties = [];

// // Store current filter values
// let currentFilters = {
//   keyword: "",
//   type: "",
//   category: "",
//   minPrice: null,
//   maxPrice: null,
//   minBedrooms: null,
//   minBathrooms: null,
//   minArea: null,
//   maxArea: null,
// };

// // Function to parse price range from select value
// function parsePriceRange(priceRange) {
//   if (!priceRange) return { min: null, max: null };

//   if (priceRange === "0-100000") return { min: 0, max: 100000 };
//   if (priceRange === "100000-250000") return { min: 100000, max: 250000 };
//   if (priceRange === "250000-500000") return { min: 250000, max: 500000 };
//   if (priceRange === "500000-1000000") return { min: 500000, max: 1000000 };
//   if (priceRange === "1000000+") return { min: 1000000, max: null };

//   return { min: null, max: null };
// }

// // Function to parse minimum value (bedrooms/bathrooms)
// function parseMinimumValue(value) {
//   if (!value || value === "any") return null;
//   return parseInt(value.replace("+", ""));
// }

// // Function to parse area range
// function parseAreaRange(areaRange) {
//   if (!areaRange || areaRange === "any") return { min: null, max: null };

//   if (areaRange === "0-30") return { min: 0, max: 30 };
//   if (areaRange === "30-80") return { min: 30, max: 80 };
//   if (areaRange === "80-130") return { min: 80, max: 130 };
//   if (areaRange === "130+") return { min: 130, max: null };

//   return { min: null, max: null };
// }

// // Format price for display
// function formatPrice(price) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     maximumFractionDigits: 0,
//   }).format(price);
// }

// // Clear the property cards container
// function clearPropertyCards() {
//   const cardContainer = document.querySelector("#card-selector");
//   if (cardContainer) {
//     cardContainer.innerHTML = "";
//   }
// }

// // Display property cards
// function displayProperties(properties) {
//   clearPropertyCards();

//   if (properties.length === 0) {
//     // Show no results message
//     const cardContainer = document.querySelector("#card-selector");
//     if (cardContainer) {
//       cardContainer.innerHTML =
//         '<div class="col-12 text-center p-5"><h3>No properties found matching your criteria</h3><p>Try adjusting your filters to see more results.</p></div>';
//     }
//     return;
//   }

//   properties.forEach((property) => {
//     const card = document.createElement("div");
//     card.classList.add("box", "mb-4");

//     // Create a link to the property details page
//     card.onclick = function () {
//       // Store the property ID in session storage for the details page
//       Utils.set_to_sessionstorage("selectedProperty", property);
//       window.location.href = "propertydetails.html";
//     };

//     card.style.cursor = "pointer";

//     // Determine if property is for sale or rent
//     const listingType = property.type === "rent" ? "For Rent" : "For Sale";

//     card.innerHTML = `
//       <div class="top">
//         <img
//           src="https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271__340.jpg"
//           alt="Property Image"
//         />
//         <span>
//           <a href="javascript:void(0)" class="flag-icon" title="Report Property">
//             <i class="fas fa-flag"></i>
//           </a>
//         </span>
//       </div>
//       <div class="bottom">
//         <h3>${property.title}</h3>
//         <p>${property.description}</p>
//         <div class="advants">
//           <div>
//             <span>Bedrooms</span>
//             <div><i class="fas fa-th-large"></i><span>${
//               property.bedrooms
//             }</span></div>
//           </div>
//           <div>
//             <span>Bathrooms</span>
//             <div><i class="fas fa-shower"></i><span>${
//               property.bathrooms
//             }</span></div>
//           </div>
//           <div>
//             <span>Area</span>
//             <div>
//               <i class="fas fa-vector-square"></i><span>${
//                 property.area
//               }<span>Sq Ft</span></span>
//             </div>
//           </div>
//         </div>
//         <div class="price">
//           <span>${listingType}</span>
//           <span>${formatPrice(property.price)}</span>
//         </div>
//       </div>
//     `;

//     document.querySelector("#card-selector").appendChild(card);
//   });
// }

// // Apply filters to the properties
// function applyFilters() {
//   // If no properties have been loaded yet, return
//   if (allProperties.length === 0) return;

//   // Get filter values from UI elements
//   const keyword = document.getElementById("locationInput")?.value || "";
//   const category = document.getElementById("propertyTypeSelect")?.value || "";
//   const priceRange = document.getElementById("priceRangeSelect")?.value || "";

//   // Get advanced filter values (may be null if elements don't exist)
//   const bedroomsSelect = document.querySelector(
//     ".filter-range-slider select:nth-child(1)"
//   );
//   const bathroomsSelect = document.querySelector(
//     ".filter-range-slider select:nth-child(2)"
//   );
//   const areaSelect = document.querySelector(
//     ".filter-range-slider select:nth-child(3)"
//   );

//   const bedroomsValue = bedroomsSelect?.value || "any";
//   const bathroomsValue = bathroomsSelect?.value || "any";
//   const areaValue = areaSelect?.value || "any";

//   // Get active tab (sale or rent)
//   const activeTab = document.querySelector(".filter-tab.active");
//   const type = activeTab ? activeTab.getAttribute("data-filter") : "";

//   // Parse values into usable filter criteria
//   const priceRangeObj = parsePriceRange(priceRange);
//   const minBedrooms = parseMinimumValue(bedroomsValue);
//   const minBathrooms = parseMinimumValue(bathroomsValue);
//   const areaRangeObj = parseAreaRange(areaValue);

//   // Update current filters
//   currentFilters = {
//     keyword: keyword.toLowerCase(),
//     type: type !== "all" ? type : "",
//     category: category,
//     minPrice: priceRangeObj.min,
//     maxPrice: priceRangeObj.max,
//     minBedrooms: minBedrooms,
//     minBathrooms: minBathrooms,
//     minArea: areaRangeObj.min,
//     maxArea: areaRangeObj.max,
//   };

//   // Save filters to session storage
//   Utils.set_to_sessionstorage("propertyFilters", currentFilters);

//   // Apply filters to the properties
//   const filteredProperties = allProperties.filter((property) => {
//     // Search by keyword (title, description, location)
//     if (
//       currentFilters.keyword &&
//       !property.title.toLowerCase().includes(currentFilters.keyword) &&
//       !property.description.toLowerCase().includes(currentFilters.keyword) &&
//       !property.location.toLowerCase().includes(currentFilters.keyword)
//     ) {
//       return false;
//     }

//     // Filter by type (sale/rent)
//     if (currentFilters.type && property.type !== currentFilters.type) {
//       return false;
//     }

//     // Filter by category (apartment, house, commercial, land)
//     if (
//       currentFilters.category &&
//       property.category !== currentFilters.category
//     ) {
//       return false;
//     }

//     // Filter by price range
//     if (
//       currentFilters.minPrice !== null &&
//       property.price < currentFilters.minPrice
//     ) {
//       return false;
//     }

//     if (
//       currentFilters.maxPrice !== null &&
//       property.price > currentFilters.maxPrice
//     ) {
//       return false;
//     }

//     // Filter by bedrooms
//     if (
//       currentFilters.minBedrooms !== null &&
//       property.bedrooms < currentFilters.minBedrooms
//     ) {
//       return false;
//     }

//     // Filter by bathrooms
//     if (
//       currentFilters.minBathrooms !== null &&
//       property.bathrooms < currentFilters.minBathrooms
//     ) {
//       return false;
//     }

//     // Filter by area
//     if (
//       currentFilters.minArea !== null &&
//       property.area < currentFilters.minArea
//     ) {
//       return false;
//     }

//     if (
//       currentFilters.maxArea !== null &&
//       property.area > currentFilters.maxArea
//     ) {
//       return false;
//     }

//     // If property passes all filters, include it
//     return true;
//   });

//   // Display the filtered properties
//   displayProperties(filteredProperties);
// }

// // Function to handle filter tab clicks (All, For Sale, For Rent)
// function handleFilterTabClick(event) {
//   // Remove active class from all tabs
//   document.querySelectorAll(".filter-tab").forEach((tab) => {
//     tab.classList.remove("active");
//   });

//   // Add active class to clicked tab
//   event.target.classList.add("active");

//   // Apply filters with the new type
//   applyFilters();
// }

// // Initialize property listing
// document.addEventListener("DOMContentLoaded", function () {
//   // First, fetch all properties
//   RestClient.get(
//     "properties",
//     (response) => {
//       // Store properties in our global variable
//       allProperties = response;

//       // Save to session storage for other pages (like property details)
//       Utils.set_to_sessionstorage("allProperties", allProperties);

//       // Set up filter event listeners

//       // Initialize filter tabs
//       document.querySelectorAll(".filter-tab").forEach((tab) => {
//         tab.addEventListener("click", handleFilterTabClick);
//       });

//       // Set up search button click handler
//       const searchBtn = document.querySelector(".btn-search");
//       if (searchBtn) {
//         searchBtn.addEventListener("click", applyFilters);
//       }

//       // Set up advanced filter selects
//       document
//         .querySelectorAll(".filter-range-slider select")
//         .forEach((select) => {
//           select.addEventListener("change", applyFilters);
//         });

//       // Set up property type and price range selects
//       document
//         .getElementById("propertyTypeSelect")
//         ?.addEventListener("change", applyFilters);
//       document
//         .getElementById("priceRangeSelect")
//         ?.addEventListener("change", applyFilters);

//       // Check if we have saved filters in session storage
//       const savedFilters = Utils.get_from_sessionstorage("propertyFilters");

//       if (savedFilters) {
//         // Restore UI state from saved filters
//         currentFilters = savedFilters;

//         if (currentFilters.keyword) {
//           document.getElementById("locationInput").value =
//             currentFilters.keyword;
//         }

//         if (currentFilters.category) {
//           document.getElementById("propertyTypeSelect").value =
//             currentFilters.category;
//         }

//         // Restore price range
//         if (
//           currentFilters.minPrice !== null ||
//           currentFilters.maxPrice !== null
//         ) {
//           let priceRangeValue = "";

//           if (
//             currentFilters.minPrice === 0 &&
//             currentFilters.maxPrice === 100000
//           ) {
//             priceRangeValue = "0-100000";
//           } else if (
//             currentFilters.minPrice === 100000 &&
//             currentFilters.maxPrice === 250000
//           ) {
//             priceRangeValue = "100000-250000";
//           } else if (
//             currentFilters.minPrice === 250000 &&
//             currentFilters.maxPrice === 500000
//           ) {
//             priceRangeValue = "250000-500000";
//           } else if (
//             currentFilters.minPrice === 500000 &&
//             currentFilters.maxPrice === 1000000
//           ) {
//             priceRangeValue = "500000-1000000";
//           } else if (
//             currentFilters.minPrice === 1000000 &&
//             currentFilters.maxPrice === null
//           ) {
//             priceRangeValue = "1000000+";
//           }

//           if (priceRangeValue) {
//             document.getElementById("priceRangeSelect").value = priceRangeValue;
//           }
//         }

//         // Restore type tab (sale/rent)
//         if (currentFilters.type) {
//           document.querySelectorAll(".filter-tab").forEach((tab) => {
//             if (tab.getAttribute("data-filter") === currentFilters.type) {
//               // Remove active class from all tabs
//               document
//                 .querySelectorAll(".filter-tab")
//                 .forEach((t) => t.classList.remove("active"));
//               // Add active class to this tab
//               tab.classList.add("active");
//             }
//           });
//         }
//       }

//       // Apply initial filtering (with or without saved filters)
//       applyFilters();
//     },
//     (error) => {
//       console.error("Error fetching properties:", error);
//       const cardContainer = document.querySelector("#card-selector");
//       if (cardContainer) {
//         cardContainer.innerHTML =
//           '<div class="col-12 text-center p-5"><h3>Error loading properties</h3><p>Please try again later.</p></div>';
//       }
//     }
//   );
// });
