<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field v-model="login.email" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                <v-text-field v-model="login.password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click.prevent="loginFn">Login</v-btn>
              <v-btn color="primary" @click="registrarUserPage">Registrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import jwt from 'jsonwebtoken'

export default {
  data: () => ({
    login: {
      email: '',
      password: ''
    }
  }),
  methods: {
    registrarUserPage () {
      this.$router.push('/registrar/usuario')
    },
    loginFn () {
      this.$http.post('authenticate', this.login)
        .then(res => {
          const decoded = jwt.verify(res.data.token, '66c2d277af2913dd18c31d1f2d1a884e567c067de715259b656abc868ccad82f')
          const payload = {
            autenticado: true,
            token: res.data.token,
            user: decoded.data
          }

          sessionStorage.setItem('login', JSON.stringify(payload))
          this.$router.push('/reservas')
        }).catch((error) => {
          sessionStorage.setItem('login', '')
        })
    }
  },
  props: {
    source: String
  }
}
</script>

<style>

</style>
