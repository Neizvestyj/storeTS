// src/store.js

import { defineStore } from 'pinia';
export const useStore = defineStore('store', {
    state: () => ({
        cards: [], // загружает async fetchCards начальный массив карточек
        filteredCards: [],// Фильтрованные карточки
        filteredCatalog: [],// Каталог карточек
        cart: [],//карзина
        isOpen: false,//флаг для бургера 
        isValid: false,//флаг для карт
        currentImage: 0,
        sum: 0,// сумма в карзине
        isValidDel: false,
        //для Catalog
        currentPage: 1,
        itemsPerPage: 2,
        //для Product
        sliderPage: 1,
        sliderItemsPerPage: 2,
        //filterProduct
        current: null,
        cardCurrent: null,
        id: 0,
    }),
    actions: {
        saveLocal() {
            localStorage.setItem("cart", JSON.stringify(this.cart));
            console.log('saveLocal')
        },
        loadingCart() {
            const savedCart = localStorage.getItem('cart');
            console.log('loadingCart')
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
                this.sum = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            }
        },
        sliderPageNext() {
            this.sliderPage + 1;
            console.log(this.sliderPage)
            //this.sliderItemsPerPage++;
        },
        sliderItemsPerPagePrev() {
            this.sliderItemsPerPage - 1;
            if (this.sliderItemsPerPage < 1) {
                this.sliderItemsPerPage = 1; // чтобы не было отрицательного значения
            }
        },

        //cardSlider
        setCurrentCard(card, id) {
            this.cardCurrent = card;
            this.id = id

            // this.current = current;
        },
        async fetchCards() {
            try {
                const response = await fetch('https://raw.githubusercontent.com/Neizvestyj/cardShop/master/data.json');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                console.log(data);
                this.setCards(data.products);
                //  this.loadingCart();
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
                alert("Ошибка при загрузке данных");
            }
        },
        //компонент Search
        setCards(products) {//вызывается в fetchCards 
            console.log("Products set in state:", products);
            this.cards = products; // Устанавливаем карточки в состояние
            this.filteredCards = [...products]; // Устанавливаем также фильтрованные карточки по умолчанию
            this.filteredCatalog = [...products]; // Устанавливаем каталог
        },
        searchCards(searchText) {
            if (searchText.trim() === "") {
                this.filteredCards = [...this.cards]; // Если пусто, показываем все карты
            } else {
                // Иначе фильтруем по вхождению строки
                this.filteredCards = this.cards.filter(t => t.name.toLowerCase().includes(searchText.toLowerCase())
                );
                this.filteredCatalog = this.cards.filter(t => t.name.toLowerCase().includes(searchText.toLowerCase())
                );
            }
        },

        //фильтрация в Catalog
        //компонент navFilter!
        sortFilteredCards({ filter, priceRanges }) {
            // let filteredProducts = [...this.cards];
            let filteredProducts = this.cards.slice(); // Используем slice() для создания копии массива 
            // Фильтрация по диапазонам цены
            if (priceRanges.length > 0) {
                filteredProducts = filteredProducts.filter(item => {
                    return priceRanges.some(range => {
                        if (range === "$0 - $50") return item.price <= 50;
                        if (range === "$50 - $100") return item.price > 50 && item.price <= 100;
                        if (range === "$100 - $200") return item.price > 100 && item.price <= 200;
                        if (range === "Over $200") return item.price > 200;
                        return false;
                    });
                });
            }
            // Фильтрация по трендам
            if (filter === "trending") {
                filteredProducts = filteredProducts.filter(t => t.trending === true);
            }
            this.filteredCatalog = [...filteredProducts];
        },
        // компонент Burger
        toggleMenu() {
            this.isOpen = !this.isOpen;
        },
        closeMenu() {
            this.isOpen = false;
        },
        //компонент Cart
        del(cardDel) {
            this.isValidDel = true;
            if (!cardDel) {
                console.error('cardDel is undefined');
                return; // Прекращаем выполнение, если cardDel не определен
            }
            //  console.log(cardDel.id, cardDel.ide)
            // const cardToRemove = this.cart.find(c => c.id === idDel && c.ide === ide && c.color === color && c.size === size);
            const cardToRemove = this.cart.find(c => c.ide === cardDel.ide && c.color === cardDel.color && c.size === cardDel.size);
            if (cardToRemove) {
                this.sum -= (cardToRemove.price * cardToRemove.quantity);
                cardToRemove.removing = true;
            }
            // this.cart = this.cart.filter(c => !(c.id === idDel && c.ide === ide && c.color === color && c.size === size));
            // Удаляем карточку из корзины
            this.cart = this.cart.filter(c => !(c.ide === cardDel.ide && c.color === cardDel.color && c.size === cardDel.size));
            // this.saveLocal()
            localStorage.setItem("cart", JSON.stringify(this.cart));
        },
        //!
        buy() {
            this.sum = 0;
            this.cart = [];
            console.log("Clearing cart");
        },
        //!
        clear() {
            this.cart = [];
            console.log("Clearing cart");
        },
        increaseQuantity({ quantity, currentImage, ide }) {
            console.log(" increaseQuantity")
            console.log("decreaseQuantity called with:", { quantity, currentImage });

            const card = this.cart.find(item => item.ide === ide);
            if (card) {

                //state.sum -= card.price * card.quantity;
                card.quantity = quantity;
                this.sum += card.price  //card.quantity;
                /*  this.sum -= card.price * card.quantity; // Предыдущая общая сумма до изменения
                  card.quantity = quantity; // Обновление количества
                  this.sum += card.price * card.quantity; // Обновление общей суммы
  */
                console.log(" increaseQuantity2")
                //this.saveLocal()
                localStorage.setItem("cart", JSON.stringify(this.cart));
            }
        },
        //!
        decreaseQuantity({ quantity, currentImage, ide }) {
            console.log(" decreaseQuantity")
            console.log("decreaseQuantity called with:", { quantity, currentImage, ide });
            const card = this.cart.find(item => item.ide === ide);
            if (card) {

                this.sum -= card.price;
                card.quantity = quantity;
                /*  this.sum -= card.price * card.quantity; // Предыдущая общая сумма до изменения
                  card.quantity = quantity; // Обновление количества
                  this.sum += card.price * card.quantity; // Обновление общей суммы
                  */
                console.log("  decreaseQuantity2")
                //this.saveLocal()
                localStorage.setItem("cart", JSON.stringify(this.cart));
            }
        },
        login() {
            alert("Сообщение отправлено ");
        },
        //компонент Cart
        setIsValid(value) {
            this.isValid = value;
            this.isValidDel = value;
        },
        //компонент pagination!
        setCurrentPage(page) {
            this.currentPage = page;
        },
        //компонент Product-filterProduct
        addToCard(payload) {
            const { ide, currentImage, color, size, quantity } = payload;
            if (currentImage == null) {
                console.error(" 4 currentImage is null");
                return;
            }
            console.log('Уникальный ID ' + ide)
            const productToAdd = this.filteredCards.find(item => item.id === currentImage);
            // const existingProduct = this.cart.find(item => item.id === productToAdd.id && item.color === color && item.size === size);
            const existingProduct = this.cart.find(item => item.ide === productToAdd.ide && item.color === color && item.size === size);
            if (existingProduct) {
                existingProduct.quantity++;
                state.sum += existingProduct.price;
                this.saveLocal();
                //localStorage.setItem("cart", JSON.stringify(this.cart));
            } else {
                const newProduct = { ...productToAdd, ide, quantity, color, size, removing: false };
                this.cart.push(newProduct);
                this.sum += newProduct.price * newProduct.quantity;
                this.saveLocal();
            }
        },
    },
    getters: {
        getCards: state => state.cards,
        getFilteredCards: state => state.filteredCards,
        getFilteredCatalog: state => state.filteredCatalog,
        //карточка для слайдера
        getCardCurrent: (state) => state.cardCurrent, // Геттер для получения текущей карточки
        //компонент pagination
        getTotalPages(state) {
            return Math.ceil(state.filteredCatalog.length / state.itemsPerPage);
        },
        //Catalog
        getPaginatedCatalog(state) {
            const start = (state.currentPage - 1) * state.itemsPerPage;
            const end = start + state.itemsPerPage;
            return state.filteredCatalog.slice(start, end + 1);
        },



    }
});

