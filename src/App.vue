<template>
  <v-app>
    <v-toolbar>
    <v-toolbar-title>Banana LTDA</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn to="/reservas" flat>Reservas</v-btn>
      <v-btn to="/registrar/sala" flat>Nova sala</v-btn>
      <v-btn to="/registrar/local" flat>Novo local</v-btn>
      <v-btn to="/login" flat>Login</v-btn>
      <v-btn to="/registrar/usuario" flat>Registrar</v-btn>
    </v-toolbar-items>
  </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {

}
</script>
