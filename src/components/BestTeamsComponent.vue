<template>
  <div class="flex py-10 px-4 sm:px-6 lg:px-8 max-w-7xl flex-col m-auto">
    <h2 class="py-5 text-2xl font-bold text-gray-800">Best teams</h2>
    <div class="flex gap-2">
      <button
        type="button"
        class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        v-for="(team, index) in teams"
        :key="index"
        :style="{ backgroundColor: getRandomColor() }"
      >
        {{ team.team }}
      </button>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  props: {
    country: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      data: [],
      teams: [],
      uniqueTeams: [],
    };
  },
  methods: {
    fetchData() {
      return axios.get(`http://localhost:3000/${this.country}`);
    },
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      if (color === "#FFFFFF") {
        return (color = "#FF0000");
      }
      return color;
    },
    getBestTeams() {
      const uniqueTeams = this.data.reduce((acc, current) => {
        const trimmedTeam = current.team.trim();
        if (current.partite !== null) {
          // controlla che partite non sia null
          const existingTeam = acc.find(
            (item) => item.team.trim() === trimmedTeam
          );
          if (!existingTeam) {
            acc.push(current);
          } else if (existingTeam.partite === null) {
            // se esiste già un team ma ha partite a null, sostituiscilo con l'oggetto corrente
            acc.splice(acc.indexOf(existingTeam), 1, current);
          }
        }
        return acc;
      }, []);

      // console.log("uniqueTeams", uniqueTeams);
      this.uniqueTeams = uniqueTeams;

      let over25Teams = this.uniqueTeams.filter((res) => {
        let over25 = res.over25;
        return (over25 >= 50) & (res.over15 >= 70);
      });

      this.teams = over25Teams;
      //console.log("this.teams", this.teams);
      // emette l'evento "best-teams" con l'array filtrato di team come argomento
      this.$emit("teams-emitted", this.teams);
    },
  },
  mounted() {
    this.fetchData()
      .then((response) => {
        this.data = response.data[0].data;
        //console.log(this.data);
        this.getBestTeams();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

</script>
<style lang=""></style>
