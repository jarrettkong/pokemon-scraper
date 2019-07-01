

## Table of contents
* [Intro](#Build-Backend-App)
* [Getting Started](#Getting-Started)
* [How to Use](#How-to-Use)
* [Project Emphasis](#Project-Emphasis)
* [Future Plans](#Future-Plans)
* [License](#License)


# Build-Backend App

The goal of the project was to get an introduction relational databases and learn to integrate them to express using knex.

The app was created with a pokemon table for each of the original 151 pokemon, as well as a trainers dataset using the numbers from each pokemon to define the party of that trainer. 


## Getting Started

If you'd like to clone this repository to your own local machine, run the following command in your terminal:

```shell
git clone https://github.com/jarrettkong/pokemon-scraper.git
```

Then run the following command to install dependencies:

```shell
npm install
npm install -g nodemon
```

To view the app in action, run the following command in your terminal:

```bash
nodemon app.js
```

Then, go to `http://localhost:3001/` in your browser to see the code running in the browser.

---

## How to Use

### Get Data

#### Get all pokemon
- Method: GET
- Endpoint: /api/v1/pokemon

- EXAMPLE RESPONSE:
```json
[
  {
    "id": 1,
    "name": "Bulbasaur",
    "type": [
      "Grass",
      "Poison"
    ],
    "HP": 45,
    "Attack": 49,
    "Defense": 49,
    "Sp Attack": 65,
    "Sp Defense": 65,
    "Speed": 45
  },
  {
    "id": 2,
    "name": "Ivysaur",
    "type": [
      "Grass",
      "Poison"
    ],
    "HP": 60,
    "Attack": 62,
    "Defense": 63,
    "Sp Attack": 80,
    "Sp Defense": 80,
    "Speed": 60
  },
  {
    "id": 3,
    "name": "Venusaur",
    "type": [
      "Grass",
      "Poison"
    ],
    "HP": 80,
    "Attack": 82,
    "Defense": 83,
    "Sp Attack": 100,
    "Sp Defense": 100,
    "Speed": 80
  }
  ...
]
```

#### Get specific pokemon
- Method: GET
- Endpoint: /api/v1/pokemon/:id
- EXAMPLE RESPONSE:
```json
  {
    "id": 3,
    "name": "Venusaur",
    "type": [
      "Grass",
      "Poison"
    ],
    "HP": 80,
    "Attack": 82,
    "Defense": 83,
    "Sp Attack": 100,
    "Sp Defense": 100,
    "Speed": 80
  }
```

#### Get all trainers
- Method: GET
- Endpoint: /api/v1/trainers
- EXAMPLE RESPONSE:
```json
[
{
"id": 1,
"name": "Ash",
"pokemon": [
{
"id": 25,
"name": "Pikachu",
"type": [
"Electric"
],
"HP": 35,
"Attack": 55,
"Defense": 40,
"Sp Attack": 50,
"Sp Defense": 50,
"Speed": 90,
"created_at": "2019-07-01T13:07:13.207Z",
"updated_at": "2019-07-01T13:07:13.207Z"
}
...
],
"created_at": "2019-07-01T13:07:13.220Z",
"updated_at": "2019-07-01T13:07:13.220Z"
},
...
]
```

#### Get specific trainer
- Method: GET
- Endpoint: /api/v1/trainers/:id
- EXAMPLE RESPONSE:
```json
    {"id":19,"name":"Jessie","pokemon":[{"id":52,"name":"Meowth","type":["Normal"],"HP":40,"Attack":45,"Defense":35,"Sp Attack":40,"Sp Defense":40,"Speed":90,"created_at":"2019-07-01T13:07:13.207Z","updated_at":"2019-07-01T13:07:13.207Z"},{"id":24,"name":"Arbok","type":["Poison"],"HP":60,"Attack":95,"Defense":69,"Sp Attack":65,"Sp Defense":79,"Speed":80,"created_at":"2019-07-01T13:07:13.207Z","updated_at":"2019-07-01T13:07:13.207Z"},{"id":108,"name":"Lickitung","type":["Normal"],"HP":90,"Attack":55,"Defense":75,"Sp Attack":60,"Sp Defense":75,"Speed":30,"created_at":"2019-07-01T13:07:13.207Z","updated_at":"2019-07-01T13:07:13.207Z"},{"id":110,"name":"Weezing","type":["Poison"],"HP":65,"Attack":90,"Defense":120,"Sp Attack":85,"Sp Defense":70,"Speed":60,"created_at":"2019-07-01T13:07:13.207Z","updated_at":"2019-07-01T13:07:13.207Z"},{"id":113,"name":"Chansey","type":["Normal"],"HP":250,"Attack":5,"Defense":5,"Sp Attack":35,"Sp Defense":105,"Speed":50,"created_at":"2019-07-01T13:07:13.207Z","updated_at":"2019-07-01T13:07:13.207Z"}],"created_at":"2019-07-01T13:07:13.239Z","updated_at":"2019-07-01T13:07:13.239Z"}
```

### Post data

#### Add a new pokemon
- Method: POST
- Endpoint: /api/v1/pokemon
- EXAMPLE BODY:
```json
{
    "name": "Chikorite",
    "type": ["grass"],
    "HP": 45,
    "Attack": 49,
    "Defense": 65,
    "Sp Attack": 49,
    "SP Defense": 65,
    "Speed": 45
}
```

NOTE: All fields shown above are required.

- EXAMPLE RESPONSE:
```json
{ "id": 152 }
```

#### Add a new trainer
- Method: POST
- Endpoint: /api/v1/trainers
- EXAMPLE BODY:
```json
{
    "name": "Joe Johnson",
    "pokemon": [1, 2, 145, 15, 29, 29],
}
```
NOTE: All fields shown above are required.

- EXAMPLE RESPONSE:
```json
{ "id": 31 }
```

### Delete Data

#### Delete any record from constellations or stars
- Method: DELETE
- Endpoint: /api/v1/:table/:id
- EXAMPLE RESPONSE:
```json
{ "204 No Content" }
```

```json
{ "No id 'id' found in table 'table'." }
```


## Future Iterations

- Scraping pokemon data from Bulbapedia from pokemon name rather than requiring the user to do it
- Cascading deletes (e.g. deleting associated pokemon from trainer party when a pokemon is deleted)
- Updating DB to query based on official pokemon number instead of table id to be more predictable
- Creating a front end

## Project Emphasis

View the project specification on the <a href="http://frontend.turing.io/projects/build-your-own-backend.html">Turing webpage for this project</a>.

- [x] Node.js/Express
- [x] Knex
- [x] Relational Databases
- [x] Nightmare (web-scraping)
- [x] SQL
- [x] Postgres


## Licensing

All credit goes to <a href="turing.io">Turing School of Software</a> for providing the project specifications.
