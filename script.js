/* =====================================================
   DUNJA ❤️ KEVIN
   Malediven 2026
   script.js
===================================================== */


/* =====================================================
   1. REISEZEITEN
===================================================== */

const zielDatum =
    new Date("2026-08-04T15:00:00+02:00");

const ankunftAngaga =
    new Date("2026-08-06T08:00:00+05:00");

const endeUrlaub =
    new Date("2026-08-20T08:00:00+05:00");


/* =====================================================
   2. STATUS
===================================================== */

let unterwegsAktiv = false;
let urlaubsmodusAktiv = false;
let erinnerungAktiv = false;


/* =====================================================
   3. ELEMENTE
===================================================== */

const countdownBox =
    document.getElementById("countdown");

const imageViewer =
    document.getElementById("imageViewer");

const bigImage =
    document.getElementById("bigImage");


/* =====================================================
   4. BILD-VIEWER
===================================================== */

function openImage(src) {

    if (!imageViewer || !bigImage || !src) {
        return;
    }

    bigImage.src = src;

    imageViewer.style.display = "flex";

    document.body.style.overflow = "hidden";
}


function closeImage() {

    if (!imageViewer) {
        return;
    }

    imageViewer.style.display = "none";

    document.body.style.overflow = "";

    if (bigImage) {
        bigImage.src = "";
    }
}


/* -----------------------------------------------------
   Klick auf Hintergrund schließt Viewer
----------------------------------------------------- */

if (imageViewer) {

    imageViewer.addEventListener(
        "click",
        function (event) {

            if (event.target === imageViewer) {
                closeImage();
            }

        }
    );

}


/* -----------------------------------------------------
   ESC schließt Viewer
----------------------------------------------------- */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closeImage();
        }

    }
);


/* =====================================================
   5. COUNTDOWN
===================================================== */

