<template>

  <div class="business">

        <div class="business__header">
            <img src="../../assets/3.png" />
            <h1>Gerenciar Empresas</h1>
        </div>

        <TabSelect :tabs="tabs" ref="tab_select"/>

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
                        <option value="name">Nome</option>
                        <option value="cnpj">CNPJ</option>
                    </select>
                </div>

                <div>
                    <label for="filter-by">Filtrar por:</label>
                    <select id="filter-by" name="filter-by" >
                        <option value="" disabled selected>Select your option</option>
                        <option value="name">Nome</option>
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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(company, index) in companies" :key="index">
                        <td> 
                            <div class="icon"><i class='bx bx-building-house'></i></div> 
                            {{ company.nome }}
                        </td>
                        <td align="center">{{ company.cnpj }}</td>
                        <td align="center"><i class='bx bx-edit' v-on:click="changeToEdition(company.id)"></i></td>
                        <td align="center" v-on:click="deleteCompany(company)" ><i class='bx bx-no-entry'></i></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div id="tab-value-1" class="business__form">
            <form id="form__1">
                <h1>Entre com as informações necessárias para realizar o cadastro</h1>
            
                <label for="nome">Nome</label>
                <input type="text" id="business-name" name="nome_empresa" />
            
                <label for="cnpj">CNPJ</label>
                <input type="text" id="business-cnpj" name="cnpj" />

               <button v-on:click.stop.prevent="registerCompany()">Cadastrar</button>

            </form>
        </div>

        <div id="tab-value-2" class="business__form">
            <form id="form__2">
                <h1>Entre com as informações necessárias para editar o cadastro</h1>
            
                <label for="name">Nome</label>
                <input type="text" id="business-name" name="nome_empresa" />
            
                <label for="cnpj">CNPJ</label>
                <input type="text" id="business-cnpj" name="cnpj" />

                <button v-on:click.stop.prevent="updateCompany()">Atualizar</button>

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
            companies: [],
            companyEditing: -1
        }
    },
    mounted: function(){
        this.resetTabs();
        service.all().then(response => response.data)
        .then(data =>this.companies = data);
    },
    methods: {
        changeToEdition: function(id){
            const company = this.companies.find(company => company.id == id);

            if(!company){
                console.log("Usuario nao encontrado");
                return;
            }

            this.companyEditing = id;

            this.tabs = [
                {name: 'Visualizar',element: document.getElementById('tab-value-0'), visible: true, callback: this.resetTabs},
                {name: 'Cadastro',  element: document.getElementById('tab-value-1'), visible: false},
                {name: 'Editar',  element: document.getElementById('tab-value-2'), visible: true}
            ]

             const form = document.getElementById(`form__2`);

            //FILLING VALUE IN FORM
            form.elements['nome_empresa'].value = company.nome;
            form.elements['cnpj'].value = company.cnpj;

            this.$nextTick(() => this.$refs.tab_select.activateTab(2));
        },
        resetTabs: function(){
            this.tabs = [
                {name: 'Visualizar',element: document.getElementById('tab-value-0'), visible: true, callback: this.resetTabs},
                {name: 'Cadastro',  element: document.getElementById('tab-value-1'), visible: true},
                {name: 'Editar',  element: document.getElementById('tab-value-2'), visible: false}
             ]
        },
        parseObjectFromForm: function(){
            const tab_select = this.$refs.tab_select;
            const form = document.getElementById(`form__${tab_select.activeTab}`);
            const formData = new FormData(form);
            let object = {};
            for (var pair of formData.entries()) {
                object[pair[0]] = pair[1];
            }
            return object;
        },

        registerCompany: function(){
            const newCompany = this.parseObjectFromForm();
            newCompany.nome = newCompany.nome_empresa;

           if(!newCompany.nome_empresa){
                console.error("Nome é obrigatório");
                return;
            }

            if(!newCompany.cnpj){
                console.log(newCompany)
                console.error("CNPJ é obrigatório")
                return;
            } 

            service.add(newCompany)
            .then(() => {
                this.openModal('empresa registrada com sucesso!', '2.png', 
                    `
                    <p>A empresa foi adicionada com as seguintes informações:</p>
                    <p>Empresa: <b>${newCompany.nome_empresa}</b></p>
                    <p>CNPJ: <b>${newCompany.cnpj}</b></p>
                    `,
                    null
                );
                this.companies = [...this.companies, newCompany]
                this.$refs.tab_select.activateTab(0);
            });
        },

        openModal: function(title, image, htmlString, callback){
            this.$emit('openModal', title, image, htmlString, callback);
        },
        closeModal: function(){
            this.$emit('closeModal');
        },

        updateCompany: function(){
            const newCompany = this.parseObjectFromForm();
            newCompany.nome = newCompany.nome_empresa;

            if(!newCompany.nome_empresa){
                console.error("Nome é obrigatório");
                return;
            }

            if(!newCompany.cnpj){
                console.error("CNPJ é obrigatório")
                return;
            } 

            service.update(this.companyEditing, newCompany)
            .then((response) => {
                newCompany.id = response.data.id;
                this.openModal('Empresa editada com sucesso!', '2.png', 
                    `
                    <p>A empresa foi editado com as seguintes informações:</p>
                    <p>Nome: <b>${newCompany.nome_empresa}</b></p>
                    <p>Cargo: <b>${newCompany.cnpj}</b></p>
                    `,
                    null
                );
                this.companies = this.companies.filter( c => c.id != newCompany.id);

                this.companies = [...this.companies, newCompany];

                this.$refs.tab_select.activateTab(0);
            });
        },

        deleteCompany: function(company){

            this.openModal('Deseja realmente deletar essa empresa?', '2.png', 
                `
                <p>A empresa com as seguintes informações será deletada ao clicar em confirmar:</p>
                <p>Empresa: <b>${company.nome}</b></p>
                <p>CNPJ: <b>${company.cnpj}</b></p>
                `,
                {
                    action: () => {
                        service.delete(company.id).then(() => {   
                            this.companies = this.companies.filter( c => c.id != company.id);

                        }).catch(error =>{
                            console.log(error);
                        })
                    },
                    text: "Confirmar"
                }
            );        
        },
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