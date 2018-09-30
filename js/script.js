// --- CLOCK --- //

function time() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    if (m < 10) {
        m = "0" + m;
    } else if (s < 10) {
        s = "0" + s;
    }
    document.querySelector('.time__current').textContent = h + ":" + m + ":" + s;
    setInterval(time, 500);
}


// --- SEARCH --- //

var el = document.querySelector('.search-bar__form').addEventListener('submit', function(e) {
    e.preventDefault();
    var url = 'https://duckduckgo.com/html/?q=test+test';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://www.duckduckgo.com');
    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
        } else {
            console.log(xhr.statusText);
        }
    }
    xhr.onerror = function(e) {
        console.log(xhr.statusText);
    }
    xhr.send(null);
});



// --- WEATHER --- //

function weatherHTML(path, weather, summary) {

    var parent = document.querySelector('.weather');
    var day = document.createElement('div');
    day.setAttribute('class', 'weather__day');
    parent.appendChild(day);

    var img = document.createElement('IMG');
    img.setAttribute('src', path+weather+'.svg');
    img.setAttribute('class', 'weather__day--icon');
    day.appendChild(img);

    var daySummary = document.createElement('p');
    daySummary.setAttribute('class', 'weather__day--summary');
    daySummary.innerHTML = summary;
    day.appendChild(daySummary);

};


function displayWeatherInfo(r) {
    console.log(r.daily.data[6].icon);
    console.log(r);
    var path = 'vendors/weather-icons-master/svg/';

    for (var i=0; i <= 6; i++) {
        switch (r.daily.data[i].icon) {
            case 'clear-day':
                weatherHTML(path, r.daily.data[i].icon, r.daily.data[i].summary);
                break;
            case 'partly-cloudy-day':
                weatherHTML(path, r.daily.data[i].icon, r.daily.data[i].summary);
                break;
            default:
                console.log('Error: Weather not found - add to switch');
        }

    };
};


function getWeather() {

    var endPoint = 'https://api.openweathermap.org/data/2.5/forecast/daily?id=3194360&APPID=b6d7e02b3cd752a56ab9b68deaf5cb22'

    var endPoint = 'https://api.darksky.net/forecast/50d023f1d3c8f0bbc957300c57d483fe/45.255,19.845';

    /*
    var xhr = new XMLHttpRequest();
    xhr.open('GET', endPoint);
    xhr.setRequestHeader('Content-Type', 'application/jsonp');
    xhr.onload = function() {
        if (xhr.status >= 200 && request.status < 400) {
            var data = JSON.parse(xhr.responseText);
        } else {
            console.log('Reached the server, but it returned an error.');
        }
    };
    xhr.onerror = function(e) {
        if (xhr.status == 0) {
            console.log('You are offline.');
        } else if (xhr.status == 404) {
            console.log('Requested URL not found.\n'+endPoint);
        } else if (xhr.status == 500) {
            console.log('Internal Server Error.');
        } else if (e == 'parseerror') {
            console.log('Error.\nParsing JSON Request failed.');
        } else if (e == 'timeout') {
            console.log('Request Time out.');
        } else {
            console.log('Unknown Error.\n'+xhr.responseText);
        }   
    };
    xhr.send();
    */

    $.ajax({
        type: 'GET',
        url: endPoint,
        dataType: 'jsonp',
        success: function(r) {
            displayWeatherInfo(r);
        },
        error: function(x,e) {
            console.log('Error');
        }
    });

};


function main() {
    time();
    getWeather();
};


main();
