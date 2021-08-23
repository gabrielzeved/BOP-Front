<template>
  <div class="layout">
    <Header />
    <Sidebar />
    
    <section class="layout__main">
      <router-view @openModal="openModal" @closeModal="closeModal"/>
    </section>
  
    <Footer />

  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export default {
  name: 'Home',
  components: {
    Header, Sidebar, Footer
  },
  props: ['openModal', 'closeModal']
}
</script>

<style lang="scss">

.layout{
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-areas: 
  "header header"
  "sidebar main"
  "footer footer";
  grid-template-columns: 250px auto;
  grid-template-rows: 100px auto 93px;

  &__header{
    grid-area: header;
  }

  &__sidebar{
    grid-area: sidebar;
  }

  &__footer{
    grid-area: footer;
  }

  &__main{
    grid-area: main;
  }

}

</style>
