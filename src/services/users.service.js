import axios from 'axios'

class UserService{
    
    constructor(apiURI){
        this.apiURI = apiURI;
        this.users = []
        this.endPoint = '/auth'
    }

    one(id){
        return axios.get(this.apiURI + this.endPoint + '/user/' + id);
    }

    all(){
        return axios.get(this.apiURI + this.endPoint + '/user');
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

export default UserService;