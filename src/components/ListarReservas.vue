<template>
<v-app id="inspire">
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Reservas</v-toolbar-title>
      <v-alert v-for="mensagem in mensagens" :key="mensagem.texto" :type="mensagem.tipo" :value="showAlertSuccess">
        {{mensagem.texto}}
      </v-alert>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-alert v-for="mensagem in mensagens" :key="mensagem.texto" :type="mensagem.tipo" :value="showAlert">
            {{mensagem.texto}}
          </v-alert>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-select v-model="editedItem.sala" :items="salas" :rules="[v => !!v || 'Item is required']" label="Sala" required item-text="nome" item-value="_id"></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select v-model="editedItem.local" :items="locais" :rules="[v => !!v || 'Item is required']" label="Local" required item-text="nome" item-value="_id"></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.dataInicio" label="Data inicio" return-masked-value mask="##/##/#### ##:##"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.dataFim" label="Data Fim" return-masked-value mask="##/##/#### ##:##"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.responsavel" label="Responsvel"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.descricao" label="Descricao"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-checkbox v-model="editedItem.cafe" label="Café"></v-checkbox>
                </v-flex>
                <v-flex xs12 sm6 md4 v-show="editedItem.cafe">
                  <v-text-field v-model="editedItem.qtdPessoas" label="Qtd pessoas"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="reservas" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.local.nome }}</td>
        <td class="text-xs-right">{{ props.item.sala.nome }}</td>
        <td class="text-xs-right">{{ props.item.dataInicio }}</td>
        <td class="text-xs-right">{{ props.item.dataFim }}</td>
        <td class="text-xs-right">{{ props.item.responsavel }}</td>
        <td class="text-xs-right">{{ props.item.descricao }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</v-app>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    mensagens: [],
    showAlertSuccess: false,
    showAlert: false,
    dialog: false,
    salas: [],
    locais: [],
    headers: [{
        text: 'Local/Filiais',
        value: 'local'
      },
      {
        text: 'Sala',
        value: 'sala'
      },
      {
        text: 'Data Inicio',
        value: 'data_inicio'
      },
      {
        text: 'Data Fim',
        value: 'data_fim'
      },
      {
        text: 'Responsável',
        value: 'resposanvel'
      },
      {
        text: 'Descrição',
        value: 'descricao',
        sortable: false
      },
      {
        text: 'Actions',
        value: 'name',
        sortable: false
      }
    ],
    reservas: [],
    editedIndex: -1,
    editedItem: {
      responsavel: '',
      descricao: '',
      dataInicio: '',
      dataFim: '',
      sala: '',
      local: '',
      cafe: false,
      qtdPessoas: 0
    },
    defaultItem: {
      responsavel: '',
      descricao: '',
      dataInicio: '',
      dataFim: '',
      sala: '',
      local: '',
      cafe: false,
      qtdPessoas: 0
    },
    itemId: null
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.$http('sala/list').then((res) => {
        this.salas = res.data
      })
      this.$http('local/list').then((res) => {
        this.locais = res.data
      })
      this.$http('reserva/list').then((res) => {
        this.reservas = res.data.map(reserva => {
          reserva.dataInicio = moment(reserva.dataInicio).format('DD/MM/YYYY H:mm')
          reserva.dataFim = moment(reserva.dataFim).format('DD/MM/YYYY H:mm')
          return reserva
        })
      })
    },

    editItem(item) {
      this.itemId = item._id
      this.mensagens = []
      this.showAlert = false
      this.editedIndex = this.reservas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.reservas.indexOf(item)
      if (confirm('Tem certeza que deseja remover esse item ?')) {
        this.$http.delete(`reserva/${item._id}`).then(res => {
          this.showAlertSuccess = true
          this.mensagens.push({
            texto: 'Registro removido com sucesso',
            tipo: 'success'
          })
        })
        this.reservas.splice(index, 1)
      }
    },

    close() {
      this.dialog = false
      this.itemId = null
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        this.$http.put(`reserva/${this.itemId}`, this.editedItem).then((res) => {
          // this.reservas.push(res.data)
          Object.assign(this.reservas[this.editedIndex], this.editedItem)
          this.showAlertSuccess = true
          this.mensagens.push({
            texto: 'Registro salvo com sucesso',
            tipo: 'success'
          })
          this.close()
        }).catch(e => {
          this.showAlert = true

          e.response.data.errors.map(err => {
            this.mensagens.push({
              texto: err.message,
              tipo: 'error'
            })
          })
        })
      } else {
        this.mensagens = []
        this.showAlertSuccess = false
        this.$http.post('reserva/register', this.editedItem).then((res) => {
          this.reservas.push(res.data)
          this.showAlertSuccess = true
          this.mensagens.push({
            texto: 'Registro salvo com sucesso',
            tipo: 'success'
          })
          this.close()
        }).catch(e => {
          this.showAlert = true

          e.response.data.errors.map(err => {
            this.mensagens.push({
              texto: err.message,
              tipo: 'error'
            })
          })
        })
      }
    }
  }
}
</script>

<style>

</style>
