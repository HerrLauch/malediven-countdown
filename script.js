/* =====================================================
   Malediven Countdown
   Dunja ❤️ Kevin
   ===================================================== */


/* ===========================
   Reisezeiten
=========================== */
const zielDatum = new Date("2026-08-04T15:00:00+02:00");

const ankunftAngaga = new Date("2026-08-06T08:00:00+05:00");

const endeUrlaub = new Date("2026-08-20T08:00:00+05:00");


let unterwegsAktiv = false;
let urlaubsmodusAktiv = false;
let erinnerungAktiv = false;



const countdownBox = document.getElementById("countdown");
const imageViewer = document.getElementById("imageViewer");
const bigImage = document.getElementById("bigImage");
if(!countdownBox){
    console.error("Countdown nicht gefunden");
}

/* ===========================
   Bilder Viewer
=========================== */
function openImage(src) {

    if(!bigImage || !imageViewer) return;

    bigImage.src = src;

    imageViewer.style.display = "flex";
    document.body.style.overflow = "hidden";

}


function closeImage() {

    imageViewer.style.display = "none";
    document.body.style.overflow = "auto";

}

/* ===========================
   Countdown
=========================== */


function countdown(){

    const jetzt = new Date();

    const unterschied = zielDatum - jetzt;


    /*
       Vor Reisebeginn
    */

    if(unterschied > 0){

        zeigeCountdown(unterschied);

        return;

    }



    /*
       Reise läuft
    */

    if(jetzt >= zielDatum && jetzt < ankunftAngaga){

        if(!unterwegsAktiv){

            unterwegsAktiv = true;

            zeigeUnterwegs();

        }

        return;

    }



    /*
       Urlaub auf Angaga
    */

    if(jetzt >= ankunftAngaga && jetzt < endeUrlaub){

        if(!urlaubsmodusAktiv){

            urlaubsmodusAktiv = true;

            zeigeUrlaubsmodus();

        }

        return;

    }



    /*
       Nach der Reise
    */

    if(jetzt >= endeUrlaub){

        if(!erinnerungAktiv){

            erinnerungAktiv=true;

            zeigeErinnerung();

        }

    }

}



function zeigeCountdown(unterschied){


    const tage =
    Math.floor(
        unterschied /
        (1000*60*60*24)
    );


    const stunden =
    Math.floor(
        unterschied /
        (1000*60*60)
    ) % 24;


    const minuten =
    Math.floor(
        unterschied /
        (1000*60)
    ) % 60;


    const sekunden =
    Math.floor(
        unterschied /
        1000
    ) % 60;



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

}



/* ===========================
   Reise unterwegs
=========================== */


function zeigeUnterwegs(){


countdownBox.innerHTML=`

<div class="holiday-mode">

    <div class="holiday-icon">
        ✈️
    </div>


    <h2>
        Unsere Reise läuft
    </h2>


    <p>
        🌍 Deutschland → Abu Dhabi → Malediven
    </p>


    <p>
        ❤️ Das Abenteuer hat begonnen.
    </p>


    <p>
        🏝️ Angaga Island wartet auf uns.
    </p>

</div>

`;


starteReiseAnimation();

}



/* ===========================
   Urlaub
=========================== */


function zeigeUrlaubsmodus(){


const heute=new Date();


const urlaubstag=Math.floor(

(heute - ankunftAngaga)

/
(1000*60*60*24)

)+1;



countdownBox.innerHTML=`

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
📍 South Ari Atoll, Malediven
</p>


</div>

`;

}



/* ===========================
   Erinnerung
=========================== */


function zeigeErinnerung(){


countdownBox.classList.add(
"countdown-hidden"
);



setTimeout(()=>{


countdownBox.innerHTML=`

<div class="holiday-mode">


<div class="holiday-icon">
❤️
</div>


<h2>
Danke für diese Reise
</h2>


<p>
🌴 Die Malediven bleiben
für immer Teil unserer Geschichte.
</p>


<p>
📸 Erinnerungen fürs Leben
</p>


<p>
❤️ Kapitel 1 unserer Geschichte
</p>


</div>

`;


countdownBox.classList.remove(
"countdown-hidden"
);



},800);



}




/* ===========================
   Reiseanimation
=========================== */


function starteReiseAnimation(){


const celebration =
document.getElementById(
"celebration"
);



if(!celebration) return;



celebration.style.display="flex";



const confetti =
document.getElementById(
"confetti"
);



confetti.innerHTML="";



for(let i=0;i<100;i++){


const piece =
document.createElement("div");


piece.className="confetti";


piece.style.left =
Math.random()*100+"vw";


piece.style.animationDuration =
(Math.random()*3+3)+"s";


piece.style.backgroundColor =
[
"#00d4ff",
"#ffffff",
"#ffe066",
"#7cff7c",
"#ff8ad8"

]
[
Math.floor(Math.random()*5)
];



confetti.appendChild(piece);


}



const plane =
document.getElementById(
"plane"
);



if(plane){


plane.style.animation="none";


setTimeout(()=>{


plane.style.animation=
"flyAcross 7s linear forwards";


},100);


}



}




/* ===========================
   Scroll Animation
=========================== */


const elemente =
document.querySelectorAll(
"section"
);



const beobachter =
new IntersectionObserver(

eintraege=>{


eintraege.forEach(

eintrag=>{


if(eintrag.isIntersecting){


eintrag.target.classList.add(
"show"
);


}


}

);


},

{
threshold:0.15
}

);



elemente.forEach(
element=>{

beobachter.observe(element);

}

);




/* ===========================
   Start
=========================== */


if(countdownBox){

    countdown();

    setInterval(countdown, 1000);

}
/* ===========================
   Erinnerungs Bilder Slider
=========================== */


document.querySelectorAll(".memory-slider").forEach(slider => {


    const bilder = slider.querySelectorAll(".memory-image");

    const punkte = slider.querySelectorAll(".memory-dots span");

    const beschriftung = slider.querySelector(".memory-caption");


const texte = [

    "Ein Spieleabend, der viel Spaß brachte",

    "Gemeinsame Spaziergänge, Zoo und neue Eindrücke sammeln 🦁",

    "Eine spaßige Pause im Zoo"

];


    let aktuellesBild = 0;



    function zeigeBild(){


        bilder.forEach((bild,index)=>{

            bild.style.opacity =
            index === aktuellesBild ? "1" : "0";

        });
bilder.forEach((bild,index)=>{

    if(index === aktuellesBild){

        bild.style.opacity = "1";
        bild.style.zIndex = "2";

    } else {

        bild.style.opacity = "0";
        bild.style.zIndex = "1";

    }

});


punkte.forEach((punkt,index)=>{

    punkt.classList.toggle(
        "active",
        index === aktuellesBild
    );

});


punkte.forEach((punkt, index) => {

    punkt.addEventListener("click", () => {

        aktuellesBild = index;

        zeigeBild();

        starteSlider();

    });

});



        if(beschriftung){

            beschriftung.textContent =
            texte[aktuellesBild];

        }


    }



let timer;


function starteSlider(){

    clearInterval(timer);


    timer = setInterval(()=>{


        aktuellesBild++;


        if(aktuellesBild >= bilder.length){

            aktuellesBild = 0;

        }


        zeigeBild();


    },5000);

}


starteSlider();



    zeigeBild();


});
