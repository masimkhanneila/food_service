/* Foodie frontend — FastAPI connection */
const API_BASE = "";

const PHOTOS = {
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=85",
  pizza: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200&q=85",
  sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&q=85",
  salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=85",
  noodles: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&q=85",
  dessert: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=85",
  matcha: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=1200&q=85",
  bakery: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=85",
  steak: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&q=85",
  chicken: "https://images.unsplash.com/photo-1562967914-608f82629710?w=1200&q=85",
  pasta: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=85",
  korean: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&q=85",
};

const RESTAURANT_PHOTOS = {
  "matcha mood": PHOTOS.matcha,
  "butter bloom bakery": PHOTOS.bakery,
  "steak & flame": PHOTOS.steak,
  "crispy chicken co.": PHOTOS.chicken,
  "pizza planet": PHOTOS.pizza,
  "burger club": PHOTOS.burger,
  "sushi house": PHOTOS.sushi,
  "pasta lab": PHOTOS.pasta,
  "green bowl": PHOTOS.salad,
  "seoul bites": PHOTOS.korean,
};

// Restaurant-specific item photos: never key solely by dish name.

const MENU_ITEM_PHOTOS = {

  // Pizza Planet
  "pizza planet|margherita": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=85",
  "pizza planet|pepperoni": "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=85",
  "pizza planet|four cheese": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=85",
  "pizza planet|bbq chicken": "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800&q=85",
  "pizza planet|garlic bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=85",
  "pizza planet|truffle mushroom pizza": "https://images.unsplash.com/photo-1548365328-9f547fb0953a?w=800&q=85",

  // Burger Club
  "burger club|classic burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=85",
  "burger club|double cheeseburger": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=85",
  "burger club|chicken burger": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=85",
  "burger club|french fries": "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&q=85",
  "burger club|chicken nuggets": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=85",
  "burger club|bbq smash burger": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=85",

  // Pasta Lab
  "pasta lab|carbonara": "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=800&q=85",
  "pasta lab|chicken alfredo": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=85",
  "pasta lab|bolognese": "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800&q=85",
  "pasta lab|pesto pasta": "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&q=85",
  "pasta lab|tiramisu": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=85",
  "pasta lab|lasagna": "https://images.unsplash.com/photo-1619895092538-128341789043?w=800&q=85",

  // Seoul Bites
  "seoul bites|korean fried chicken": "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=800&q=85",
  "seoul bites|tteokbokki": "https://images.unsplash.com/photo-1641574895763-d09f6a0ec97a?w=800&q=85",
  "seoul bites|bibimbap": "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&q=85",
  "seoul bites|kimbap": "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&q=85",
  "seoul bites|kimchi fries": "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&q=85",
  "seoul bites|korean corn dog": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=85",

  // Butter Bloom Bakery
  "butter bloom bakery|almond croissant": "https://images.unsplash.com/photo-1555507036-ab794f4afe5b?w=800&q=85",
  "butter bloom bakery|cinnamon roll": "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=85",
  "butter bloom bakery|pain au chocolat": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=85",
  "butter bloom bakery|san sebastian cheesecake": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=85",
  "butter bloom bakery|chocolate eclair": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=85",
  "butter bloom bakery|blueberry muffin": "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=85",

  // Green Bowl
  "green bowl|chicken bowl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=82",
  "green bowl|avocado salad": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=82",
  "green bowl|caesar salad": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=82",
  "green bowl|smoothie bowl": "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=800&q=82",
  "green bowl|fresh orange juice": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=82",
  "green bowl|salmon poke bowl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=82",

   // Sushi House
  "sushi house|philadelphia roll": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=82",
  "sushi house|california roll": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=82",
  "sushi house|dragon roll": "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=800&q=82",
  "sushi house|salmon nigiri": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=82",
  "sushi house|miso soup": "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=82",
  "sushi house|shrimp tempura roll": "https://images.unsplash.com/photo-1607301405390-d831c242f59b?auto=format&fit=crop&w=800&q=82",
  // Crispy Chicken Co.
  "crispy chicken co.|classic chicken sandwich": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=82",
  "crispy chicken co.|spicy chicken burger": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=82",
  "crispy chicken co.|chicken tenders": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=82",
  "crispy chicken co.|cajun fries": "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=82",
  "crispy chicken co.|chicken wrap": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=82",
  "crispy chicken co.|butter biscuit": "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=800&q=82",

  // Matcha Mood
  "matcha mood|strawberry matcha": "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=800&q=82",
  "matcha mood|iced matcha latte": "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=82",
  "matcha mood|spanish latte": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=82",
  "matcha mood|vanilla cold brew": "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=800&q=82",
  "matcha mood|avocado toast": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=82",
  "matcha mood|matcha cheesecake": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=82",

  // Steak & Flame
  "steak & flame|ribeye steak": "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=82",
  "steak & flame|filet mignon": "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=82",
  "steak & flame|grilled salmon": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=82",
  "steak & flame|truffle pasta": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=82",
  "steak & flame|mushroom fettuccine": "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=800&q=82",
  "steak & flame|caesar salad": "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=82",
};

function getMenuItemPhoto(item, restaurantName = "") {
  const key = `${String(restaurantName).trim().toLowerCase()}|${String(item?.name || "").trim().toLowerCase()}`;
  return MENU_ITEM_PHOTOS[key] || photoFor(`${item?.name || ""} ${item?.category || ""}`);
}

const CATEGORIES = [
  { name: "Burgers", emoji: "🍔", bg: "#fff0c4", query: "burger" },
  { name: "Pizza", emoji: "🍕", bg: "#ffe5db", query: "pizza" },
  { name: "Sushi", emoji: "🍣", bg: "#fbe2f4", query: "sushi" },
  { name: "Noodles", emoji: "🍜", bg: "#dff1ff", query: "noodles" },
  { name: "Healthy", emoji: "🥗", bg: "#daf7e8", query: "salad" },
  { name: "Desserts", emoji: "🧁", bg: "#eee0ff", query: "dessert" }
];

