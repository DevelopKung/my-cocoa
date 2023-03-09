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
  async loadData({ state, commit, dispatch }) {
    try {
      const url = routeAPI.topping.list;
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
      const url = routeAPI.topping.info.replace('{:id}', id);
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$get(url, config);
      return res
    } catch (error) {
      const res = error.response.data
      return res
    }
  },

  async create({ commit, dispatch }, data) {
    try {
      const url = routeAPI.topping.create;
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$post(url, data, config);
      return res
    } catch (error) {
      const res = error.response.data
      return res
    }
  },


  async update({ commit, dispatch }, { id, data }) {
    try {
      const url = routeAPI.topping.update.replace('{:id}', id);
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$put(url, data, config);
      return res
    } catch (error) {
      const res = error.response.data
      return res
    }
  },

  async delete({ commit, dispatch },id ) {
    try {
      const url = routeAPI.topping.delete.replace('{:id}', id);
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$delete(url, config);
      return res
    } catch (error) {
      const res = error.response.data
      return res
    }
  }

}