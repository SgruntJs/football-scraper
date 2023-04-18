<template>
  <h1 class="pt-4 text-base font-semibold leading-6 text-gray-900">
    Le partite delle squadre con una percentuale di over maggiore
  </h1>
  <div class="flex pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl flex-col m-auto">
    <div class="flex flex-col">
      <table class="min-w-full divide-y divide-gray-300">
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="(match, index) in bestMatches" :key="index">
            <td
              class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"
            >
              {{ match.dataMatch }}
            </td>
            <td
              class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"
            >
              {{ match.result }}
            </td>
            <td
              class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"
            >
              {{ match.homeTeam }} - {{ match.awayTeam }}
            </td>
          </tr>
        </tbody>
      </table>
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
