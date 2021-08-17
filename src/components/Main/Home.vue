<template>
    <div class="layout__main__home">

        <div class="box description">
            <h1>Sobre o sistema</h1>
            <span>lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi asperiores assumenda eligendi harum tenetur veritatis illum molestiae animi exercitationem, dolore perferendis voluptas alias quaerat similique quas nostrum officia ipsum iste. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, obcaecati aperiam. Optio, fuga voluptatum, aliquam velit culpa asperiores consequatur neque nesciunt sit sed repudiandae. Explicabo sed dignissimos laborum dicta quia?</span>
        </div>

        <div class="box features">

            <div class="feature">
                <img src="../../assets/1.png" />
                <div>
                    <h1>Gerenciamento de Usuários e Empresas</h1>
                <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae aperiam recusandae expedita voluptatem soluta odit laborum </span>
                </div>
            </div>

            <div class="feature">
                <img src="../../assets/2.png" />
                <div>
                    <h1>Gerenciamento de Tags Intérprete e RTO-Live</h1>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi repellat non architecto reprehenderit rerum, fuga ipsam </span>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .layout__main__home{
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 16px;
        justify-content: space-around;
        .box{
            background: #eee;
            border-radius: 10px;
            padding: 16px;
            margin: 0 auto;
            box-shadow: 2px 2px 5px 2px rgba(black, .3);
            max-width: 850px;
            
            & + *{
                margin-top: 20px;
            }

            span{
                font-size: 0.8rem;
            }

            h1{
                margin: 0 0 20px;
                color: #008542;
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

            &.features{
                display: flex;
                > *{
                    flex-basis: 100%;
                }
                .feature{
                    padding: 0 20px;
                    display: flex;

                    & + *{
                        border-left: 2px solid #008542;
                    }

                    img{
                        object-fit: contain;
                        margin: auto 20px;
                        max-width: 80px;
                        height: fit-content;
                    }
                }
            }
        }

    }
</style>