import axios from 'axios'

class TagsDefaultService{
    
    constructor(apiURI){
        this.apiURI = apiURI;
        this.users = []
        this.endPoint = '/tagpadrao'
    }

    all(){
        return axios.get(this.apiURI + this.endPoint + '/')
        .then(response => response.data.objetos)
        .catch(error => console.error("Error on tags default service: " + error));
    }

    delete(id){
        return axios.post(this.apiURI + this.endPoint + '/delete/' + id);
    }    

    update(id, data){
        return axios.put(this.apiURI + this.endPoint + '/update/' + id, data);
    }

    add(data){
        return axios.post(this.apiURI + this.endPoint + '/add', data, { 
            headers: {
                'Content-Type' : 'application/json'
            }    
        });
    }

}

export default TagsDefaultService;