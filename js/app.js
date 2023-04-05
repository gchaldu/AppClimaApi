//674e7c94792bfaf02f09ae8255c24779

const resultado = document.querySelector("#resultado");
const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e)
{
    e.preventDefault();
    //validar campos
    const ciudad = document.querySelector('#ciudad');
    const pais = document.querySelector('#pais');
    if( ciudad.value ==='' || pais.value==='')
    {
        GestinarMensaje('Los campos tienen que estar completos','error')
        console.log('vacia');
        return;
    }

    //consultar api
    consultarAPI(ciudad.value, pais.value);
}
function controladorApi(ciudad, pais) {
  //clima.consultarAPI(ciudad, pais);
  const clima = new Clima();
  clima.buscarClima()
}
function GestinarMensaje(mensaje, tipo) {
  const mensajeDiv = document.createElement("div");

  if (tipo === "error") {
    mensajeDiv.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );
    mensajeDiv.innerHTML = `
            <strong class="font-bold" >Error! </strong>
            <span class="block" >${mensaje} </span>
        `;

    container.appendChild(mensajeDiv);

    setTimeout(() => {
      mensajeDiv.remove();
    }, 4000);
  }
}

function consultarAPI(ciudad, pais) {
  const apikey = `674e7c94792bfaf02f09ae8255c24779`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q= ${ciudad},${pais}&appid=${apikey}`;
  spinnerMostrar();
  fetch(url)
    .then((respuesta) => {
        return respuesta.json();
    })
    .then((datos) => {
        limpiarHtml();
        if (datos.cod === "404") {
            GestinarMensaje("La Ciudad NO EXISTE", "error");
        }
        //console.log(datos);
        mostrarRespuestaHTML(datos);
        
    });
    
}

function kelvinACentigrados(temp)
{
    return parseInt(temp - 273.15);
}

function mostrarRespuestaHTML(datos)
{
    const {main: {temp, temp_max, temp_min}, name} = datos;
    const centigrados = kelvinACentigrados(temp);
    const centigrados_max = kelvinACentigrados(temp_max);
    const centigrados_min = kelvinACentigrados(temp_min);

    //console.log(temp);
    const city = document.createElement('p');
    city.innerHTML = `Clima en: ${name}`;
    city.classList.add('text-3xl', 'font-bold');

    const respuestaCentigrados = document.createElement('p');
    respuestaCentigrados.innerHTML = `${centigrados} &#8451;`;
    respuestaCentigrados.classList.add('font-bold', 'text-6xl');

    const respuestaCentigradosMax = document.createElement('p');
    respuestaCentigradosMax.innerHTML = `Max: ${centigrados_max} &#8451;`;
    respuestaCentigradosMax.classList.add('text-3xl');

    const respuestaCentigradosMin = document.createElement('p');
    respuestaCentigradosMin.innerHTML = `Min: ${centigrados_min} &#8451;`;
    respuestaCentigradosMin.classList.add('text-3xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(city);
    resultadoDiv.appendChild(respuestaCentigrados);
    resultadoDiv.appendChild(respuestaCentigradosMax);
    resultadoDiv.appendChild(respuestaCentigradosMin);

     resultado.appendChild(resultadoDiv);
}

function limpiarHtml()
{
    while(resultado.firstChild)
    {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinnerMostrar()
{
    limpiarHtml();
    const spinner = document.createElement('div');
    spinner.classList.add('sk-fading-circle');
    spinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `

    resultado.appendChild(spinner);
   
}

/* class Clima {

  constructor(){
  };

  consultarAPI(ciudad, pais) {
    const apikey = `674e7c94792bfaf02f09ae8255c24779`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q= ${ciudad},${pais}&appid=${apikey}`;
    console.log(url);
    fetch(url)
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((datos) => {
        if (datos.cod === "404") {
          GestinarMensaje("La Cuidad NO EXISTE", "error");
        }
        console.log(datos);
      });
  }
  buscarClima(e) {
    e.preventDefault();
    //validar campos
    const ciudad = document.querySelector("#ciudad");
    const pais = document.querySelector("#pais");
    if (ciudad.value === "" || pais.value === "") {
      GestinarMensaje("Los campos tienen que estar completos", "error");
      console.log("vacia");
      return;
    }
    //consultar api
    this.consultarAPI(ciudad.value, pais.value);
  }
}
 */