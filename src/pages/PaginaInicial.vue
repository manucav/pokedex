<template>
  <q-layout view="lHh Lpr lFf">
    <q-page class="flex">
      <q-header class="header q-pl-xl">
        <h1>Pokédex</h1>
      </q-header>

      <div style="margin-top: 100px" class="container-search">
        <q-input
          :input-style="{ color: 'white' }"
          color="orange"
          label-color="white"
          v-model="search"
          outlined
          label="Pesquisar"
          class="search-pokemon"
        />
      </div>

      <div class="flex row wrap justify-center items-center q-pa-md">
        <div
          v-for="pokemon in filtered_pokemons"
          :key="pokemon.name"
          class="q-pa-sm"
        >
          <q-card
            bordered
            @click="show_pokemon(get_id(pokemon))"
            class="principal-card self-center"
          >
            <div>
              <div>
                <q-img
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${get_id(
                    pokemon
                  )}.png`"
                  :alt="pokemon.name"
                  class="img-pokemon"
                />
              </div>
              <h2 class="text-center q-pt-sm">
                {{ get_name(pokemon) }}
              </h2>
            </div>
          </q-card>
        </div>
      </div>

      <q-dialog v-model="show_dialog">
        <q-card v-if="selected_pokemon" class="q-pa-xl dialog">
          <div
            class="container-dialog"
            style="@media (min-width: 320px) and (max-width: 374px) {
            .container-dialog {
              display: flex;
              justify-content: center;
              align-items: center;
              }"
          >
            <div class="column img-selected-pokemon height">
              <div
                class="col-5 column-img"
                style="@media (min-width: 320px) and (max-width: 374px) {
                  .column-img {
                    height: 150px !important;
                    width: 200px;
                  }
                  "
              >
                <q-img
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selected_pokemon.id}.png`"
                  :alt="selected_pokemon.name"
                  width="200px"
                  style="@media (min-width: 320px) and (max-width: 374px) {
                  .q-img {
                    transform: scale(0.8)
                    width: auto;
                    height: auto;
                  }
                   @media (min-width: 375px) and (max-width: 380px) and (min-height: 667) {
                    .q-img {
                      padding-top: 140px;
                      transform: scale(0.8)
                  }
                  "
                />
              </div>

              <div class="col-8 stats container-selected-pokemon remove">
                <h3 class="name-selected-pokemon remove">
                  {{ get_name(selected_pokemon) }}
                </h3>
                <q-chip
                  class="capitalize types-pokemon"
                  square
                  v-for="type in selected_pokemon.types"
                  :key="type.slot"
                  :class="type.type.name"
                  >{{ type.type.name }}
                </q-chip>
                <q-separator spaced />
                <q-chip square class="inf-pokemon height-pokemon"
                  >Altura {{ selected_pokemon.height * 2.54 }} cm</q-chip
                >
                <q-chip square class="inf-pokemon weight-pokemon"
                  >Peso
                  {{ (selected_pokemon.weight * 0.45359237).toFixed(0) }}
                  kg</q-chip
                >
              </div>
            </div>

            <div class="align remove none">
              <h3 class="name-selected-pokemon none">
                {{ get_name(selected_pokemon) }}
              </h3>
            </div>
            <div class="col-8 stats container-selected-pokemon align none">
              <q-chip
                class="capitalize types-pokemon none"
                square
                v-for="type in selected_pokemon.types"
                :key="type.slot"
                :class="type.type.name"
                >{{ type.type.name }}
              </q-chip>
            </div>

            <div class="stats-pokemon">
              <h3>Stats</h3>
              <div class="stats-pokemon">
                <q-chip square class="hp"
                  >Hp {{ get_hp(selected_pokemon) }}</q-chip
                >
                <q-chip square class="atk"
                  >Ataque {{ get_att(selected_pokemon) }}</q-chip
                >
                <q-chip square class="def"
                  >Defesa {{ get_def(selected_pokemon) }}</q-chip
                >
                <q-chip square class="atk-sp"
                  >Atk Esp. {{ get_special_att(selected_pokemon) }}</q-chip
                >
                <q-chip square class="def-sp"
                  >Def Esp. {{ get_special_def(selected_pokemon) }}</q-chip
                >
                <q-chip square class="speed"
                  >Velocidade {{ get_speed(selected_pokemon) }}</q-chip
                >
              </div>
            </div>

            <div>
              <h3 class="q-mt-md pokemon-abilities">Habilidades</h3>
              <q-chip
                class="capitalize inf pokemon-abilities"
                square
                v-for="ability in selected_pokemon.abilities"
                :key="ability.slot"
              >
                {{ ability.ability.name }}
              </q-chip>
            </div>

            <div>
              <h3 class="move-title q-mt-md">Movimentos</h3>
            </div>
            <div class="list-pokemon q-pl-md" style="height: 480px">
              <h4>Level</h4>
              <div
                v-for="element in filter_moves(selected_pokemon)"
                :key="element.move.name"
              >
                <h5 class="lv-pokemon">{{ get_move_level(element) }}</h5>
              </div>
            </div>
            <div class="list-pokemon q-pl-md" style="height: 480px">
              <h4>Nome</h4>
              <div
                v-for="element in filter_moves(selected_pokemon)"
                :key="element.move.name"
              >
                <h5 class="move-pokemon">{{ element.move.name }}</h5>
              </div>
            </div>
          </div>
        </q-card>
      </q-dialog>
    </q-page>
  </q-layout>
</template>

<script>
import api from "../services/api.js";
import PokemonCard from "../components/PokemonCard.vue";
import PokemonDrawer from "../components/PokemonDrawer.vue";
export default {
  name: "PaginaInicial",

  data() {
    return {
      pokemons: [],
      search: "",
      show_dialog: false,
      selected_pokemon: null,
      pokeData: [],
    };
  },

  mounted() {
    api.get("/pokemon?limit=250").then((response) => {
      this.pokemons = response.data.results;
    });
  },

  methods: {
    get_id(pokemon) {
      return Number(pokemon.url.split("/")[6]);
    },
    get_name(pokemon) {
      return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    },
    get_hp(pokemon) {
      return pokemon.stats[0].base_stat;
    },
    get_att(pokemon) {
      return pokemon.stats[1].base_stat;
    },
    get_def(pokemon) {
      return pokemon.stats[2].base_stat;
    },
    get_special_att(pokemon) {
      return pokemon.stats[3].base_stat;
    },
    get_special_def(pokemon) {
      return pokemon.stats[4].base_stat;
    },
    get_speed(pokemon) {
      return pokemon.stats[5].base_stat;
    },

    show_pokemon(id) {
      api.get(`/pokemon/${id}`).then((response) => {
        this.selected_pokemon = response.data;
        this.show_dialog = !this.show_dialog;
      });
    },

    get_move_level(move) {
      for (let version of move.version_group_details) {
        if (
          version.version_group.name == "omega-ruby-alpha-sapphire" &&
          version.move_learn_method.name == "level-up"
        ) {
          return version.level_learned_at;
        }
      }
      return 0;
    },

    filter_moves(pokemon) {
      return pokemon.moves.filter((element) => {
        let include = false;
        for (let version of element.version_group_details) {
          if (
            version.version_group.name == "omega-ruby-alpha-sapphire" &&
            version.move_learn_method.name == "level-up"
          ) {
            include = true;
          }
        }
        return include;
      });
    },
  },

  computed: {
    filtered_pokemons() {
      return this.pokemons.filter((element) => {
        return element.name.includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.q-page {
  background-color: white;
  min-height: 0px !important;
}

.q-header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fc7a1e;
}

.none {
  display: none;
}

.header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}

.container-search {
  display: flex;
  width: 100%;
  justify-content: center;
}

.search-pokemon {
  width: 89%;
  background-color: white;
  border-radius: 5px;
  background-color: #13293d;
}

.q-card {
  cursor: pointer;
}

.principal-card {
  background-color: #13293d;
  width: 155px;
  height: 180px;
}

.img-pokemon {
  width: 94% !important;
}

.dialog {
  width: 820px !important;
  height: 800px;
}

.height {
  height: 200px;
}

@media (min-width: 600px) {
  .q-dialog__inner--minimized > div {
    max-width: 820px;
  }
}

.q-chip {
  font-family: "Josefin Sans", sans-serif;
  font-weight: bold;
}

.stats {
  margin-right: 200px;
  margin-top: 20px;
}

.list-pokemon {
  display: inline-block;
  text-align: center;
  height: 100%;
}

.move-pokemon {
  text-transform: capitalize;
}

.bug {
  background-color: #04a777;
  color: white;
}

.dark {
  background-color: #484a47;
  color: white;
}

.dragon {
  background-color: #6b2d5c;
  color: white;
}

.electric {
  background-color: #eeb902;
  color: white;
}

.fairy {
  background-color: #f79ad3;
  color: white;
}

.fighting {
  background-color: #f45d01;
  color: white;
}

.fire {
  background-color: red;
  color: white;
}

.flying {
  background-color: #00a896;
  color: white;
}

.ghost {
  background-color: #331832;
  color: white;
}

.grass {
  background-color: #97cc04;
  color: white;
}

.ground {
  background-color: #c6d649;
  color: white;
}

.ice {
  background-color: #34e5ff;
  color: white;
}

.normal {
  background-color: #5c6d70;
  color: white;
}

.rock {
  background-color: #4f3824;
  color: white;
}

.poison {
  background-color: #820263;
  color: white;
}

.psychic {
  background-color: #ed217c;
  color: white;
}

.steel {
  background-color: #484a47;
  color: white;
}

.water {
  background-color: #2d7dd2;
  color: white;
}

.hp {
  background-color: red;
  color: white;
}

.atk {
  background-color: orange;
  color: white;
}

.def {
  background-color: #ffcc00;
  color: white;
}

.def-sp {
  background-color: #00abf0;
  color: white;
}

.atk-sp {
  background-color: #00ab41;
  color: white;
}

.speed {
  background-color: #fd5da8;
  color: white;
}

.inf-pokemon {
  background-color: #111d4a;
  color: #fafffd;
}

.inf {
  background-color: #342e37;
  color: white;
}

/* mobile */

@media (min-width: 280px) {
  .q-dialog__inner--minimized > div {
    max-width: 800px;
    max-height: 100%;
    overflow-x: hidden;
  }
}

@media (min-width: 280px) and (max-width: 425px) {
  .principal-card {
    background-color: #13293d;
    width: 128px;
    height: 160px;
  }

  h2 {
    font-size: 18px;
  }

  .dialog {
    width: 310px !important;
    height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .move-pokemon {
    display: none;
  }

  .list-pokemon {
    display: none;
  }

  .move-title {
    display: none;
  }

  .q-separator {
    display: none;
  }

  .container-selected-pokemon {
    display: inline-block;
    margin: 0 auto;
    text-align: center;
  }

  .height-pokemon {
    display: none;
  }

  .remove {
    display: none;
  }

  .weight-pokemon {
    display: none;
  }

  .stats-pokemon {
    display: inline-block;
    margin: 0 auto;
    text-align: center;
    height: 100%;
    width: 90%;
    margin-left: 5%;
  }

  .pokemon-abilities {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
  }

  .align {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
  }

  .height {
    height: 175px;
  }

  .none {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .column > .col-5,
  .column > .col-xs-5 {
    height: auto;
    width: auto;
  }

  @media (min-width: 375px) and (max-width: 380px) and (min-height: 667px) and (max-height: 668px) {
    .height {
      height: 170px !important;
    }
  }
}
</style>
