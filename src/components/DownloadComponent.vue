<template lang="">
  <h2 class="text-xl text-center mt-10">Scarica e Aggiorna matches</h2>
  <div class="flex gap-2 justify-center items-start h-full mt-10">
    <DropdownComponent :options="countries" @option-selected="getOption" />
    <button
      type="button"
      class="rounded-md bg-indigo-50 py-2.5 px-3.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      @click="getWebsiteData()"
    >
      Scarica
    </button>
    <button
      class="rounded-md bg-indigo-50 py-2.5 px-3.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      @click="addTodo()"
    >
      Salva nel db
    </button>
  </div>
</template>
<script>
const axios = require("axios");
const cheerio = require("cheerio");
import { mapState } from "vuex";
import DropdownComponent from "../components/DropdownComponent.vue";
export default {
  components: {
    DropdownComponent,
  },
  data() {
    return {
    };
  },
  methods: {
    getOption(option) {
      this.selectedOption = option;
    },
    getWebsiteData() {
      let url = `https://www.soccerstats.com/results.asp?league=${this.selectedOption}&pmtype=bydate`;
      let dataArray = [];

      axios({
        method: "get",
        url: url,
      }).then((response) => {
        let html = response.data;
        let $ = cheerio.load(html);
        $("#btable tbody .odd").each(function () {
          const columns = $(this).find("td");
          const item = {
            dataMatch: $(columns[0]).text().replace(/\n/g, ""),
            homeTeam: $(columns[1]).text().replace(/\n/g, "").trim(),
            result: $(columns[2]).text().replace(/\n/g, ""),
            awayTeam: $(columns[3]).text().replace(/\n/g, "").trim(),
            over15:  $(columns[4]).text().replace(/\n/g, "").replace("%", ""),
            halfTime: $(columns[5]).text().replace(/\n/g, "").replace("%", ""),
            over25: $(columns[6]).text().replace(/\n/g, ""),
            BTS: $(columns[8]).text().replace(/\n/g, ""),
          };
          dataArray.push(item);
        });
        this.todos = dataArray;
      });
    },
    async checkIfDataExists(id) {
      const baseURL = `http://localhost:3000/${this.selectedOption}/${id}`;

      try {
        const res = await axios.get(baseURL);
        return res.data != null;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async deleteData(id) {
      const exists = await this.checkIfDataExists(id);

      if (exists) {
        const baseURL = `http://localhost:3000/${this.selectedOption}Matches/${id}`;

        try {
          await axios.delete(baseURL);
          //console.log(`Data with id ${id} deleted successfully`);
        } catch (e) {
          console.error(e);
        }
      } else {
        console.warn(`Data with id ${id} not found`);
      }
    },

    async addTodo() {
      const baseURL = `http://localhost:3000/${this.selectedOption}Matches`;

      try {
        await this.deleteData(1);
        const res = await axios.post(baseURL, { data: this.todos });

        console.log("this.todos", res.data);

        this.todos = [];
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
    ...mapState({
      countries: (state) => state.countries,
    }),
  },
};
</script>
<style lang=""></style>
