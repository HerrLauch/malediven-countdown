/* =====================================================
   Malediven 2026
   Dunja ❤️ Kevin
   ===================================================== */


/* =====================================================
   1. REISEZEITEN
   ===================================================== */

const zielDatum = new Date("2026-08-04T15:00:00+02:00");
const ankunftAngaga = new Date("2026-08-06T08:00:00+05:00");
const endeUrlaub = new Date("2026-08-20T08:00:00+05:00");


/* =====================================================
   2. STATUS
   ===================================================== */

let unterwegsAktiv = false;
let urlaubsmodusAktiv = false;
let erinnerungAktiv = false;


/* =====================================================
   3. ELEMENTE
   ===================================================== */

const countdownBox = document.getElementById("countdown");
const imageViewer = document.getElementById("imageViewer");
const bigImage = document.getElementById("bigImage");


/* =====================================================
   4. BILD-VIEWER
   ===================================================== */

function openImage(src) {

    if (!imageViewer || !bigImage) return;

    bigImage.src = src;

    imageViewer.style.display = "flex";

    document.body.style.overflow = "hidden";
}


function closeImage() {

    if (!imageViewer) return;

    imageViewer.style.display = "none";

    document.body.style.overflow = "";
}


/*
   Klick auf den dunklen Hintergrund schließt
   den Bild-Viewer.
*/

if (imageViewer) {

    imageViewer.addEventListener("click", function (event) {

        if (event.target === imageViewer) {
            closeImage();
        }

    });

}


/*
   ESC-Taste schließt den Bild-Viewer.
*/

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeImage();
    }

});


/* =====================================================
   5. COUNTDOWN
   ===================================================== */

function countdown() {

    if (!countdownBox) return;

    const jetzt = new Date();

    const unterschied = zielDatum - jetzt;


    /*
       -----------------------------------------------
       VOR DER REISE
       -----------------------------------------------
    */

    if (unterschied > 0) {

        zeigeCountdown(unterschied);

        return;
    }


    /*
       -----------------------------------------------
       REISE LÄUFT
       Deutschland → Abu Dhabi → Malediven
       -----------------------------------------------
    */

    if (
        jetzt >= zielDatum &&
        jetzt < ankunftAngaga
    ) {

        if (!unterwegsAktiv) {

            unterwegsAktiv = true;

            zeigeUnterwegs();

        }

        return;
    }


    /*
       -----------------------------------------------
       URLAUB AUF ANGAGA
       -----------------------------------------------
    */

    if (
        jetzt >= ankunftAngaga &&
        jetzt < endeUrlaub
    ) {

        if (!urlaubsmodusAktiv) {

            urlaubsmodusAktiv = true;

            zeigeUrlaubsmodus();

        }

        return;
    }


    /*
       -----------------------------------------------
       NACH DEM URLAUB
       -----------------------------------------------
    */

    if (jetzt >= endeUrlaub) {

        if (!erinnerungAktiv) {

            erinnerungAktiv = true;

            zeigeErinnerung();

        }

    }

}


/* =====================================================
   6. COUNTDOWN ANZEIGEN
   ===================================================== */

function zeigeCountdown(unterschied) {

    if (!countdownBox) return;


    const tage = Math.floor(
        unterschied /
        (1000 * 60 * 60 * 24)
    );


    const stunden = Math.floor(
        unterschied /
        (1000 * 60 * 60)
    ) % 24;


    const minuten = Math.floor(
        unterschied /
        (1000 * 60)
    ) % 60;


    const sekunden = Math.floor(
        unterschied /
        1000
    ) % 60;


    countdownBox.innerHTML = `

        <div class="time-box">

            <div class="number">
                ${tage}
            </div>

            <div class="label">
                Tage
            </div>

        </div>


        <div class="time-box">

            <div class="number">
                ${stunden}
            </div>

            <div class="label">
                Stunden
            </div>

        </div>


        <div class="time-box">

            <div class="number">
                ${minuten}
            </div>

            <div class="label">
                Minuten
            </div>

        </div>


        <div class="time-box">

            <div class="number">
                ${sekunden}
            </div>

            <div class="label">
                Sekunden
            </div>

        </div>

    `;
}


/* =====================================================
   7. REISE UNTERWEGS
   ===================================================== */

