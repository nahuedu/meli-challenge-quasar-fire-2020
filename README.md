# Operación Fuego de Quasar

## Nivel 1 *(ejecución local)*
El programa que contiene las funciones ```GetLocation``` y ```GetMessage``` se encuentra en ```src/cmd/main.ts```. Para poder ejecutarlo localmente se debe tener instalado nodejs.

> Antes de correrlo por primera vez instalar las dependencias con el comando ```npm install``` desde el directorio raíz

### GetLocation
```
npm run cmd location dist1 dist2 dist3
```
Donde ```dist1```, ```dist2``` y ```dist3``` son las distancias al emisor recibidas por los satélites Kenobi, Skywalker y Sato respectivamente.

### GetMessage
```
npm run cmd message
```
El array de mensajes que recibe por parámetro se debe especificar en ```src/cmd/params.ts```.

## Nivel 2 y 3 *(API REST)*

Se puede consumir la API a través de la siguiente url ```https://calm-ridge-59635.herokuapp.com```. Los contenedores gratuitos de Heroku se suspenden después de cierto tiempo de inactividad, con lo cual es posible que haya una demora en la respuesta la primera vez que se consume el servicio. A modo de ejemplo los endpoints se accederían de la siguiente forma:

### topsecret

```
POST -> https://calm-ridge-59635.herokuapp.com/topsecret

{
    "satellites": [
        {
            "name": "kenobi",
            "distance": 300,
            "message": ["este", "", "", "mensaje", ""]
        },
        {
            "name": "skywalker",
            "distance": 632.45,
            "message": ["", "es", "", "", "secreto"]
        },
        {
            "name": "sato",
            "distance": 1000,
            "message": ["este", "", "un", "", ""]
        }
    ]
}
```

### topsecret_split
```
GET -> https://calm-ridge-59635.herokuapp.com/topsecret_split
```

```
POST -> https://calm-ridge-59635.herokuapp.com/topsecret_split/kenobi
{
    "distance": 500,
    "message": ["", "were", "", "chosen", "one"]
}
```