function countdown() {

    if (!countdownBox) {
        return;
    }

    const jetzt = new Date();

    const unterschied =
        zielDatum - jetzt;


    /* -------------------------------------------------
       VOR DER REISE
    ------------------------------------------------- */

    if (unterschied > 0) {

        zeigeCountdown(unterschied);

        return;
    }


    /* -------------------------------------------------
       REISE LÄUFT
       Deutschland → Abu Dhabi → Malediven
    ------------------------------------------------- */

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


    /* -------------------------------------------------
       URLAUB AUF ANGAGA
    ------------------------------------------------- */

    if (
        jetzt >= ankunftAngaga &&
        jetzt < endeUrlaub
    ) {

        if (!urlaubsmodusAktiv) {

            urlaubsmodusAktiv = true;

            zeigeUrlaubsmodus();

        } else {

            /*
               Urlaubstag trotzdem aktualisieren,
               falls die Seite lange geöffnet bleibt.
            */

            aktualisiereUrlaubstag();

        }

        return;
    }


    /* -------------------------------------------------
       NACH DEM URLAUB
    ------------------------------------------------- */

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

    if (!countdownBox) {
        return;
    }


    const tage =
        Math.floor(
            unterschied /
            (1000 * 60 * 60 * 24)
        );


    const stunden =
        Math.floor(
            unterschied /
            (1000 * 60 * 60)
        ) % 24;


    const minuten =
        Math.floor(
            unterschied /
            (1000 * 60)
        ) % 60;


    const sekunden =
        Math.floor(
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

    if (!countdownBox) {
        return;
    }


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

function ermittleUrlaubstag() {

    const heute = new Date();


    const vergangeneZeit =
        heute - ankunftAngaga;


    const urlaubstag =
        Math.floor(
            vergangeneZeit /
            (1000 * 60 * 60 * 24)
        ) + 1;


    return Math.max(
        1,
        Math.min(14, urlaubstag)
    );
}


function zeigeUrlaubsmodus() {

    if (!countdownBox) {
        return;
    }


    const tag =
        ermittleUrlaubstag();


    countdownBox.innerHTML = `

        <div class="holiday-mode">

            <div class="holiday-icon">
                🏝️
            </div>

            <h2>
                Wir sind im Paradies
            </h2>

            <p>
                ❤️ Tag
                <span id="urlaubstag">
                    ${tag}
                </span>
                von 14
            </p>

            <p>
                🌴 Angaga Island Resort &amp; Spa
            </p>

            <p>
                📍 South Ari Atoll, Malediven
            </p>

        </div>

    `;
}


/* -----------------------------------------------------
   Urlaubstag aktualisieren
----------------------------------------------------- */

function aktualisiereUrlaubstag() {

    const urlaubstagElement =
        document.getElementById("urlaubstag");


    if (!urlaubstagElement) {
        return;
    }


    urlaubstagElement.textContent =
        ermittleUrlaubstag();
}


/* =====================================================
   9. ERINNERUNG NACH DER REISE
===================================================== */

function zeigeErinnerung() {

    if (!countdownBox) {
        return;
    }


    countdownBox.classList.add(
        "countdown-hidden"
    );


    setTimeout(
        function () {

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

        },
        800
    );
}


/* =====================================================
   10. REISEANIMATION
===================================================== */

function starteReiseAnimation() {

    const celebration =
        document.getElementById("celebration");


    if (!celebration) {
        return;
    }


    celebration.style.display = "flex";


    /* -------------------------------------------------
       KONFETTI
    ------------------------------------------------- */

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


        for (
            let i = 0;
            i < 100;
            i++
        ) {

            const piece =
                document.createElement("div");


            piece.className =
                "confetti";


            piece.style.left =
                Math.random() * 100 + "vw";


            piece.style.animationDuration =
                (
                    Math.random() * 3 + 3
                ) + "s";


            piece.style.animationDelay =
                Math.random() * 2 + "s";


            piece.style.backgroundColor =
                farben[
                    Math.floor(
                        Math.random() *
                        farben.length
                    )
                ];


            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;


            confetti.appendChild(piece);

        }

    }


    /* -------------------------------------------------
       FLUGZEUG
    ------------------------------------------------- */

    const plane =
        document.getElementById("plane");


    if (plane) {

        plane.style.animation =
            "none";

        plane.style.left =
            "-80px";

        plane.style.opacity =
            "0";


        setTimeout(
            function () {

                plane.style.animation =
                    "flyAcross 7s linear forwards";

            },
            100
        );

    }

}


/* =====================================================
   11. SECTIONS SCROLL-ANIMATION
===================================================== */

const elemente =
    document.querySelectorAll(
        "section"
    );


if (
    "IntersectionObserver" in window
) {

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

                            /*
                               Nicht weiter beobachten,
                               nachdem die Section sichtbar
                               geworden ist.
                            */

                            beobachter.unobserve(
                                eintrag.target
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

            beobachter.observe(
                element
            );

        }
    );

} else {

    /*
       Fallback für ältere Browser
    */

    elemente.forEach(
        function (element) {

            element.classList.add(
                "show"
            );

        }
    );

}


/* =====================================================
   12. MEMORY-SLIDER
===================================================== */

