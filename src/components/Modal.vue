<template>
    <div class="modal__wrapper">
        <div class="modal__wrapper__container">
            <div class="modal__wrapper__container__header">
                <img :src="require('@/assets/' + image + '')" />

                <h1>{{ title }}</h1>
            </div>
    
            <div class="modal__wrapper__container__content" v-html="htmlString">
            </div>
            <div class="modal__wrapper__container__buttons">
                <div v-on:click="close()" class="modal__wrapper__container__buttons__close">
                    Fechar
                </div>

                <div v-if="callback" v-on:click="callback.action(); close();" class="modal__wrapper__container__buttons__callback">
                    {{ callback.text }}
                </div>

            </div>
          </div>
    </div>
</template>

<script>
export default {
    props:['title', 'image', 'htmlString', 'close', 'callback']
}
</script>

<style lang="scss" scoped>
    .modal__wrapper{
        position: fixed;
        z-index: 999;
        inset: 0;
        background-color: rgba(black, 0.7);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        &__container{
            border-radius: 10px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            min-width: 70%;
            min-height: 70%;
            background-color: white;
            display: flex;
            flex-direction: column;
            padding: 2em;

            &__header{
                display: flex;
                flex-direction: column;
                align-items: center;

                h1{
                    color: #008542;
                }
            }

            p{
                line-height: 1.5;
            }

            img{
                max-height: 100px;
                width: auto;
            }

            &__buttons{
                width: 100%;
                display: flex;
                justify-content: space-around;
                &__close{
                    padding: 1em 2em;
                    background-color: #008542;
                    border-radius: 5px;
                    color: white;
                    font-weight: bold;
                    text-align: center;
                    width: 200px;
                    cursor: pointer;       
                }

                &__callback{
                    padding: 1em 2em;
                    background-color: #008542;
                    border-radius: 5px;
                    color: white;
                    font-weight: bold;
                    text-align: center;
                    width: 200px;  
                    cursor: pointer;          
                }

            }

        }
    }
</style>