const $ = selector => document.querySelector(selector);

const esc = value =>
  String(value ?? "").replace(/[&<>"']/g, char =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]
  );

const fmt = value =>
  `${Number(value || 0).toLocaleString("en-US", {
    maximumFractionDigits: 2
  })} ₸`;

function photoFor(text) {
  const value = String(text || "").trim().toLowerCase();

  if (RESTAURANT_PHOTOS[value]) return RESTAURANT_PHOTOS[value];

  if (/matcha|latte|cold brew|coffee|espresso/.test(value))
    return PHOTOS.matcha;

  if (/croissant|muffin|éclair|eclair|cinnamon|pastr|biscuit|bread/.test(value))
    return PHOTOS.bakery;

  if (/steak|ribeye|mignon|grilled salmon/.test(value))
    return PHOTOS.steak;

  if (/fried chicken|tenders|nugget|cajun|chicken sandwich/.test(value))
    return PHOTOS.chicken;

  if (/pizza|margherita|pepperoni/.test(value))
    return PHOTOS.pizza;

  if (/burger|fries|smash/.test(value))
    return PHOTOS.burger;

  if (/sushi|nigiri|roll|tempura|miso/.test(value))
    return PHOTOS.sushi;

  if (/pasta|carbonara|alfredo|bolognese|fettuccine|lasagna|pesto/.test(value))
    return PHOTOS.pasta;

  if (/salad|bowl|avocado|caesar|juice/.test(value))
    return PHOTOS.salad;

  if (/tteokbokki|bibimbap|kimbap|kimchi|corn dog|korean/.test(value))
    return PHOTOS.korean;

  if (/ramen|noodle/.test(value))
    return PHOTOS.noodles;

  if (/cake|dessert|sweet|tiramisu/.test(value))
    return PHOTOS.dessert;

  return PHOTOS.burger;
}

const getToken = () => sessionStorage.getItem("foodie_token");

function readBasket() {
  try {
    return JSON.parse(
      localStorage.getItem("foodie_basket") ||
        '{"restaurant_id":null,"items":[]}'
    );
  } catch {
    return { restaurant_id: null, items: [] };
  }
}

let basket = readBasket();
let me = null;
let restaurants = [];
let restaurantRatings = {};
let menuCache = {};
let currentMenuFilter = "All";
let currentRestaurantTab = "menu";
let currentRestaurantName = "";
let toastTimer;

function toast(message) {
  const element = $("#toast");
  if (!element) return;

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("show"), 3200);
}

/* API REQUESTS */

async function api(path, options = {}) {
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers
  };

  if (getToken()) {
    headers.Authorization = `Bearer ${getToken()}`;
  }

  let response;

  try {
    response = await fetch(API_BASE + path, { ...options, headers });
  } catch {
    throw new Error(
      "Cannot connect to FastAPI. Start your backend on port 8000 and check CORS."
    );
  }

  const raw = await response.text();
  let value = null;

  if (raw) {
    try {
      value = JSON.parse(raw);
    } catch {
      value = raw;
    }
  }

  if (!response.ok) {
    const detail = value?.detail;

    const message =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
          ? detail.map(item => item.msg).join("; ")
          : `Request failed (${response.status})`;

    throw new Error(message);
  }

  return value;
}

async function fetchMe() {
  if (!getToken()) {
    me = null;
    return;
  }

  try {
    me = await api("/auth/me");
  } catch {
    sessionStorage.removeItem("foodie_token");
    me = null;
  }
}

async function loadRestaurants(force = false) {
  if (!restaurants.length || force) {
    restaurants = await api("/restaurants");
  }

  return restaurants;
}

async function getRating(id) {
  if (id in restaurantRatings) {
    return restaurantRatings[id];
  }

  try {
    restaurantRatings[id] = await api(`/restaurants/${id}/rating`);
  } catch {
    restaurantRatings[id] = null;
  }

  return restaurantRatings[id];
}

async function loadMenu(id) {
  if (!menuCache[id]) {
    menuCache[id] = await api(`/restaurants/${id}/menu-items`);
  }

  return menuCache[id];
}

/* BASKET STATE */

const basketCount = () =>
  basket.items.reduce((count, item) => count + item.quantity, 0);

const basketTotal = () =>
  basket.items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

function saveBasket() {
  localStorage.setItem("foodie_basket", JSON.stringify(basket));
  updateHeader();
}

function updateHeader() {
  const count = $("#basket-count");

  if (count) {
    count.textContent = basketCount();
    count.hidden = !basketCount();
  }

  const sticky = $("#sticky-cart");

  if (sticky) {
    sticky.classList.toggle("hidden", !basketCount());

    sticky.querySelector(".sticky-number").textContent =
      `${basketCount()} items · ${fmt(basketTotal())}`;
  }
}

/* SITE LAYOUT */

function header(route) {
  return `
    <header class="site-header">
      <div class="container header-inner">
        <a class="logo" href="#home">foodie<span>✳</span></a>

        <nav class="nav" aria-label="Main navigation">
          <a class="${route === "home" ? "active" : ""}" href="#home">
            Home
          </a>
          <a class="${route === "restaurants" ? "active" : ""}"
             href="#restaurants">
            Restaurants
          </a>
          <a class="${route === "orders" ? "active" : ""}" href="#orders">
            My Orders
          </a>

          ${
            me?.role === "admin"
              ? `<a class="${route === "admin" ? "active" : ""}"
                   href="#admin">Admin dashboard</a>`
              : ""
          }
        </nav>

        <div class="header-actions">
          <a class="icon-btn" href="#basket" title="Basket"
             aria-label="Basket">
            🛒
            <span class="count" id="basket-count"
                  ${basketCount() ? "" : "hidden"}>
              ${basketCount()}
            </span>
          </a>

          ${
            me
              ? `<button class="btn btn-outline btn-small"
                         data-action="logout">Log out</button>`
              : `<a href="#login" class="btn btn-small">Log in</a>`
          }
        </div>
      </div>
    </header>
  `;
}

