import axios from "axios";
const TOKEN='ciigk7pr01quio6umtagciigk7pr01quio6umtb0'
export default axios.create({baseURL:'https://finnhub.io/api/v1',params:{
    token:TOKEN
}})