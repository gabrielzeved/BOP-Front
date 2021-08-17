<template>
  <div class="layout__footer">
    <img src="../assets/footer.svg" />      
    <div class="layout__footer__parceria">
      Parceria:
      <img src="../assets/uff-white.png" />
      <img src="../assets/leader-white.png" class="resize" />
      <img src="../assets/petrobras-white.png" class="resize" />
    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

  .layout__footer{
    position: relative;
    z-index: 2;
    display: grid;
    place-items: center;
    > img{
      width: 100%;
      height: 100%;
      object-fit: fill;
      position: absolute;
      top: 0;
    }
    &__parceria{
      position: relative;
      z-index: 2;
      color: white;
      font-weight: bold;
      font-size: 18px;
      padding: 16px 0 0 0;
      display: flex;
      align-items: center;
      > img{
        max-height: 20px;
        padding: 0 15px;
        & + *{
          border-left: 1px solid white;
        }

        &.resize{
          max-height: 30px;
        }

      }
    }
  }

</style>