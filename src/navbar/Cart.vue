<script setup>
import Alertdel from './Alertdel.vue'
import { ref, computed } from 'vue';
import { useStore } from '../store';
const store = useStore();
const city = ref("");
const stateInput = ref("");
const zip = ref("");
const emailError = ref("");



//const del = (idDel, ide, color, size) => { store.del({ idDel, ide, color, size })};
const del = (card) => {
    card.removing = true;
    setTimeout(() => {
        store.del(card); // Вызываем метод удаления из хранилища
    }, 500);



};
//Покупка товра 
const buy = () => {
    store.buy();
};
//Обработка формы отправки
const submit = (event) => {
    event.preventDefault();
    if (isValid.value) {
        store.login();
        city.value = '';
        stateInput.value = "";
        zip.value = "";
        store.isValid = true;
    } else {
        emailError.value = 'Введите корректный адрес';
        store.isValid = false;
    }
};
//Очистка корщины
const clear = () => {
    alert("clear active"); store.clear();
};

//Увилечение колличество товра
const increaseQuantity = (card) => {
    card.quantity++;
    store.increaseQuantity({
        quantity: card.quantity,
        currentImage: card.id,
        ide: card.ide
        // color: card.color,
        //size: card.size
    })
};

//Уменьшение колличество товара
const decreaseQuantity = (card) => {
    if (card.quantity > 1) {
        card.quantity--;
        store.decreaseQuantity({
            quantity: card.quantity,
            currentImage: card.id,
            ide: card.ide
            // color: card.color,
            // size: card.size
        })
    }
};

//Обработка изминения ввода колличества
const onInputChange = (card, event) => {
    const value = parseInt(event.target.value);

    if (!isNaN(value) && value >= 1) {
        card.quantity = value;
        store.increaseQuantity({
            quantity: card.quantity, currentImage: card.id
        })
    } else {
        card.quantity = 1; store.increaseQuantity({
            quantity: card.quantity, currentImage: card.id
        })
    }
};
//Выч-ое свойство доя корзины
const cart = computed(() => {
    if (!store) {
        console.error("Store is not available");
        return [];
    }
    return Array.isArray(store.cart) ? store.cart : [];
});
//Валидация полей формы
const isValid = computed(() =>
    city.value !== "" && stateInput.value !== '' && zip.value !== '');
//Вычисляемое свойство для суммы
const grandTotal = computed(() =>
    store.sum);
</script>

<template>
    <div>
        <Alertdel />
        <main v-if="cart.length" class="card-promo-shop">

            <div class="promo-shopcart center">
                <h1 class="promo-heading-cart">SHOPPING CART</h1>
            </div>

            <div class="cart-form  center wrap">
                <div class="block-cart wrap center">

                    <div v-for="card in cart" :key="card.id" class="block-cart-mini1"
                        :class="{ 'fade-out': card.removing }">
                        <div class="mango1"><img class="mango-scale" width="262" height="306" :src="card.image"
                                alt="mango1"></div>
                        <div class="block-header">
                            <p class="block-header__mango">{{ card.name }}</p>

                            <ul class="block-header__ul">
                                <li class="price">Price: <span class="prise300">$ {{ card.price }}</span></li>
                                <li class="size">Size: {{ card.size }}</li>
                                <li class="size">Color: {{ card.color }}</li>
                                <li class="quanti">Quantity:
                                    <div class="quantity-selector">
                                        <button class="button-decrease" @click="decreaseQuantity(card)"
                                            :disabled="card.quantity <= 1">-</button>

                                        <input class="quantityProduct" type="number" v-model.number="card.quantity"
                                            @input="onInputChange(card, $event)" min="1" />

                                        <button class="button-increase" @click="increaseQuantity(card)">+</button>
                                    </div>
                                </li>
                            </ul>
                        </div>


                        <div>
                            <button @click="del(card)" class="block-header__x"><svg class="input-svg" width="25" height="25"
                                    viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.4158 6.00409L11.7158 1.71409C11.9041 1.52579 12.0099 1.27039 12.0099 1.00409C12.0099 0.73779 11.9041 0.482395 11.7158 0.294092C11.5275 0.105788 11.2721 0 11.0058 0C10.7395 0 10.4841 0.105788 10.2958 0.294092L6.0058 4.59409L1.7158 0.294092C1.52749 0.105788 1.2721 -1.9841e-09 1.0058 0C0.739497 1.9841e-09 0.484102 0.105788 0.295798 0.294092C0.107495 0.482395 0.0017066 0.73779 0.0017066 1.00409C0.0017066 1.27039 0.107495 1.52579 0.295798 1.71409L4.5958 6.00409L0.295798 10.2941C0.20207 10.3871 0.127676 10.4977 0.0769072 10.6195C0.0261385 10.7414 0 10.8721 0 11.0041C0 11.1361 0.0261385 11.2668 0.0769072 11.3887C0.127676 11.5105 0.20207 11.6211 0.295798 11.7141C0.388761 11.8078 0.499362 11.8822 0.621222 11.933C0.743081 11.9838 0.873786 12.0099 1.0058 12.0099C1.13781 12.0099 1.26852 11.9838 1.39038 11.933C1.51223 11.8822 1.62284 11.8078 1.7158 11.7141L6.0058 7.41409L10.2958 11.7141C10.3888 11.8078 10.4994 11.8822 10.6212 11.933C10.7431 11.9838 10.8738 12.0099 11.0058 12.0099C11.1378 12.0099 11.2685 11.9838 11.3904 11.933C11.5122 11.8822 11.6228 11.8078 11.7158 11.7141C11.8095 11.6211 11.8839 11.5105 11.9347 11.3887C11.9855 11.2668 12.0116 11.1361 12.0116 11.0041C12.0116 10.8721 11.9855 10.7414 11.9347 10.6195C11.8839 10.4977 11.8095 10.3871 11.7158 10.2941L7.4158 6.00409Z" />
                                </svg></button>
                        </div>
                    </div>



                    <div class="block-btn center">
                        <div @click="clear()" class="block-btn-clear">
                            <button class="block-btn__clear">Clear shopping cart</button>
                        </div>

                        <div class="block-btn-continue">
                            <button class="block-btnn__continue">Continue shopping</button>
                        </div>
                    </div>


                </div>



                <div class="form-cart center">
                    <form @submit="submit" class="form-cart-shop" action="#">
                        <h4 class="form-cart-shop"> SHIPPING ADRESS</h4>
                        <input v-model.trim="city" class="form-cart-shop_i bangladesh" type="text" name="city"
                            placeholder="Bangladesh">
                        <input v-model.trim="stateInput" class="form-cart-shop_i" type="text" name="state"
                            placeholder="State">
                        <input v-model.trim="zip" class="form-cart-shop_i" type="text" name="zip"
                            placeholder="Postcode / Zip">
                        <input v-if="isValid" class="form-cart-shop_btn" type="submit" value="GET A QUOTE">
                    </form>

                    <div class="proceed">
                        <div class="proceed-sub">
                            <p class="sub">SUB TOTAL</p>
                            <p class="sub_mini">$ {{ store.sum }}</p>
                        </div>
                        <div class="proceed-grand">
                            <p class="grand">GRAND TOTAL</p>
                            <p class="grand_mini">$ {{ grandTotal }}

                            </p>
                        </div>
                        <hr class="proceed_hr">
                        <input @click="buy" class="proceed_btn" type="submit" value="PROCEED TO CHECKOUT">
                    </div>
                </div>
            </div>


        </main>

        <div v-else class="empty">
            Your cart is empty
        </div>

    </div>
</template>