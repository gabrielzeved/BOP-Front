import axios from 'axios'

class UserService{
    
    constructor(apiURI){
        this.apiURI = apiURI;
        this.users = []
        this.endPoint = '/auth'
    }

    all(){
        return axios.get(this.apiURI + this.endPoint + '/user')
        .then(response => response.data)
        .catch(error => console.error("Error on user service: " + error));
    }

    delete(id){
        return axios.delete(this.apiURI + this.endPoint + '/delete/' + id);
    }    

    update(id, data){
        return axios.put(this.apiURI + this.endPoint + '/update/' + id, data);
    }

    add(data){
        return axios.post(this.apiURI + this.endPoint + '/add', data);
    }

}

export default UserService;