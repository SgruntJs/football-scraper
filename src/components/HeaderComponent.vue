<template>
  <div>
    <header class="bg-gray-800 text-white">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="text-green-600 font-semibold">Football Scraper</span>
          </a>
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"  @click="toggleMenu()"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <div class="relative">
            <button class="peer text-sm font-semibold leading-6 text-white">
              Leagues
            </button>
            <!-- the menu here -->
            <div
              class="absolute hidden z-10 peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg text-black text-sm"
            >
              <a
                class="px-5 py-3 hover:bg-gray-200"
                :href="'/table/' + country.name"
                v-for="country in countries"
                :key="country.id"
                >{{ country.name }}</a
              >
            </div>
          </div>
          <a href="/" class="text-sm font-semibold leading-6 text-white"
            >Download & Update</a
          >

          <a href="#" class="text-sm font-semibold leading-6 text-white"
            >Matches</a
          >

          <a href="#" class="text-sm font-semibold leading-6 text-white"
            >Company</a
          >
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" class="text-sm font-semibold leading-6 text-white"
            >Log in <span aria-hidden="true">&rarr;</span></a
          >
        </div>
      </nav>
      <!-- Mobile menu, show/hide based on menu open state. -->
      <div class="lg:hidden" role="dialog" aria-modal="true">
        <!-- Background backdrop, show/hide based on slide-over state. -->
        <!--<div class="fixed inset-0 z-10"></div>-->
       
          <div
            class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          v-if="isMenuOpen"
          >
            <div class="flex items-center justify-between">
              <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                class="-m-2.5 rounded-md p-2.5 text-gray-700"   @click="closeMenu()"
               
              >
                <span class="sr-only">Close menu</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <a
                    href="/table"
                    class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >League</a
                  >

                  <a
                    href="#"
                    class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Features</a
                  >

                  <a
                    href="#"
                    class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Marketplace</a
                  >

                  <a
                    href="#"
                    class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Company</a
                  >
                </div>
                <div class="py-6">
                  <a
                    href="#"
                    class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Log in</a
                  >
                </div>
              </div>
            </div>
          </div>

      </div>
    </header>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu(){
      this.isMenuOpen = true;
      console.log('open')
    },
    closeMenu() {
      this.isMenuOpen = false;
      console.log('close')
    }
  },
  computed: {
    ...mapState({
      countries: (state) => state.countries,
    }),
  },
};
</script>
<style>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