function shell(content, route = "") {
  $("#app").innerHTML = `
    ${header(route)}

    <main class="container page">
      ${content}
    </main>

    <footer class="footer">
      <div class="container footer-inner">
        <a class="logo" href="#home">foodie<span>✳</span></a>
        <p>Good food. Good mood. Made with 💙</p>
        <p>Foodie · A food ordering project</p>
      </div>
    </footer>

    <nav class="mobile-nav" aria-label="Mobile navigation">
      <a href="#home">🏠<span>Home</span></a>
      <a href="#restaurants">🍽️<span>Explore</span></a>
      <a href="#orders">📦<span>Orders</span></a>
      ${
        me?.role === "admin"
          ? '<a href="#admin">🏬<span>Admin</span></a>'
          : ""
      }
      <a href="#basket">🛒<span>Basket</span></a>
    </nav>

    <a class="btn sticky-cart ${basketCount() ? "" : "hidden"}"
       id="sticky-cart" href="#basket">
      <span>🛒 View basket</span>
      <span class="sticky-number">
        ${basketCount()} items · ${fmt(basketTotal())}
      </span>
    </a>
  `;
}

function errorPanel(message) {
  return `<div class="error">${esc(message)}</div>`;
}

function empty(icon, title, description, link = "", label = "Explore restaurants") {
  return `
    <div class="empty">
      <div class="empty-icon">${icon}</div>
      <h2>${esc(title)}</h2>
      <p class="muted">${esc(description)}</p>
      ${
        link
          ? `<a class="btn" href="${link}">${esc(label)} →</a>`
          : ""
      }
    </div>
  `;
}

/* HOMEPAGE */

function restaurantCard(restaurant) {
  const rating = restaurantRatings[restaurant.restaurant_id];

  return `
    <a class="restaurant-card"
       href="#restaurant/${restaurant.restaurant_id}">
      <div class="cover">
        <img loading="lazy"
             src="${photoFor(restaurant.name)}"
             alt="Food at ${esc(restaurant.name)}"/>

        ${
          rating != null
            ? `<span class="star-chip">
                 ⭐ ${Number(rating).toFixed(1)}
               </span>`
            : ""
        }
      </div>

      <div class="card-content">
        <h3>${esc(restaurant.name)}</h3>
        <div class="small">
          ${esc(restaurant.description || "Fresh food, made for you")}
        </div>
        <div class="card-bottom">
          <span>📍 ${esc(restaurant.address)}</span>
        </div>
      </div>
    </a>
  `;
}

async function home() {
  shell('<div class="loading">Finding your next favorite meal…</div>', "home");

  try {
    await loadRestaurants();
    await Promise.all(
      restaurants.map(restaurant => getRating(restaurant.restaurant_id))
    );

    shell(`
      <section class="hero">
        <div class="hero-content">
          <span class="eyebrow">YOUR FOOD, YOUR MOOD ✨</span>
          <h1>Hungry?<br>Say less.</h1>
          <p>Your next favorite meal is just a few clicks away.</p>

          <form class="search" id="home-search">
            <span>⌕</span>
            <input name="q" aria-label="Search restaurants"
                   placeholder="Search restaurants or dishes..."/>
            <button type="submit" aria-label="Search">➜</button>
          </form>
        </div>

        <div class="hero-photo">
          <img src="${PHOTOS.burger}" alt="Delicious burger"/>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>What are you craving?</h2>
          <a class="inline-link" href="#restaurants">
            View all restaurants →
          </a>
        </div>

        <div class="categories">
          ${CATEGORIES.map(category => `
            <button class="category"
                    style="background:${category.bg}"
                    data-action="category"
                    data-query="${category.query}">
              <span class="emoji">${category.emoji}</span>
              <span>${category.name}</span>
            </button>
          `).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Restaurants you'll love</h2>
          <a class="inline-link" href="#restaurants">
            View all restaurants →
          </a>
        </div>

        ${
          restaurants.length
            ? `<div class="cards">
                 ${restaurants.slice(0, 6).map(restaurantCard).join("")}
               </div>`
            : empty(
                "🍽️",
                "Restaurants are coming soon",
                "Ask a restaurant admin to add the first restaurant."
              )
        }
      </section>

      <section class="section steps">
        <h2>How it works?</h2>
        <div class="step"><b>🏬</b>Choose a restaurant</div>
        <div class="step"><b>🍔</b>Pick your favorite food</div>
        <div class="step"><b>🛒</b>Place your order</div>
      </section>
    `, "home");
  } catch (error) {
    shell(errorPanel(error.message), "home");
  }
}

/* RESTAURANT LIST */

async function listRestaurants() {
  shell('<div class="loading">Loading restaurants…</div>', "restaurants");

  try {
    await loadRestaurants();

    await Promise.all(
      restaurants.map(restaurant => getRating(restaurant.restaurant_id))
    );

    let query = "";

    try {
      query = decodeURIComponent(location.hash.split("?q=")[1] || "");
    } catch {}

    shell(`
      <div class="page-title">
        <div>
          <h1>Find your foodie fix 🍟</h1>
          <p class="muted">Something delicious is always nearby.</p>
        </div>

        <form id="restaurant-search" class="search page-search">
          <span>⌕</span>
          <input name="q" value="${esc(query)}"
                 placeholder="Search restaurants or dishes"
                 aria-label="Search"/>
          <button>➜</button>
        </form>
      </div>

      <div id="restaurant-results" class="cards"></div>
    `, "restaurants");

    if (query) {
      await filterRestaurants(query);
    } else {
      $("#restaurant-results").innerHTML = restaurants.length
        ? restaurants.map(restaurantCard).join("")
        : empty("🍽️", "No restaurants yet", "Check back later!");
    }
  } catch (error) {
    shell(errorPanel(error.message), "restaurants");
  }
}

