<template>
<v-layout align-center justify-center>
  <v-flex xs12 sm8 md4>
    <v-alert v-for="mensagem in mensagens" :key="mensagem.texto" :type="mensagem.tipo" :value="showAlert">
      {{mensagem.texto}}
    </v-alert>
    <v-card-text>
      <v-form>
        <v-text-field v-model="login.nome" prepend-icon="person" name="nome" label="Nome" type="text"></v-text-field>
        <v-text-field v-model="login.email" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
        <v-text-field v-model="login.password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-btn @click="salvarUser">submit</v-btn>
    <v-btn @click="limpar">clear</v-btn>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  data() {
    return {
      mensagens: [],
      showAlert: false,
      login: {
        nome: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    limpar() {
      this.showAlert = false
      this.login = {}
      this.mensagens = []
    },
    salvarUser() {
      this.$http.post('user/register', this.login)
        .then(() => {
          this.showAlert = true
          this.mensagens.push({
            texto: 'Operacao realizada comsucesso',
            tipo: 'success'
          })
        }).catch(e => {
          this.showAlert = true
          this.mensagens.push({
            texto: 'Ocorreu um erro ao tentar salvar o registro',
            tipo: 'error'
          })
        })
    }
  }
}
</script>

<style>
</style>
