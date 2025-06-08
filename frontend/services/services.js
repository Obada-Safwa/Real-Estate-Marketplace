const images = [
  "assets/images/banner.jpg",
  "assets/images/banner.jpg",
  "assets/images/banner.jpg",
];

const carousel = document.getElementById("carouselExampleControls");
const carouselInner = carousel.querySelector(".carousel-inner");

for (let i = 0; i < images.length; i++) {
  const carouselItem = document.createElement("div");
  i == 0
    ? carouselItem.classList.add("carousel-item", "active")
    : carouselItem.classList.add("carousel-item");
  carouselItem.innerHTML = `<img src="${images[i]}" class="d-block w-100" alt="..." />`;
  carouselInner.appendChild(carouselItem);
}
