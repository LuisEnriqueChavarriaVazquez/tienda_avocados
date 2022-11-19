//Obtenemos la URL
const URL = "https://platzi-avo.vercel.app/api/avo";
const URLimagenes = "https://platzi-avo.vercel.app";

//Accedemos al contenedor padre del HTML
let mainContainer = document.getElementById('containerAvoMain');

//Obtenemos la data (Solo eso)
async function getData(urlApi, urlImagenes){
    let data = await fetch(urlApi);
    let dataGotten = await data.json();

    //Obtenemos los nombres, precios e imagenes
    let avoNames = [];
    let avoPrices = [];
    let avoImage = [];
    let longitud = dataGotten.length;
    for(var i = 0; i < longitud; i++){
        avoNames.push(dataGotten.data[i].name);
        //Damos formato al precio
        let priceWithFormat = formatPrice(dataGotten.data[i].price)
        avoPrices.push(priceWithFormat);
        avoImage.push(urlImagenes + dataGotten.data[i].image);
    }

    return {avoNames, avoPrices, avoImage, longitud};
}

//Hacemos un función para poner los textos en formato internacional
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat("en-EN", {
        style: 'currency',
        currency: "GBP"
    }).format(price);
    return newPrice;
}   

//La funcion asincrona nos retorna una promesa con los datos
let resultado = getData(URL, URLimagenes);
//Debemos acceder a la promesa con los datos.
resultado
.then((response) => {
    for(var i = 0; i < response.longitud; i++){
        //Creamos los elementos, les damos una clase y les metemos la data
        let containerFather = document.createElement("div");
        containerFather.className = 'avoCard';
        let avoImageContainer = document.createElement('img');
        avoImageContainer.className = 'avoImage';
        let avoNameContainer = document.createElement('h6');
        avoNameContainer.className = 'avoName';
        let avoPriceContainer = document.createElement('p');
        avoPriceContainer.className = 'avoPrice';
        //Creamos los nodos de texto (Son objetos de texto => nodos)
        let nodoTextoPrices = document.createTextNode(response.avoPrices[i]);
        let nodoTextoNames = document.createTextNode(response.avoNames[i]);
        let nodoTextoPrices_2 = document.createTextNode(response.avoPrices[i]);
        let nodoTextoNames_2 = document.createTextNode(response.avoNames[i]);
        //Metemos los nodos de texto y el atributo como texto normal
        avoImageContainer.src = response.avoImage[i];
        avoNameContainer.append(nodoTextoNames);
        avoPriceContainer.append(nodoTextoPrices);
        //Metemos los elementos en contenedor padre
        containerFather.append(avoImageContainer, avoNameContainer, avoPriceContainer);
        //Metemos los elementos al contenedor main
        mainContainer.appendChild(containerFather);

        //Creamos los contenedores para la data adicional (Para el pop up)
        let containerExtraInfo = document.createElement('div');
        containerExtraInfo.className = "containerExtraP";
        let paraf_one = document.createElement('p');
        paraf_one.append(nodoTextoNames_2);
        let paraf_two = document.createElement('p');
        paraf_two.append(nodoTextoPrices_2);
        containerExtraInfo.append(paraf_one, paraf_two);
        let mainExtraDataPopUp = document.getElementById('dataMain');
        mainExtraDataPopUp.append(containerExtraInfo);
    
    }
})
.then((response) => {
    //Funcion para mostrar los datos de los elementos
    let cards = document.getElementsByClassName('avoCard'); //es un node list
    let extraData = document.getElementsByClassName('extraData');

    //Activamos la funcion de click
    for(var i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', mostrarExtraData);
    }
    //Mostramos la data extra
    function mostrarExtraData(){
        extraData[0].classList.remove('hidden');
    }

    //Activamos el boton de cierre
    let buttonClose = document.getElementsByClassName('btnClose');
    for(var i = 0; i < buttonClose.length; i++){
        buttonClose[i].addEventListener('click', quitarExtraData);
    }

    //Quitamos la data
    function quitarExtraData(){
        extraData[0].classList.add('hidden');
    }
})


