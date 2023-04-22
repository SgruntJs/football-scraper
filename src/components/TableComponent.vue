<template>
  <div class="flex px-4 sm:px-6 lg:px-8 max-w-7xl flex-col m-auto">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="pt-4 text-base font-semibold leading-6 text-gray-900">
          League {{ country }}
        </h1>
        <p class="mt-2 text-sm text-gray-700">
          A table of placeholder stock market data that does not make any sense.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"  @click="exportToExcel"
          class="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Export
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Nome team
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Partite
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Over 0,5
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Over 1,5
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Over 2,5
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Over 3,5
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Over 4,5
                </th>
                <th
                  class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Over 5,5
                </th>
                <th
                  class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  BTS
                </th>
                <th
                  class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Clean sheet
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(rowData, index) in uniqueTeams" :key="index">
                <td
                  class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"
                >
                  {{ rowData.team }}
                </td>
                <td
                  class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                >
                  {{ rowData.partite }}
                </td>
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                  {{ rowData.over05 }}
                </td>
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                  {{ rowData.over15 }}%
                </td>
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                  {{ rowData.over25 }}%
                </td>
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                  {{ rowData.over35 }}
                </td>
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                  {{ rowData.over45 }}
                </td>
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                  {{ rowData.over55 }}
                </td>
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                  {{ rowData.BTS }}
                </td>
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                  {{ rowData.cleanSheet }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
const axios = require("axios");
const XLSX = require('xlsx');
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

      this.uniqueTeams = uniqueTeams;

      let over25Teams = this.uniqueTeams.filter((res) => {
        let over25 = res.over25;
        return (over25 >= 50) & (res.over15 >= 70);
      });
      this.teams = over25Teams;
      //console.log("this.teams", this.teams);
    },
    exportToExcel() {
      axios.get(`http://localhost:3000/${this.country}`)
        .then(response => {
          const data = response.data;
          const workbook = XLSX.utils.book_new();
          const worksheet = XLSX.utils.json_to_sheet(data);
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Dati');
          XLSX.writeFile(workbook, 'dati.xlsx');
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.fetchData()
      .then((response) => {
        this.data = response.data[0].data;
       // console.log(this.data);
        this.getBestTeams();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
