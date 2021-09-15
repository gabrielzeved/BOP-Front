<template>
    <div class="layout__header">
        <div class="layout__header__logo">
            <img src="../assets/header-logo.png" />
            <img class="logo-image" src="../assets/header.png" />
            <div class="layout__header__title">
                Sistema Intérprete
            </div>
        </div>
        <div class="layout__header__login">
            <span>Você está logado como: Administrador</span>
            <a href="#">Logout</a>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .layout__header{
        background-color: white;
        justify-content: space-between;
        position:relative;
        z-index: 2;

        &__title{
            position: absolute;
            right: 10%;
            color: white;
            font-size: 2rem;
            line-height: 64px;
            margin: 0;
            padding: 0;
            text-shadow: 0 0 .3em rgba(0,0,0,0.5);
        }

        &__logo{
            padding: 0 0px 4px 16px;
            height: 68px;
            display: flex;
            justify-content: space-between;

            img{
                height: 100%;
                
            }

            .logo-image{
                flex-basis: 100%;
            }
            
        }
        &__login{
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #eee;
            padding: 8px 16px;
            height: fit-content;
            a{
                color: black;
            }

        }

    }
</style>