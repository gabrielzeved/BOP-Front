<template>

  <div class="tags">

        <div class="tags__header">
            <img src="../../assets/2.png" />
            <h1>Gerenciar Tags-RTO-Live</h1>
        </div>

        <TabSelect :tabs="tabs" ref="tab_select"/>

        <div id="tab-value-0" class="tags__list">
            
            <div class="tags__list__searchbar">
                <div class="search">
                    <i class='bx bx-search'></i>
                    <input type="text" />
                </div>
                <button>Pesquisar</button>
            </div>

            <div class="tags__list__filters">
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

            <table class="tags__table">
                <thead>
                    <tr>
                        <th align="center">Tag-RTO-Live</th>
                        <th align="center">Tag-Intérprete</th>
                        <th align="center">Editar</th>
                        <th align="center">Deletar</th>
                        <th align="center">Selecionar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tag, index) in tags" :key="index">
                        <td align="center"> 
                            {{ tag.nome }}
                        </td>
                        <td align="center">{{ tag.associado ? tag.associado.descricao : "Nenhum" }}</td>
                        <td align="center"><i class='bx bx-edit' v-on:click="changeToEdition(index)"></i></td>
                        <td align="center"><i class='bx bx-no-entry'></i></td>
                        <td align="center"><input type="checkbox"></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div id="tab-value-1" class="tags__form">
            <form id="form__1">
                <h1>Entre com as informações necessárias para adicionar associação ao sistema</h1>

                <label for="tags-name">Nome</label>
                <input type="text" id="tags-name" name="name" />
                
                <label for="tags-options">Tag-Intérprete</label>

                <select id="tags-options" name="tags">
                    <option value="" disabled selected>Select your option</option>
                    <option v-for="(tag, index) in tags_default" :key="index" :value="tag.id">{{ tag.descricao }}</option>
                </select>

                <button v-on:click.stop.prevent="">Cadastrar</button>

            </form>
        </div>

        <div id="tab-value-2" class="tags__form">
            <form id="form__2">
                <h1>Entre com as informações necessárias para editar associação no sistema</h1>

                <label for="tags-name">Nome</label>
                <input type="text" id="tags-name" name="name" />
                
                <label for="tags-options">Tag-Intérprete</label>

                <select id="tags-options" name="tags">
                    <option value="" disabled selected>Select your option</option>
                    <option v-for="(tag, index) in tags_default" :key="index" :value="tag.id">{{ tag.descricao }}</option>
                </select>

                <button v-on:click.stop.prevent="">Concluir</button>

            </form>
        </div>
  </div>

</template>

<script>
import TabSelect from '../TabSelect';
import TagsService from '../../services/tags.service'
import TagsDefaultService from '../../services/tags_default.service'
//import CompanyService from '../../services/company.service';


const service = new TagsService("http://localhost:5001");
const tagsDefaultService = new TagsDefaultService('http://localhost:5001');
//const companiesService = new CompanyService('http://localhost:5001');

//const filtersAvaiable = ['name', 'role', 'company'];

export default {
    components: {
        TabSelect
    },
    data: function(){
        return{
            tabs: [],
            tags: [],
            rawTags: [],
            tags_default:[],
            searchInputValue: ""
        }
    },
    mounted: function(){
        this.resetTabs();

        service.all().then((tags) => {
            this.rawTags = [...tags]

            tagsDefaultService.all().then(data => {
                this.tags_default = [...data]

                for(let tag of this.rawTags){                    
                    this.tags = [...this.tags, this.LoadTagInformation(tag)]
                }
            });
        });
    },
    methods: {
        LoadTagInformation: function(tag){

            return {
                nome: tag.nome,
                id: tag.id,
                associado: this.tags_default.find(tag_default => Number(tag_default.id) == Number(tag.id))
            }
        },
        changeToEdition: function(index){
            const tag = this.tags[index];

            if(!tag)
                return;

            this.tabs = [
                {name: 'Associações',element: document.getElementById('tab-value-0'), visible: true, callback: this.resetTabs},
                {name: 'Adicionar',  element: document.getElementById('tab-value-1'), visible: false},
                {name: 'Editar',  element: document.getElementById('tab-value-2'), visible: true}
            ];

            const form = document.getElementById(`form__2`);
            form.elements['name'].value = tag.nome;
            this.$nextTick(() => this.$refs.tab_select.activateTab(2));
        },
        resetTabs: function(){
            this.tabs = [
                {name: 'Associações',element: document.getElementById('tab-value-0'), visible: true, callback: this.resetTabs},
                {name: 'Adicionar',  element: document.getElementById('tab-value-1'), visible: true},
                {name: 'Editar',  element: document.getElementById('tab-value-2'), visible: false}
             ]
        },
        parseObjectFromForm: function(){
            /*const tab_select = this.$refs.tab_select;
            const form = document.getElementById(`form__${tab_select.activeTab}`);
            const formData = new FormData(form);
            let object = {};
            for (var pair of formData.entries()) {
                object[pair[0]] = pair[1];
            }
            return object;*/
        },
        
        
        
        registerTag: function(){
            /*const newUser = this.parseObjectFromForm();
            service.add(newUser).then((response) => {
                
                const userDTO = this.LoadUserInformation(newUser);
                userDTO.id = response.data.id;

                this.openModal('Tag associada com sucesso!', '2.png', 
                    `
                    <p>A Tag foi associada seguindo as informações:</p>
                    <p>Tag RTO-LIVE: <b>${userDTO.username}</b></p>
                    <p>Tag Intérprete: <b>${userDTO.empresa.nome}</b></p>
                    `
                );
                this.users = [...this.users, userDTO]
            });*/
        },

        deleteTag: function(){
            /*console.log(user);
            service.delete(user.id).then(() => {
                
                this.openModal('Usuário deletado com sucesso!', '2.png', 
                    `
                    <p>O usuário com as seguintes informações foi deletado:</p>
                    <p>Usuário: <b>${user.username}</b></p>
                    <p>Empresa: <b>${user.empresa.nome}</b></p>
                    <p>Cargo: <b>${user.role}</b></p>
                    `
                );
                
                this.users = this.users.filter( u => u.id != user.id);

            }).catch(error =>{
                console.log(error);
            })*/
        },

        openModal: function(title, image, htmlString){
            this.$emit('openModal', title, image, htmlString);
        },
        closeModal: function(){
            this.$emit('closeModal');
        }
    
    }
}
</script>

<style lang="scss" scoped>
    .tags{
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
            border: 1px solid #eee;
        }

        tr:nth-child(2n){
            background-color: #f4f4f4;
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