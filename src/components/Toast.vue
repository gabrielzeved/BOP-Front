<template>
    <div :style="style" :class="`toast__wrapper ${show ? 'show' : 'hide'}`">
        {{ text }}
    </div>
</template>

<script>
export default {
    props: ['text', 'color', 'textColor', 'show'],
    computed: {
      style () {
        return `
        background-color: ${this.color ? this.color : '#008542'};
        color: ${this.textColor ? this.textColor : 'white'};
        `
      }
    },
}
</script>

<style scoped lang="scss">

    .toast__wrapper{
        position: fixed;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0px 0px 10px 3px rgba(0,0,0,.3);
        z-index: 999;
        padding: .75em 1em;
        border-radius: 3px;
        opacity: .85;
        width: 85%;
        text-align: center;
        pointer-events: none;

        transition: all 1s ease;
        
        &.hide{
            opacity: 0;
        }

    }

</style>