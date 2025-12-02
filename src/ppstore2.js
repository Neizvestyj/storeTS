const store = new Vuex.Store({
  state: {
    cards: [],// загружает async fetchCards начальный массив карточек
    filteredCards: [],//массив для титульной стр
    filteredCatalog: [],//массив для Сatalog 
    isValid: false,
    selectedFilter: "product",//флаг для Catalog
    cart: [],
    sum: 0,

    currentPage: 1,
    itemsPerPage: 2,

    currentImage: 0,

    sliderPage: 1,
    sliderItemsPerPage: 1,

    isOpen: false,
    drop: false,
  },
  mutations: {
    login(state) {
      alert("Сообщение отправлено ");
    },
    setIsValid(state, value) {
      state.isValid = value
    },
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
    setAllCards(state) {
      // Метод для установки всех карт по умолчанию
      state.filteredCards = state.cards;
      state.filteredCatalog = state.cards;
    },

    add(state, payload) {
      const { currentImage, color, size, quantity } = payload;
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



    del(state, idDel) {
      const cardToRemove = state.cart.find(c => c.id === idDel);
      if (cardToRemove) {
        state.sum -= cardToRemove.price;
      }

      state.cart = state.cart.filter(c => c.id !== idDel);

    },
    buy(state) {
      state.sum = 0;
      state.cart.length = 0;
      console.log("Clearing cart");
    },
    clear(state) {

      state.cart = [];
      console.log("Clearing cart");
    },

    //фильтрация в Catalog
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
    //?
    setFilteredCatalog(state, filteredProducts) {
      state.filteredCatalog = filteredProducts;
    },

    // of slider
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    //?
    setCurrentPageSlider(state, page) {
      state.sliderPage = page;
    },


    changeColor(state, { color, currentImage }) {
      state.filteredCards[currentImage].color = color
    },
    changeSize(state, { size, currentImage }) {
      state.filteredCards[currentImage].size = size
    },



    increaseQuantity(state, { quantity, currentImage }) {
      const card = state.cart.find(item => item.id === currentImage);
      if (card) {
        //state.sum -= card.price * card.quantity;
        card.quantity = quantity;
        state.sum += card.price  //card.quantity;

      }
    },
    decreaseQuantity(state, { quantity, currentImage }) {
      const card = state.cart.find(item => item.id === currentImage);
      if (card) {
        //state.sum -= card.price * card.quantity;
        card.quantity = quantity;
        state.sum += card.price  //card.quantity;
      }
    },

    addToCard(state, payload) {

      const { currentImage, color, size, quantity } = payload;
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

    setCards(state, products) {
      console.log("Products set in state:", products);
      state.cards = products; // Устанавливаем карточки в состояние
      state.filteredCards = products; // Устанавливаем также фильтрованные карточки по умолчанию
      state.filteredCatalog = products; // Устанавливаем каталог
    },

    toggleMenu(state) {
      state.isOpen = !state.isOpen;
    },
    closeMenu(state) {
      state.isOpen = false;
    },

    toggleColor(state) {
      state.drop = !state.drop;
    },
    closeColor(state) {
      state.drop = false;
    },


  },


  actions: {
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
    toggleColor({ commit }) {
      commit("toggleColor");
    },
    closeColor({ commit }) {
      commit("closeColor");
    },
    login({ commit }) {
      commit("login")
    },
    hideAlert({ commit }) {
      commit("setIsValid", false)
    },
    searchCards({ commit }, searchText) {
      commit("searchCards", searchText)
    },
    setAllCards({ commit }) {
      commit("setAllCards");
    },
    add({ commit }, payLoad) {
      commit("add", payLoad)
    },
    del({ commit }, idDel) {
      commit("del", idDel)
    },
    buy({ commit }) {
      commit("buy")
    },
    clear({ commit }) {
      commit("clear")
    },


    sortItems({ commit }, { filter, priceRanges }) {
      commit("sortFilteredCards", { filter, priceRanges })
    },
    sortCheckbox({ commit }, { filter, priceRanges }) {
      commit("sortFilteredCards", { filter, priceRanges }); // Используем новую мутацию
    },


    goToPage({ commit }, page) {
      commit('setCurrentPage', page);
    },
    goToPageSlider({ commit }, page) {
      commit("setCurrentPageSlider", page);
    },


    prevImage({ commit }) {
      commit('prevImage');
    },
    nextImage({ commit }) {
      commit('nextImage');
    },




    changeColor({ commit }, payload) {
      commit("changeColor", payload);
    },
    changeSize({ commit }, payload) {
      commit("changeSize", payload);
    },

    increaseQuantity({ commit }, { quantity, currentImage }) {
      commit("increaseQuantity", { quantity, currentImage })
    },

    decreaseQuantity({ commit }, payload) {
      commit("decreaseQuantity", payload);
    },
    addToCard({ commit }, payload) {
      commit("addToCard", payload);
    },


    async fetchCards({ commit }) {
      try {
        console.log('data');
        const response = await fetch('https://raw.githubusercontent.com/Neizvestyj/cardShop/master/data.json');
        // Укажите URL вашего API
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('data');
        console.log(data);
        commit('setCards', data.products);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert("error")
      }

    },

  },
  getters: {
    cards: state => state.cards,
    filteredCards: state => state.filteredCards,
    filteredCatalog: state => state.filteredCatalog,
    currentImage: state => state.currentImage,




    paginatedCatalog(state) {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.filteredCatalog.slice(start, end + 1);
    },

    catalogProduct(state) {
      const start = (state.sliderPage - 1) * state.sliderItemsPerPage;
      const end = start + state.sliderItemsPerPage;
      return state.filteredCatalog.slice(start + 1, end + 2);
    },

    totalPages(state) {
      return Math.ceil(state.filteredCatalog.length / state.itemsPerPage);
    },


    sliderCatalog(state) {
      const start = (state.sliderPage - 1) * state.sliderItemsPerPage;
      const end = start + state.sliderItemsPerPage;
      return state.filteredCatalog.slice(start, end);
    },

    sliderTotalPages(state) {
      return Math.ceil(state.filteredCatalog.length / state.sliderItemsPerPage);
    }

  }
});

window.store = store
store.dispatch('fetchCards'); // Запрос карточек из API при инициализации
store.commit('setAllCards');