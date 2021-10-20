import axios from 'axios'

const instance =  axios.create({
    // API URL (firebase development)
    // baseURL: 'http://localhost:5001/amz-react-clone/us-central1/app'
    // API URL (firebase cloud function)
    baseURL: 'https://us-central1-amz-react-clone.cloudfunctions.net/app' 
})

export default instance