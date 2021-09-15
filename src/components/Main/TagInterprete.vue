<template>

  <div class="tags">

        <div class="tags__header">
            <img src="../../assets/2.png" />
            <h1>Gerenciar Tags-Interprete</h1>
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
                        <th align="center">Tag-Intérprete</th>
                        <th align="center">Descrição</th>
                        <th align="center">Editar</th>
                        <th align="center">Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tag, index) in tags" :key="index">
                        <td align="center" class="tag_name"> 
                            {{ tag.name }}
                        </td>
                        <td align="center">{{ tag ? tag.descricao : "Nenhum" }}</td>
                        <td align="center"><i class='bx bx-edit' v-on:click="changeToEdition(tag.id)"></i></td>
                        <td align="center"><i class='bx bx-no-entry' v-on:click="deleteTag(tag)"></i></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div id="tab-value-1" class="tags__form">
            <form id="form__1">
                <h1>Entre com as informações necessárias para adicionar uma tag interprete ao sistema</h1>

                <label for="tags-name">Nome</label>
                <input type="text" id="tags-name" name="nome_tagpadrao" />

                <label for="tags-desc">Descrição</label>
                <input type="text" id="tags-desc" name="descricao" />

                <button v-on:click.stop.prevent="registerTag()">Cadastrar</button>

            </form>
        </div>

        <div id="tab-value-2" class="tags__form">
            <form id="form__2">
                <h1>Entre com as informações necessárias para editar uma tag interprete no sistema</h1>

                <label for="tags-name">Nome</label>
                <input type="text" id="tags-name" name="nome_tagpadrao" />

                <label for="tags-desc">Descrição</label>
                <input type="text" id="tags-desc" name="descricao" />

                <button v-on:click.stop.prevent="updateTag()">Concluir</button>

            </form>
        </div>
  </div>

</template>

<script>
import TabSelect from '../TabSelect';
import TagsDefaultService from '../../services/tags_default.service'

const service = new TagsDefaultService("http://localhost:5001");
//const filtersAvaiable = ['name', 'role', 'company'];

export default {
    components: {
        TabSelect
    },
    data: function(){
        return{
            tabs: [],
            tags: [],
            searchInputValue: "",
            tagEditing: -1
        }
    },
    mounted: function(){
        this.resetTabs();

        service.all().then((tags) => {
            this.tags = [...tags]
        });

    },
    methods: {
        changeToEdition: function(id){

            const tag = this.tags.find(tag => tag.id == id);

            if(!tag){
                console.log("Tag nao encontrada");
                return;
            }

            this.tagEditing = id;

            this.tabs = [
                {name: 'Tags',element: document.getElementById('tab-value-0'), visible: true, callback: this.resetTabs},
                {name: 'Adicionar',  element: document.getElementById('tab-value-1'), visible: false},
                {name: 'Editar',  element: document.getElementById('tab-value-2'), visible: true}
            ];

            const form = document.getElementById(`form__2`);
            form.elements['nome_tagpadrao'].value = tag.name;
            form.elements['descricao'].value = tag.descricao;

            this.$nextTick(() => this.$refs.tab_select.activateTab(2));
        },
        resetTabs: function(){
            this.tabs = [
                {name: 'Tags',element: document.getElementById('tab-value-0'), visible: true, callback: this.resetTabs},
                {name: 'Adicionar',  element: document.getElementById('tab-value-1'), visible: true},
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
        
        
        
        registerTag: function(){
            const newTag = this.parseObjectFromForm();

            if(!newTag.nome_tagpadrao){
                this.openToast('Nome da tag é obrigatório', '#f44336', 'white')
                return;
            }

            if(!newTag.descricao){
                this.openToast('Descrição da Tag é obrigatório!', '#f44336', 'white')
                return;
            }      

            service.add(newTag).then((response) => {
                let responseTag = response.data;
                this.openModal('Tag associada com sucesso!', '2.png', 
                    `
                    <p>A Tag foi associada seguindo as informações:</p>
                    <p>Nome: <b>${responseTag.name}</b></p>
                    <p>Descrição: <b>${responseTag.descricao}</b></p>
                    `
                );
                this.tags = [...this.tags, responseTag]
                this.$refs.tab_select.activateTab(0);
            });
        },

        deleteTag: function(tag){
            this.openModal('Deseja realmente deletar essa tag?', '2.png', 
                `
                <p>A tag intérprete com as seguintes informações será deletada ao clicar em confirmar:</p>
                <p>Nome: <b>${tag.name}</b></p>
                <p>Descrição: <b>${ tag.descricao ?? "Nenhuma"}</b></p>
                `,
                {
                    action: () => {
                        service.delete(tag.id).then(() => {   
                            this.tags = this.tags.filter( t => t.id != tag.id);

                        }).catch(error =>{
                            console.log(error);
                        })
                    },
                    text: "Confirmar"
                }
            );
        },

        updateTag : function(){
            const newTag = this.parseObjectFromForm();

            if(!newTag.nome_tagpadrao){
                this.openToast('Nome da tag é obrigatório', '#f44336', 'white')
                return;
            }

            if(!newTag.descricao){
                this.openToast('Descrição da Tag é obrigatório!', '#f44336', 'white')
                return;
            }   

            service.update(this.tagEditing, newTag)
            .then((response) => response.data)
            .then(data => {

                const tagResponse = data;

                this.openModal('Tag Intérprete editada com sucesso!', '2.png', 
                    `
                    <p>A tag intérprete foi editada com as seguintes informações:</p>
                    <p>Nome: <b>${tagResponse.name}</b></p>
                    <p>Descrição: <b>${(tagResponse.descricao) ?? "Nenhuma"}</b></p>
                    `,
                    null
                );

                this.tags = this.tags.filter( u => u.id != tagResponse.id);

                this.tags = [...this.tags, tagResponse];

                this.$refs.tab_select.activateTab(0);
            });
        },

        openModal: function(title, image, htmlString, callback){
            this.$emit('openModal', title, image, htmlString, callback);
        },
        closeModal: function(){
            this.$emit('closeModal');
        },
        openToast: function(text, color, textColor){
            this.$emit('openToast', text, color, textColor);
        },
        closeToast: function(){
            this.$emit('closeToast');
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