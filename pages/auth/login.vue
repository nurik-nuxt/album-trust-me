<template>
  <div class="login-page">

    <div class="login-page__window">

      <div class="login-page__head">
        <h1 class="login-page__title">Вход в систему</h1>
      </div>

      <div class="login-page__main" @keyup.enter="loginHandle">

        <base-input
          class="login-page__input"
          placeholder="Логин"
          v-model="form.email"
          :error="errorMessage"
        />
        <base-input
          class="login-page__input"
          placeholder="Пароль"
          v-model="form.password"
          :error="errorMessage"
          password
        />
        <button
          class="login-page__login-button"
          @click="loginHandle"
        >Войти</button>
      </div>
    </div>

  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput";

import {mapActions, mapGetters} from "vuex";
export default {
  name:'auth',
  components: {BaseInput},
  data: () => ({
    form: {
      email: null,
      password: null
    },
    errorMessage: null,
  }),
  computed: {
    ...mapGetters({
      token:"auth/getToken"
    }),
    canSubmit() {
      return this.form.email && this.form.password;
    }
  },
  methods: {
    ...mapActions({
      login: "auth/login"
    }),
    async loginHandle() {
      if (!this.canSubmit) return;
      console.log("Login")
      await this.login(this.form);
      this.clear();
      if (this.token) await this.$router.push("/")
      else this.errorMessage = "Вы ввели неправильные данные";
    },
    clear() {
      this.form = {login: null, password: null};
    },
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__window {
    $padding: 32px;
    max-width: 448px;
    //width: calc(95% - 2*$padding);
    background: white;
    border-radius:24px;
    padding: $padding;
    text-align: center;
  }

  &__head {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__title {
    font-size: 20px;
  }

  &__input {
    margin-top: 16px;
  }

  &__login-button {
    margin-top: 24px;
  }

  &__forgot-password {
    margin-top: 16px;
    a {
      color: #BBBBBB;
      text-decoration: none;
    }
  }

  &__forgot-password-mobile {
    margin-top: 16px;
    text-align: right;
    a {
      //color: $color__font-secondary;
      text-decoration: none;
    }
  }

  &__agreement {
    margin-top: 16px;
    text-align: left;
    color: #BBBBBB;
    font-size: 12px;
    a {color: #FB6B56;}
  }

  &__registration-mobile {
    margin-top: 12px;
    a {
      color: #FB6B56;
      text-decoration: none;
    }
  }
}
</style>
