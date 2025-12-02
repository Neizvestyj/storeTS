<script setup>
import { computed, watch, ref, onMounted } from 'vue';
import { useStore } from '../store';
const store = useStore(); // Инициализация store
const alertRef = ref(null); // Создаем ссылку на элемент
const isValid = computed(() => store.isValid);

const closed = () => {
    store.setIsValid(false);
    if (alertRef.value) {
        alertRef.value.classList.remove("show")
    }
};

watch(isValid, (newValue) => {
    if (newValue) {
        console.log(isValid.value);
        setTimeout(() => {
            closed();
            console.log("Скрываем алерт через 2 секунды");
        }, 6000);
    }

});
onMounted(() => {
    if (isValid.value) {
        alertRef.value.classList.add("show");
    }
});
</script>
<template>
    <div ref="alertRef" @click="closed()" v-if="isValid" class="alert" :class="{ show: isValid }">
        <p class="alert-title">Сообщение отправлено </p>
    </div>
</template >