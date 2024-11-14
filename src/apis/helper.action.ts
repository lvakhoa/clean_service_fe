import { cleanApi, cleanClient } from "@/services/HttpClient"

const helperAction = {
    async getHelpers() {
        const res = await cleanApi.get('/manage/helpers')
        console.log("gethelpers", res)
        return res.data.data.results
    },
    async getHelperById(id: string) {
        const res = await cleanApi.get(`/auth/user/${id}`)
        console.log(res)
        return res.data
    }
}

export default helperAction