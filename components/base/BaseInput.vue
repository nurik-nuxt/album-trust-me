<template>
  <div class="base-input">
    <h1 class="base-input__title" v-if="title">{{ title }}</h1>
    <p class="base-input__status" v-if="status">(Необязательно)</p>
    <div class="base-input__input-wrapper">
      <input
        class="base-input__input"
        :class="[
        {'base-input--error': error}
       ]"
        :value="value"
        :placeholder="placeholder"
        :type="inputType"
        v-if="!isMask"
        @input="inputHandle($event)"
        @keypress="enterValue($event)"


      />
      <TheMask
        v-else
        :mask="mask"
        :type="inputType"
        :value="value"
        :masked="false"
        ref="input"
        :placeholder="inputPlaceholder"
        class="base-input__input"
        :class="[
        {'base-input--error': error}
       ]"
        @focus.native="showPlaceholder = true"
        @blur.native="showPlaceholder = true"

      />

      <!-- show password -->
<!--      <base-icon-->
<!--        class="base-input__show-password"-->
<!--        v-if="password"-->
<!--        @mousedown="setShowPassword(true)"-->
<!--        @touchstart="setShowPassword(true)"-->
<!--        @mouseup="setShowPassword(false)"-->
<!--        @mouseleave="setShowPassword(false)"-->
<!--        @touchend="setShowPassword(false)"-->
<!--      >eye-password</base-icon>-->
    </div>

    <Slide>
      <p class="base-input__message" v-if="message">{{ message }}</p>
      <div class="base-input__error-message" v-if="error">
        {{ error }}
      </div>
    </Slide>

  </div>
</template>

<script>
import Slide from "../transitions/Slide";
import { TheMask } from 'vue-the-mask'
export default {
  name: "BaseInput",
  components: {Slide, TheMask},
  data: () => ({
    showPassword: false,
    showPlaceholder: true
  }),
  props: {
    value: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
      default: ""
    },
    password: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: null
    },
    title:{
      type: String,
      default: null
    },
    message:{
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: false
    },
    mask: {
      type: String,
      default: "+7 (###) ###-##-##"
    },
    isMask: {
      type:Boolean,
      default: false
    },
    isOnlyNumber: {
      type:Boolean,
      default:false
    }
  },
  computed: {
    inputType() {
      if (this.password) return this.showPassword ? "text" : "password";
      return this.type;
    },
    inputPlaceholder(){
      return this.showPlaceholder ? this.placeholder : ""
    },
    // inputValue(){
    //   if (this.isOnlyNumber && this.value ==!null){
    //     return this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    //   } else
    //     return this.value
    // }
  },
  methods: {
    inputHandle(event) {
      let value = event.target.value;
      if (this.type === 'number')
        value = parseInt(value);

      this.$emit('input', value);
      this.$emit('onInput', value);
    },
    setShowPassword(bool) {
      this.showPassword = bool;
    },
    enterValue(evt) {
      if (this.isOnlyNumber){
        let charCode = evt.which ? evt.which : evt.keyCode;
        if (
          charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46
        ) {
          evt.preventDefault();
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.base-input {
  width: 100%;
  $padding: 16px;

  &__input-wrapper {
    position: relative;
  }

  &__input {
    //height: calc(48px - 2*$padding);
    //width: calc(100% - 2*$padding);
    padding: $padding;
    border-radius: 8px;
    background: #F8F8F8;
    font-size: 16px;
    transition: .3s;
  }
  &__title{
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #111111;
    margin-bottom: 8px;
  }
  &__status{
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    color: #777777;
    margin-bottom: 8px;
  }
  &__message{
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    color: #777777;
    margin-top: 8px;
  }

  &__show-password {
    $size: 24px;
    height: $size;
    min-width: $size;
    width: $size;
    position: absolute;
    //top: calc(50% - $size/2);
    right: $padding;
    cursor: pointer;
    z-index: 1;
  }

  &__error-message {
    padding-top: 5px;
    color: #FF3B30;
    text-align: left;
    font-size: 12px;
  }

  &--error {
    border: 1px solid #FF3B30;
    background: rgba(255, 59, 48, 0.05);;
    &::placeholder {
      color: #FF3B30;
    }
  }

}
</style>
