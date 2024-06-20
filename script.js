// API request
function getCEP() {
    // Get hint and cep data HTML elements
    var helpText = document.getElementById("help");
    var cepData = document.getElementById("cep-data");
    var cepValue = document.getElementById("cepValue").value;

    // Get cep data HTML elements
    var cep = document.getElementById("cep");
    var logradouro = document.getElementById("logradouro");
    var bairro = document.getElementById("bairro");
    var local = document.getElementById("local");
    var uf = document.getElementById("uf");
    var ibge = document.getElementById("ibge");
    var ddd = document.getElementById("ddd");

    // API request
    fetch(`https://viacep.com.br/ws/${cepValue}/json`)
    .then(response => response.json())
    .then(data => {
        if (data.erro) {
            window.alert("Erro ao localizar CEP digitado.");
            return;
        }
        /// state flag
        const bandeira = document.createElement("img");
        bandeira.src = `assets/bandeiras/${data.uf}.png`;
        bandeira.alt = `Bandeira do estado de ${data.uf}`;
        bandeira.style.width = "25px"
        bandeira.style.marginLeft = "5px"

        // Display formated data
        cep.innerHTML = `<mark class="blue">CEP:</mark> ${data.cep}`;
        logradouro.innerHTML = `<mark class="blue">Logradouro:</mark> ${data.logradouro}`;
        bairro.innerHTML = `<mark class="blue">Bairro:</mark> ${data.bairro}`;
        local.innerHTML = `<mark class="blue">Localidade:</mark> ${data.localidade}`;
        uf.innerHTML = `<mark class="blue">UF:</mark> ${data.uf}`;
        uf.appendChild(bandeira);
        ibge.innerHTML = `<mark class="blue">IBGE:</mark> ${data.ibge}`;
        ddd.innerHTML = `<mark class="blue">DDD:</mark> 0${data.ddd}`;
    
        // Remove hint text from screen and add cep data
        helpText.style.display = "none";
        cepData.style.display = "block";

        // Map latitude and longitude function
        const logradouroEncode = encodeURIComponent(data.logradouro);
        const bairroEncode = encodeURIComponent(data.bairro);
        const localEncode = encodeURIComponent(data.localidade);
        const ufEncode = encodeURIComponent(data.uf);
        const url = `https://nominatim.openstreetmap.org/search?q=${logradouroEncode}+${bairroEncode}+${localEncode}+${ufEncode}&format=json&polygon=1&addressdetails=1`;
        console.log(url)
        fetch(url)
        .then(response => response.json())
        .then(data => {

            // Map with current CEP location
            var map = L.map('map').setView([data[0].lat, data[0].lon], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            
            // Map marker
            var marker = L.marker([data[0].lat, data[0].lon]).addTo(map);
        })
    })
    .catch(error => {
        window.alert("Erro ao localizar CEP. Tente novamente.")
    });

    // Clean cep input
    document.getElementById("cepValue").value = "";
}
