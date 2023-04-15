<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isVisible"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#00C853"
                    d="M21.2 5.7l-10 11c-.4.4-.9.6-1.4.6s-1-.2-1.4-.6l-5-5.5c-.8-.9-.2-2.3 1.1-2.3h.3c.4 0 .8.2 1.1.5l3.6 4 8.4-9.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4z"
                  />
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ message }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  Anyone with a link can now view this file.
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      message: "",
      bgColor: "bg-blue-100",
      textColor: "text-black",
    };
  },
  methods: {
    showSnackbar(message, options = {}) {
      this.message = message;
      this.isVisible = true;
      if (options.bgColor) {
        this.bgColor = options.bgColor;
      }
      if (options.textColor) {
        this.textColor = options.textColor;
      }
      setTimeout(() => {
        this.isVisible = false;
      }, options.duration || 3000);
    },
  },
};
</script>
