<script>
import Alert from '../Alert.vue'
import { ref, computed } from 'vue';
import { useStore } from '../../store';
export default {
    name: 'Feedback',
    components: { Alert },
    setup() {
        const store = useStore();
        const email = ref("");
        const emailError = ref("");
        // Вычисляемая переменная для проверки валидности
        const isValid = computed(() => {
            return validateEmail(email.value) && email.value !== '';
        });
        // Вычисляемое свойство для сообщения об ошибке
        const emailErrorMessage = computed(() => {
            return emailError.value !== '' ? emailError.value : '';
        });
        // Валидация адреса электронной почты
        const validateEmail = (email) => {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(String(email).toLowerCase());
        };
        const submit = (event) => {
            if (isValid.value) {
                store.dispatch('login');
                emailError.value = '';
                email.value = "";
                // Используем мутацию, чтобы изменить состояние
                store.commit('setIsValid', true);
                //store.state.isValid = true;
            } else {
                emailError.value = 'Введите корректный адрес электронной почты';
                store.commit('setIsValid', false);
                // store.state.isValid = false;
            }

        };
        return {
            email,
            emailError,
            isValid,
            emailErrorMessage,
            validateEmail,
            submit
        };
    },
};

</script>
<template>
    <div class="feedback-block">


        <Alert />

        <div class="feedback-block-center center">
            <div class="option"><img width="97px" height="97px" src="img/statement.png" alt="option">
                <p class="option-text">“Vestibulum quis porttitor dui!<span class="option-italic">Quisque viverra
                        nunc mi, a pulvinar purus condimentum“</span></p>
            </div>

            <div class="subscribe">

                <div class="subscrabe-article">
                    <p class="subscrabe-head">SUBSCRIBE <br>
                        <span class="subscrabe-text"> FOR OUR NEWLETTER AND PROMOTION</span>
                    </p>
                </div>

                <form @submit.prevent="submit" class="search">
                    <input v-model.trim="email" placeholder="Enter Your Email" type="text" class="search-field">

                    <input type="submit" value="Subscribe" class="search-btn">
                    <span v-if="emailError" class="error-message">{{ emailErrorMessage }}</span>

                </form>

            </div>
        </div>

    </div>
</template>