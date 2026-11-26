// Footer: current year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("modified").textContent = document.lastModified;

// Mobile menu
const menuBtn = document.getElementById("menu-btn");
const navList = document.getElementById("main-nav");
menuBtn.addEventListener("click", () => {
    const open = navList.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
});

// Product data
const products = [
    { id: "top1", name: "Blush Knit Top", category: "tops", price: 29.99, description: "Soft knit top with a relaxed fit." },
    { id: "top2", name: "Classic White Tee", category: "tops", price: 19.99, description: "Everyday cotton tee, easy to layer." },
    { id: "dress1", name: "Rose Midi Dress", category: "dresses", price: 54.99, description: "Flowy midi dress with a flattering waist." },
    { id: "dress2", name: "Lilac Wrap Dress", category: "dresses", price: 59.99, description: "Light wrap dress for warm days." },
    { id: "pants1", name: "Plum Wide-Leg Pants", category: "pants-skirts", price: 44.99, description: "High-waisted pants with a comfortable drape." },
    { id: "skirt1", name: "Lavender Pleated Skirt", category: "pants-skirts", price: 39.99, description: "Pleated skirt that moves with you." },
    { id: "jacket1", name: "Mauve Casual Jacket", category: "jackets", price: 69.99, description: "Lightweight jacket for cool evenings." },
    { id: "jacket2", name: "Soft Lilac Blazer", category: "jackets", price: 74.99, description: "Relaxed blazer for work or weekends." }
];

const productCard = p => `
    <article class="card">
        <img src="images/${p.id}.svg" alt="${p.name}" width="320" height="320" loading="lazy">
        <div>
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <p class="price">$${p.price.toFixed(2)}</p>
        </div>
    </article>`;

// Home page: featured products
const featured = document.getElementById("featured");
if (featured) {
    featured.innerHTML = products.slice(2, 5).map(productCard).join("");
}

// Catalog page: filter by category
const list = document.getElementById("products");
if (list) {
    const buttons = document.querySelectorAll(".filters button");
    const count = document.getElementById("count");

    function showProducts(category) {
        const shown = category === "all" ? products : products.filter(p => p.category === category);
        list.innerHTML = shown.map(productCard).join("");
        count.textContent = `Showing ${shown.length} item${shown.length === 1 ? "" : "s"}.`;
        buttons.forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === category));
    }

    buttons.forEach(b => b.addEventListener("click", () => showProducts(b.dataset.cat)));

    const hash = location.hash.slice(1);
    showProducts(products.some(p => p.category === hash) ? hash : "all");
}

// Contact page: validation and saved messages
const form = document.getElementById("contact-form");
if (form) {
    const fields = ["name", "email", "topic", "message"];
    const messages = {
        name: "Enter your full name.",
        email: "Enter a valid email, like name@example.com.",
        topic: "Select a topic.",
        message: "Write your message (at least 10 characters)."
    };

    function isValid(id) {
        const value = document.getElementById(id).value.trim();
        if (id === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (id === "message") return value.length >= 10;
        return value !== "";
    }

    function check(id) {
        const ok = isValid(id);
        document.getElementById(`${id}-error`).textContent = ok ? "" : messages[id];
        document.getElementById(id).setAttribute("aria-invalid", !ok);
        return ok;
    }

    fields.forEach(id => document.getElementById(id).addEventListener("blur", () => check(id)));

    form.addEventListener("submit", event => {
        event.preventDefault();
        const results = fields.map(check);
        const status = document.getElementById("form-status");
        if (results.includes(false)) {
            status.textContent = "Please fix the errors above.";
            document.getElementById(fields[results.indexOf(false)]).focus();
            return;
        }
        const total = Number(localStorage.getItem("messagesSent") || 0) + 1;
        localStorage.setItem("messagesSent", total);
        status.textContent = `Thank you, ${document.getElementById("name").value.trim()}! Your message was sent. Messages sent from this browser: ${total}.`;
        form.reset();
    });
}