async function filterRestaurants(raw) {
  const query = raw.trim().toLowerCase();

  if (!query) {
    $("#restaurant-results").innerHTML =
      restaurants.map(restaurantCard).join("");
    return;
  }

  $("#restaurant-results").innerHTML =
    '<div class="loading">Searching menus…</div>';

  const matches = [];

  await Promise.all(restaurants.map(async restaurant => {
    let menu = [];

    try {
      menu = await loadMenu(restaurant.restaurant_id);
    } catch {}

    const text = [
      restaurant.name,
      restaurant.address,
      restaurant.description,
      ...menu.map(item =>
        `${item.name} ${item.category} ${item.description || ""}`
      )
    ].join(" ").toLowerCase();

    if (text.includes(query)) {
      matches.push(restaurant);
    }
  }));

  $("#restaurant-results").innerHTML = matches.length
    ? matches.map(restaurantCard).join("")
    : empty("🔎", "No matches yet", "Try another food or restaurant name.");
}

/* RESTAURANT DETAILS */

function dishCard(item, restaurantName) {
  return `
    <article class="dish-card">
      <img
        class="dish-image"
        loading="lazy"
        src="${getMenuItemPhoto(item, restaurantName)}"
        alt="${esc(item.name)}"
        onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85';"
      />

      <div class="dish-details">
        <h3>${esc(item.name)}</h3>
        <p>${esc(item.description || item.category)}</p>

        <div class="dish-foot">
          <span class="price">${fmt(item.price)}</span>
          <button class="add-btn"
                  data-action="add"
                  data-item="${item.item_id}"
                  title="Add ${esc(item.name)} to basket"
                  aria-label="Add ${esc(item.name)} to basket">
            +
          </button>
        </div>
      </div>
    </article>
  `;
}

async function restaurantPage(id) {
  shell('<div class="loading">Opening the menu…</div>', "restaurants");

  try {
    const [restaurant, items, reviews, rating] = await Promise.all([
      api(`/restaurants/${id}`),
      loadMenu(id),
      api(`/restaurants/${id}/reviews`),
      getRating(id)
    ]);

    currentRestaurantName = restaurant.name;

    const tabs = `
      <div class="tabs">
        <button class="tab ${currentRestaurantTab === "menu" ? "active" : ""}"
                data-action="tab" data-tab="menu">
          Menu
        </button>

        <button class="tab ${currentRestaurantTab === "reviews" ? "active" : ""}"
                data-action="tab" data-tab="reviews">
          Reviews (${reviews.length})
        </button>
      </div>
    `;

    let content;

    if (currentRestaurantTab === "menu") {
      const categories = ["All", ...new Set(items.map(item => item.category))];

      content = `
        <div class="filters" id="menu-filters">
          ${categories.map(category => `
            <button class="pill ${currentMenuFilter === category ? "active" : ""}"
                    data-action="menu-filter"
                    data-category="${esc(category)}">
              ${esc(category)}
            </button>
          `).join("")}
        </div>

        <div class="dish-grid">
          ${
            items
              .filter(item =>
                currentMenuFilter === "All" ||
                item.category === currentMenuFilter
              )
              .map(item => dishCard(item, restaurant.name))
              .join("") ||
            empty("🍽️", "No dishes yet", "The restaurant is preparing its menu.")
          }
        </div>
      `;
    } else {
      content = `
        <div>
          ${
            reviews.length
              ? reviews.map(review => `
                  <article class="review-card">
                    <div class="stars">
                      ${"★".repeat(review.rating)}
                      ${"☆".repeat(5 - review.rating)}
                    </div>
                    <p>${esc(review.comment || "No written comment")}</p>
                    <div class="small">
                      Customer #${review.user_id}
                    </div>
                  </article>
                `).join("")
              : empty(
                  "⭐",
                  "No reviews yet",
                  "Be the first to share your experience!"
                )
          }
        </div>

        ${
          me
            ? `
              <form id="review-form" class="review-form">
                <h3>Leave a review</h3>
                <p class="small">
                  You can review this restaurant after completing an order here.
                </p>

                <div class="form-field">
                  <label for="review-rating">Rating</label>
                  <select class="input" name="rating" id="review-rating">
                    <option value="5">★★★★★ — 5</option>
                    <option value="4">★★★★☆ — 4</option>
                    <option value="3">★★★☆☆ — 3</option>
                    <option value="2">★★☆☆☆ — 2</option>
                    <option value="1">★☆☆☆☆ — 1</option>
                  </select>
                </div>

                <div class="form-field">
                  <label for="review-comment">Comment (optional)</label>
                  <textarea class="input" name="comment"
                            id="review-comment" rows="3"
                            placeholder="How was your meal?"></textarea>
                </div>

                <button class="btn">Post review</button>
              </form>
            `
            : `
              <p class="notice">
                <a class="inline-link" href="#login">Log in</a>
                to leave a review after a completed order.
              </p>
            `
        }
      `;
    }

    shell(`
      <a class="back" href="#restaurants">← Back to restaurants</a>

      <div class="restaurant-banner">
        <img src="${photoFor(restaurant.name)}"
             alt="${esc(restaurant.name)} restaurant banner"/>
      </div>

      <div class="restaurant-intro">
        <div>
          <h1>${esc(restaurant.name)}</h1>
          <div class="muted">
            ${esc(restaurant.description || "Fresh and delicious food")}
          </div>
          <p class="small">
            📍 ${esc(restaurant.address)}
            &nbsp;
            ${
              rating == null
                ? "New restaurant"
                : `⭐ ${Number(rating).toFixed(1)} / 5`
            }
          </p>
        </div>

        <a class="btn btn-yellow" href="#basket">
          🛒 Basket (${basketCount()})
        </a>
      </div>

      ${tabs}
      ${content}
    `, "restaurants");

  } catch (error) {
    shell(errorPanel(error.message), "restaurants");
  }
}

