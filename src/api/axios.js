import axios from 'axios'

const instance =  axios.create({
    baseURL: 'http://localhost:5001/amz-react-clone/us-central1/app' // API URL (firebase cloud function)
})

export default instance