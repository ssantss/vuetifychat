<template>
  <v-app>
    <div v-if="userGoogle === false">loading ...</div>
    <v-app-bar color="primary" v-if="userGoogle !== false">
      <v-app-bar-title>VuetifyChat</v-app-bar-title>

      <v-btn
        prepend-icon="mdi-login-variant"
        color="whithe"
        @click="googleAccess"
        v-if="!userGoogle"
        >Acceder</v-btn
      >
      <v-btn
        prepend-icon="mdi-logout-variant"
        color="whithe"
        @click="Logout"
        v-if="userGoogle"
        >Salir</v-btn
      >
    </v-app-bar>

    <v-main app v-if="userGoogle !== false">
      <v-container>
        <Chat v-if="userGoogle" />
        <div v-else>
          <v-alert prominent type="error" variant="outlined">
            Debes iniciar sección para ingresar al chat
          </v-alert>
        </div>
      </v-container>
    </v-main>

    <v-footer class="d-flex flex-column" app v-if="userGoogle !== false">
      <FormAdd />
    </v-footer>
  </v-app>
</template>

<script setup>
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "@firebase/auth";
import { auth } from "./firebase";
import { computed, ref } from "vue";

import Chat from "./components/Chat.vue";
import FormAdd from "./components/FormAdd.vue";

/* FUNCION COMPUTADA ECHA CON MAURICIO PARA PROBAR OPTIONS API */
/* const islogged = computed(() => {
  console.log("dsada", userGoogle);           
  return userGoogle.value ? true : false;
}); */

const userGoogle = ref(false);
const googleAccess = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    console.log("user", user);
  } catch (error) {
    console.log(error);
  }
};

const Logout = async () => {
  await signOut(auth);
};
onAuthStateChanged(auth, (user) => {
  console.log("user", user);
  userGoogle.value = user;
});
</script>
