<template>
  <h1 class="pt-4 text-base font-semibold leading-6 text-gray-900">Le partite delle squadre con una percentuale di over maggiore</h1>
  <div class="flex pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl flex-col m-auto">
    <div class="flex flex-col">
      <div class="grid grid-cols-3 bg-gray-200 font-bold">
        <div class="p-2">Data</div>
        <div class="p-2">Ora</div>
        <div class="p-2">Partita</div>
      </div>

      <div
        class="grid grid-cols-3 border"
        v-for="(match, index) in bestMatches"
        :key="index"
      >
        <div class="p-2">{{ match.dataMatch }}</div>
        <div class="p-2">{{ match.result }}</div>
        <div class="p-2">{{ match.homeTeam }} - {{ match.awayTeam }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  props: {
    matches: {
      type: [],
      required: true,
    },
    bestTeams: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      bestMatches: [],
    };
  },
  methods: {
    filterMatch() {
      const teamsToFilter = this.bestTeams.map((item) => item.team.trim());
      const today = dayjs().format("dd D MMM");
      //console.log(today);
      this.bestMatches = this.matches
        .filter((match) => {
          const homeTeam = match.homeTeam.toLowerCase();
          const awayTeam = match.awayTeam.toLowerCase();
          return teamsToFilter.some((team) => {
            return (
              homeTeam.includes(team.toLowerCase()) ||
              awayTeam.includes(team.toLowerCase())
            );
          });
        })
        .filter((match) => {
          return (
            dayjs(match.dataMatch, "YYYY-DD-MM") >= dayjs(today, "YYYY-DD-MM")
          );
        })
        .filter((match) => {
          const matchResult = match.result.toLowerCase();
          return matchResult.includes(":");
        });
    },
  },
  watch: {
    matches(newVal) {
      console.log("matches watcher", newVal);
      this.filterMatch();
    },
  },
  mounted() {},
};
</script>
