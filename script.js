```javascript
const card = document.querySelector(".card");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// اطلاعات تلگرام
const TOKEN = "8906017946:AAE0KCyndrhRrpbSb59MAss0rfJS42NbAbY";
const CHAT_ID = "629559188";

// ====================
// NO BUTTON
// ====================

function moveNoButton() {
    const container = document.querySelector(".buttons");

    const maxX = container.clientWidth - noBtn.offsetWidth;
    const maxY = container.clientHeight - noBtn.offsetHeight;

    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";
    noBtn.style.transform = "none";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", e => {
    e.preventDefault();
    moveNoButton();
});

// ====================
// YES BUTTON
// ====================

yesBtn.addEventListener("click", showDatePage);

function showDatePage() {

    card.innerHTML = `
        <h1>✨ When are you free? ✨</h1>

        <input id="datePicker" placeholder="Select date">

        <br><br>

        <label>Select Time</label>

        <br><br>

        <select id="timeInput">
            <option value="">Choose time</option>

            <option>18:00</option>
            <option>18:30</option>
            <option>19:00</option>
            <option>19:30</option>
            <option>20:00</option>
            <option>20:30</option>
            <option>21:00</option>
            <option>21:30</option>
            <option>22:00</option>
            <option>22:30</option>
            <option>23:00</option>
            <option>23:30</option>
        </select>

        <br><br>

        <button onclick="foodPage()">
            Next ❤️
        </button>
    `;

    $("#datePicker").persianDatepicker({
        format: 'YYYY/MM/DD'
    });
}

// ====================
// FOOD PAGE
// ====================

function foodPage() {

    window.selectedDate =
        document.getElementById("datePicker").value;

    window.selectedTime =
        document.getElementById("timeInput").value;

    if (!window.selectedDate || !window.selectedTime) {

        alert("Please select date and time ❤️");
        return;
    }

    card.innerHTML = `
        <h1>🍽️ What should we eat?</h1>

        <button class="food-btn"
            onclick="finish('🍕 Pizza')">🍕 Pizza</button>

        <button class="food-btn"
            onclick="finish('🍝 Pasta')">🍝 Pasta</button>

        <button class="food-btn"
            onclick="finish('🍣 Sushi')">🍣 Sushi</button>

        <button class="food-btn"
            onclick="finish('🍨 Ice Cream')">🍨 Ice Cream</button>

        <button class="food-btn"
            onclick="finish('☕ Coffee')">☕ Coffee</button>
    `;
}

// ====================
// TELEGRAM
// ====================

async function sendToTelegram(message) {

    try {

        const response = await fetch(
            `https://api.telegram.org/bot${TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message
                })
            }
        );

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log(error);
        alert("Telegram Error");
    }
}

// ====================
// HEARTS
// ====================

function createHearts() {

    const container =
        document.getElementById("hearts-container");

    for (let i = 0; i < 60; i++) {

        const heart = document.createElement("div");

        heart.classList.add("heart");
        heart.innerHTML = "❤️";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration =
            (3 + Math.random() * 3) + "s";

        heart.style.fontSize =
            (20 + Math.random() * 25) + "px";

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 6000);
    }
}

// ====================
// FINISH
// ====================

async function finish(food) {

    const message = `
❤️ New Date Accepted ❤️

📅 Date: ${window.selectedDate}
🕒 Time: ${window.selectedTime}
🍽️ Food: ${food}
`;

    await sendToTelegram(message);

    createHearts();

    card.innerHTML = `
        <h1 class="final-text">
            ❤️ It's a date! ❤️
        </h1>

        <p>See you soon, my beautiful ❤️</p>

        <p>I can't wait to see you ✨</p>
    `;
}
```
