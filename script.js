```javascript
// Zielzeit des Abflugs
const zielDatum = new Date("August 5, 2026 10:55:00").getTime();


function countdown(){

    const jetzt = new Date().getTime();

    const unterschied = zielDatum - jetzt;


    // Wenn der Countdown abgelaufen ist
    if(unterschied <= 0){

        document.getElementById("countdown").innerHTML = `
            <div class="time-box">
                <div class="number">✈️</div>
                <div class="label">Es geht los!</div>
            </div>
        `;

        return;
    }


    // Berechnung der Zeit
    const tage = Math.floor(
        unterschied / (1000 * 60 * 60 * 24)
    );

    const stunden = Math.floor(
        (unterschied % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minuten = Math.floor(
        (unterschied % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const sekunden = Math.floor(
        (unterschied % (1000 * 60)) /
        1000
    );


    // Anzeige auf der Webseite
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


// Sofort starten
countdown();

// Jede Sekunde aktualisieren
setInterval(countdown,1000);
```
