const zielDatum = new Date("2026-08-05T04:00:00");

function countdown() {
    const jetzt = new Date();
    const unterschied = zielDatum - jetzt;

    if (unterschied <= 0) {

    starteReiseAnimation();

    return;

}

    const tage = Math.floor(unterschied / (1000 * 60 * 60 * 24));
    const stunden = Math.floor((unterschied / (1000 * 60 * 60)) % 24);
    const minuten = Math.floor((unterschied / (1000 * 60)) % 60);
    const sekunden = Math.floor((unterschied / 1000) % 60);

    document.getElementById("countdown").innerHTML = `
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
starteReiseAnimation();
