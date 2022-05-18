const tempLabel = document.getElementById('temprature');
const locLabel = document.getElementById('location');
const dateandtimeLabel = document.querySelector('.dateandtime');
const text_box = document.querySelector('#city-name');
const cloudsInfoLabel = document.querySelector('#cloudy');
const humidityInfoLabel = document.querySelector('#humidity');
const windInfoLabel = document.querySelector('#wind');
const descInfoLabel = document.querySelector('#desc');
const searchBtn = document.querySelector('#search-button');
const tempSymbol = document.querySelector('#temprature-symbol');
const list = document.querySelector('.ul');
const weather_desc = document.querySelector('.status');
let temp = 0;

var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua" , "Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia", "Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre", "Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts" , "Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad" , "Tobago","Tunisia","Turkey","Turkmenistan","Turks" , "Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe",'Adilabad','Anantapur','Chittoor','Kakinada',"Guntur",'Hyderabad','Karimnagar','Khammam','Krishna','Kurnool','Mahbubnagar','Medak','Nalgonda','Nizamabad','Ongole','Hyderabad','Srikakulam','Nellore','Visakhapatnam','Vizianagaram','Warangal','Eluru','Kadapa'];


const updateInfoOnPage = (city) =>{

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a79fbf07467152b84b641196d03729e6`;

    fetch(url)
    .then((response)=>{
        // console.log(response.json());
        return response.json()
    })
    .then((city_information)=>{
        const city_info = city_information ;
        // console.log(city_info);
        const temp_in_kelvin = city_info.main.temp ;
        const temp_in_celcius = Math.round((temp_in_kelvin - 273.15));
        tempLabel.textContent = `${temp_in_celcius}°` ;      //Temperature Updated on Interface
    
        const city_name = city_info.name ;
        locLabel.textContent = city_name;        //Location Updated on Interface 
    
        const currentdate = new Date();
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let hour=`0${currentdate.getHours()}`;
        hour = hour.slice(-2);
        let minute=`0${currentdate.getMinutes()}`;
        minute = minute.slice(-2);
        let date=`0${currentdate.getDate()}`;
        date = date.slice(-2);
        let month=months[currentdate.getMonth()]
        let fullYear = currentdate.getFullYear().toString().slice(-2);
        const dateandtime =`${hour}:${minute}- ${date} ${month}'${fullYear}`;
        dateandtimeLabel.textContent = dateandtime; 
        
        
        
        
        const cloudinfo =  city_info.clouds.all ;
        cloudsInfoLabel.textContent = `${cloudinfo}%`;
        
        const humidityInfo =  city_info.main.humidity ;
        humidityInfoLabel.textContent = `${humidityInfo}%`;
        
        const windInfo = city_info.wind.speed ;
        windInfoLabel.textContent = `${windInfo} km/h`;
        
        const descInfo =  city_info.weather[0].main ;
        descInfoLabel.textContent = `${descInfo}`;
        weather_desc.textContent = `${descInfo}`;

        
        switch(descInfo){
            case 'Clear' : tempSymbol.innerHTML=`<div class="weatherIcon ">
                                                <div class="sunny effect3D">
                                                <div class="inner"></div>
                                                </div>
                                                </div>`;
                                                break;
            case 'Rain' : tempSymbol.innerHTML=`<div class="weatherIcon ">
                                                <div class="rain ">
                                                <div class="inner "></div>
                                                </div>
                                                </div>`;
                                                break;
            case 'Snow' : tempSymbol.innerHTML=`<div class="weatherIcon ">
                                                <div class="snow effect3D">
                                                <div class="inner"></div>
                                                </div>
                                                </div>`;
                                                break;
            case 'Clouds' : tempSymbol.innerHTML=`<div class="weatherIcon  ">
                                                <div class="cloudy ">
                                                <div class="inner "></div>
                                                </div>
                                                </div>`;
                                                break;
            case 'Haze' : tempSymbol.innerHTML=`<div class="weatherIcon">
                                                <div class="fog ">
                                                <div class="inner "></div>
                                                </div>
                                                </div>`;
                                                break;
        }
    
    })
    .catch((error)=>{
        console.log("inside catch");
        console.log(error);
    })
    }


updateInfoOnPage('jaipur');

searchBtn.addEventListener("click", ()=>{
    var city = text_box.value;
    text_box.value="";
    // console.log(city);
    updateInfoOnPage(city);
});

text_box.addEventListener('keypress', (event) => {
    list.innerHTML="";
    setTimeout(()=>{
        let searchedValue = text_box.value.toLowerCase();
        const words = searchedValue.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            finalStr = words[i];
            let results = country_list.filter(x => x.includes(finalStr));
            for (let i = 0; i < 10; i++){
                // console.log(results[i]);
                if (typeof results[i]!=='undefined'){
                    const listItem = document.createElement("li");
                    listItem.classList.add("list-item");
                    listItem.textContent=results[i];
                    list.append(listItem);
                }
            }
        }

        let firstLi = list.firstChild;
        // console.log(firstLi.textContent);
        if(temp == 0 && firstLi!==null){
            firstLi.style.border = '2px solid #4d4dff';
            temp++;

        
            document.addEventListener('keydown', function(e) {
                switch (e.keyCode) {
                    case 38:                                                               // alert('up');
                        let prevLi = firstLi.previousElementSibling;
                        // console.log(prevLi);
                        if(prevLi!==null){
                            firstLi.style.border = '';
                            prevLi.style.border = '2px solid #4d4dff';
                            firstLi = prevLi;
                            text_box.value = firstLi.textContent;
                        }
                        break;
                    case 40:                                                                // alert('down');
                        let nextLi = firstLi.nextElementSibling;
                        // console.log(nextLi);
                        if(nextLi!==null){
                            firstLi.style.border = '';
                            nextLi.style.border = '2px solid #4d4dff';
                            firstLi = nextLi;
                            text_box.value = firstLi.textContent;
                        }
                        break;
                }
            });
        }
    },0);





    if(event.key==='Enter' ){
        var city = text_box.value;
        text_box.value="";
        updateInfoOnPage(city);
    }
});






        // document.addEventListener('keypress', (event) => {
        //     const checkKey = text_box.checkKey;
        //     console.log(checkKey);
        // });
// function checkKey(e) {

//     e = e || window.event;

//     // if (e.keyCode == '38') {
//     //     console.log(e);
//     //     // up arrow
//     // }
//     if (e.keyCode == '40') {
//         // down arrow
//         document.addEventListener('keypress', (event) => {
//             console.log(event);
//             if(event.key==='ArrowDown'){
//                 console.log(event);
//             }
//         });
//     }
    
// }




// document.onkeydown = checkKey;

// function checkKey(e) {

//     e = e || window.event;

//     if (e.keyCode == '38') {
//         // up arrow
//     }
//     else if (e.keyCode == '40') {
//         // down arrow
//     }
//     else if (e.keyCode == '37') {
//        // left arrow
//     }
//     else if (e.keyCode == '39') {
//        // right arrow
//     }

// }

// document.addEventListener('keydown', function(e) {
//     switch (e.keyCode) {
//         case 37:
//             alert('left');
//             if(li.classList.contains('selector')){
                
//             }
            
            
            
            
            
            
//             break;
//         case 38:
//             alert('up');
//             break;
//         case 39:
//             alert('right');
//             break;
//         case 40:
//             alert('down');
//             break;
//     }
// });