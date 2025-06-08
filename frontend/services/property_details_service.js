// Property Details Service
// Handles fetching and displaying property details by ID

/**
 * Fetches property details from the backend API
 * @param {number} propertyId - The ID of the property to fetch
 */
function loadPropertyDetails(propertyId) {
  RestClient.get(
    `properties/details/${propertyId}`,
    function (response) {
      console.log("API Response:", response);

      // Extract the property object from the response
      // The API seems to return data with numeric keys
      let property = null;

      if (response && typeof response === "object") {
        // Check if the response has a direct property with ID
        if (response.id) {
          property = response;
          console.log("option 1	", property);
        }
        // Check if response is an array-like object with numeric keys
        else if (response["0"] && response["0"].id) {
          property = response["0"];
          console.log("option 2	", property);
        }
        // Check if response has nested data
        else if (response.data && response.data.id) {
          property = response.data;
          console.log("option 3	", property);
        }
      }

      if (property && property.id) {
        // Display property details
        displayPropertyDetails(property);

        // Display property images if available
        if (property.images && property.images.length > 0) {
          displayPropertyImages(property.images);
        } else {
          // Display default image if no images are available
          displayDefaultImage();
        }
        console.log("property.user_details:", response["user_details"]);
        // Display user/seller details if available
        if (response["user_details"]) {
          displaySellerInformation(response["user_details"]);
        }
      } else {
        console.error("Invalid property data structure:", response);
        displayError("Property not found or invalid data format");
      }
    },
    function (error) {
      console.error("Error fetching property details:", error);
      displayError("Failed to load property details");
    }
  );
}

/**
 * Displays property details in the UI
 * @param {Object} property - The property object with details
 */
function displayPropertyDetails(property) {
  // Update page title
  document.title = `${property.title} | Real Estate Marketplace`;

  // Update property title
  const propertyTitle = document.querySelector(".property-title");
  if (propertyTitle) {
    propertyTitle.textContent = property.title;
  }

  // Update property price and type
  const priceSection = document.querySelector(".property-price");
  if (priceSection) {
    priceSection.innerHTML = `
      <div class="price">${property.price} BAM</div>
      <div class="property-type">${property.type.toUpperCase()}</div>
    `;
  }

  // Update property location
  const locationElement = document.querySelector(".location");
  if (locationElement) {
    locationElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${property.location}`;
  }

  // Update property features
  const featuresElement = document.querySelector(".property-features");
  if (featuresElement) {
    featuresElement.innerHTML = `
      <div class="feature">
        <i class="fas fa-bed"></i>
        <span>${property.bedrooms} Bedrooms</span>
      </div>
      <div class="feature">
        <i class="fas fa-bath"></i>
        <span>${property.bathrooms} Bathrooms</span>
      </div>
      <div class="feature">
        <i class="fas fa-vector-square"></i>
        <span>${property.area} Sq Ft</span>
      </div>
      <div class="feature">
        <i class="fas fa-home"></i>
        <span>${property.category}</span>
      </div>
    `;
  }

  // Update property description
  const descriptionElement = document.querySelector(".property-description");
  if (descriptionElement) {
    descriptionElement.textContent = property.description;
  }
}

/**
 * Displays property images in the carousel
 * @param {Array} images - Array of property image objects
 */
function displayPropertyImages(images) {
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselIndicators = document.querySelector(".carousel-indicators");

  if (carouselInner && images.length > 0) {
    carouselInner.innerHTML = "";

    if (carouselIndicators) {
      carouselIndicators.innerHTML = "";
    }

    images.forEach((image, index) => {
      // Create carousel item
      const carouselItem = document.createElement("div");
      carouselItem.className =
        index === 0 ? "carousel-item active" : "carousel-item";
      carouselItem.innerHTML = `
        <img src="${
          image.image_url
        }" class="d-block w-100" alt="Property Image ${index + 1}">
      `;
      carouselInner.appendChild(carouselItem);

      // Create carousel indicator
      if (carouselIndicators) {
        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", "#propertyCarousel");
        indicator.setAttribute("data-bs-slide-to", index.toString());

        if (index === 0) {
          indicator.className = "active";
          indicator.setAttribute("aria-current", "true");
        }

        indicator.setAttribute("aria-label", `Slide ${index + 1}`);
        carouselIndicators.appendChild(indicator);
      }
    });
  }
}

/**
 * Displays a default image when no property images are available
 */
function displayDefaultImage() {
  const carouselInner = document.querySelector(".carousel-inner");
  if (carouselInner) {
    carouselInner.innerHTML = "";

    const defaultImage = document.createElement("div");
    defaultImage.className = "carousel-item active";
    defaultImage.innerHTML = `<img src="../../assets/images/banner.jpg" 
                             class="d-block w-100" alt="Property Image">`;
    carouselInner.appendChild(defaultImage);

    // Clear carousel indicators if present
    const carouselIndicators = document.querySelector(".carousel-indicators");
    if (carouselIndicators) {
      carouselIndicators.innerHTML = "";
    }
  }
}

/**
 * Displays seller/agent information directly from the property details response
 * @param {Object} userDetails - The user/seller details object
 */
function displaySellerInformation(userDetails) {
  const sellerProfile = document.querySelector(".seller-profile");
  if (sellerProfile) {
    sellerProfile.innerHTML = `
      <div class="agent-image">
        <img src="../../assets/images/agent.jpg" alt="Agent Photo">
      </div>
      <div class="agent-info">
        <h4>${userDetails.name || userDetails.username || "Agent Name"}</h4>
        <p><i class="fas fa-phone"></i> ${userDetails.phone || "N/A"}</p>
        <p><i class="fas fa-envelope"></i> ${userDetails.email || "N/A"}</p>
      </div>
    `;
  }
}

/**
 * Displays error message in the UI
 * @param {string} message - The error message to display
 */
function displayError(message) {
  const container = document.querySelector(".property-details-container");
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <div class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-circle"></i> ${message}
        </div>
        <a href="../index.html" class="btn btn-primary">
          <i class="fas fa-arrow-left"></i> Back to Home
        </a>
      </div>
    `;
  }
}