//const store = useStore();
//store.fetchCards();
/*
mutations: {
    //rfhnjx
    setCurrentCard(state, card) {
        state.cardCurrent = card;
    },
    //компонент Search!
    setCards(state, products) {//вызывается в fetchCards 
        console.log("Products set in state:", products);
        state.cards = products; // Устанавливаем карточки в состояние
        state.filteredCards = products; // Устанавливаем также фильтрованные карточки по умолчанию
        state.filteredCatalog = products; // Устанавливаем каталог
    },
    //!
    searchCards(state, searchText) {
        if (searchText.trim() === "") {
            state.filteredCards = state.cards; // Если пусто, показываем все карты
        } else {
            // Иначе фильтруем по вхождению строки
            state.filteredCards = state.cards.filter(t => t.name.toLowerCase().includes(searchText.toLowerCase())
            );
            state.filteredCatalog = state.cards.filter(t => t.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }
    },
    //компонент Burger!
    toggleMenu(state) {
        state.isOpen = !state.isOpen;
    },
    //!
    closeMenu(state) {
        state.isOpen = false;
    },

    //компонент Cart!
    del(state, idDel) {
        const cardToRemove = state.cart.find(c => c.id === idDel);
        if (cardToRemove) {
            state.sum -= (cardToRemove.price * cardToRemove.quantity);
        }
        state.cart = state.cart.filter(c => c.id !== idDel);
    },
    //!
    buy(state) {
        state.sum = 0;
        state.cart = [];
        console.log("Clearing cart");
    },
    //!
    clear(state) {
        state.cart = [];
        console.log("Clearing cart");
    },
    //!
    increaseQuantity(state, { quantity, currentImage }) {
        const card = state.cart.find(item => item.id === currentImage);
        if (card) {
            //state.sum -= card.price * card.quantity;
            card.quantity = quantity;
            state.sum += card.price  //card.quantity;

        }
    },
    //!
    decreaseQuantity(state, { quantity, currentImage }) {
        const card = state.cart.find(item => item.id === currentImage);
        if (card) {
            state.sum -= card.price;
            card.quantity = quantity;
            //  state.sum += card.price  //card.quantity;
        }
    },
    //компонент Promo!
    add(state, payload) {
        const { currentImage, color, size, quantity } = payload;
        if (currentImage == null) {
            console.error("currentImage is null");
            return;
        }
        const productToAdd = state.filteredCards.find(item => item.id === currentImage);

        // Проверка найденного продукта
        if (!productToAdd) {
            console.error(`Product with id ${currentImage} not found in state.cards`);
            return; // Если продукт не найден, выходим из функции
        }

        const existingProduct = state.cart.find(item => item.id === productToAdd.id);
        if (existingProduct) {
            existingProduct.quantity += quantity;
            state.sum += existingProduct.price * quantity; // Увеличиваем сумму на стоимость добавленного объема
        } else {
            const newProduct = { ...productToAdd, quantity, color, size };
            state.cart.push(newProduct);
            state.sum += newProduct.price * newProduct.quantity; // Увеличиваем сумму на стоимость нового продукта
        }
    },

    //фильтрация в Catalog
    //компонент navFilter!
    sortFilteredCards(state, { filter, priceRanges }) {
        let filteredProducts = state.cards;
        // Фильтрация по диапазонам цены
        if (priceRanges.length > 0) {
            filteredProducts = filteredProducts.filter(item => {
                return priceRanges.some(range => {
                    if (range === "$0 - $50") return item.price <= 50;
                    if (range === "$50 - $100") return item.price > 50 && item.price <= 100;
                    if (range === "$100 - $200") return item.price > 100 && item.price <= 200;
                    if (range === "Over $200") return item.price > 200;
                    return false;
                });
            });
        }
        // Фильтрация по трендам
        if (filter === "trending") {
            filteredProducts = filteredProducts.filter(t => t.trending === true);
        }
        state.filteredCatalog = filteredProducts;
    },

    //компонент pagination!
    setCurrentPage(state, page) {
        state.currentPage = page;
    },

    //компонент Footer/Feedback!!!
    login(state) {
        alert("Сообщение отправлено ");
    },
    //компонент Alert!
    setIsValid(state, value) {
        state.isValid = value
    },
    // компонент Product !
    addToCard(state, payload) {
        const { currentImage, color, size, quantity } = payload;
        if (currentImage == null) {

            console.error(" 4 currentImage is null");
            return;
        }
        console.log(currentImage)
        const productToAdd = state.filteredCards.find(item => item.id === currentImage);

        const existingProduct = state.cart.find(item => item.id === productToAdd.id);
        if (existingProduct) {
            existingProduct.quantity++;
            state.sum += existingProduct.price;
        } else {
            const newProduct = { ...productToAdd, quantity, color, size };
            state.cart.push(newProduct);
            state.sum += newProduct.price * newProduct.quantity;
        }
    },

},


actions: {
        async fetchCards({ commit }) {
        try {
            console.log('data');
            const response = await fetch('https://raw.githubusercontent.com/Neizvestyj/cardShop/master/data.json');

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            commit('setCards', data.products);
            //state.cardCurrent = state.cards[0];
            // commit("setCardCurrent", cards[0]); // Установить первую карточку как текущую
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            alert("Ошибка при загрузке данных");
        }
    },
    //setCurrentCard({ commit }, card) {
    //   commit('setCurrentCard', card);
    // },
    searchCards({ commit }, searchText) {
        commit('searchCards', searchText);
    },
    //компонент Promo 
    add({ commit }, payLoad) {
        commit("add", payLoad)
    },
    onOutside({ commit }, menu) {
        const outsideClickHandler = (event) => {
            //Провереяем не был ли клик в меню
            if (!menu || !menu.contains(event.target)) {
                commit("closeMenu");
                commit("closeColor");
                document.removeEventListener("click", outsideClickHandler)
            }
        };
        document.addEventListener("click", outsideClickHandler);
    },
    clearOutsideListener({ commit }) {
        //document.removeEventListener("click",outsideClickHandler);
    },
    toggleMenu({ commit }) {
        commit("toggleMenu"); // Вызов мутации для переключения состояния
    },
    closeMenu({ commit }) {
        commit("closeMenu"); // Вызов мутации для переключения состояния
    },
    //компонент Cart
    del({ commit }, idDel) {
        commit("del", idDel)
    },
    buy({ commit }) {
        commit("buy")
    },
    clear({ commit }) {
        commit("clear")
    },
    increaseQuantity({ commit }, { quantity, currentImage }) {
        commit("increaseQuantity", { quantity, currentImage })
    },
    decreaseQuantity({ commit }, payload) {
        commit("decreaseQuantity", payload);
    },
    sortItems({ commit }, { filter, priceRanges }) {
        commit("sortFilteredCards", { filter, priceRanges })
    },
    sortCheckbox({ commit }, { filter, priceRanges }) {
        commit("sortFilteredCards", { filter, priceRanges }); // Используем новую мутацию
    },
    //компонент pagination
    goToPage({ commit }, page) {
        commit('setCurrentPage', page);
    },

    //компонент Footer/Feedback
    login({ commit }) {
        commit("login")
    },
    //компонент Alert
    hideAlert({ commit }) {
        commit("setIsValid", false)
    },
    setIsValid({ commit }) {
        commit("setIsValid", false)
    },
    // компонент Product
    addToCard({ commit }, payload) {
        commit("addToCard", payload);
    },

},
getters: {
    cards: state => state.cards,
        filteredCards: state => state.filteredCards,
            filteredCatalog: state => state.filteredCatalog,
                //карточка для слайдера
                cardCurrent: (state) => state.cardCurrent, // Геттер для получения текущей карточки
                    //компонент pagination
                    totalPages(state) {
        return Math.ceil(state.filteredCatalog.length / state.itemsPerPage);
    },
    paginatedCatalog(state) {
        const start = (state.currentPage - 1) * state.itemsPerPage;
        const end = start + state.itemsPerPage;
        return state.filteredCatalog.slice(start, end + 1);
    },
    //компонент Product
    sliderCatalog(state) {
        const start = (state.sliderPage - 1) * state.sliderItemsPerPage;
        const end = start + state.sliderItemsPerPage;
        return state.filteredCatalog.slice(start, end);
    },
    // компонент cat
    catalogProduct(state) {
        const start = (state.sliderPage - 1) * state.sliderItemsPerPage;
        const end = start + state.sliderItemsPerPage;
        return state.filteredCatalog.slice(start + 1, end + 2);
    },
}

store.dispatch('fetchCards');
// Экспортируем Store по умолчанию
export default store;*/
