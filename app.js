const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      cart: [],
      cartOpen: false,
    };
  },
});
app.mount("#app");
