var card = document.querySelector(".card");
var yesBtn = document.getElementById("yesBtn");
var noBtn = document.getElementById("noBtn");

function moveNoButton() {
    var container = document.querySelector(".buttons");

    var maxX = container.clientWidth - noBtn.offsetWidth;
    var maxY = container.clientHeight - noBtn.offsetHeight;

    noBtn.style.left = (Math.random() * maxX) + "px";
    noBtn.style.top = (Math.random() * maxY) + "px";
    noBtn.style.transform = "none";
}

noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("touchstart", function(e){
    e.preventDefault();
    moveNoButton();
});

yesBtn.addEventListener("click", showDatePage);

function showDatePage(){

    card.innerHTML =
        '<h1>✨ When are you free? ✨</h1>' +
        '<input id="datePicker" placeholder="Select date">' +
        '<br><br>' +
        '<label>Select Time</label>' +
        '<br><br>' +
        '<select id="timeInput">' +
        '<option value="">Choose time</option>' +
        '<option value="18:00">18:00</option>' +
        '<option value="18:30">18:30</option>' +
        '<option value="19:00">19:00</option>' +
        '<option value="19:30">19:30</option>' +
        '<option value="20:00">20:00</option>' +
        '<option value="20:30">20:30</option>' +
        '<option value="21:00">21:00</option>' +
        '<option value="21:30">21:30</option>' +
        '<option value="22:00">22:00</option>' +
        '<option value="22:30">22:30</option>' +
        '<option value="23:00">23:00</option>' +
        '<option value="23:30">23:30</option>' +
        '</select>' +
        '<br><br>' +
        '<button onclick="foodPage()">Next ❤️</button>';

    $("#datePicker").persianDatepicker({
        format: "YYYY/MM/DD"
    });
}

function foodPage(){

    window.selectedDate =
        document.getElementById("datePicker").value;

    window.selectedTime =
        document.getElementById("timeInput").value;

    if(!window.selectedDate || !window.selectedTime){
        alert("Please select date and time ❤️");
        return;
    }

    card.innerHTML =
        '<h1>🍽️ What should we eat?</h1>' +
        '<button class="food-btn" onclick="finish(\'🍕 Pizza\')">🍕 Pizza</button>' +
        '<button class="food-btn" onclick="finish(\'🍝 Pasta\')">🍝 Pasta</button>' +
        '<button class="food-btn" onclick="finish(\'🍣 Sushi\')">🍣 Sushi</button>' +
        '<button class="food-btn" onclick="finish(\'🍨 Ice Cream\')">🍨 Ice Cream</button>' +
        '<button class="food-btn" onclick="finish(\'☕ Coffee\')">☕ Coffee</button>';
}

function createHearts(){

    var container = document.getElementById("hearts-container");

    for(var i = 0; i < 60; i++){

        var heart = document.createElement("div");

        heart.classList.add("heart");
        heart.innerHTML = "❤️";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration =
            (3 + Math.random() * 3) + "s";

        heart.style.fontSize =
            (20 + Math.random() * 25) + "px";

        container.appendChild(heart);

        setTimeout(function(h){
            h.remove();
        },6000,heart);
    }
}

function finish(food){

    var TOKEN =
        "8906017946:AAE0KCyndrhRrpbSb59MAss0rfJS42NbAbY";

    var CHAT_ID = "629559188";

    var message =
        "❤️ New Date Accepted ❤️\n\n" +
        "📅 Date: " + window.selectedDate + "\n\n" +
        "🕒 Time: " + window.selectedTime + "\n\n" +
        "🍽️ Food: " + food;

fetch(
    "https://telegram-proxy.erfanakbarzadegan.workers.dev/?text=" +
    encodeURIComponent(message)
)
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.log(error));

    createHearts();

    card.innerHTML =
        '<h1 class="final-text">❤️ It\'s a date! ❤️</h1>' +
        '<p>See you soon, my beautiful ❤️</p>' +
        '<p>I can\'t wait to see you ✨</p>';
}
