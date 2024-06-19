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
        bandeira.style.width = "20px"
        bandeira.style.marginLeft = "5px"

        // Display formated data
        cep.innerHTML = `<mark class="blue">CEP:</mark> ${data.cep}`;
        logradouro.innerHTML = `<mark class="blue">Logradouro:</mark> ${data.logradouro}`;
        bairro.innerHTML = `<mark class="blue">Bairro:</mark> ${data.bairro}`;
        local.innerHTML = `<mark class="blue">Localidade:</mark> ${data.localidade}`;
        uf.innerHTML = `<mark class="blue">UF:</mark> ${data.uf}`;
        uf.appendChild(bandeira);
        ibge.innerHTML = `<mark class="blue">IBGE:</mark> ${data.ibge}`;
        ddd.innerHTML = `<mark class="blue">DDD:</mark> ${data.ddd}`;

        // Remove hint text from screen and add cep data
        helpText.style.display = "none";
        cepData.style.display = "block";
    })
    .catch(error => {
        window.alert("Erro ao localizar CEP. Tente novamente.")
    });

    // Clean cep input
    document.getElementById("cepValue").value = "";
}
