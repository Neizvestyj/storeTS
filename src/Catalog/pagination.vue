<script setup>
import { ref, computed } from 'vue';
import { useStore } from '../store';

const store = useStore();

const count = ref(1);

const totalPages = computed(() => {
    return store.getTotalPages;
});
const currentPage = computed(() => {
    return store.currentPage;
});
const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        store.setCurrentPage(pageNumber);
    }
};
</script>
<template>
    <div>
        <nav class="botton">
            <div class="botton-block center">
                <div class="button-page">
                    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                        class="button-left but-but but-size but-cursor"><i
                            class="fas fa-chevron-left aria-hidden"></i></button>
                    <div class="button-page-num">
                        <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                            :class="{ colorRed: currentPage === page }" class="but-1 but-but but-size but-cursor">{{ page
                            }}</button>

                        <div class="botton-20 but-but but-size">
                            <p class="pages-dash but-cursor">.....</p>
                            <button class="but-20 but-but but-size but-cursor ">20</button>
                        </div>
                    </div>
                    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                        class="button-right but-but but-size but-cursor "><i class="fas fa-chevron-right"></i></button>


                </div>
            </div>

        </nav>
    </div>
</template>