<template>
  <h1 class="text-center font-weight-medium">Chat</h1>
  <v-card
    v-for="item in messages"
    :key="item.id"
    width="300"
    class="mb-3"
    :class="item.uid === userChat.uid && 'ml-auto'"
    :color="item.uid === userChat.uid ? 'success' : 'black'"
    theme="dark"
  >
    <div class="d-flex flex-no-wrap justify-flex-end">
      <v-avatar
        class="mt-2 ml-4"
        color="grey-darken-3"
        :image="item.avatar"
      ></v-avatar>
      <v-card-subtitle class="mt-5 ml-n3">{{
        item.displayName
      }}</v-card-subtitle>
    </div>
    <v-card-text>{{ item.text }}</v-card-text>
  </v-card>

  <!-- v-card
    v-for="item in messages"
    :key="item.id"
    class="mx-auto mb-3"
    theme="dark"
    max-width="300"
    :class="item.uid === userChat.uid && 'ml-auto'"
    :color="item.uid === userChat.uid ? 'success' : 'black'"
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-avatar
          color="grey-darken-3"
          image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        ></v-avatar>
        <v-list-item-title>{{ item.displayName }}</v-list-item-title>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-text class="font-weight-regular">
      {{ item.text }}
    </v-card-text>
  </v-card> -->
</template>

<script setup>
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ref } from "vue";
const userChat = ref(auth.currentUser);
const messages = ref([]);

const q = query(collection(db, "chats"), orderBy("time"));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      /* console.log("Mensaje: ", change.doc.id, change.doc.data()); */
      messages.value.push({
        id: change.doc.id,
        ...change.doc.data(),
      });
    }
  });
});
</script>
