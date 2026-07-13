const zielDatum = new Date("2026-08-05T10:55:00");

function countdown() {
    const jetzt = new Date();
    const unterschied = zielDatum - jetzt;

    if (unterschied <= 0) {
        document.getElementById("countdown").innerHTML = `
            <div class="time-box">
                <div class="number">✈️</div>
                <div class="label">Der Urlaub beginnt!</div>
            </div>
        `;
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
