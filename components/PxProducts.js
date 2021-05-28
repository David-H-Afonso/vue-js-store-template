app.component("px-product", {
  template: /* vue-html */ `
<section class="product">
    <div class="product__thumbnails">
      <div
        class="thumb"
        v-for="(image, index) in product.images"
        :key="image.thumbnail"
        :class="{ active: activeImage == index}"
        :style="{backgroundImage: 'url('+product.images[index].thumbnail+')'}"
        @click="activeImage = index"
      ></div>
    </div>
    <div class="product__image">
      <img :src="product.images[activeImage].image" alt="product.name" />
    </div>
  </section>
<section class="description">
    <h4>
      {{product.name}} {{product.stock === 0 ? "🥶&nbsp;" :
      "😍&nbsp;"}}
    </h4>
    <span class="badge new" v-if="product.isNew">New</span>
    <span class="badge offer" v-if="product.isOffer">Offer</span>
    <p class="description__status"></p>
    <p class="description__price" :style="{ color: price_color }">{{product.price}}$</p>
    <p v-if="product.stock > 3">Unidades en stock</p>
    <p v-else-if="product.stock === 3">Quedan pocas unidades!</p>
    <p v-else-if="product.stock === 2">Quedan pocas unidades!</p>
    <p v-else-if="product.stock === 1">Ultima unidad!</p>
    <p v-else-if="product.stock === 0">No quedan unidades</p>
    <p class="description__content">{{product.content}}</p>
    <div class="discount">
      <span>Discount code:</span>
      <input
        type="text"
        placeholder="Discount code here"
        @keyup.enter="applyDiscount($event)"
      />
    </div>
    <button @click="sendToCart()" :disabled="product.stock === 0">
      {{product.stock > 0 ? "Add to cart" : "Sold out"}}
    </button>
  </section>
`,
  props: ["product"],
  emits: ["sendtocart"],
  data() {
    return {
      activeImage: 0,
      discountCodes: ["RikkuESP", "Platzi20", "asd"],
      price_color: "rgb(104, 104, 209)",
    };
  },
  methods: {
    applyDiscount(event) {
      const discountCodeIndex = this.discountCodes.indexOf(event.target.value);
      if (discountCodeIndex >= 0) {
        this.product.price *= 0.5;
        this.discountCodes.splice(discountCodeIndex);
        haveDiscount = true;
      }
    },
    sendToCart() {
      this.$emit("sendtocart", this.product);
    },
  },
  watch: {
    activeImage(value, oldValue) {
      console.log(value, oldValue);
    },
    "product.stock"(stock) {
      if (stock == 2 || stock == 1) {
        this.price_color = "rgb(188, 30, 67)";
      } else if (stock == 0) {
        this.price_color = "rgb(211, 211, 211)";
      }
    },
  },
});
