app.component("px-header", {
  template: /* vue-html */ `
<header>
        PlatziCommerce
        <button class="cart" @click="">
        Cart ({{}})
        </button>
        <div class="cart-content" v-show="cartOpen">
          <div
            class="cart-content__product"
            v-for="(product, index) in cart"
            :key="product.name"
            :class="{'bg-gray': index & 1}"
          >
            <img :src="product.images[0].image" :alt="product.name" />
            <span
              >{{product.name}} - {{product.price * product.quantity}}$
              ({{product.quantity}})</span
            >
          </div>
        </div>
      </header>
`,
});