document
    .querySelectorAll(".memory-slider")
    .forEach(
        function (slider) {

            const bilder =
                slider.querySelectorAll(
                    ".memory-image"
                );


            /*
               Es muss mindestens ein Bild geben.
            */

            if (!bilder.length) {
                return;
            }


            const pfeilLinks =
                slider.querySelector(
                    ".memory-arrow-left"
                );


            const pfeilRechts =
                slider.querySelector(
                    ".memory-arrow-right"
                );


            /*
               Es können durch ältere HTML-Versionen
               mehrere .memory-dots vorhanden sein.
               Wir verwenden deshalb den ersten Container
               und entfernen überzählige Container.
            */

            const dotsContaineren =
                slider.querySelectorAll(
                    ".memory-dots"
                );


            let dotsContainer =
                dotsContaineren.length
                    ? dotsContaineren[0]
                    : null;


            if (
                dotsContaineren.length > 1
            ) {

                for (
                    let i = 1;
                    i < dotsContaineren.length;
                    i++
                ) {

                    dotsContaineren[i].remove();

                }

            }


            /* -------------------------------------------------
               SLIDER-VARIABLEN
            ------------------------------------------------- */

            let aktuellesBild = 0;

            let timer = null;


            const wechselzeit =
                5000;


            /* -------------------------------------------------
               SLIDER VORBEREITEN
            ------------------------------------------------- */

            slider.style.position =
                "relative";


            bilder.forEach(
                function (bild, index) {

                    bild.style.position =
                        "absolute";

                    bild.style.top =
                        "0";

                    bild.style.left =
                        "0";

                    bild.style.width =
                        "100%";

                    bild.style.height =
                        "100%";

                    bild.style.objectFit =
                        "contain";

                    bild.style.opacity =
                        index === 0
                            ? "1"
                            : "0";

                    bild.style.visibility =
                        index === 0
                            ? "visible"
                            : "hidden";

                    bild.style.zIndex =
                        index === 0
                            ? "2"
                            : "1";

                    bild.style.transition =
                        "opacity 0.6s ease";

                    bild.style.cursor =
                        "pointer";


                    /*
                       Bild anklicken →
                       großer Bild-Viewer
                    */

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


            /* -------------------------------------------------
               DOTS ERSTELLEN
            ------------------------------------------------- */

            if (dotsContainer) {

                dotsContainer.innerHTML =
                    "";


                bilder.forEach(
                    function (bild, index) {

                        const punkt =
                            document.createElement(
                                "span"
                            );


                        punkt.setAttribute(
                            "aria-label",
                            "Bild " +
                            (index + 1)
                        );


                        punkt.setAttribute(
                            "role",
                            "button"
                        );


                        punkt.setAttribute(
                            "tabindex",
                            "0"
                        );


                        punkt.addEventListener(
                            "click",
                            function (event) {

                                event.stopPropagation();

                                aktuellesBild =
                                    index;

                                zeigeBild();

                                starteSlider();

                            }
                        );


                        punkt.addEventListener(
                            "keydown",
                            function (event) {

                                if (
                                    event.key ===
                                    "Enter" ||
                                    event.key ===
                                    " "
                                ) {

                                    event.preventDefault();

                                    aktuellesBild =
                                        index;

                                    zeigeBild();

                                    starteSlider();

                                }

                            }
                        );


                        dotsContainer.appendChild(
                            punkt
                        );

                    }
                );

            }


            let punkte =
                dotsContainer
                    ? dotsContainer.querySelectorAll(
                        "span"
                    )
                    : [];


            /* -------------------------------------------------
               BILD ANZEIGEN
            ------------------------------------------------- */

            function zeigeBild() {

                bilder.forEach(
                    function (bild, index) {

                        const aktiv =
                            index ===
                            aktuellesBild;


                        bild.style.opacity =
                            aktiv
                                ? "1"
                                : "0";


                        bild.style.visibility =
                            aktiv
                                ? "visible"
                                : "hidden";


                        bild.style.zIndex =
                            aktiv
                                ? "2"
                                : "1";

                    }
                );


                /*
                   Aktiven Punkt markieren
                */

                punkte.forEach(
                    function (
                        punkt,
                        index
                    ) {

                        punkt.classList.toggle(
                            "active",
                            index ===
                            aktuellesBild
                        );

                    }
                );

            }


            /* -------------------------------------------------
               NÄCHSTES BILD
            ------------------------------------------------- */

            function naechstesBild() {

                aktuellesBild++;

                if (
                    aktuellesBild >=
                    bilder.length
                ) {

                    aktuellesBild = 0;

                }

                zeigeBild();

            }


            /* -------------------------------------------------
               VORHERIGES BILD
            ------------------------------------------------- */

            function vorherigesBild() {

                aktuellesBild--;

                if (
                    aktuellesBild < 0
                ) {

                    aktuellesBild =
                        bilder.length - 1;

                }

                zeigeBild();

            }


            /* -------------------------------------------------
               AUTOMATISCHER WECHSEL
            ------------------------------------------------- */

            function starteSlider() {

                /*
                   Alten Timer löschen
                */

                if (timer) {

                    clearInterval(timer);

                }


                /*
                   Bei nur einem Bild
                   keinen Timer starten.
                */

                if (
                    bilder.length <= 1
                ) {

                    return;
                }


                timer =
                    setInterval(
                        function () {

                            naechstesBild();

                        },
                        wechselzeit
                    );

            }


            /* -------------------------------------------------
               SLIDER STOPPEN
            ------------------------------------------------- */

            function stoppeSlider() {

                if (timer) {

                    clearInterval(timer);

                    timer = null;

                }

            }


            /* -------------------------------------------------
               PFEIL LINKS
            ------------------------------------------------- */

            if (pfeilLinks) {

                pfeilLinks.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();

                        vorherigesBild();

                        starteSlider();

                    }
                );

            }


            /* -------------------------------------------------
               PFEIL RECHTS
            ------------------------------------------------- */

            if (pfeilRechts) {

                pfeilRechts.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();

                        naechstesBild();

                        starteSlider();

                    }
                );

            }


            /* -------------------------------------------------
               TASTATURSTEUERUNG
            ------------------------------------------------- */

            slider.setAttribute(
                "tabindex",
                "0"
            );


            slider.addEventListener(
                "keydown",
                function (event) {

                    /*
                       Wenn der Bild-Viewer offen ist,
                       soll der Slider keine Pfeile
                       verarbeiten.
                    */

                    if (
                        imageViewer &&
                        imageViewer.style.display ===
                        "flex"
                    ) {

                        return;
                    }


                    if (
                        event.key ===
                        "ArrowRight"
                    ) {

                        event.preventDefault();

                        naechstesBild();

                        starteSlider();

                    }


                    if (
                        event.key ===
                        "ArrowLeft"
                    ) {

                        event.preventDefault();

                        vorherigesBild();

                        starteSlider();

                    }

                }
            );


            /* -------------------------------------------------
               PAUSE BEI MOUSEOVER
            ------------------------------------------------- */

            slider.addEventListener(
                "mouseenter",
                function () {

                    stoppeSlider();

                }
            );


            slider.addEventListener(
                "mouseleave",
                function () {

                    starteSlider();

                }
            );


            /* -------------------------------------------------
               TOUCH / MOBILE
            ------------------------------------------------- */

            let touchStartX = 0;

            let touchEndX = 0;


            slider.addEventListener(
                "touchstart",
                function (event) {

                    if (
                        event.touches.length !== 1
                    ) {

                        return;
                    }


                    touchStartX =
                        event.touches[0].clientX;

                },
                {
                    passive: true
                }
            );


            slider.addEventListener(
                "touchend",
                function (event) {

                    if (
                        event.changedTouches.length !== 1
                    ) {

                        return;
                    }


                    touchEndX =
                        event.changedTouches[0].clientX;


                    const differenz =
                        touchEndX -
                        touchStartX;


                    const mindestDistanz =
                        50;


                    if (
                        Math.abs(differenz) >=
                        mindestDistanz
                    ) {

                        if (
                            differenz < 0
                        ) {

                            naechstesBild();

                        } else {

                            vorherigesBild();

                        }

                        starteSlider();

                    }

                },
                {
                    passive: true
                }
            );


            /* -------------------------------------------------
               ERSTEN ZUSTAND ANZEIGEN
            ------------------------------------------------- */

            zeigeBild();

            starteSlider();

        }
    );


/* =====================================================
   13. GLOBALE FUNKTIONEN FÜR HTML
===================================================== */

/*
   Falls closeImage() direkt über onclick=""
   im HTML aufgerufen wird, stellen wir sicher,
   dass die Funktion global erreichbar bleibt.
*/

window.openImage =
    openImage;

window.closeImage =
    closeImage;


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


/* =====================================================
   15. BILD-VIEWER BEI ESC / BODY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            imageViewer &&
            imageViewer.style.display === "flex"
        ) {

            closeImage();

        }

    }
);
