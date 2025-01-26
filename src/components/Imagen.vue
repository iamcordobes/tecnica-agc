<template>
  <div
      class="relative cursor-pointer dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
      @click="$emit('remove', image.id)"
  >
    <!-- loader hasta que muestre la imagen -->
    <div
        v-if="loading"
        class="absolute inset-0 flex justify-center items-center bg-gray-200 dark:bg-gray-800"
    >
      <Loader/>
    </div>

    <!-- imagen con transicion suave -->
    <img
        :src="image.download_url"
        :alt="image.author"
        @load="handleImageLoad"
        class="w-full h-full object-cover transition-opacity duration-500"
        :class="{ 'opacity-0': loading, 'opacity-100': !loading }"
    />
  </div>
</template>

<script>
import {ref} from "vue";
import Loader from "./Loader.vue";

export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  components: {Loader},
  setup() {
    const loading = ref(true);

    const handleImageLoad = () => {
      loading.value = false;
    };

    return {
      loading,
      handleImageLoad,
    };
  },
};
</script>
