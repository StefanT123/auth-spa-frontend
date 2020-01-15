import cookies from 'js-cookie';

export const state = () => ({
  token: null,
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },

  REMOVE_TOKEN(state) {
    state.token = null;
  }
};

export const actions = {
  setToken({commit}, {token, expiresIn}) {
    this.$axios.setToken(token, 'Bearer');
    const expiryTime = new Date(new Date().getTime() + expiresIn * 1000);
    cookies.set('x-access-token', token, {expires: expiryTime});
    commit('SET_TOKEN', token);
  },

  async refreshToken({dispatch}) {
    const {token, expiresIn} = await this.$axios.$post('refresh-token');
    dispatch('setToken', {token, expiresIn});
  },

  logout({commit}) {
    this.$axios.setToken(false);
    cookies.remove('x-access-token');
    commit('REMOVE_TOKEN');
  }
};
