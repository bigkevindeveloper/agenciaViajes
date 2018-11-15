//Inizializo con express.
const express = require('express');

const app = express();


app.use(express.static(__dirname + '/public_html'));

//Actualizamos la ruta principal de la agencia de viajes
//al ser un single plage solo tendriamos la ruta index. la principal.11
app.get('/', (req,res)  => {
	res.sendFile(`${__dirname}/public_html/index.html`);
});
app.listen(3000, () => console.log('Estado del servidor: OK '));