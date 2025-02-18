import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loadingStore", {
  state: () => ({
    loading: true,
  }),
  actions: {
    startLoading() {
      this.loading = true;
    },
    stopLoading() {
      this.loading = false;
    },
  },
});

// export useLoadingStore;
