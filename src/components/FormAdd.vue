<template>
  <v-form class="w-100" @submit.prevent="SendMessage">
    <v-text-field
      color="success"
      label="Ingresa el mensaje aqui"
      variant="outlined"
      hide-details
      append-icon="mdi-send"
      @click:append="SendMessage"
      v-model="message"
    ></v-text-field>
    <!-- el appen es el evento del click y el vmodel es el que lo hace reactivo   -->
  </v-form>
</template>

<script setup>
import { addDoc, collection } from "@firebase/firestore";
import { ref } from "vue";
import { auth, db } from "../firebase";
const message = ref(""); /* Evento reactivo  */
const SendMessage = async () => {
  /* Funcion que limpia el chat y guarda el mensaje  */
  console.log("enviado mensaje" + message.value);
  try {
    await addDoc(collection(db, "chats"), {
      text: message.value,
      time: Date.now(),
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
    });

    message.value = "";
  } catch (error) {
    console.log(error);
  }

  message.value = "";
};
</script>
