import axiosClient from '../services/AxiosClient'

const warrantyApi = {
    getWarranty: (id) => axiosClient.get(`/custom/warranty/${id}`)
}
export default warrantyApi
