<script setup>

import { computed, nextTick, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from '../store';
const store = useStore();
const isOpen = computed(() => store.isOpen);
const { proxy } = getCurrentInstance();
const toggleMenu = (event) => {
    if (event && event.stopPropagation) event.stopPropagation();
    store.toggleMenu();

    // Переключение состояния
    if (isOpen.value) {
        nextTick(() => {
            const menu = proxy.$refs.menuRef;
            if (menu) {
                menu.focus && menu.focus();
            }
        });
    }
};

const closeMenu = () => {
    store.closeMenu();
};

const onOutside = (e) => {
    const menu = proxy.$refs.menuRef;
    if (!menu) return;

    // Проверка был ли клик вне меню 
    if (!menu.contains(e.target)) {
        closeMenu();
    }
};

const onKeydown = (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
        closeMenu();
    }
};

onMounted(() => {
    document.addEventListener("click", onOutside); document.addEventListener("touchstart", onOutside); document.addEventListener("keydown", onKeydown);
});

// Удаляем обработчики перед размонтированием
onBeforeUnmount(() => {
    document.removeEventListener("click", onOutside);
    document.removeEventListener("touchstart", onOutside);
    document.removeEventListener("keydown", onKeydown);
});
</script>



<template>
    <div class="burger-menu">
        <label class="input-title" @click.stop="toggleMenu" @touchstart.stop="toggleMenu" :aria-expanded="isOpen.toString()"
            aria-controls="burger-menu">
            <svg p class="header-burger" width="21" height="23" viewBox="0 0 32 23" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 23V20.31H32V23H0ZM0 12.76V10.07H32V12.76H0ZM0 2.69V0H32V2.69H0Z" />
            </svg>
        </label>

        <transition name="fade">

            <div class="input-drop" v-if="isOpen" id="burger-menu" ref="menuRef" tabindex="-1">


                <div class="input-block">
                    <label class="label-svg" @click="toggleMenu">
                        <svg class="input-svg" width="13" height="13" viewBox="0 0 13 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.4158 6.00409L11.7158 1.71409C11.9041 1.52579 12.0099 1.27039 12.0099 1.00409C12.0099 0.73779 11.9041 0.482395 11.7158 0.294092C11.5275 0.105788 11.2721 0 11.0058 0C10.7395 0 10.4841 0.105788 10.2958 0.294092L6.0058 4.59409L1.7158 0.294092C1.52749 0.105788 1.2721 -1.9841e-09 1.0058 0C0.739497 1.9841e-09 0.484102 0.105788 0.295798 0.294092C0.107495 0.482395 0.0017066 0.73779 0.0017066 1.00409C0.0017066 1.27039 0.107495 1.52579 0.295798 1.71409L4.5958 6.00409L0.295798 10.2941C0.20207 10.3871 0.127676 10.4977 0.0769072 10.6195C0.0261385 10.7414 0 10.8721 0 11.0041C0 11.1361 0.0261385 11.2668 0.0769072 11.3887C0.127676 11.5105 0.20207 11.6211 0.295798 11.7141C0.388761 11.8078 0.499362 11.8822 0.621222 11.933C0.743081 11.9838 0.873786 12.0099 1.0058 12.0099C1.13781 12.0099 1.26852 11.9838 1.39038 11.933C1.51223 11.8822 1.62284 11.8078 1.7158 11.7141L6.0058 7.41409L10.2958 11.7141C10.3888 11.8078 10.4994 11.8822 10.6212 11.933C10.7431 11.9838 10.8738 12.0099 11.0058 12.0099C11.1378 12.0099 11.2685 11.9838 11.3904 11.933C11.5122 11.8822 11.6228 11.8078 11.7158 11.7141C11.8095 11.6211 11.8839 11.5105 11.9347 11.3887C11.9855 11.2668 12.0116 11.1361 12.0116 11.0041C12.0116 10.8721 11.9855 10.7414 11.9347 10.6195C11.8839 10.4977 11.8095 10.3871 11.7158 10.2941L7.4158 6.00409Z"
                                fill="#6F6E6E" />


                        </svg>
                    </label>
                    <p class="input-menu">MENU</p>

                    <router-link to="/promoProduct" @click.native="closeMenu" class="input-summary"> NEW ARRIVALS
                    </router-link>

                    <details>
                        <summary class="input-h"><span class="input-summary">MAN</span></summary>
                        <ul>
                            <li class="ul-li"><a href="">Accessories</a></li>
                            <li class="ul-li"><a href="">Bags</a></li>
                            <li class="ul-li"><a href="">Denim</a></li>
                            <li class="ul-li"><a href="">T-Shirts</a></li>
                        </ul>
                    </details>

                    <details>
                        <summary class="input-h"><span class="input-summary">WOMAN</span></summary>
                        <ul>
                            <li class="ul-li"><a href="">Accessories</a></li>
                            <li class="ul-li"><a href="">Jackets & Coats</a></li>
                            <li class="ul-li"><a href="">Polos</a></li>
                            <li class="ul-li"><a href="">T-Shirts</a></li>
                            <li class="ul-li"><a href="">Shirts</a></li>
                        </ul>
                    </details>

                    <details>
                        <summary class="input-h"><span class="input-summary">KIDS</span></summary>
                        <ul>
                            <li class="ul-li"><a href="">Accessories</a></li>
                            <li class="ul-li"><a href="">Jackets & Coats</a></li>
                            <li class="ul-li"><a href="">Polos</a></li>
                            <li class="ul-li"><a href="">T-Shirts</a></li>
                            <li class="ul-li"><a href="">Shirts</a></li>
                            <li class="ul-li"><a href="">Bags</a></li>
                        </ul>
                    </details>
                </div>
            </div>
        </transition>
    </div>
</template>


