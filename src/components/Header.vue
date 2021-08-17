<template>
    <div class="layout__header">
        <div class="layout__header__logo">
            <img src="../assets/header-logo.png" />
            <img class="logo-image" src="../assets/header.png" />
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
        display: flex;
        flex-direction: column;
        background-color: white;
        justify-content: space-between;
        position:relative;
        z-index: 2;
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