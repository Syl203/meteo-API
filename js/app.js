const meteoIcones = {
    "Clear": "wi wi-day-sunny",
    "Clouds": "wi wi-day-cloudy",
    "Drizzle": "wi wi-day-sleet",
    "Rain": "wi wi-day-rain",
    "Snow": "wi wi-day-snow",
    "Mist": "wi wi-day-fog"
}

async function main(withIP=true){

    let ville;

    if(withIP){
        const ip = await fetch('https://api.ipify.org?format=json')
            .then(resultat => resultat.json())
            .then(json => json.ip)
            

        ville = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=751bca42364846278cbd3d2456ed0367&ip=${ip}&fields=city`)
            .then(resultat => resultat.json())
            .then(json => json.city)

    }
    else{
        ville = document.querySelector('#ville').textContent;
    }
                    

    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=9c11fa3a20a1907d630e2ba21121b5ee&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(json => json)


    afficherDonneesMeteo(meteo)
  
}

function afficherDonneesMeteo(data){
    const nom = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = nom;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = description;
    document.querySelector('i.wi').className = meteoIcones[conditions]
}

const ville = document.querySelector('#ville');
ville.addEventListener('click', () => {
    ville.contentEditable = true;
})

ville.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
        e.preventDefault();
        ville.contentEditable = false;
        main(false)
    }
})

main();