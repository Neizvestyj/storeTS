
<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from '../store';
import { v4 as uuidv4 } from 'uuid';
const store = useStore();
const drop = ref(null);
const selectedColor = ref("White");
const selectedSize = ref("M");
const localQuantity = ref(1);
const currentImage = ref(0);
const ide = ref(0);
const cardCurrent = computed(() => {
    return store.getCardCurrent || {}

});

const increaseQuantity = () => {
    if (cardCurrent.value && cardCurrent.value.quantity !== undefined) {
        localQuantity.value++;
        updateCardQuantity();
    }
};
const decreaseQuantity = () => {
    if (localQuantity.value > 1) {
        localQuantity.value--;
        updateCardQuantity();
    }
};
const onInputChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
        localQuantity.value = newQuantity;
        updateCardQuantity();
    } else {
        localQuantity.value = 1;
    }
    updateCardQuantity();
};
const updateCardQuantity = () => {
    if (cardCurrent.value && cardCurrent.value.id) {
        store.increaseQuantity({
            quantity: localQuantity.value,
            currentImage: cardCurrent.value.id
        });
    }
};
const changeColor = (color) => {
    selectedColor.value = color;
    drop.value = false;
    console.log(selectedColor.value)
};

const changeSize = (size) => {
    selectedSize.value = size;
    drop.value = null;
    console.log(selectedSize.value)
};

const addToCard = () => {

    const uniqueId = uuidv4(); // Генерируем уникальный ID
    // Проверка на существование card перед использованием его id
    const currentCard = cardCurrent.value // Получаем текущее значение cardCurrent
    if (currentCard && currentCard.id) {

        store.addToCard({
            ide: uniqueId,
            currentImage: currentCard.id,
            color: selectedColor.value,
            size: selectedSize.value,
            quantity: localQuantity.value
        });

        console.log(" 2 Current image ID:", currentCard.id);
        console.log(" 3 Current image ID:", ide.value);
    } else {
        console.error(" 3 Card object is undefined in addToCard method.");
    }
    // selectedColor.value = 'White';
    //  selectedSize.value = 'M';
};

watch(cardCurrent, (newCard) => {
    // Синхронизируем quantity, когда card меняется
    localQuantity.value = newCard.quantity !== undefined ? newCard.quantity : 1;
},
    {
        immediate: true, // Обновляем сразу, при первой загрузке
    });
</script>

