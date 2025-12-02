<script setup>
alert('alert')
import { computed, watch, ref, onMounted } from 'vue';
import { useStore } from '../store';
const store = useStore(); // Инициализация store
const alertRef = ref(null); // Создаем ссылку на элемент
const isValidDel = computed(() => store.isValidDel);

const closed = () => {
    store.setIsValid(false);
    if (alertRef.value) {
        alertRef.value.classList.remove("show")
    }
};

watch(isValidDel, (newValue) => {
    if (newValue) {
        console.log(isValidDel.value);
        if (alertRef.value) {
            alertRef.value.classList.add("show");
        }

        setTimeout(() => {
            closed();
            console.log("Скрываем алерт через 2 секунды");
        }, 6000);
    }

});
//onMounted(() => {if (isValidDel.value) {alertRef.value.classList.add("show");
//}});
</script>
<template>
    <div ref="alertRef" @click="closed" v-if="isValidDel" class="alert" :class="{ show: isValidDel }">
        <p class="alert-title">Товар удален </p>
    </div>
</template >