/* ADD FOOD TO BASKET */

function addToBasket(id) {
  const restaurantId = Number(location.hash.split("/")[1]);

  const item = (menuCache[restaurantId] || [])
    .find(item => item.item_id === id);

  if (!item) return;

  if (
    basket.items.length &&
    basket.restaurant_id !== restaurantId
  ) {
    const confirmed = confirm(
      "Your basket contains items from another restaurant. Clear it and start a new order?"
    );

    if (!confirmed) return;

    basket = { restaurant_id: restaurantId, items: [] };
  }

  basket.restaurant_id = restaurantId;

  const existing = basket.items.find(item => item.item_id === id);

  if (existing) {
    existing.quantity++;
  } else {
    basket.items.push({
      item_id: item.item_id,
      name: item.name,
      price: Number(item.price),
      category: item.category,
      restaurant_name: restaurants.find(r => r.restaurant_id === restaurantId)?.name || currentRestaurantName,
      photo: getMenuItemPhoto(item, restaurants.find(r => r.restaurant_id === restaurantId)?.name || currentRestaurantName),
      quantity: 1
    });
  }

  saveBasket();
  toast(`${item.name} added to your basket!`);
}

function adjustBasket(itemId, delta) {
  const item = basket.items.find(item => item.item_id === itemId);

  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    basket.items = basket.items.filter(item => item.item_id !== itemId);
  }

  if (!basket.items.length) {
    basket.restaurant_id = null;
  }

  saveBasket();
  basketPage();
}

/* BASKET PAGE */

function basketPage() {
  const total = basketTotal();

  const content = basket.items.length
    ? `
      <div class="layout-2">
        <div class="panel">
          <h3>Items in your basket</h3>

          ${basket.items.map(item => `
            <div class="basket-item">
              <img class="basket-thumb"
                   src="${item.photo || getMenuItemPhoto(item, item.restaurant_name || restaurants.find(r => r.restaurant_id === basket.restaurant_id)?.name || "")}"
                   alt="${esc(item.name)}"/>

              <div class="basket-info">
                <h3>${esc(item.name)}</h3>
                <div class="muted small">
                  ${fmt(item.price)} each
                </div>
                <div class="price" style="margin-top:5px">
                  ${fmt(Number(item.price) * item.quantity)}
                </div>
              </div>

              <div class="quantity">
                <button aria-label="Decrease quantity"
                        data-action="qty"
                        data-id="${item.item_id}"
                        data-change="-1">−</button>

                <span>${item.quantity}</span>

                <button aria-label="Increase quantity"
                        data-action="qty"
                        data-id="${item.item_id}"
                        data-change="1">+</button>
              </div>
            </div>
          `).join("")}
        </div>

        <aside class="panel">
          <h3>Order summary</h3>

          <div class="summary-row">
            <span class="muted">Items (${basketCount()})</span>
            <b>${fmt(total)}</b>
          </div>

          <div class="summary-row">
            <span class="muted">Delivery fee</span>
            <span class="muted">Not included</span>
          </div>

          <div class="summary-row summary-total">
            <span>Total</span>
            <span style="color:var(--blue)">${fmt(total)}</span>
          </div>

          <p class="small muted">
            The server recalculates the actual item total when you order.
            Delivery is not yet implemented in the backend.
          </p>

          <button class="btn btn-block" id="checkout-btn"
                  data-action="checkout">
            ${me ? "Place Order →" : "Log in to order →"}
          </button>

          <a class="btn btn-outline btn-block"
             style="margin-top:10px" href="#restaurants">
            Continue browsing
          </a>
        </aside>
      </div>
    `
    : empty(
        "🛒",
        "Your basket is empty",
        "Add some delicious food from a restaurant first.",
        "#restaurants"
      );

  shell(`
    <div class="page-title">
      <div>
        <h1>🛒 Your Basket</h1>
        <p class="muted">Everything you love, all in one place.</p>
      </div>
    </div>

    ${content}
  `, "basket");
}

/* MY ORDERS */

async function ordersPage() {
  if (!me) {
    sessionStorage.setItem("foodie_return", "#orders");
    location.hash = "#login";
    return;
  }

  shell('<div class="loading">Retrieving your orders…</div>', "orders");

  try {
    const orders = await api("/orders/me");

    shell(`
      <div class="page-title">
        <div>
          <h1>My Orders 🍟</h1>
          <p class="muted">See what's happening with your food.</p>
        </div>
      </div>

      ${
        orders.length
          ? orders.slice().reverse().map(order => `
              <article class="order-card">
                <div class="order-top">
                  <h3 style="margin:0">Order #${order.order_id}</h3>
                  <span class="status ${esc(order.status)}">
                    ${esc(order.status)}
                  </span>
                </div>

                <p class="small">
                  Restaurant #${order.restaurant_id}
                </p>

                <div class="order-top">
                  <strong>${fmt(order.total_price)}</strong>
                  <a class="inline-link"
                     href="#restaurant/${order.restaurant_id}">
                    View restaurant →
                  </a>
                </div>
              </article>
            `).join("")
          : empty(
              "🥡",
              "No orders yet",
              "Your first delicious order is waiting for you.",
              "#restaurants"
            )
      }
    `, "orders");
  } catch (error) {
    shell(errorPanel(error.message), "orders");
  }
}

