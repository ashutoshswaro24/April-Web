const weatherApiKey = "622ff9ae61fc375fb5e1cc2cd33d2f0d";
const movieApiKey = "64dbc476";


async function getWeather() {

    let city = document.getElementById("city").value.trim();

    if(city===""){
        alert("Please enter a city name.");
        return;
    }

    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

    try{

        let response=await fetch(url);
        let data=await response.json();

        if(data.cod!=200){
            document.getElementById("weatherResult").innerHTML=
            `<p>${data.message}</p>`;
            return;
        }

        document.getElementById("weatherResult").innerHTML=`

            <h2>${data.name}</h2>

            <p>🌡 Temperature : ${data.main.temp} °C</p>

            <p>💧 Humidity : ${data.main.humidity}%</p>

            <p>☁ Weather : ${data.weather[0].description}</p>

        `;

    }

    catch(error){

        document.getElementById("weatherResult").innerHTML=
        "Unable to fetch weather data.";

    }

}

async function getMovie(){

    let movie=document.getElementById("movie").value.trim();

    if(movie===""){
        alert("Please enter a movie name.");
        return;
    }

    let url=`https://www.omdbapi.com/?apikey=${movieApiKey}&t=${movie}`;

    try{

        let response=await fetch(url);
        let data=await response.json();

        if(data.Response==="False"){

            document.getElementById("movieResult").innerHTML=
            `<p>${data.Error}</p>`;

            return;

        }

        document.getElementById("movieResult").innerHTML=`

        <h2>${data.Title}</h2>

        <img src="${data.Poster}" width="180">

        <p>📅 Year : ${data.ReleaseYear}</p>

        <p>⭐ IMDb Rating : ${data.imdbRating}</p>

        <p><b>Genre :</b> ${data.Genre}</p>

        <p><b>Director :</b> ${data.Director}</p>

        `;

    }

    catch(error){

        document.getElementById("movieResult").innerHTML=
        "Unable to fetch movie details.";

    }

}