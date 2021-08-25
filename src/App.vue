<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>
  </div>
  <router-view/> -->

  <div id="main" :class="showModal ? 'modal-open' : ''">

    <Modal v-if="showModal"
        :title="modal.title"
        :image="modal.image"
        :htmlString="modal.htmlString"
        :close="closeModal"
        :callback="modal.callback"
        />
    <Toast 
      :text="toast.text"
      :color="toast.color"
      :textColor="toast.textColor"
      :show="showToast"
    />
    
    <Home
      :openModal="openModal"
      :closeModal="closeModal"
      :openToast="openToast"
      :closeToast="closeToast"
    />
  
  </div>

</template>

<script>
import Home from './views/Home.vue';
import Modal from './components/Modal';
import Toast from './components/Toast';
export default {
  components: {
    Home, Modal, Toast
  },
  data: function () {
    return {
        modal: {
          title: "Default",
          image: "2.png",
          htmlString: "<p>Bundia</p>",
          callback: null
        },
        showModal: false,
        showToast: false,
        toast:{
          text: "Concluido",
          color: "#008542",
          textColor: "white"
        },
        toastTimeout: null
    }
  },
  methods:{
    openModal: function(title, image, htmlString, callback){
      this.modal.title = title;
      this.modal.image = image;
      this.modal.htmlString = htmlString;
      this.modal.callback = callback
      this.showModal = true;
    },
    closeModal: function(){
      this.showModal = false;
    },
    openToast: function(text, color, textColor){
      this.toast.text = text;
      if(color)
        this.toast.color = color;
      if(textColor)
        this.toast.textColor = textColor;
      this.showToast = true;

      if(this.toastTimeout)
        clearTimeout(this.toastTimeout)

      this.toastTimeout = setTimeout(() => {
        this.closeToast();
      }, 5000)

    },
    closeToast: function(){
      this.showToast = false;
    }
  }
}
</script>

<style scoped lang="scss">
#main {
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
}

.modal-open{
  overflow: hidden;
}

</style>
