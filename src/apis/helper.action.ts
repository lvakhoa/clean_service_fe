import { cleanApi, cleanClient } from "@/services/HttpClient"

const helperAction = {
    async getHelpers() {
        const res = await cleanApi.get('/manage/helpers')
        return res.data.data.results
    },
    async getHelperById(id: string) {
        const res = await cleanApi.get(`/auth/user/${id}`)
        return res.data
    },
    async updateUserHelper(id: string, data: any) {
        const res = await cleanApi.patch(`/auth/user/${id}`, data)
        return res.data.data
    },
    async updateHelper(id: string, data: any) {
        const res = await cleanApi.patch(`/auth/helper/${id}`, data)
        return res.data.data
    }
}

export default helperAction