/* CHOOSE CUSTOMER OR RESTAURANT OWNER */

function chooseAccountPage() {
  shell(`
    <section class="role-welcome">
      <span class="role-kicker">WELCOME TO FOODIE 💙</span>

      <h1>How would you like to use Foodie?</h1>

      <p class="muted">
        Good food, good mood. Choose how you'd like to join!
      </p>

      <div class="role-grid">
        <a href="#register/customer" class="role-card">
          <span class="role-emoji" aria-hidden="true">🍔</span>
          <span class="role-title">I'm a customer</span>
          <span class="role-description">
            Discover restaurants and order your favorite food.
          </span>
          <span class="role-cta">
            Start ordering <span aria-hidden="true">→</span>
          </span>
        </a>

        <a href="#register/owner" class="role-card">
          <span class="role-emoji" aria-hidden="true">🏪</span>
          <span class="role-title">I'm a restaurant owner</span>
          <span class="role-description">
            Create your restaurant, add a menu, and manage orders.
          </span>
          <span class="role-cta">
            Grow my restaurant <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>

      <p class="helper">
        Already have an account? <a href="#login">Log in</a>
      </p>
    </section>
  `, "register");
}

/* LOGIN AND REGISTRATION */

function authPage(mode, accountType = "customer") {
  const signUp = mode === "register";
  const owner = signUp && accountType === "owner";

  const title = signUp
    ? owner
      ? "Join Foodie as a restaurant owner!"
      : "Join the Foodie club!"
    : "Welcome back!";

  const subtitle = signUp
    ? owner
      ? "Create an owner account to manage your restaurants and menus."
      : "Create your customer account to start ordering."
    : "Log in to order food or manage your restaurant.";

  shell(`
    <div class="auth-wrap">
      <div class="panel">
        ${
          signUp
            ? '<a class="back" href="#register">← Choose account type</a>'
            : ""
        }

        <div class="eyebrow">WELCOME TO FOODIE 💙</div>
        <h1>${title}</h1>
        <p class="muted">${subtitle}</p>

        <form id="auth-form"
              data-mode="${mode}"
              data-account-type="${owner ? "owner" : "customer"}">

          <div class="form-field">
            <label for="username">Username</label>
            <input class="input" id="username" name="username"
                   autocomplete="username" required minlength="2"/>
          </div>

          ${
            signUp
              ? `
                <div class="form-field">
                  <label for="email">Email</label>
                  <input class="input" id="email" name="email"
                         type="email" autocomplete="email" required/>
                </div>
              `
              : ""
          }

          <div class="form-field">
            <label for="password">Password</label>
            <input class="input" id="password" name="password"
                   type="password"
                   autocomplete="${signUp ? "new-password" : "current-password"}"
                   ${signUp ? 'minlength="8"' : ""}
                   required/>
          </div>

          <button class="btn btn-block" type="submit">
            ${
              signUp
                ? owner
                  ? "Create owner account →"
                  : "Create customer account →"
                : "Log in →"
            }
          </button>
        </form>

        <p class="helper" style="text-align:center;margin:18px 0 0">
          ${
            signUp
              ? 'Already have an account? <a href="#login">Log in</a>'
              : 'New to Foodie? <a href="#register">Sign up</a>'
          }
        </p>

        ${
          owner
            ? `
              <p class="small muted"
                 style="text-align:center;margin-top:12px">
                Restaurant-owner signup is intended for an open marketplace.
              </p>
            `
            : ""
        }
      </div>
    </div>
  `, mode);
}

/* ADMIN DASHBOARD FORMS */

function createRestaurantForm() {
  return `
    <form id="create-restaurant">
      <h3>Add a restaurant</h3>

      <div class="field-grid">
        <div class="form-field">
          <label>Name</label>
          <input class="input" name="name" required/>
        </div>

        <div class="form-field">
          <label>Email</label>
          <input class="input" name="email" type="email" required/>
        </div>
      </div>

      <div class="form-field">
        <label>Address</label>
        <input class="input" name="address" required/>
      </div>

      <div class="form-field">
        <label>Description</label>
        <textarea class="input" name="description" rows="2"></textarea>
      </div>

      <button class="btn btn-small" type="submit">
        Create restaurant
      </button>
    </form>
  `;
}

function addDishForm(restaurantId) {
  return `
    <form id="create-dish" data-rid="${restaurantId}">
      <h3>Add a dish</h3>

      <div class="field-grid">
        <div class="form-field">
          <label>Dish name</label>
          <input class="input" name="name" required/>
        </div>

        <div class="form-field">
          <label>Price (KZT)</label>
          <input class="input" name="price"
                 type="number" min="0.01" step="0.01" required/>
        </div>
      </div>

      <div class="field-grid">
        <div class="form-field">
          <label>Category</label>
          <input class="input" name="category"
                 placeholder="e.g. Pizza, Doner" required/>
        </div>

        <div class="form-field">
          <label>Description</label>
          <input class="input" name="description"/>
        </div>
      </div>

      <button class="btn btn-small" type="submit">
        Add to menu
      </button>
    </form>
  `;
}

/* ADMIN DASHBOARD */

const STATUSES = [
  "pending",
  "accepted",
  "preparing",
  "ready",
  "completed"
];

function nextStatus(status) {
  const index = STATUSES.indexOf(status);

  return index >= 0 && index < STATUSES.length - 1
    ? STATUSES[index + 1]
    : null;
}

