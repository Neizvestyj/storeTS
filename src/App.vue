
<script setup>
import { onMounted } from 'vue';
import { useStore } from './store';
import Navbar from './navbar/Navbar.vue'
import Advantages from './components/Footer/Advantages.vue'
import Feedback from './components/Footer/Feedback.vue'
import Footer from './components/Footer/Footer.vue'
const store = useStore();
//components: { Navbar, Advantages, Feedback, Footer },
onMounted(() => {
  store.fetchCards();
  store.loadingCart();
});

</script>
<template>
  <div class="overflow-hidden">
    <Navbar />
    <router-view></router-view>
    <aside>
      <Advantages />
      <Feedback />
    </aside>


    <Footer />
  </div>
</template>



