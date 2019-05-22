<template>
  <div class="dashboard">
    <h1 class="display-3">Dashboard</h1>

    <v-divider></v-divider>

    <v-alert :value="sshFolderNotFound" type="error">
      <b>ERROR:</b> ssh folder was not found in path: {{ sshPath }}
    </v-alert>

    <v-layout wrap align-center justify-center pt-5 pb-3 mt-5>
      <v-flex sm6 xs12 md6 lg3 mx-3>
        <v-card>
          <div class="offset">
            <v-card dark color="green" elevation="10" class="pa-4">
              <v-icon style="font-size: 40px">vpn_key</v-icon>
            </v-card>
          </div>

          <v-card-text>
            <div class="text-xs-right">
              <p class="grey--text font-weight-light">Keys</p>
              <h3 class="title display-1 font-weight-light">{{ keyCounter }}</h3>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex sm6 xs12 md6 lg3 mx-3>
        <v-card>
          <div class="offset">
            <v-card dark color="purple" elevation="10" class="pa-4">
              <v-icon style="font-size: 40px">settings_input_antenna</v-icon>
            </v-card>
          </div>

          <v-card-text>
            <div class="text-xs-right">
              <p class="grey--text font-weight-light">Trusted Hosts</p>
              <h3 class="title display-1 font-weight-light">{{ trustedCounter }}</h3>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex sm6 xs12 md6 lg3 mx-3>
        <v-card>
          <div class="offset">
            <v-card dark color="blue" elevation="10" class="pa-4">
              <v-icon style="font-size: 40px">dns</v-icon>
            </v-card>
          </div>

          <v-card-text>
            <div class="text-xs-right">
              <p class="grey--text font-weight-light">Hosts</p>
              <h3 class="title display-1 font-weight-light">{{ configCounter }}</h3>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
  import { PATH_TO_CONFIG_FILE, PATH_TO_KNOWN_HOSTS_FILE, PATH_TO_SSH_FOLDER } from "@/constants";
  import { Component, Vue } from "vue-property-decorator";
  import fs from 'fs';

  @Component({})
  export default class Dashboard extends Vue {
    public sshFolderNotFound = false;
    public sshPath = PATH_TO_SSH_FOLDER;
    public keyCounter = 0;
    public trustedCounter = 0;
    public configCounter = 0;

    mounted() {
      this.sshFolderNotFound = !fs.existsSync(PATH_TO_SSH_FOLDER);

      if (!this.sshFolderNotFound) {
        this.keyCounter = fs.readdirSync(PATH_TO_SSH_FOLDER).filter((file) => file.endsWith('.pub')).length * 2;

        if (fs.existsSync(PATH_TO_KNOWN_HOSTS_FILE)) {
          this.trustedCounter = fs.readFileSync(PATH_TO_KNOWN_HOSTS_FILE).toString().split('\n').filter((line) => line).length;
        }

        if (fs.existsSync(PATH_TO_CONFIG_FILE)) {
          this.configCounter = fs.readFileSync(PATH_TO_CONFIG_FILE).toString().split('\n').filter((line) => line.startsWith('Host')).length;
        }
      }
    }
  }
</script>

<style lang="scss">
  .offset {
    position: absolute;
    top: -24px;
    margin-bottom: -24px;
    padding: 0 16px;
  }
</style>
