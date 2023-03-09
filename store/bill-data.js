import routeAPI from './router'

export const state = () => ({
  lists: [],
  loading: false
})

export const getters = {
  lists: (state) => state.lists,
  loading: (state) => state.loading
}

export const mutations = {
  setLists(state, data) {
    state.lists = data
  },
  setLoading(state, data) {
    state.loading = data
  }
}

export const actions = {
  async loadDate({ state, commit }) {
    try {
      const url = routeAPI.bill.list;
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$get(url, config);
      return res
    } catch (error) {
      const res = error.response.data
      return res
    }
  },

  async loadInfo({ commit }, id) {
    try {
      commit('setLoading', true)
      const url = routeAPI.bill.info.replace('{:id}', id);
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$get(url, config);
      commit('setLoading', false)
      return res
    } catch (error) {
      commit('setLoading', false)
      const res = error.response.data
      return res
    }
  },

  async create({ commit, dispatch }, data) {
    try {
      commit('setLoading', true)
      let params = data.map(x => {
        return {
          prod_id: x.prod_id,
          topping_ids: x.topping_ids,
          description: x.description,
          total: x.total,
        }
      })
      const url = routeAPI.bill.create;
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$post(url, params, config);
      commit('setLoading', false)
      return res
    } catch (error) {
      commit('setLoading', false)
      const res = error.response.data
      return res
    }
  },


  async update({ commit, dispatch }, { id, data }) {
    try {
      commit('setLoading', true)
      const url = routeAPI.bill.update.replace('{:id}', id);
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$put(url, data, config);
      if (res.status) {
        await dispatch('loadDate')
      }
      commit('setLoading', false)
      return res
    } catch (error) {
      commit('setLoading', false)
      const res = error.response.data
      return res
    }
  },

  async delete({ commit, dispatch },id ) {
    try {
      commit('setLoading', true)
      const url = routeAPI.bill.delete.replace('{:id}', id);
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$delete(url, config);
      if (res.status) {
        await dispatch('loadDate')
      }
      commit('setLoading', false)
      return res
    } catch (error) {
      commit('setLoading', false)
      const res = error.response.data
      return res
    }
  }

}