<script setup>

import { computed } from 'vue';
import { useStore } from '../store';
import cardSlider from './cardSlider.vue';
import cat from './cat.vue';

const store = useStore();
const cards = computed(() => {
    return store.getSliderCatalog;
});
console.log(cards.value)
</script>

<template>
    <div>

        <div class="promo-mini center">
            <div class="heading-left">NEW ARRIVALS </div>
            <div class="heading-right">
                <router-link to="/promo">
                    <a class="promo-mini-home"> HOME/ </a>
                </router-link>
                <a class="promo-mimi-men" href="#">MEN /</a>
                <router-link to="/PromoMini"> <a class="promo-mini-arrivals"><span class="arrivals">NEW
                            ARRIVALS</span></a></router-link>
            </div>
        </div>

        <cardSlider></cardSlider>
        <cat></cat>

    </div>
</template>