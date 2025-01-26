<template>
  <div>
    <!-- primer loader -->
    <div v-if="loadingInitial"
         class="fixed inset-0 flex justify-center items-center bg-gray-100 dark:bg-gray-800 z-50 transition-opacity duration-500">
      <Loader/>
    </div>

    <!-- contenedor transicion suave -->
    <transition-group
        name="fade"
        tag="div"
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6 transition-opacity duration-500"
        :style="{ minHeight: images.length ? 'auto' : '50vh' }"
    >
      <Imagen
          v-for="image in images"
          :key="image.id"
          :image="image"
          @remove="removeImage"
          class="transition-transform"
      />
    </transition-group>

    <!-- loader -->
    <div v-if="loading && !loadingInitial" class="flex justify-center py-4">
      <Loader/>
    </div>
  </div>
</template>

<script>
import Imagen from "./Imagen.vue";
import Loader from "./Loader.vue";
import {onMounted, ref, onBeforeUnmount} from "vue";
import axios from "axios";

export default {
  components: {Imagen, Loader},
  setup() {
    const images = ref([]);
    const page = ref(1);
    const loading = ref(false);
    const loadingInitial = ref(true);

    const fetchData = async () => {
      if (loading.value) return;
      loading.value = true;

      try {
        const res = await axios.get(
            `https://picsum.photos/v2/list?page=${page.value}&limit=24`
        );
        images.value.push(
            ...res.data.map((img) => {
              //redimension, son muy grandes para la carga optima
              const reducedWidth = Math.round(img.width * 0.25);
              const reducedHeight = Math.round(img.height * 0.25);
              return {
                ...img,
                width: reducedWidth,
                height: reducedHeight,
                download_url: `https://picsum.photos/id/${img.id}/${reducedWidth}/${reducedHeight}`,
              };
            })
        );
        page.value += 1;
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        loading.value = false;
        loadingInitial.value = false;
      }
    };

    const handleScroll = () => {
      if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 400
      ) {
        fetchData();
      }
    };

    const removeImage = (id) => {
      images.value = images.value.filter((image) => image.id !== id);

      // si borra todas, mostrar mas
      if (images.value.length === 0) {
        fetchData();
      }
    };

    onMounted(() => {
      fetchData();
      window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      images,
      loading,
      loadingInitial,
      removeImage,
    };
  },
};
</script>

<style scoped>
/* transicion reorganizar */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
