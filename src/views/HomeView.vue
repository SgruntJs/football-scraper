<template>
   <h2 class="text-xl text-center mt-10">Scarica e Aggiorna campionati</h2>
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
    <Snackbar ref="snackbar" />
  </div>
  <DownloadComponent />
</template>

<script>
const axios = require("axios");
const cheerio = require("cheerio");
import Snackbar from '@/components/SnackbarComponent.vue';

import DownloadComponent from "@/components/DownloadComponent.vue";
import DropdownComponent from "../components/DropdownComponent.vue";
import { mapState } from "vuex";

export default {
  components: {
    DropdownComponent,
    DownloadComponent,
    Snackbar
},
  data() {
    return {
      todos: [],
      selectedOption: "",
    };
  },
  methods: {
    getOption(option) {
      //console.log("Opzione selezionata:", option);
      this.selectedOption = option;
    },
    getWebsiteData() {
      let url = `https://www.soccerstats.com/trends.asp?league=${this.selectedOption}`;
      let dataArray = [];

      axios({
        method: "get",
        url: url,
      }).then((response) => {
        let html = response.data;
        let $ = cheerio.load(html);
        $(".tabs tbody tr").each(function () {
          const columns = $(this).find("td");
          const item = {
            team: $(columns[0]).text().replace(/\n/g, ""),
            partite: parseInt($(columns[1]).text().replace(/\n/g, "")),
            over05: $(columns[3]).text().replace(/\n/g, ""),
            over15: parseInt(
              $(columns[4]).text().replace(/\n/g, "").replace("%", "")
            ),
            over25: parseInt(
              $(columns[5]).text().replace(/\n/g, "").replace("%", "")
            ),
            over35: $(columns[6]).text().replace(/\n/g, ""),
            over45: $(columns[7]).text().replace(/\n/g, ""),
            over55: $(columns[8]).text().replace(/\n/g, ""),
            BTS: $(columns[9]).text().replace(/\n/g, ""),
            cleanSheet: $(columns[10]).text().replace(/\n/g, ""),
            // aggiungi altre proprietà dell'oggetto a seconda delle informazioni presenti nella riga
          };
          dataArray.push(item);
        });
        console.log(dataArray);
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
        const baseURL = `http://localhost:3000/${this.selectedOption}/${id}`;

        try {
          await axios.delete(baseURL);
          this.showSnackbar(this.selectedOption);
          console.log(`Data with id ${id} deleted successfully`);
        } catch (e) {
          console.error(e);
        }
      } else {
        console.warn(`Data with id ${id} not found`);
      }
    },

    async addTodo() {
      const baseURL = `http://localhost:3000/${this.selectedOption}`;

      try {
        await this.deleteData(1);
        const res = await axios.post(baseURL, { data: this.todos });

        console.log("this.todos", res.data);

        this.todos = [];
      } catch (e) {
        console.error(e);
      }
    },
    showSnackbar(league) {
      this.$refs.snackbar.showSnackbar(`Campionato ${league} salvato nel DB`, {
        bgColor: 'bg-green-500',
        textColor: 'text-black',
        duration: 5000
      });
    }
  },
  created() {},
  computed: {
    ...mapState({
      countries: (state) => state.countries,
    }),
  },
};
</script>
