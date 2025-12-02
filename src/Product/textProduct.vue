<script setup>

import { computed } from 'vue';
import { useStore } from '../store';
import filterProduct from './filterproduct.vue';
import { defineProps } from 'vue';


const props = defineProps({ card: { type: Object, required: true, }, });

const store = useStore();
const grandTotal = computed(() => store.sum
);
const cardCurrent = computed(() =>
    store.getCardCurrent
);
</script>

<template>
    <div>
        <div class="about wrap">
            <div class="center wrap center-about">
                <h1 class="center-about-h1">WOMEN COLLECTION</h1>
            </div>
            <div class="center-line">
                <img src="img/linepink.svg" alt="linepink">
            </div>
            <div>
                <h2 class="center-about-h2">MOSCHINO CHEAP AND CHIC</h2>
            </div>
            <div>
                <p class="center-about-p">Compellingly actualize fully researched processes before proactive
                    outsourcing.
                    Progressively syndicate
                    collaborative architectures before cutting-edge services. Completely visualize parallel core
                    competencies rather than exceptional portals. </p>
            </div>
            <div>
                <p class="sale561">$ {{ card.price }}</p>
            </div>
            <hr class="hr">

            <filter-product></filter-product>
        </div>
    </div>
</template>
