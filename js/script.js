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
    setInterval(time, 500000); }


// --- SEARCH --- //

var el = document.querySelector('.search-bar__form').addEventListener('submit', function(e) {
    var searchStr = document.querySelector('.search-bar__form--input').value;
    var result = searchStr.replace(' ', '+'); 
    var link = 'https://duckduckgo.com/?q=' + result + '&t=h_&atb=v1-1&ia=web'
    window.open(link);
});



// --- WEATHER --- //


function weatherHTML(path, weather, summary, tempHigh, tempLow, i) {

    var dayNum = i+1;
    var el = document.querySelector('.js--weather__day0'+dayNum);
    var elChildNodes = el.childNodes;

    // icon
    elChildNodes[1].setAttribute('src', path+weather+'.svg');
    // temp
    elChildNodes[3].innerHTML = tempHigh + '&deg;C' + ' | ' + tempLow + '&deg;C' + ' - ';
    // summary
    elChildNodes[5].innerHTML = summary;
}


function displayWeatherInfo(r) {
    console.log(r);
    var path = 'vendors/weather-icons-master/svg/';

    for (var i=0; i <= 6; i++) {
        var icon = r.daily.data[i].icon;
        var summary = r.daily.data[i].summary;
        var tempHigh = Math.round((r.daily.data[i].apparentTemperatureHigh - 32) * 5/9);
        var tempLow = Math.round((r.daily.data[i].apparentTemperatureLow - 32) * 5/9);
        switch (r.daily.data[i].icon) {
            case 'clear-day':
                weatherHTML(path, icon, summary, tempHigh, tempLow, i);
                break;
            case 'partly-cloudy-day':
                weatherHTML(path, icon, summary, tempHigh, tempLow, i);
                break;
            case 'partly-cloudy-night':
                weatherHTML(path, icon, summary, tempHigh, tempLow, i);
                break;
            case 'fog':
                weatherHTML(path, icon, summary, tempHigh, tempLow, i);
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


// --- TODO --- //

document.querySelector('.todo__form').addEventListener('submit', newTask);
document.addEventListener('DOMContentLoaded', localStorageOnLoad);


function newTask(e) {
    e.preventDefault();
    const task = document.querySelector('.todo__form--input').value; 
    
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'tasks__element--remove';
    removeBtn.setAttribute('href', '#');
    removeBtn.textContent = 'X';
    removeBtn.addEventListener('click', removeTask);

    const taskList = document.querySelector('.tasks');
    const taskElement = document.createElement('li');
    taskElement.setAttribute('class', 'tasks__element');
    taskElement.textContent = task;
    taskElement.appendChild(removeBtn);
    taskList.appendChild(taskElement);

    addTaskToLocalStorage(task);
};


function removeTask(e) {
    var elem = e.target.parentElement;
    elem.style.transform = 'translateX(-100px)';
    setTimeout(function() {
        elem.remove();
    }, 500);
    removeTaskLocalStorage(e.target.parentElement.textContent);
};


function addTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


function getTasksFromLocalStorage() {
    let taskse;
    const tasksLS = localStorage.getItem('tasks');
    if (tasksLS === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(tasksLS);
    }
    return tasks;
};


function localStorageOnLoad() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(function(task) {
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'tasks__element--remove';
        removeBtn.setAttribute('href', '#');
        removeBtn.textContent = 'X';
        removeBtn.addEventListener('click', removeTask);

        const taskList = document.querySelector('.tasks');
        const taskElement = document.createElement('li');
        taskElement.setAttribute('class', 'tasks__element');
        taskElement.textContent = task;
        taskElement.appendChild(removeBtn);
        taskList.appendChild(taskElement);
    });
};


function removeTaskLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    const taskDelete = task.substring(0, task.length - 1);
    tasks.forEach(function(task,index) {
        if (taskDelete === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};



// --- MAIN --- //

function main() {
    time();
    getWeather();
};


main();


// --- EVENTS --- //

var el = document.querySelector('.js--weather__day01');
var week = document.querySelector('.weather__week');
el.addEventListener('mouseover', function() {
    // week.style.display = 'block';
    week.classList.add('weather__week--transitioned');
});
el.addEventListener('mouseout', function() {
    week.classList.remove('weather__week--transitioned');
});