<template>
    <div>

        <div class="center-about-nav">

            <div @click="drop = 1" class="nav-size">
                <summary class="trending-now but-cursor">
                    <span class="trending but-cursor"> CHOOSE COLOR </span> <svg class="trending-nav" width="12" height="7"
                        viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z"
                            fill="#6F6E6E" />
                    </svg>
                </summary>

                <transition name="fade">

                    <div v-if="drop === 1" class="width-input-color">

                        <div class="radio-group">
                            <label class="custom-radio">
                                <input @change="changeColor('white')" value="white" name="option" class="checkbox-q"
                                    id="color-menu" type="radio">
                                <span class="radio-icon">
                                </span>
                                <span class="checkbox checkbox-text">WHITE</span>
                            </label>


                            <label class="custom-radio">
                                <input @change="changeColor('Blue')" value="blue" name="option" class="checkbox-q"
                                    id="blue-color" type="radio">
                                <span class=" radio-icon">
                                </span>
                                <span :class="{ blue: selectedColor === 'Blue' }"
                                    class="checkbox checkbox-text blue">BLUE</span>
                            </label>



                            <label class="custom-radio">
                                <input @change="changeColor('Black')" value="black" name="option" class="checkbox-q"
                                    id="black-color" type="radio">
                                <span class=" radio-icon">
                                </span>
                                <span class="checkbox checkbox-text">BLACK</span>
                            </label>



                            <label class="custom-radio">
                                <input @change="changeColor('Red')" value="Red" name="option" class="checkbox-q"
                                    id="orange-color" type="radio">
                                <span class=" radio-icon">
                                </span>
                                <span :class="{ red: selectedColor === 'Red' }"
                                    class="checkbox checkbox-text red">RED</span>
                            </label>
                        </div>
                    </div>
                </transition>




            </div>


            <div @click="drop = 2" class="nav-size">
                <summary class="size but-cursor"> <span class="trending">CHOOSE SIZE </span><svg class="trending-nav"
                        width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z"
                            fill="#6F6E6E" />
                    </svg></summary>

                <transition name="fade">
                    <div v-if="drop === 2" class=" checkbox-size">

                        <div class="radio-group">

                            <label class="custom-radio">
                                <input @change="changeSize('XS')" class="checkbox-q" id="xs-size" type="radio" name="size">
                                <span class=" radio-icon">
                                </span>
                                <span class="checkbox checkbox-text">XS</span>
                            </label>

                        </div>

                        <div>
                            <label class="custom-radio">
                                <input @change="changeSize('S')" class="checkbox-q" id="s-size" type="radio" name="size">
                                <span class=" radio-icon">
                                </span>
                                <span class="checkbox checkbox-text">S</span>
                            </label>

                        </div>
                        <div>
                            <label class="custom-radio">
                                <input @change="changeSize('M')" class="checkbox-q" id="m-size" type="radio" name="size">
                                <span class=" radio-icon">
                                </span>
                                <span class="checkbox checkbox-text">M</span>
                            </label>

                        </div>
                        <div>
                            <label class="custom-radio">
                                <input @change="changeSize('L')" class="checkbox-q" id="L-size" type="radio" name="size">
                                <span class=" radio-icon">
                                </span>
                                <span class="checkbox checkbox-text">L</span>
                            </label>

                        </div>
                    </div>
                </transition>
            </div>


            <div @click="drop = 3">
                <summary class="trending-now but-cursor">
                    <span class="trending but-cursor"> QUANTITY </span> <svg class="trending-nav" width="12" height="7"
                        viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z"
                            fill="#6F6E6E" />
                    </svg>
                </summary>

                <div v-if="drop === 3" class="quantity-selector-product">
                    <button class="button-decrease" @click="decreaseQuantity()"
                        :disabled="cardCurrent.quantity <= 1">-</button>

                    <input class="quantityProduct" type="number" v-model.number="localQuantity"
                        @input="onInputChange($event)" min="1" />

                    <button class="button-increase" @click="increaseQuantity">+</button>
                </div>


            </div>

        </div>

        <div class="block-add-cart">
            <button @click="addToCard(card)" class="ad-to-card">
                <svg class=" ad-to-card-carzina" width="27" height="25" viewBox="0 0 27 25" fill='none'
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.49847 22.185C5.50635 21.752 5.64091 21.3309 5.88519 20.9748C6.12947 20.6186 6.47261 20.3431 6.87158 20.1828C7.27055 20.0226 7.7076 19.9848 8.12781 20.0741C8.54802 20.1635 8.93269 20.376 9.23358 20.685C9.53447 20.994 9.73817 21.3857 9.81909 21.811C9.90002 22.2363 9.85453 22.6763 9.68842 23.0756C9.52231 23.475 9.24296 23.8161 8.88538 24.0559C8.52779 24.2957 8.10791 24.4237 7.67847 24.4237C7.38955 24.4211 7.10399 24.3611 6.83807 24.2472C6.57216 24.1333 6.3311 23.9676 6.12866 23.7597C5.92623 23.5518 5.76639 23.3057 5.65826 23.0355C5.55013 22.7653 5.49584 22.4763 5.49847 22.185ZM21.3045 24.4237C20.8711 24.4303 20.4453 24.3087 20.0797 24.074C19.7141 23.8393 19.4247 23.5017 19.2471 23.103C19.0696 22.7042 19.0117 22.2618 19.0806 21.8303C19.1496 21.3988 19.3423 20.9971 19.6351 20.6748C19.9278 20.3524 20.3077 20.1236 20.728 20.0165C21.1482 19.9095 21.5903 19.929 21.9997 20.0724C22.4091 20.2159 22.7679 20.4771 23.0317 20.8238C23.2956 21.1706 23.453 21.5877 23.4845 22.0236C23.5269 22.6155 23.3369 23.2004 22.9555 23.6523C22.7706 23.8745 22.5436 24.0574 22.2877 24.1901C22.0319 24.3227 21.7524 24.4025 21.4655 24.4247L21.3045 24.4237ZM8.59351 17.4855C8.38116 17.4851 8.17488 17.414 8.00671 17.2833C7.83855 17.1525 7.71792 16.9694 7.66351 16.7624L3.73651 2.19527H0.978516C0.719001 2.19527 0.470064 2.09128 0.28656 1.90622C0.103056 1.72116 0 1.47018 0 1.20847C0 0.946764 0.103056 0.695782 0.28656 0.510726C0.470064 0.325669 0.719001 0.22168 0.978516 0.22168H4.45752C4.66982 0.222254 4.876 0.293463 5.04413 0.424184C5.21226 0.554905 5.33295 0.737883 5.38751 0.944787L9.31451 15.5119H20.0185L23.5765 7.12665H11.7185C11.459 7.12665 11.2101 7.02266 11.0266 6.83761C10.8431 6.65255 10.74 6.40157 10.74 6.13986C10.74 5.87815 10.8431 5.62717 11.0266 5.44211C11.2101 5.25705 11.459 5.15306 11.7185 5.15306H25.0535C25.2131 5.15352 25.3701 5.19451 25.5099 5.27223C25.6497 5.34995 25.7679 5.46195 25.8535 5.59784C25.9413 5.73569 25.9945 5.89303 26.0084 6.05627C26.0224 6.21951 25.9966 6.38368 25.9335 6.53465L21.5425 16.8935C21.469 17.0684 21.3462 17.2177 21.1895 17.3229C21.0327 17.4281 20.8488 17.4846 20.6605 17.4855H8.59351Z" />
                </svg>

                Add to Cart
            </button>
        </div>
    </div>
</template>
