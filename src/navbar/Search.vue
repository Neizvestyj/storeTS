<script setup>

import { ref } from 'vue';
import { useStore } from '../store';

const store = useStore(); // Используем Pinia Store

const searchText = ref(""); // Создаем реактивную переменную для поиска
const flag = ref(false);
// Создаем флаг, если необходимо
const changeSearchFlag = (event) => {
    event.preventDefault();
    flag.value = !flag.value;
};

const submit = (event) => {
    event.preventDefault(); store.searchCards(searchText.value);
    // Отправляем действие в Store
    flag.value = false;
    // Сбрасываем флаг
    searchText.value = "";
    // Очищаем поле ввода
};

const stopPropagation = (event) => {
    event.stopPropagation(); // Остановим всплытие события
};
</script>


<template>
    <div>
        <form class="my-form" @submit="submit" @click="stopPropagation">
            <input v-model.trim=searchText class="my-input" type="text" placeholder="Искать здесь...">
            <button class="my-button" type="submit"></button>
        </form>
    </div>
</template>