import axios from 'axios'

class TagsService{
    
    constructor(apiURI){
        this.apiURI = apiURI;
        this.users = []
        this.endPoint = '/associacoes'
    }

    all(){
        return axios.get(this.apiURI + this.endPoint + '/')
        .then(response => response.data)
        .catch(error => console.error("Error on tags service: " + error));
    }

    delete(id){
        return axios.post(this.apiURI + this.endPoint + '/delete/' + id);
    }    

    update(id, data){
        return axios.post(this.apiURI + this.endPoint + '/update/' + id, data);
    }

    addAdmin(data){
        return axios.post(this.apiURI + this.endPoint + '/admin/add', data, { 
            headers: {
                'Content-Type' : 'application/json'
            }    
        });
    }

}

export default TagsService;