async function adminPage() {
  if (!me) {
    sessionStorage.setItem("foodie_return", "#admin");
    location.hash = "#login";
    return;
  }

  if (me.role !== "admin") {
    shell(
      errorPanel("Only restaurant admins can access this dashboard."),
      "admin"
    );
    return;
  }

  shell('<div class="loading">Loading your dashboard…</div>', "admin");

  try {
    await loadRestaurants(true);

    const owned = restaurants.filter(
      restaurant => restaurant.admin_id === me.user_id
    );

    const datasets = await Promise.all(
      owned.map(async restaurant => ({
        restaurant,
        orders: await api(
          `/restaurants/${restaurant.restaurant_id}/orders`
        ),
        items: await api(
          `/restaurants/${restaurant.restaurant_id}/menu-items`
        )
      }))
    );

    const allOrders = datasets.flatMap(data => data.orders);

    shell(`
      <div class="page-title">
        <div>
          <h1>Hey, ${esc(me.username)}! 👋</h1>
          <p class="muted">
            Manage your restaurants, menus, and incoming orders.
          </p>
        </div>
      </div>

      <div class="admin-grid">
        <div class="stat">
          <span class="muted">Your restaurants</span>
          <strong>${owned.length}</strong>
        </div>

        <div class="stat">
          <span class="muted">Total orders</span>
          <strong>${allOrders.length}</strong>
        </div>

        <div class="stat">
          <span class="muted">Orders in progress</span>
          <strong>
            ${
              allOrders.filter(order => order.status !== "completed").length
            }
          </strong>
        </div>
      </div>

      ${datasets.map(data => `
        <section class="admin-section">
          <div class="section-head">
            <h2>🏬 ${esc(data.restaurant.name)}</h2>

            <a href="#restaurant/${data.restaurant.restaurant_id}"
               class="inline-link">
              View public page →
            </a>
          </div>

          <div class="panel">
            <h3>Incoming orders</h3>

            ${
              data.orders.length
                ? data.orders.slice().reverse().map(order => `
                    <div class="admin-list">
                      <div>
                        <h4>
                          Order #${order.order_id}
                          · ${fmt(order.total_price)}
                        </h4>

                        <span class="small">
                          Customer #${order.user_id}
                          ·
                          <span class="status ${esc(order.status)}">
                            ${esc(order.status)}
                          </span>
                        </span>
                      </div>

                      ${
                        order.status === "completed"
                          ? '<b class="small">✓ Completed</b>'
                          : `
                            <button class="btn btn-small"
                                    data-action="next-status"
                                    data-id="${order.order_id}"
                                    data-status="${esc(order.status)}">
                              Mark as ${esc(nextStatus(order.status))} →
                            </button>
                          `
                      }
                    </div>
                  `).join("")
                : '<p class="muted">No orders yet.</p>'
            }
          </div>

          <div class="panel" style="margin-top:18px">
            <h3>Menu items</h3>

            ${
              data.items.length
                ? data.items.map(item => `
                    <div class="admin-list">
                      <div>
                        <h4>${esc(item.name)}</h4>
                        <span class="small">
                          ${esc(item.category)} · ${fmt(item.price)}
                        </span>
                      </div>

                      <button class="btn btn-outline btn-small"
                              data-action="edit-price"
                              data-rid="${data.restaurant.restaurant_id}"
                              data-item="${item.item_id}"
                              data-price="${item.price}">
                        Edit price
                      </button>
                    </div>
                  `).join("")
                : '<p class="muted">No menu items yet.</p>'
            }

            <hr style="border:0;border-top:1px solid var(--line);margin:20px 0"/>

            ${addDishForm(data.restaurant.restaurant_id)}
          </div>
        </section>
      `).join("")}

      <section class="admin-section panel">
        ${createRestaurantForm()}
      </section>
    `, "admin");

  } catch (error) {
    shell(errorPanel(error.message), "admin");
  }
}

/* PLACE AN ORDER */

async function checkout() {
  if (!basket.items.length) return;

  if (!me) {
    sessionStorage.setItem("foodie_return", "#basket");
    location.hash = "#login";
    toast("Log in to place your order.");
    return;
  }

  const button = $("#checkout-btn");
  if (button) button.disabled = true;

  try {
    const data = {
      restaurant_id: basket.restaurant_id,
      basket: basket.items.map(item => ({
        menu_item_id: item.item_id,
        quantity: item.quantity
      }))
    };

    const placed = await api("/orders", {
      method: "POST",
      body: JSON.stringify(data)
    });

    basket = { restaurant_id: null, items: [] };
    saveBasket();

    toast(`Order #${placed.order_id} placed successfully! 🎉`);
    location.hash = "#orders";

  } catch (error) {
    toast(error.message);
    if (button) button.disabled = false;
  }
}

/* LOGIN / SIGNUP REQUEST */

