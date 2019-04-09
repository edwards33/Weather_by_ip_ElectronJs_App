const IPFIND_API_KEY = ''
const OPENWEATHERMAP_API_KEY = ''

function httpGet(theUrl){
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", theUrl, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
}

function findWeather(){
    url = 'https://api.ipify.org/?format=jsonp&callback=getIP'
    var http_response1 = httpGet(url)
    stringVar = http_response1

    var arr1 = stringVar.split("({")
    var arr2 = arr1[1].split(':"')
    var arr3 = arr2[1].split('"}')
    finalIP = arr3[0]
    latLongUrl = "https://ipfind.co/?ip=" + finalIP + "&auth=" + IPFIND_API_KEY
    var latLongResponse = httpGet(latLongUrl)
    var latLongResponse_response_json = JSON.parse(latLongResponse)
    var lat = latLongResponse_response_json.latitude
    var lon = latLongResponse_response_json.longitude

    api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + OPENWEATHERMAP_API_KEY
    var http_response = httpGet(api_url)

    var http_response_json = JSON.parse(http_response)
    document.getElementById("outputTemp").hidden = false
    document.getElementById("Temperature").value = http_response_json.main.temp
    fahreinheightTemp = http_response_json.main.temp * 9/5 + 32
    document.getElementById("fahreinheight").value = fahreinheightTemp
    document.getElementById("Windspeed").value = http_response_json.wind.speed
    document.getElementById("temp_max").value = http_response_json.main.temp_max
    document.getElementById("temp_min").value = http_response_json.main.temp_min
    document.getElementById("Pressure").value = http_response_json.main.pressure
    document.getElementById("description").value = http_response_json.weather[0].description
    document.getElementById("humidity").value = http_response_json.main.humidity
    document.getElementById("name").value = http_response_json.name
    document.getElementById("ip").value = finalIP
}