<template>

  <div class="business">

        <div class="business__header">
            <img src="../../assets/3.png" />
            <h1>Gerenciar Empresas</h1>
        </div>

        <TabSelect :tabs="tabs"/>

        <div id="tab-value-0" class="business__list">
            
            <div class="business__list__searchbar">
                <div class="search">
                    <i class='bx bx-search'></i>
                    <input type="text" />
                </div>
                <button>Pesquisar</button>
            </div>

            <div class="business__list__filters">
                <div>
                    <label for="list-by">Listar por:</label>
                    <select id="list-by" name="list-by" >
                        <option value="" disabled selected>Select your option</option>
                        <option value="hurr">Durr</option>
                    </select>
                </div>

                <div>
                    <label for="filter-by">Filtrar por:</label>
                    <select id="filter-by" name="filter-by" >
                        <option value="" disabled selected>Select your option</option>
                        <option value="hurr">Durr</option>
                    </select>
                </div>
            </div>

            <table class="business__table">
                <thead>
                    <tr>
                        <th align="center">Nome</th>
                        <th align="center">CNPJ</th>
                        <th align="center">Editar</th>
                        <th align="center">Deletar</th>
                        <th align="center">Selecionar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(company, index) in companies" :key="index">
                        <td> 
                            <div class="icon"><i class='bx bx-building-house'></i></div> 
                            {{ company.nome }}
                        </td>
                        <td align="center">{{ company.cnpj }}</td>
                        <td align="center"><i class='bx bx-edit'></i></td>
                        <td align="center"><i class='bx bx-no-entry'></i></td>
                        <td align="center"><input type="checkbox"></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div id="tab-value-1" class="business__form">
            <form>
                <h1>Entre com as informações necessárias para realizar o cadastro</h1>
            
                <label for="business-name">Nome</label>
                <input type="text" id="business-name" name="business-name" />
            
                <label for="business-cnpj">CNPJ</label>
                <input type="text" id="business-cnpj" name="business-cnpj" />

                <button>Cadastrar</button>

            </form>
        </div>

  </div>

</template>

<script>
import TabSelect from '../TabSelect';
import CompanyService from '../../services/company.service';

const service = new CompanyService('http://localhost:5001');

export default {

    components: {
        TabSelect
    },
    data: function(){
        return{
            tabs: [],
            companies: []
        }
    },
    mounted: function(){
        this.resetTabs();
        service.all().then(data => this.companies = data.objetos);
    },
    methods: {
        changeToEdition: function(){
            this.tabs = [
                {name: 'Visualizar',element: document.getElementById('tab-value-0'), visible: true, callback: this.resetTabs},
                {name: 'Cadastro',  element: document.getElementById('tab-value-1'), visible: false},
                {name: 'Editar',  element: document.getElementById('tab-value-2'), visible: true}
            ]
        },
        resetTabs: function(){
            this.tabs = [
                {name: 'Visualizar',element: document.getElementById('tab-value-0'), visible: true, callback: this.resetTabs},
                {name: 'Cadastro',  element: document.getElementById('tab-value-1'), visible: true},
                {name: 'Editar',  element: document.getElementById('tab-value-2'), visible: false}
             ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .business{
        margin: 10px 40px;
        height: 100%;
        &__header{
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 16px;
            img{
                max-height: 50px;
            }

            h1{
                margin-left: 10px;
                font-weight: normal;
                color: #222;
                font-size: 28px;
            }

            border-bottom: 2px solid #008542;
        }

        &__form{
            background-color: #eee;
            padding: 16px 80px;
            width: 100%;

            h1{
                font-size: 24px;
                font-weight: normal;
            }

            label{
                font-size: 18px;
                display: block;
                margin-top: 2px;
                line-height: 32px;
            }
            input[type="text"]{
                width: 100%;
                max-width: 500px;
                outline: 0;
                border: 1px solid #c4c4c4;
                padding: 8px 16px;
                color: #222;
                margin: 0 0 20px;
            }

            button{
                display: block;
                padding: .7em 1.5em;
                margin-top: 15px;
                border: 0;
                background-color: #008542;
                color: white;
                border-radius: 5px;
                font-size: 16px;
            }

        }

        &__list{
            background-color: #eee;
            padding: 16px 36px;

            &__filters{
                display: flex;
                justify-content: space-between;
                padding: 20px 0 6px;
                    font-size: 14px;

                select{
                    border: 1px solid #c4c4c4;
                    padding: 6px 10px;
                    margin-left: 5px;
                    &:focus{
                        outline: 0;
                    }
                }

            }

            &__searchbar{
                width: 100%;
                background: white;
                display: flex;
                align-items: center;
                position: relative;
                height: 36px;
                .search{
                    padding-left: 8px;
                    height: 100%;
                    flex-grow: 2;
                    display: flex;
                    align-items: center;
                    input[type="text"]{
                        padding-left: 8px;
                        width: 100%;
                        border: 0;
                        outline: 0;
                    }
                }
                button{
                    flex-grow: 1;
                    height: 100%;
                    background-color: #008542;
                    border: 0;
                    color: white;
                    cursor: pointer;
                }

            }
        }

        &__table{
            margin-top: 16px;
            width: 100%;
            background-color: white;
            border-collapse: collapse;
        }
        tr{
            border-bottom: 1px solid #eee;
        }

        td, th{
            padding: 8px;
        }

        td{
            i{
                color: #008542;
                font-size: 20px;
            }
            .icon{
                display:inline-block;
                width: 30px;
                height: 30px;
                background-color: #fdc82e;
                line-height: 30px;
                text-align: center;
                border-radius: 50%;
                color: #008542;
                font-size: 20px;
                margin-right: 10px;
            }
            color: #999;
        }

        th{
            font-weight: 500;
            color: #333;
        }

    }
</style>