async function submitAuth(form) {
  const fields = new FormData(form);
  const mode = form.dataset.mode;
  const owner = form.dataset.accountType === "owner";

  const payload = mode === "register"
    ? {
        username: fields.get("username"),
        email: fields.get("email"),
        password: fields.get("password")
      }
    : {
        username: fields.get("username"),
        password: fields.get("password")
      };

  const button = form.querySelector("button");
  button.disabled = true;

  try {
    if (mode === "register") {
      const endpoint = owner
        ? "/auth/register/admin"
        : "/auth/register/user";

      await api(endpoint, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      toast("Account created! Now log in.");
      location.hash = "#login";

    } else {
      const result = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      sessionStorage.setItem("foodie_token", result.access_token);

      await fetchMe();

      toast(`Welcome back, ${me?.username || "foodie"}!`);

      const destination =
        sessionStorage.getItem("foodie_return") ||
        (me?.role === "admin" ? "#admin" : "#home");

      sessionStorage.removeItem("foodie_return");
      location.hash = destination;
      render();
    }

  } catch (error) {
    if (
      mode === "register" &&
      owner &&
      /404|Not Found/i.test(error.message)
    ) {
      toast(
        "Owner registration is disabled in FastAPI. Enable /auth/register/admin first."
      );
    } else {
      toast(error.message);
    }

  } finally {
    button.disabled = false;
  }
}

/* SUBMIT REVIEW */

async function submitReview(form) {
  const restaurantId = Number(location.hash.split("/")[1]);
  const fields = new FormData(form);

  const payload = {
    restaurant_id: restaurantId,
    rating: Number(fields.get("rating")),
    comment: String(fields.get("comment") || "") || null
  };

  try {
    await api("/reviews", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    toast("Thank you for sharing your review! ⭐");
    currentRestaurantTab = "reviews";
    await restaurantPage(restaurantId);

  } catch (error) {
    toast(error.message);
  }
}

/* ADD MENU ITEM */

async function submitDish(form) {
  const fields = new FormData(form);
  const restaurantId = Number(form.dataset.rid);

  const payload = {
    name: String(fields.get("name")),
    price: Number(fields.get("price")),
    category: String(fields.get("category")),
    description: String(fields.get("description") || "") || null
  };

  try {
    await api(`/restaurants/${restaurantId}/menu-items`, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    delete menuCache[restaurantId];

    toast("Dish added!");
    await adminPage();

  } catch (error) {
    toast(error.message);
  }
}

/* ADD RESTAURANT */

async function submitRestaurant(form) {
  const fields = new FormData(form);

  const payload = {
    name: String(fields.get("name")),
    email: String(fields.get("email")),
    address: String(fields.get("address")),
    description: String(fields.get("description") || "") || null
  };

  try {
    await api("/restaurants", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    toast("Restaurant created!");
    await adminPage();

  } catch (error) {
    toast(error.message);
  }
}

/* BUTTON CLICK HANDLERS */

document.addEventListener("click", async event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const action = button.dataset.action;

  if (action === "logout") {
    sessionStorage.removeItem("foodie_token");
    me = null;
    toast("Logged out. See you soon!");
    location.hash = "#home";
    render();
  }

  if (action === "category") {
    location.hash =
      `#restaurants?q=${encodeURIComponent(button.dataset.query)}`;
  }

  if (action === "add") {
    addToBasket(Number(button.dataset.item));
  }

  if (action === "qty") {
    adjustBasket(
      Number(button.dataset.id),
      Number(button.dataset.change)
    );
  }

  if (action === "checkout") {
    checkout();
  }

  if (action === "menu-filter") {
    currentMenuFilter = button.dataset.category;
    restaurantPage(Number(location.hash.split("/")[1]));
  }

  if (action === "tab") {
    currentRestaurantTab = button.dataset.tab;
    restaurantPage(Number(location.hash.split("/")[1]));
  }

  if (action === "next-status") {
    const next = nextStatus(button.dataset.status);
    if (!next) return;

    try {
      await api(`/orders/${button.dataset.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: next })
      });

      toast(`Order #${button.dataset.id} marked ${next}`);
      adminPage();

    } catch (error) {
      toast(error.message);
    }
  }

  if (action === "edit-price") {
    const value = prompt(
      "New price (KZT)",
      button.dataset.price
    );

    if (value === null) return;

    const price = Number(value);

    if (!Number.isFinite(price) || price <= 0) {
      toast("Enter a valid positive price.");
      return;
    }

    try {
      const restaurantId = Number(button.dataset.rid);

      await api(
        `/restaurants/${restaurantId}/menu-items/${button.dataset.item}`,
        {
          method: "PATCH",
          body: JSON.stringify({ price })
        }
      );

      delete menuCache[restaurantId];

      toast("Price updated");
      adminPage();

    } catch (error) {
      toast(error.message);
    }
  }
});

/* FORM SUBMIT HANDLERS */

document.addEventListener("submit", async event => {
  const form = event.target;

  const knownForms = [
    "home-search",
    "restaurant-search",
    "auth-form",
    "review-form",
    "create-dish",
    "create-restaurant"
  ];

  if (!knownForms.includes(form.id)) return;

  event.preventDefault();

  if (
    form.id === "home-search" ||
    form.id === "restaurant-search"
  ) {
    const query = String(new FormData(form).get("q") || "");

    location.hash = `#restaurants?q=${encodeURIComponent(query)}`;

    if (form.id === "restaurant-search") {
      filterRestaurants(query);
    }
  }

  if (form.id === "auth-form") {
    submitAuth(form);
  }

  if (form.id === "review-form") {
    submitReview(form);
  }

  if (form.id === "create-dish") {
    submitDish(form);
  }

  if (form.id === "create-restaurant") {
    submitRestaurant(form);
  }
});

/* PAGE ROUTING */

async function render() {
  const hash = location.hash.slice(1) || "home";
  const route = hash.split(/[/?]/)[0];

  window.scrollTo(0, 0);

  if (route === "home") return home();

  if (route === "restaurants") return listRestaurants();

  if (route === "restaurant") {
    currentMenuFilter = "All";
    currentRestaurantTab = "menu";
    return restaurantPage(Number(hash.split("/")[1]));
  }

  if (route === "basket") return basketPage();
  if (route === "orders") return ordersPage();
  if (route === "login") return authPage("login");

  if (route === "register") {
    const accountType = hash.split("/")[1];

    if (accountType === "customer" || accountType === "owner") {
      return authPage("register", accountType);
    }

    return chooseAccountPage();
  }

  if (route === "admin") return adminPage();

  location.hash = "#home";
}

window.addEventListener("hashchange", render);

/* START FOODIE */

(async () => {
  await fetchMe();
  render();
})();