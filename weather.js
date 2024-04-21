let notif=document.querySelector(".notif");
let temper=document.querySelector(".temperaturee");
let icons=document.querySelector(".icon");
let desc=document.querySelector(".descript");
let country=document.querySelector(".country");
let time=document.querySelector("#time");
let humidity=document.querySelector(".humidity");
let wind=document.querySelector(".wind");
let imgs=document.querySelector(".imgs")
let weather={};
weather.temperature = {
    unit :"celsius"
}
const d = new Date();
const week= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
document.getElementById("time").innerHTML=`${week[d.getDay()]+", "+d.getHours()+":"+d.getMinutes()}`;
const kel=273;
let key="82005d27a116c2880c8f0fcb866998a0";
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(setpos,showerr);
}
function setpos(pos){
    let latitude=pos.coords.latitude;
    let longitude=pos.coords.longitude;
    getWeather(latitude, longitude);
}
function showerr(error){
    notif.style.display = "block";
    notif.innerHTML = `<p> ${error.message} </p>`;
}
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function(response){
            let res = response.json();
            return res;
        })
        .then(function(res){
            weather.temperature.value = Math.floor(res.main.temp - kel);
            weather.description = res.weather[0].description;
            weather.iconsid = res.weather[0].icon;
            weather.city = res.name;
            weather.country = res.sys.country;
            weather.humid=res.main.humidity;
            weather.wind=res.wind.speed;
            weather.imgsid = res.weather[0].icon;
        })
        .then(function(){
            displayWeather();
        });
}
function displayWeather(){
    icons.innerHTML = `<img src="icons/${weather.iconsid}.png"/>`;
    temper.innerHTML = `${weather.temperature.value}<span>°C</span>`;
    desc.innerHTML = weather.description;
    country.innerHTML = `${weather.city}, ${weather.country}`;
    humidity.innerHTML = `<span>Humidity&#x1F4A7;</span><br>${weather.humid}%`;
    wind.innerHTML=`<span>Wind</span><br>${weather.wind} Km/hr`;
    imgs.innerHTML = `<img src="icons/${weather.imgsid}.jpg"/>`;
}
