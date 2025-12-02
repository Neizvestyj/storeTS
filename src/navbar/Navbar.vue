<script>
import Search from './Search.vue'
import Burger from './Burger.vue'
import RegistrationLink from './RegistrationLink.vue'
import Basket from './Basket.vue'
export default {
  components: { Search, Burger, RegistrationLink, Basket },
}

</script>

<template>
  <div>
    <header class="header">
      <div class="center header-wrap">
        <div class="center header_left">

          <Search />
        </div>
        <div class="header-right">
          <Burger />
          <RegistrationLink />
          <Basket />

        </div>
      </div>
    </header>
  </div>
</template>


