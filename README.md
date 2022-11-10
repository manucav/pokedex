# Vue.js Pokédex

Pokédex feita em Vue.js 3 e Quasar Framework utilizando RESTful Pokémon API.

Disponível em: https://manucav.github.io/pokedex

A Pokédex integra os primeiros 250 Pokémons, com:

<ul>
<li> Nome e Tipo </li>
<li> Stats </li>
<li> Habilidades e movimentos </li>
</ul>

<div align="center">
<img src="https://www.imagemhost.com.br/images/2022/11/08/Pokedex.png" alt="Pokédex" border="0">
</div>
<br>
<div align="center">
<img src="https://www.imagemhost.com.br/images/2022/11/08/Stats.png" alt="Stats" border="0">
</div>

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).


### License
This project is licensed under the MIT License - look at [LICENSE.md](https://github.com/manucav/pokedex/blob/main/LICENSE) file for details.

### API
This project utilizes a RESTful Pokémon API - check the [API](https://pokeapi.co/docs/v2#fairuse) documentantion for details.

### To do 
- [ ] Ordenar os movimentos por level e ordem alfabética
- [ ] Colocar as evoluções anteriores e posteriores dos pokemons
- [ ] Implementar botão de carregar mais para carregar todas as gerações sem sobrecarregar a página
- [ ] Separar em componentes os conteúdos da página