<script setup>
import { computed } from 'vue';
import { useStore } from '../store';
const sliderItemsPerPage = 1;
const store = useStore();
const id = computed(() => {
    if (id.value === 5) {
        return 1
    }
    return store.id;
});
const cards = computed(() => {
    return store.cards;
});
const cardsSlice = computed(() => {

    const start = (id.value) * sliderItemsPerPage;
    const end = start + sliderItemsPerPage;
    return cards.value.slice(start + 1, end + 2);

})
console.log(cardsSlice.value.length)

</script>
<template>
    <div>
        <div class="card-block">
            <figure v-for="card in  cardsSlice" :key="card.id" class="item-card">
                <img class="item-card__image" :src="card.image" alt="">

                <div class="item-card__overlay">
                </div>


                <figcaption class="item-card__description">
                    <a href="#" class="item-card__link">
                        <h4 class="item-card__description_title">ELLERY X M'O CAPSULE</h4>
                        <p class="item-card__description_text">Known for her sculptural takes on traditional
                            tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                    </a>
                    <p class="item-card_price">$ {{ card.price }}</p>
                </figcaption>
            </figure>
        </div>
    </div>
</template>