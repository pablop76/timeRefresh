//godziny rozpoczęcia załadunku
const tabStart = [];

// formatowanie godziny i minuty jezeli 0-9 dodaje 0 czyli 01,01,02 itd
function addZero(i) {
    return (i < 10) ? '0' + i : i;
}

function showTime() {
    const currentDate = new Date();

    document.getElementById('data').textContent = addZero(currentDate.getHours()) +
        ':' + addZero(currentDate.getMinutes()) +
        ':' + addZero(currentDate.getSeconds());

    setTimeout(function () {
        showTime()
    }, 1000);
}
showTime();

function start() {

    let now = new Date();

    //wstawienie do tabeli godziny rozpoczęcia załadunku 
    tabStart[(this.dataset.id) - 1] = now;
    console.log(tabStart)

    //wyswietlenie godziny rozpoczecia załadunku
    this.textContent = addZero(now.getHours()) +
        ':' + addZero(now.getMinutes());
    this.classList = 'noBtn';

    // zablokowanie mozliwosci klkniecia po ustawieniu startu
    this.setAttribute('disabled', true);

    //odpalenie czasu, który upłynął
    difference();
}

//petla po przyciskach startujących i nasłuchiwanie kliknięcia, uruchomienie funkcji start()
let btnStart = document.getElementsByClassName('data');
for (let i = 0; i < btnStart.length; i++) {
    btnStart[i].addEventListener('click', start);
};

//zwraca aktualna data
function timeCurrently() {
    let currently = new Date();
    return currently;
}

//oblicz różnice start/aktualny czas
function difference() {
    let differenceTr = document.getElementsByClassName("difference");
    let differenceTime = [];

    //aktualny czas
    for (let i = 0; i < tabStart.length; i++) {
        if (tabStart[i] == undefined)
            differenceTime[i] = '';
        else
            differenceTime[i] = timeCurrently().getTime() - tabStart[i].getTime();
        //przekształcenie liczby milisekund w sekundy i przetwożenie na system dziesiętny i wypisanie w tabeli
        if (differenceTime[i] == 0) {
            differenceTr[i].innerHTML = '';
        } else {
            differenceTr[i].innerHTML = parseInt(differenceTime[i] / 1000, 10) + ' sek';
        }

    }
    setTimeout(function () {
        difference();
    }, 1000);
}