function zeigeUnterwegs() {

    if (!countdownBox) return;


    countdownBox.innerHTML = `

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


/* =====================================================
   8. URLAUBSMODUS
   ===================================================== */

function zeigeUrlaubsmodus() {

    if (!countdownBox) return;


    const heute = new Date();


    const urlaubstag = Math.floor(

        (
            heute - ankunftAngaga
        ) /
        (1000 * 60 * 60 * 24)

    ) + 1;


    /*
       Sicherheit:
       Der angezeigte Tag soll niemals kleiner als 1
       oder größer als 14 sein.
    */

    const tag = Math.max(
        1,
        Math.min(14, urlaubstag)
    );


    countdownBox.innerHTML = `

        <div class="holiday-mode">

            <div class="holiday-icon">
                🏝️
            </div>

            <h2>
                Wir sind im Paradies
            </h2>

            <p>
                ❤️ Tag ${tag} von 14
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


/* =====================================================
   9. ERINNERUNG NACH DER REISE
   ===================================================== */

function zeigeErinnerung() {

    if (!countdownBox) return;


    countdownBox.classList.add(
        "countdown-hidden"
    );


    setTimeout(function () {

        countdownBox.innerHTML = `

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


    }, 800);

}


/* =====================================================
   10. REISEANIMATION
   ===================================================== */

function starteReiseAnimation() {

    const celebration =
        document.getElementById("celebration");


    if (!celebration) return;


    celebration.style.display = "flex";


    /*
       Konfetti
    */

    const confetti =
        document.getElementById("confetti");


    if (confetti) {

        confetti.innerHTML = "";


        const farben = [

            "#00d4ff",
            "#ffffff",
            "#ffe066",
            "#7cff7c",
            "#ff8ad8"

        ];


        for (let i = 0; i < 100; i++) {

            const piece =
                document.createElement("div");


            piece.className = "confetti";


            piece.style.left =
                Math.random() * 100 + "vw";


            piece.style.animationDuration =
                (Math.random() * 3 + 3) + "s";


            piece.style.animationDelay =
                Math.random() * 2 + "s";


            piece.style.backgroundColor =
                farben[
                    Math.floor(
                        Math.random() * farben.length
                    )
                ];


            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;


            confetti.appendChild(piece);

        }

    }


    /*
       Flugzeug
    */

    const plane =
        document.getElementById("plane");


    if (plane) {

        plane.style.animation = "none";

        plane.style.left = "-80px";

        plane.style.opacity = "0";


        setTimeout(function () {

            plane.style.animation =
                "flyAcross 7s linear forwards";

        }, 100);

    }

}


/* =====================================================
   11. SECTIONS SCROLL-ANIMATION
   ===================================================== */

const elemente =
    document.querySelectorAll("section");


if ("IntersectionObserver" in window) {

    const beobachter =
        new IntersectionObserver(

            function (eintraege) {

                eintraege.forEach(
                    function (eintrag) {

                        if (
                            eintrag.isIntersecting
                        ) {

                            eintrag.target.classList.add(
                                "show"
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );


    elemente.forEach(
        function (element) {

            beobachter.observe(element);

        }
    );

}


/* =====================================================
   12. MEMORY-SLIDER
   ===================================================== */

/*
   Jeder .memory-slider auf der Seite
   bekommt automatisch seinen eigenen Slider.

   Dadurch können Dänemark, China Lights,
   Spieleabend, Paar, Heidelberg usw.
   unabhängig voneinander laufen.
*/

document
    .querySelectorAll(".memory-slider")
    .forEach(function (slider) {


        const bilder =
            slider.querySelectorAll(
                ".memory-image"
            );


        const dotsContainer =
            slider.querySelector(
                ".memory-dots"
            );


        const beschriftung =
            slider.querySelector(
                ".memory-caption"
            );


        /*
           Wenn keine Bilder vorhanden sind,
           wird dieser Slider übersprungen.
        */

        if (!bilder.length) return;


        let aktuellesBild = 0;

        let timer = null;


        /*
           Texte für die Slider.

           Falls ein Slider mehr Bilder besitzt
           als Texte vorhanden sind, wird einfach
           kein zusätzlicher Text angezeigt.
        */

        const texte = [

            "Ein Spieleabend, der viel Spaß brachte",

            "Gemeinsame Spaziergänge, Zoo und neue Eindrücke sammeln 🦁",

            "Eine spaßige Pause im Zoo"

        ];


        /* ---------------------------------------------
           Dots erstellen
        --------------------------------------------- */

        if (dotsContainer) {

            dotsContainer.innerHTML = "";


            bilder.forEach(
                function (bild, index) {

                    const punkt =
                        document.createElement("span");


                    punkt.setAttribute(
                        "aria-label",
                        "Bild " + (index + 1)
                    );


                    punkt.addEventListener(
                        "click",
                        function (event) {

                            event.stopPropagation();

                            aktuellesBild = index;

                            zeigeBild();

                            starteSlider();

                        }
                    );


                    dotsContainer.appendChild(
                        punkt
                    );

                }
            );

        }


        const punkte =
            dotsContainer
                ? dotsContainer.querySelectorAll("span")
                : [];


        /* ---------------------------------------------
           Bild anzeigen
        --------------------------------------------- */

        function zeigeBild() {


            bilder.forEach(
                function (bild, index) {

                    if (
                        index === aktuellesBild
                    ) {

                        bild.style.opacity = "1";

                        bild.style.zIndex = "2";

                    } else {

                        bild.style.opacity = "0";

                        bild.style.zIndex = "1";

                    }

                }
            );


            /*
               Aktiven Punkt markieren
            */

            punkte.forEach(
                function (punkt, index) {

                    punkt.classList.toggle(
                        "active",
                        index === aktuellesBild
                    );

                }
            );


            /*
               Bildunterschrift aktualisieren
            */

            if (beschriftung) {

                if (
                    texte[aktuellesBild]
                ) {

                    beschriftung.textContent =
                        texte[aktuellesBild];

                } else {

                    beschriftung.textContent = "";

                }

            }

        }


        /* ---------------------------------------------
           Automatischer Wechsel
        --------------------------------------------- */

        function starteSlider() {

            if (timer) {

                clearInterval(timer);

            }


            timer = setInterval(
                function () {

                    aktuellesBild++;


                    if (
                        aktuellesBild >= bilder.length
                    ) {

                        aktuellesBild = 0;

                    }


                    zeigeBild();

                },
                5000
            );

        }


        /* ---------------------------------------------
           Bilder anklickbar machen
        --------------------------------------------- */

        bilder.forEach(
            function (bild) {

                bild.style.cursor = "pointer";


                bild.addEventListener(
                    "click",
                    function () {

                        openImage(
                            bild.currentSrc ||
                            bild.src
                        );

                    }
                );

            }
        );


        /* ---------------------------------------------
           Ersten Zustand anzeigen
        --------------------------------------------- */

        zeigeBild();


        starteSlider();


    });


/* =====================================================
   13. TASTATURBEDIENUNG FÜR SLIDER
   ===================================================== */

/*
   Auf Desktop kann man mit den Pfeiltasten
   den aktuell fokussierten Slider bedienen.
*/

document
    .querySelectorAll(".memory-slider")
    .forEach(function (slider) {

        slider.setAttribute(
            "tabindex",
            "0"
        );


        const bilder =
            slider.querySelectorAll(
                ".memory-image"
            );


        if (!bilder.length) return;


        let bildIndex = 0;


        slider.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "ArrowRight") {

                    bildIndex++;


                    if (
                        bildIndex >= bilder.length
                    ) {

                        bildIndex = 0;

                    }

                    bilder.forEach(
                        function (bild, index) {

                            bild.style.opacity =
                                index === bildIndex
                                    ? "1"
                                    : "0";

                        }
                    );

                }


                if (event.key === "ArrowLeft") {

                    bildIndex--;


                    if (bildIndex < 0) {

                        bildIndex =
                            bilder.length - 1;

                    }


                    bilder.forEach(
                        function (bild, index) {

                            bild.style.opacity =
                                index === bildIndex
                                    ? "1"
                                    : "0";

                        }
                    );

                }

            }
        );

    });


/* =====================================================
   14. START
   ===================================================== */

if (countdownBox) {

    countdown();

    setInterval(
        countdown,
        1000
    );

}
