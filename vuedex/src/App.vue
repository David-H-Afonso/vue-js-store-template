<template>
  <div id="app" :style="{ background: backImg }">
    <section class="app-pokemon-main card">
      <img alt="pokemon" :src="image" />
      <p class="pokemon-name">{{ name }}</p>
      <button class="button" @click.prevent="makeRequest">SEARCH</button>
    </section>
    <section class="app-pokemon-stats">
      <poke-stats
        :pokeWeight="weight"
        :pokeHeight="height"
        :pokeType="type"
      ></poke-stats>
      <div class="app-pokemon-stats-abilities card">
        <p id="abilities">ABILITIES</p>
        <ul>
          <li
            v-for="el in abilities"
            :key="el"
            style="text-transform: capitalize;"
          >
            {{ el.ability.name }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import PokeStats from "./components/PokeStats.vue";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      name: "name",
      image: "",
      type: "",
      weight: 0,
      height: 0,
      abilities: [],
      data: {},
    };
  },
  computed: {
    backImg: function() {
      return `var(--${this.type}-back)`;
    },
  },
  components: {
    PokeStats,
  },
  methods: {
    async makeRequest() {
      let randomSearch = await Math.floor(Math.random() * 807 + 1);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${randomSearch}`
        );
        const data = response.data;
        this.name = data.name;
        this.weight = data.weight;
        this.height = data.height;
        this.abilities = data.abilities;
        this.image = data.sprites.front_default;
        this.type = data.types[0].type.name;
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    await this.makeRequest();
  },
};
</script>

<style scooped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
* {
  font-family: "Press Start 2P", cursive;
}
:root {
  border: 0;
  --general-card-background: white;
  --normal-image-height: 50vh;
  --general-font-size: 2em;
  --grass-back: #2dcd45;
  --fire-back: #f08030;
  --water-back: #149eff;
  --bug-back: #a8b820;
  --normal-back: #a8a878;
  --ground-back: #e0c068;
  --poison-back: #883688;
  --electric-back: #f8d030;
  --flying-back: #a890f0;
  --fairy-back: #ee99ac;
  --fighting-back: #94352d;
  --psychic-back: #ff6996;
  --rock-back: #b8a038;
  --steel-back: #b8b8d0;
  --ice-back: #98d8d8;
  --ghost-back: #614c83;
  --dragon-back: #700aee;
  --dark-back: #705848;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 78vh;
  display: grid;
  grid-template-columns: 2fr 1fr;
  text-align: center;
  color: #2c3e50;
}

img {
  height: var(--normal-image-height);
}

button {
  color: white;
  text-shadow: -3px 0 black, 0 1px black, 3px 0 black, 0 -1px black;
  width: 175px;
  height: 40px;
  outline: none;
  cursor: pointer;
  background-image: url(https://wallpapercave.com/wp/xLZrFev.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.button:active {
  transform: translateY(4px);
}

p {
  font-size: var(--general-font-size);
  margin: 2%;
}

.pokemon-name {
  text-transform: capitalize;
  background-color: white;
  width: 350px;
  height: 80px;
  padding-top: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
    0 16px 16px rgba(0, 0, 0, 0.12);
}
.app-pokemon-main.card {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-pokemon-stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

.app-pokemon-stats-abilities.card {
  background-color: var(--general-card-background);
  width: 350px;
  height: 150px;
  display: flex;
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
    0 16px 16px rgba(0, 0, 0, 0.12);
}
</style>
