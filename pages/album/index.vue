<template>
  <div>
    Album
    <a v-for="menu in menuList" :href="menu.url">{{menu.title}}</a>
  </div>
</template>

<script>
import {menuList} from "@/configs/menuList";
export default {
  middleware:'auth',
  name: 'IndexPage',
  data:()=>{
    return{
      menuList
    }
  }
}
</script>
