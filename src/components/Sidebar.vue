<template>
    <div class="layout__sidebar">
        <ul>
            <router-link to="/">
                <li>
                    <span>
                        <i class='bx bx-home'></i>
                        Home
                    </span>
                </li>
            </router-link>
            
            <router-link to="/usuarios">
                <li>
                    <span>
                        <i class='bx bx-group' ></i>
                        Usuários
                    </span>
                </li>
            </router-link>

            <router-link to="/empresas">
                <li>
                    <span>
                        <i class='bx bx-building-house'></i>
                    Empresas
                    </span>
                </li>
            </router-link>

            <li>
                <span>
                    <i class='bx bx-spreadsheet'></i>
                    Tags - Intérprete
                </span>
            </li>
            <li>
                <span>
                    <i class='bx bx-spreadsheet'></i>
                    Tags - RTO-Live
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .layout__sidebar{
        position: relative;
        border-right: 2px solid #008542;
        box-shadow: 0px 0px 5px 2px rgba(black, .3);
        ul{
            margin: 30px 0;
            padding: 0;
            list-style: none;
            a{
                text-decoration: none;
            }

            li{
                padding: 16px 50px;
                position: relative;
                cursor: pointer;
                display: flex;
                align-items: center;
                font-size: 0.8rem;
                transition: all 0.15s ease-in;
                color: black;

                > span{
                    transition: all 0.15s ease-in;
                }

                i{
                    font-size: 1.5rem;
                    color:#008542;
                    margin-right: 10px;
                }

                &::before{
                    transition: all 0.15s ease-in;
                    content: '';
                    position: absolute;
                    display:block;
                    width: 5px;
                    height: 100%;
                    left: 0;
                    top: 0;
                    background-color: transparent;
                    border-radius: 3px 0 0 3px;
                }

                &:hover{
                    background-color: #eee;
                    >span{
                        transform: translateX(5px);
                    }
                    &::before{
                        background-color: #008542;
                    }
                }          
            }

            .router-link-active{
                li{
                    background-color: #eee;
                    >span{
                        transform: translateX(5px);
                    }
                    &::before{
                        background-color: #fdc82e;
                    }
                }
            }

        }

    }
</style>