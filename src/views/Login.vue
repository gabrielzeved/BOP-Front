<template>
    <div id="container">
        <div id="lateral">
            <img src="../assets/lateral.svg"/>

            <form id="login">
                <h1 class="form-title styled-underline">Login</h1>

                <label for="usuario">Usuário:</label>
                <input type="text" id="usuario" name="usuario" />

                <label for="senha">Senha:</label>
                <input type="password" id="senha" name="senha" />

                <button id="logar">Entrar</button>

            </form>

        </div>
        <div id="top">
            <img src="../assets/top.svg"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login'
}
</script>

<style lang="scss" scoped>
    #container{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;

        #lateral{
            height: 100%;
            > img{
                height: 100%;
            }
            position: relative;
        }

        #login{
            width: 100%;
            padding: 50px;
            position: absolute;
            top: 0;

            h1{
                margin: 0 0 80px;
                color: white;
                font-size: 3rem;
                text-shadow: 0px 0px 10px rgba(black, 0.3);
                position: relative;
                &::after{
                    position: absolute;
                    content: ' ';
                    width: 50px;
                    height: 10px;
                    background: #fdc82e;
                    display: block;
                    border-radius: 10px;
                }
            }

            label{
                display: block;
                margin: 20px 0px 8px;
                color: white;
                font-size: 20px;
                text-shadow: 0px 0px 10px rgba(black, 0.3);
            }

            input[type="text"], input[type="password"]{
                border:0;
                outline: 0;
                background-color: transparent;
                padding: 8px;
                width: 100%;
                max-width: 250px;
                border-bottom: 3px solid white;
                color: #eee;
            }

            button{
                display: block;
                padding: 1rem 4rem;
                margin: 100px auto;
                color: #008542;
                font-weight: bold;
                font-size: 18px;
                background-color: #d9dbda;
                border: 0;
                border-radius: 5px;
                box-shadow: 0px 0px 10px 2px rgba(black, 0.2);
            }

        }

        #top{
            flex-grow: 1;
            > img{
                width: 100%;
            }
        }
    
    }

</style>