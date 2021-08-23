<template>

  <div class="users">

        <div class="users__header">
            <img src="../../assets/1.png" />
            <h1>Gerenciar Usuários</h1>
        </div>

        <TabSelect :tabs="tabs" ref="tab_select"/>

        <div id="tab-value-0" class="users__list">
            
            <div class="users__list__searchbar">
                <div class="search">
                    <i class='bx bx-search'></i>
                    <input type="text" />
                </div>
                <button>Pesquisar</button>
            </div>

            <div class="users__list__filters">
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

            <table class="users__table">
                <thead>
                    <tr>
                        <th align="center">Nome</th>
                        <th align="center">Empresa</th>
                        <th align="center">Cargo</th>
                        <th align="center">Editar</th>
                        <th align="center">Deletar</th>
                        <th align="center">Selecionar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="index">
                        <td> 
                            <div class="icon"><i class='bx bxs-user'></i></div> 
                            {{ user.username }}
                        </td>
                        <td align="center">{{ user.empresa ? user.empresa.nome : "Nenhuma" }}</td>
                        <td align="center">{{ user.role ? user.role : "Nenhum" }}</td>
                        <td align="center"><i class='bx bx-edit' v-on:click="changeToEdition(index)"></i></td>
                        <td align="center" v-on:click="deleteUser(user)" ><i class='bx bx-no-entry'></i></td>
                        <td align="center"><input type="checkbox"></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div id="tab-value-1" class="users__form">
            <form id="form__1">
                <h1>Entre com as informações necessárias para realizar o cadastro</h1>
            
                <label for="users-name">Nome</label>
                <input type="text" id="users-name" name="username" v-model="searchInputValue" />
            
                <label for="users-password">Senha</label>
                <input type="password" id="users-password" name="password" />

                <label for="users-role">Cargo</label>
                
                <select id="users-role" name="id_role">
                    <option value="" disabled selected>Select your option</option>
                    <option value="1">Administrador</option>
                    <option value="2">Usuário</option>
                </select>

                <label for="users-company">Empresa</label>

                <select id="users-company" name="id_empresa">
                    <option value="" disabled selected>Select your option</option>
                    <option v-for="(company, index) in companies" :key="index" :value="company.id">{{ company.nome }}</option>
                </select>

                <button v-on:click.stop.prevent="registerUser()">Cadastrar</button>

            </form>
        </div>

        <div id="tab-value-2" class="users__form">
            <form id="form__2">
                <h1>Entre com as informações necessárias para a atualização</h1>
            
                <label for="users-name">Nome</label>
                <input type="text" id="users-name" name="username" />
            
                <label for="users-password">Senha</label>
                <input type="password" id="users-password" name="password" />

                <label for="users-role">Cargo</label>
                
                <select id="users-role" name="role">
                    <option value="" disabled selected>Select your option</option>
                    <option value="1">Administrador</option>
                    <option value="2">Usuário</option>
                </select>

                <label for="users-company">Empresa</label>

                <select id="users-company" name="empresa">
                    <option value="" disabled selected>Select your option</option>
                    <option v-for="(company, index) in companies" :key="index" :value="company.id">{{ company.nome }}</option>
                </select>

                <button>Atualizar</button>

            </form>
        </div>

  </div>

</template>

<script>
import TabSelect from '../TabSelect';
import UserService from '../../services/users.service'
import CompanyService from '../../services/company.service'

const service = new UserService("http://localhost:5001");
const companyService = new CompanyService('http://localhost:5001');

//const filtersAvaiable = ['name', 'role', 'company'];

const USER = "2";

export default {
    components: {
        TabSelect
    },
    data: function(){
        return{
            tabs: [],
            users: [],
            rawUsers: [],
            companies:[],
            searchInputValue: ""
        }
    },
    mounted: function(){
        this.resetTabs();

        service.all().then(response => response.data).then((users) => {
            this.rawUsers = [...users]

            //TODO: ADD ERROR CHECK
            companyService.all().then(data => {
                this.companies = [...data]

                for(let user of this.rawUsers){                    
                    this.users = [...this.users, this.LoadUserInformation(user)]
                }
            });


        })
        .catch(error => console.error("Error on user service: " + error));
        
    },
    methods: {
        LoadUserInformation: function(user){
            
            return {
                username: user.username,
                id: user.id,
                empresa: this.companies.find(company => Number(company.id) == Number(user.empresa_id) || Number(company.id) == Number(user.empresa)),
                role: user.role == "1" ? 'Administrador' : "Usuário"
            }
        },
        changeToEdition: function(index){
            const user = this.users[index];

            if(!user)
                return;

            this.tabs = [
                {name: 'Visualizar',element: document.getElementById('tab-value-0'), visible: true, callback: this.resetTabs},
                {name: 'Cadastro',  element: document.getElementById('tab-value-1'), visible: false},
                {name: 'Editar',  element: document.getElementById('tab-value-2'), visible: true}
            ];

            const form = document.getElementById(`form__2`);

            //FILLING VALUE IN FORM
            form.elements['name'].value = user.name;
            
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
        
        
        
        registerUser: function(){
            const newUser = this.parseObjectFromForm();
            console.log(newUser);
            if(newUser.id_role == USER && !newUser.id_empresa){
                console.error("Usuário necessita deeclarar uma empresa!");
                return;
            }

            service.add(newUser)
            .then((response) => {
                
                const userDTO = this.LoadUserInformation(newUser);
                userDTO.id = response.data.id;

                this.openModal('Usuário registrado com sucesso!', '2.png', 
                    `
                    <p>O usuário foi adicionado com as seguintes informações:</p>
                    <p>Usuário: <b>${userDTO.username}</b></p>
                    <p>Empresa: <b>${(userDTO.empresa && userDTO.empresa.nome) ?? "Nenhuma"}</b></p>
                    <p>Cargo: <b>${userDTO.role}</b></p>
                    `,
                    null
                );
                this.users = [...this.users, userDTO]
                this.$refs.tab_select.activateTab(0);
            });
        },

        deleteUser: function(user){

            this.openModal('Usuário deletado com sucesso!', '2.png', 
                `
                <p>O usuário com as seguintes informações foi deletado:</p>
                <p>Usuário: <b>${user.username}</b></p>
                <p>Empresa: <b>${(user.empresa && user.empresa.nome) ?? "Nenhuma"}</b></p>
                <p>Cargo: <b>${user.role}</b></p>
                `,
                {
                    action: () => {
                        service.delete(user.id).then(() => {   
                            this.users = this.users.filter( u => u.id != user.id);

                        }).catch(error =>{
                            console.log(error);
                        })
                    },
                    text: "Confirmar"
                }
            );        
        },


        openModal: function(title, image, htmlString, callback){
            this.$emit('openModal', title, image, htmlString, callback);
        },
        closeModal: function(){
            this.$emit('closeModal');
        }
    
    }
}
</script>

<style lang="scss" scoped>
    .users{
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
            input[type="text"], input[type="password"], select{
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
                cursor: pointer
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