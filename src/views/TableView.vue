<template>
  <div class="about">
    <TableComponent :country="country" />
    <BestTeamsComponent :country="country" @teams-emitted="setBestTeams"/>
    <div class="flex py-10 px-4 sm:px-6 lg:px-8 max-w-7xl flex-col m-auto">
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex" aria-label="Tabs">
            <button
              :class="{
                'border-indigo-500 text-indigo-600': currentTab === 'matches',
                'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                  currentTab !== 'matches',
              }"
              class="w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium"
              @click.prevent="setActiveTab('matches')"
            >
              Matches
            </button>
            <button
              :class="{
                'border-indigo-500 text-indigo-600': currentTab === 'list',
                'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                  currentTab !== 'list',
              }"
              class="w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium"
              @click.prevent="setActiveTab('list')"
            >
              List Best Matches
            </button>
          </nav>
        </div>
      </div>

      <div :class="{ 'hidden': currentTab === 'list' }">
        <MatchesTableComponent :country="country" />
      </div>

      <div :class="{ 'hidden': currentTab === 'matches' }">
        <ListBestMatchesComponent :matches="data"  :best-teams="bestTeams"/>
      </div>
    </div>
  </div> 
</template>

<script>
import TableComponent from "../components/TableComponent.vue";
import MatchesTableComponent from "../components/MatchesTableComponent.vue";
import BestTeamsComponent from "@/components/BestTeamsComponent.vue";
import ListBestMatchesComponent from "@/components/ListBestMatchesComponent.vue";
const axios = require("axios");

export default {
  components: {
    TableComponent,
    MatchesTableComponent,
    BestTeamsComponent,
    ListBestMatchesComponent,
  },
  props: {
    matches: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      data: [],
      currentTab: "matches",
      isDataLoaded: false,
      bestTeams: [],
    };
  },
  computed: {
    country() {
      return this.$route.params.country;
    },
  },
  watch: {
    data() {
      this.isDataLoaded = true;
    },
  },
  methods: {
    fetchData() {
      return axios.get(`http://localhost:3000/${this.country}Matches`);
    },
    setActiveTab(tabName) {
      this.currentTab = tabName;
    },
    setBestTeams(teams) {
      this.bestTeams = teams;
    },
  },
  mounted() {
    this.fetchData()
      .then((response) => {
        this.data = response.data[0].data;
        //console.log("data", this.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
