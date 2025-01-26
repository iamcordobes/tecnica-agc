<template>
  <div id="agc" class="relative">
    <router-view/>

    <!-- ir arriba -->
    <button
        v-show="showScroll"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
           class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
      </svg>
    </button>
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted} from "vue";

export default {
  name: "AGC",
  setup() {
    const showScroll = ref(false);

    const handleScroll = () => {
      showScroll.value = window.scrollY > 200;
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      showScroll,
      scrollToTop,
    };
  },
};
</script>
