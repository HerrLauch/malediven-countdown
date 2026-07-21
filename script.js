const zielDatum = new Date("2026-08-05T04:00:00");

const ankunftAngaga = new Date("2026-08-06T08:00:00");
const endeUrlaub = new Date("2026-08-20T08:00:00");
let reiseGestartet = false;
function countdown() {

    const jetzt = new Date();
    const unterschied = zielDatum - jetzt;


    if (unterschied <= 0) {

        const urlaubGestartet = jetzt >= ankunftAngaga;

        if (urlaubGestartet) {

    if (jetzt >= endeUrlaub) {

        zeigeErinnerung();

        return;

    }


    zeigeUrlaubsmodus();

    return;

}

        if (!reiseGestartet) {

            reiseGestartet = true;

            starteReiseAnimation();

        }

        return;

    }


    const tage = Math.floor(unterschied / (1000 * 60 * 60 * 24));
    const stunden = Math.floor((unterschied / (1000 * 60 * 60)) % 24);
    const minuten = Math.floor((unterschied / (1000 * 60)) % 60);
    const sekunden = Math.floor((unterschied / 1000) % 60);


    const countdownBox = document.getElementById("countdown");

countdownBox.classList.add("countdown-hidden");

setTimeout(() => {

    countdownBox.innerHTML = `
        <div class="time-box">
            <div class="number">${tage}</div>
            <div class="label">Tage</div>
        </div>

        <div class="time-box">
            <div class="number">${stunden}</div>
            <div class="label">Stunden</div>
        </div>

        <div class="time-box">
            <div class="number">${minuten}</div>
            <div class="label">Minuten</div>
        </div>

        <div class="time-box">
            <div class="number">${sekunden}</div>
            <div class="label">Sekunden</div>
        </div>
    `;
    countdownBox.classList.remove("countdown-hidden");

}, 800);
}

countdown();
setInterval(countdown, 1000);
// ===========================
// Scroll Animation
// ===========================


const elemente = document.querySelectorAll(
    ".story, .travel, .bridge"
);


const beobachter = new IntersectionObserver(
    eintraege => {

        eintraege.forEach(
            eintrag => {

                if(eintrag.isIntersecting){

                    eintrag.target.classList.add("show");

                }

            }
        );

    },
    {
        threshold:0.15
    }
);



elemente.forEach(
    element => {

        beobachter.observe(element);

    }
);
// ===========================
// Reisebeginn
// ===========================

function starteReiseAnimation(){

    const celebration=document.getElementById("celebration");

    celebration.style.display="flex";
const countdownBox = document.getElementById("countdown");

countdownBox.style.display = "none";
    const confetti=document.getElementById("confetti");

    for(let i=0;i<180;i++){

        const piece=document.createElement("div");

        piece.className="confetti";

        piece.style.left=Math.random()*100+"vw";

        piece.style.animationDuration=(Math.random()*3+3)+"s";

        piece.style.backgroundColor=
        ["#00d4ff","#ffffff","#ffe066","#7cff7c","#ff8ad8"][Math.floor(Math.random()*5)];

        confetti.appendChild(piece);

    }
const plane = document.getElementById("plane");

setTimeout(() => {

    plane.style.animation = "flyAcross 7s linear forwards";

}, 700);
}
// ===========================
// Urlaubsmodus
// ===========================

function zeigeUrlaubsmodus(){

    const heute = new Date();

    const urlaubstag = Math.floor(
        (heute - ankunftAngaga) / (1000 * 60 * 60 * 24)
    ) + 1;


    document.getElementById("countdown").innerHTML = `

        <div class="holiday-mode">

            <div class="holiday-icon">
                🏝️
            </div>

            <h2>
                Wir sind im Paradies
            </h2>

            <p>
                ❤️ Tag ${urlaubstag} von 14
            </p>

            <p>
    🌴 Angaga Island Resort & Spa
</p>

<p>
    📍 Unser kleines Paradies<br>
    South Ari Atoll, Malediven
</p>

        </div>

    `;

}
// ===========================
// Erinnerungsmodus
// ===========================

function zeigeErinnerung(){

    const countdownBox = document.getElementById("countdown");

countdownBox.classList.add("countdown-hidden");

setTimeout(() => {

    countdownBox.innerHTML = `

        <div class="holiday-mode">

            <div class="holiday-icon">
                ❤️
            </div>

            <h2>
                Danke für diese unvergessliche Reise
            </h2>

            <p>
                🌴 Die Malediven bleiben für immer
                ein Teil unserer Geschichte.
            </p>

            <p>
    📸 Erinnerungen fürs Leben
</p>

<p>
    ❤️ Das war Kapitel 1 unseres Buches.
</p>

        </div>

    `;
    countdownBox.classList.remove("countdown-hidden");

}, 800);
}
