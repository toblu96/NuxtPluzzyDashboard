export const state = () => ({
    services: [],
})

export const mutations = {
    async updateServices(state) {

        const response = await this.$swarmpitApi.getServices()
        if (!response.ok) {
            return $nuxt.error({
                statusCode: response.status,
                message: response.statusText,
            });
        }
        let services = response.json


        state.services = services
        state.loaded = true
    },
}


export const getters = {
    getServices: (state) => {
        return state.services
    },
    getServicesByStackname: state => name => state.services
        .filter((service, idx, services) => service.stack == name)
        .sort(function (a, b) { return a.serviceName.localeCompare(b.serviceName) }),
    getServicesByImageName: state => name => state.services
        .filter((service, idx, services) => service.repository.name == name)
        .sort(function (a, b) { return a.serviceName.localeCompare(b.serviceName) }),

}