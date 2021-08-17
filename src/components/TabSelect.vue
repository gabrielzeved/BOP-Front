<template>
    <div class="tab-select">
        <template v-for="(tab, index) in tabs" :key="index">
            <div v-if="tab.visible" v-on:click="activateTab(index); if(tab.callback) tab.callback()" v-bind:class="['tab', activeTab === index ? 'active' : '']">{{tab.name}}</div>
        </template>
    </div>
</template>

<script>
export default {
    props:['tabs'],
    data: function(){
        return {
            activeTab: 0
        }
    },
    methods: {
        activateTab: function(id){
            this.activeTab = id;
            
            this.tabs.map( (tab, index) => {
                if(!tab.element)
                    return;
                if(index !== id || !tab.visible)
                    tab.element.style.display = 'none';
                else
                    tab.element.style.display = '';
            });

        }
    },
    created: function(){
        this.$nextTick(function(){
            this.activateTab(this.activeTab);
            console.log(this.tabs.length);
        })
    }
    
}
</script>

<style lang="scss" scoped>
    .tab-select{
        display: flex;

        .tab{
            padding: 12px;
            background-color: #eee;
            margin-right: 12px;
            border-radius: 5px 5px 0 0;
            cursor: pointer;
            &:not(.active){
                background-color: #008542;
                color: white;
            }
        }

    }
</style>