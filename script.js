/* =====================================================
   DUNJA ❤️ KEVIN
   Malediven 2026
   script.js
===================================================== */


/* =====================================================
   1. REISEZEITEN
===================================================== */

/*
   Alle Daten werden mit Zeitzonen angegeben.

   zielDatum:
   Beginn der Reise am 04.08.2026 um 15:00 Uhr deutscher Zeit.

   ankunftAngaga:
   Ankunft auf Angaga am 06.08.2026 um 08:00 Uhr
   maledivischer Zeit.

   endeUrlaub:
   Ende des Urlaubs am 20.08.2026 um 08:00 Uhr
   maledivischer Zeit.
*/

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

/*
   Öffnet ein Bild im großen Viewer.
*/

function openImage(src) {

    if (!imageViewer || !bigImage || !src) {
        return;
    }

    bigImage.src = src;

    imageViewer.style.display = "flex";

    /*
       Scrollen der Seite verhindern,
       solange der Viewer geöffnet ist.
    */

    document.body.style.overflow = "hidden";
}


/*
   Schließt den Bild-Viewer.
*/

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
   Klick auf den dunklen Hintergrund schließt Viewer
----------------------------------------------------- */

if (imageViewer) {

    imageViewer.addEventListener(
        "click",
        function (event) {

            /*
               Nur wenn wirklich der Hintergrund
               angeklickt wurde.
            */

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

        if (
            event.key === "Escape" &&
            imageViewer &&
            imageViewer.style.display === "flex"
        ) {

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


    /* -------------------------------------------------
       VOR DER REISE
    ------------------------------------------------- */

    if (jetzt < zielDatum) {

        const unterschied =
            zielDatum - jetzt;

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

        /*
           Nur einmal aktivieren.
        */

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

        /*
           Urlaubsmodus nur einmal aufbauen.
        */

        if (!urlaubsmodusAktiv) {

            urlaubsmodusAktiv = true;

            zeigeUrlaubsmodus();

        } else {

            /*
               Urlaubstag aktualisieren,
               solange die Seite geöffnet bleibt.
            */

            aktualisiereUrlaubstag();

        }

        return;
    }


    /* -------------------------------------------------
       NACH DEM URLAUB
    ------------------------------------------------- */

    if (
        jetzt >= endeUrlaub &&
        !erinnerungAktiv
    ) {

        erinnerungAktiv = true;

        zeigeErinnerung();

    }

}


/* =====================================================
   6. COUNTDOWN ANZEIGEN
===================================================== */

function zeigeCountdown(unterschied) {

    if (!countdownBox) {
        return;
    }


    const millisekundenProSekunde =
        1000;

    const sekundenProMinute =
        60;

    const minutenProStunde =
        60;

    const stundenProTag =
        24;


    const millisekundenProMinute =
        millisekundenProSekunde *
        sekundenProMinute;


    const millisekundenProStunde =
        millisekundenProMinute *
        minutenProStunde;


    const millisekundenProTag =
        millisekundenProStunde *
        stundenProTag;


    const tage =
        Math.floor(
            unterschied /
            millisekundenProTag
        );


    const stunden =
        Math.floor(
            unterschied /
            millisekundenProStunde
        ) % stundenProTag;


    const minuten =
        Math.floor(
            unterschied /
            millisekundenProMinute
        ) % minutenProStunde;


    const sekunden =
        Math.floor(
            unterschied /
            millisekundenProSekunde
        ) % sekundenProMinute;


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


    /*
       Animation nur einmal starten.
    */

    starteReiseAnimation();

}


/* =====================================================
   8. URLAUBSMODUS
===================================================== */

function ermittleUrlaubstag() {

    const heute =
        new Date();


    const vergangeneZeit =
        heute - ankunftAngaga;


    const millisekundenProTag =
        1000 *
        60 *
        60 *
        24;


    const urlaubstag =
        Math.floor(
            vergangeneZeit /
            millisekundenProTag
        ) + 1;


    /*
       Sicherheit:
       Der Wert bleibt immer zwischen 1 und 14.
    */

    return Math.max(
        1,
        Math.min(
            14,
            urlaubstag
        )
    );

}


/* -----------------------------------------------------
   Urlaubsmodus anzeigen
----------------------------------------------------- */

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
        document.getElementById(
            "urlaubstag"
        );


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


    /*
       Sanft ausblenden.
    */

    countdownBox.classList.add(
        "countdown-hidden"
    );


    setTimeout(
        function () {

            /*
               Während der Wartezeit könnte das Element
               theoretisch entfernt worden sein.
            */

            if (!countdownBox) {
                return;
            }


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
        document.getElementById(
            "celebration"
        );


    if (!celebration) {
        return;
    }


    celebration.style.display =
        "flex";


    /* -------------------------------------------------
       KONFETTI
    ------------------------------------------------- */

    const confetti =
        document.getElementById(
            "confetti"
        );


    if (confetti) {

        /*
           Alte Konfetti-Elemente entfernen,
           bevor neue erzeugt werden.
        */

        confetti.innerHTML = "";


        const farben = [
            "#00d4ff",
            "#ffffff",
            "#ffe066",
            "#7cff7c",
            "#ff8ad8"
        ];


        const anzahlKonfetti =
            100;


        for (
            let i = 0;
            i < anzahlKonfetti;
            i++
        ) {

            const piece =
                document.createElement(
                    "div"
                );


            piece.className =
                "confetti";


            /*
               Zufällige horizontale Position.
            */

            piece.style.left =
                Math.random() *
                100 +
                "vw";


            /*
               Zufällige Fallgeschwindigkeit.
            */

            piece.style.animationDuration =
                (
                    Math.random() * 3 +
                    3
                ) +
                "s";


            /*
               Zufälliger Startzeitpunkt.
            */

            piece.style.animationDelay =
                Math.random() *
                2 +
                "s";


            /*
               Zufällige Farbe.
            */

            piece.style.backgroundColor =
                farben[
                    Math.floor(
                        Math.random() *
                        farben.length
                    )
                ];


            /*
               Zufällige Drehung.
            */

            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;


            confetti.appendChild(
                piece
            );

        }

    }


    /* -------------------------------------------------
       FLUGZEUG
    ------------------------------------------------- */

    const plane =
        document.getElementById(
            "plane"
        );


    if (plane) {

        /*
           Vorherige Animation zurücksetzen.
        */

        plane.style.animation =
            "none";

        plane.style.left =
            "-80px";

        plane.style.opacity =
            "0";


        /*
           Browser bekommt kurz Zeit,
           den Reset zu übernehmen.
        */

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
                               Section muss nicht mehr
                               beobachtet werden.
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
       Fallback für ältere Browser.
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

/*
   Jeder .memory-slider arbeitet unabhängig.
*/

document
    .querySelectorAll(
        ".memory-slider"
    )
    .forEach(
        function (slider) {

            /*
               Bilder suchen.
            */

            const bilder =
                slider.querySelectorAll(
                    ".memory-image"
                );


            /*
               Ohne Bilder gibt es nichts zu tun.
            */

            if (!bilder.length) {
                return;
            }


            /* -------------------------------------------------
               BEDIENELEMENTE
            ------------------------------------------------- */

            const pfeilLinks =
                slider.querySelector(
                    ".memory-arrow-left"
                );


            const pfeilRechts =
                slider.querySelector(
                    ".memory-arrow-right"
                );


            /*
               Es kann vorkommen, dass ältere HTML-Versionen
               mehrere .memory-dots Container enthalten.
            */

            const dotsContaineren =
                slider.querySelectorAll(
                    ".memory-dots"
                );


            let dotsContainer =
                dotsContaineren.length > 0
                    ? dotsContaineren[0]
                    : null;


            /*
               Überzählige Dot-Container entfernen.
            */

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

            let touchStartX = 0;

            let touchEndX = 0;


            const wechselzeit =
                5000;


            const mindestDistanz =
                50;


            /* -------------------------------------------------
               SLIDER VORBEREITEN
            ------------------------------------------------- */

            slider.style.position =
                "relative";


            bilder.forEach(
                function (bild, index) {

                    /*
                       Alle Bilder übereinanderlegen.
                    */

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


                    /*
                       Nur das erste Bild sichtbar.
                    */

                    const aktiv =
                        index === 0;


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


                    bild.style.transition =
                        "opacity 0.6s ease";


                    bild.style.cursor =
                        "pointer";


                    /*
                       Bild anklicken →
                       großer Bild-Viewer.
                    */

                    bild.addEventListener(
                        "click",
                        function (event) {

                            event.stopPropagation();


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


                        /*
                           Barrierefreiheit.
                        */

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


                        /*
                           Mausklick.
                        */

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


                        /*
                           Tastatur:
                           Enter oder Leertaste.
                        */

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

                                    event.stopPropagation();


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


            /*
               Punkte nach dem Erstellen erneut suchen.
            */

            const punkte =
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
                   Aktiven Punkt markieren.
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

                if (
                    bilder.length <= 1
                ) {
                    return;
                }


                aktuellesBild =
                    (
                        aktuellesBild + 1
                    ) %
                    bilder.length;


                zeigeBild();

            }


            /* -------------------------------------------------
               VORHERIGES BILD
            ------------------------------------------------- */

            function vorherigesBild() {

                if (
                    bilder.length <= 1
                ) {
                    return;
                }


                aktuellesBild =
                    (
                        aktuellesBild -
                        1 +
                        bilder.length
                    ) %
                    bilder.length;


                zeigeBild();

            }


            /* -------------------------------------------------
               AUTOMATISCHER WECHSEL
            ------------------------------------------------- */

            function starteSlider() {

                /*
                   Alten Timer immer zuerst löschen.
                */

                stoppeSlider();


                /*
                   Bei einem einzigen Bild
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

                if (timer !== null) {

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

                        event.preventDefault();

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

                        event.preventDefault();

                        event.stopPropagation();


                        naechstesBild();

                        starteSlider();

                    }
                );

            }


            /* -------------------------------------------------
               TASTATURSTEUERUNG
            ------------------------------------------------- */

            /*
               Slider kann per Tastatur fokussiert werden.
            */

            slider.setAttribute(
                "tabindex",
                "0"
            );


            slider.addEventListener(
                "keydown",
                function (event) {

                    /*
                       Wenn der große Bild-Viewer offen ist,
                       soll der Slider keine Pfeile verarbeiten.
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


                    /*
                       Automatik während des Wischens
                       kurz pausieren.
                    */

                    stoppeSlider();

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

                        starteSlider();

                        return;
                    }


                    touchEndX =
                        event.changedTouches[0].clientX;


                    const differenz =
                        touchEndX -
                        touchStartX;


                    /*
                       Nur bei einem ausreichend großen
                       horizontalen Wisch wechseln.
                    */

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

                    }


                    starteSlider();

                },
                {
                    passive: true
                }
            );


            /* -------------------------------------------------
               TOUCH ABBRUCH
            ------------------------------------------------- */

            slider.addEventListener(
                "touchcancel",
                function () {

                    starteSlider();

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
   Damit auch onclick="openImage(...)"
   oder onclick="closeImage()"
   im HTML funktionieren.
*/

window.openImage =
    openImage;

window.closeImage =
    closeImage;


/* =====================================================
   14. START
===================================================== */

/*
   Countdown sofort starten.
*/

if (countdownBox) {

    countdown();


    /*
       Jede Sekunde aktualisieren.
    */

    setInterval(
        countdown,
        1000
    );

}


/* =====================================================
   ENDE
===================================================== */
