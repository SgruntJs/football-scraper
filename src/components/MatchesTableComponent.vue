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
          type="button"
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
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="(rowData, index) in data"
                :key="index"
                :class="{ 'bg-green-200': isToday(rowData.dataMatch) }"
              >
                <td
                  class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"
                >
                  {{ rowData.dataMatch }}
                </td>
                <td
                  class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                >
                  {{ rowData.homeTeam }} - {{ rowData.awayTeam }}
                </td>
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                  {{ rowData.result }}
                </td>
                <td
                  class="whitespace-nowrap px-2 py-2 text-sm text-gray-500"
                ></td>
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                  {{ rowData.over25 }}
                </td>
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                  {{ rowData.halfTime }}
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
import dayjs from "dayjs";
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
    };
  },
  methods: {
    fetchData() {
      return axios.get(`http://localhost:3000/${this.country}Matches`);
    },
    isToday(date) {
      const today = dayjs().format('dd D MMM');
      return today === date;
    }
  },
  mounted() {
    this.fetchData()
      .then((response) => {
        this.data = response.data[0].data.filter( item => item.awayTeam.trim() !== "");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
