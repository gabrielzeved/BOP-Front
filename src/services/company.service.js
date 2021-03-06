import axios from 'axios'

class CompanyService{
    
    constructor(apiURI){
        this.apiURI = apiURI;
        this.users = []
        this.endPoint = '/empresa'
    }

    one(id){
        return axios.get(this.apiURI + this.endPoint + '/' + id)
        .then(response => response.data.objeto)
        .catch(error => console.error("Error on company service: " + error));
    }

    all(){
        return axios.get(this.apiURI + this.endPoint + '/');
    }

    delete(id){
        return axios.post(this.apiURI + this.endPoint + '/delete/' + id);
    }    

    update(id, data){
        return axios.post(this.apiURI + this.endPoint + '/update/' + id, data, { 
            headers: {
                'Content-Type' : 'application/json'
            }    
        });
    }

    add(data){
        return axios.post(this.apiURI + this.endPoint + '/add', data, { 
            headers: {
                'Content-Type' : 'application/json'
            }    
        });
    }

}

export default CompanyService;