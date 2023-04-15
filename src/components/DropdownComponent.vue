<template lang="">
  
    <div class="block relative">
    <button
      @click="isOpen = !isOpen"
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
    >
      {{this.selectedOption}}
      <svg
        class="w-4 h-4 ml-2"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>
    <!-- Dropdown menu -->
    <div
      id="dropdown"
      :class="{ show: isOpen }"
      class="absolute z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li v-for="(option, index) in options" :key="index">
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="selectOption(option.name)"
            >{{ option.name }}</a
          >
        </li>
      </ul>
    </div>
  </div>

  
</template>
<script>
export default {
  props: ["options"],
  data() {
    return {
      isOpen: false,
      selectedOption: 'Seleziona League'
    };
  },
  methods: {
    selectOption(option) {
      this.$emit("option-selected", option);
      this.selectedOption = option;
      this.isOpen = false;
    },
  },
};
</script>
<style>
.show {
  display: block !important;
}
</style>
