<script setup>
import { ref, computed, onMounted, onBeforeUnmount, } from 'vue';
import { useStore } from '../store';
import filterProduct from './filterProduct.vue';
import textProduct from './textProduct.vue';
//import Swiper from 'swiper';
//import 'swiper/swiper-bundle.css';
const store = useStore();
const swiperInstance = ref(null); // для хранения экземпляра Swiper
const current = ref(0);
const filteredCards = computed(() => {
  return store.filteredCards || [];
});
const card = computed(() => {// карточка !!!!!!!!!!
  // console.log(current.value);
  // Проверяем, что current.value в пределах допустимых значений
  if (current.value < 0 || current.value >= filteredCards.value.length) {
    return {};
  }
  const cardItem = filteredCards.value[current.value];
  // console.log(cardItem)
  return cardItem ? cardItem : {};
});
onMounted(() => {
  store.setCurrentCard(card.value, current.value);
  const el = document.querySelector('.swiper-container'); // Получаем элемент контейнера
  swiperInstance.value = new Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,
    grabCursor: true,
    threshold: 20,
    touchRatio: 1,
    simulateTouch: true,
    pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
    navigation: {
      nextEl: el.querySelector('.swiper-button-next'),
      prevEl: el.querySelector('.swiper-button-prev')
    },
    on: {
      slideChange: () => {
        current.value = swiperInstance.value.realIndex //|| swiperInstance.value.activeIndex;
        store.setCurrentCard(card.value, current.value);
        console.log(current.value)// Сохранение текущей карточки в хранилище
        //или  store.commit('setCurrentCard',filteredCards.value[current.value]);
      }
    }
  });
  // начальный индекс
  current.value = swiperInstance.value.realIndex !== undefined ? swiperInstance.value.realIndex : 0;
  // this.$emit("change-card", this.card);
});
onBeforeUnmount(() => {
  if (swiperInstance.value && typeof swiperInstance.value.destroy === 'function') {
    swiperInstance.value.destroy(true, true);
    swiperInstance.value = null;
  }
});
const goNext = () => {
  if (swiperInstance.value)
    swiperInstance.value.slideNext();
  store.sliderPageNext();
};
const goPrev = () => {
  if (swiperInstance.value)
    swiperInstance.value.slidePrev();
  store.sliderItemsPerPagePrev();
};
// page — 0-based индекс
const goToPageSlider = (page) => {
  if (!swiperInstance.value || !filteredCards.value.length) return;
  const safePage = Math.max(0, Math.min(page, filteredCards.value.length - 1));
  swiperInstance.value.slideTo(safePage);
};
</script>
<template>
  <div>
    <div>
      <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(s, i) in filteredCards" :key="i">
            <img class="item-card__image" :src="s.image" alt="">
          </div>

        </div>

        <!-- Пагинация и стрелки -->
        <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bulle"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>

      <div class="controls" style="margin-top:12px;">
        <button @click="goPrev">Prev</button>
        <button @click="goNext">Next</button>
        <button @click="goToPageSlider(0)">To first</button>
        <span>Current: {{ current + 1 }} / {{ filteredCards.length }}</span>
      </div>
    </div>
    <textProduct v-if="card && card.id" :card="card"></textProduct>


  </div>
</template>
<style scoped>
.swiper-slide {
  height: 424px;
}
</style>