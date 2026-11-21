// ---------- Temple data ----------
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Additional temples
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/64de5983126b11eca393eeeeac1e50dfc2db6c7e/full/800%2C/0/default"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/17e2c70d687fffedfe115197e57fa8f5d1d369bb/full/800%2C/0/default"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 53997,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/df6b96801c9f11ec99eeeeeeac1ea2207e7c517b/full/800%2C/0/default"
  }
];

// ---------- DOM references ----------
const gallery = document.querySelector("#temples");
const galleryTitle = document.querySelector("#gallery-title");
const navLinks = document.querySelectorAll("nav a");
const menuButton = document.querySelector("#menu");
const nav = document.querySelector("nav");

// ---------- Helpers ----------
// "2005, August, 7" -> 2005
function getDedicatedYear(temple) {
  return parseInt(temple.dedicated.split(",")[0], 10);
}

// ---------- Create temple cards ----------
function createTempleCard(temple) {
  const card = document.createElement("figure");

  const img = document.createElement("img");
  img.setAttribute("src", temple.imageUrl);
  img.setAttribute("alt", `${temple.templeName} Temple`);
  img.setAttribute("loading", "lazy"); // native lazy loading
  img.setAttribute("width", "400");
  img.setAttribute("height", "250");

  const caption = document.createElement("figcaption");
  caption.innerHTML = `
    <strong>${temple.templeName}</strong><br>
    <span class="label">Location:</span> ${temple.location}<br>
    <span class="label">Dedicated:</span> ${temple.dedicated}<br>
    <span class="label">Size:</span> ${temple.area.toLocaleString("en-US")} sq ft
  `;

  card.appendChild(img);
  card.appendChild(caption);
  return card;
}

function displayTemples(list) {
  gallery.innerHTML = "";

  if (list.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No temples match this filter.";
    gallery.appendChild(message);
    return;
  }

  list.forEach((temple) => gallery.appendChild(createTempleCard(temple)));
}

// ---------- Filters ----------
const filters = {
  home: { title: "Home", fn: () => temples },
  old: { title: "Old", fn: () => temples.filter((t) => getDedicatedYear(t) < 1900) },
  new: { title: "New", fn: () => temples.filter((t) => getDedicatedYear(t) > 2000) },
  large: { title: "Large", fn: () => temples.filter((t) => t.area > 90000) },
  small: { title: "Small", fn: () => temples.filter((t) => t.area < 10000) }
};

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const filter = filters[link.id];

    galleryTitle.textContent = filter.title;
    displayTemples(filter.fn());

    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Close the mobile menu after choosing a filter
    closeMenu();
  });
});

// ---------- Mobile menu toggle ----------
function closeMenu() {
  nav.classList.remove("open");
  menuButton.textContent = "☰";
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.setAttribute("aria-expanded", "false");
menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  const isOpen = nav.classList.contains("open");
  menuButton.textContent = isOpen ? "✕" : "☰";
  menuButton.setAttribute("aria-expanded", isOpen);
});

// ---------- Footer: year and last modified ----------
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

// ---------- Initial load ----------
displayTemples(temples);