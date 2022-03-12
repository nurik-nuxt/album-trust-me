// import Cookies from 'js-cookie'
// const token = this.$cookies.authToken.get();

export const state = () => ({
  token: null,
  profile: null
})

export const getters = {
  getToken: state => state.token,
  getProfile: state => state.profile
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  },
  clear(state, namespace) {
    state[namespace] = null;
  }
}

export const actions = {

  takeToken({ commit }) {
    commit("set", ["token", this.$cookies.authToken.get()]);
  },

  async fetchSelf({ commit }) {
    await this.$api.auth.profile.get()
      .then(res => {
        commit("set", ["profile", res]);
      })
      .catch(error => {
        commit("clear", "profile");
      })
  },

  async checkValid({ state, dispatch }) {
    if (!state.token) {await dispatch("takeToken");}
    await dispatch("fetchSelf");
    return !!state.profile;
  },

  async login({ commit, dispatch }, {email, password}) {
    let form = new FormData();
    form.append("email", email);
    form.append("password", password);
    await this.$api.auth.login.post({body:form})
      .then(({ token }) => {
        commit("set", ["token", token]);
        this.$cookies.authToken.set(token);
        dispatch("fetchSelf");
      })
      .catch(err => {})
  },

  async registration({ commit, dispatch, state }, {userForm, registrationForm, errorCallback, successCallback}) {
    let registrationFormData = new FormData();
    registrationFormData.append("email", registrationForm.email);
    registrationFormData.append("password", registrationForm.password);

    let userFormData = new FormData();
    userFormData.append("organization", userForm.organization);
    userFormData.append("position", userForm.position);
    userFormData.append("first_name", userForm.first_name);
    userFormData.append("city", userForm.city);
    userFormData.append("phone_number", userForm.phone_number);

    await this.$api.auth.registration.post({body: registrationFormData})
      .then(({token}) => {
        commit("set", ["token", token]);
        this.$cookies.authToken.set(token);
      })
      .catch(({response: {data}}) => errorCallback(data[Object.keys(data)[0]][0] || "Ошибка регистрации"))

    if (state.token) {
      await this.$api.profile.post({body: userFormData})
        .then(async res => {
          await dispatch("checkValid");
          successCallback(res);
        })
        .catch(({response: {data}}) => errorCallback(data[Object.keys(data)[0]][0] || "Ошибка создания юзера"))
    }
    else {
      errorCallback("Ошибка регистрации");
    }

  },

  async restoreSendCode({}, {email}) {
    let form = new FormData();
    form.append("email", email);
    await this.$api.auth.restore.post({body: form});
  },
  async restoreCheckCode({commit}, {email, code}) {
    let form = new FormData();
    form.append("email", email);
    form.append("code", code);
    await this.$api.auth.restore.put({body: form})
      .then(({token}) => {commit("set", ["token", token])})
  },
  async restoreSetPassword({commit}, {password}) {
    let form = new FormData();
    form.append("password", password);
    await this.$api.auth.changePassword.post({body: form});
    commit("clear", "token");
  }

}
