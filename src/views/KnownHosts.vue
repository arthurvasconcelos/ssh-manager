<template>
  <div class="known-hosts">
    <h1 class="display-3">Known Hosts</h1>

    <v-divider></v-divider>

    <ul>
      <li v-for="h of hosts">{{ h }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { PATH_TO_KNOWN_HOSTS_FILE, PATH_TO_SSH_FOLDER } from "@/constants";
  import { Component, Vue } from "vue-property-decorator";
  import fs from 'fs';

  interface IKnownHosts {
    domain: string;
    ip: string;
    key: string;
  }

  @Component({})
  export default class KnownHosts extends Vue {
    public sshFolderNotFound = false;
    public hosts: IKnownHosts[] = [];

    public mounted() {
      this.sshFolderNotFound = !fs.existsSync(PATH_TO_SSH_FOLDER);

      if (!this.sshFolderNotFound) {
        this.hosts = fs.readFileSync(PATH_TO_KNOWN_HOSTS_FILE)
                       .toString()
                       .split('\n')
                       .filter((h) => h)
                       .map((h) => {
                         const hostAndKey = h.split(/ (.+)/);
                         const domainAndIp = hostAndKey[0].split(',');

                         return {
                           domain: (domainAndIp.length > 1) ? domainAndIp[0] : '--',
                           ip: (domainAndIp.length > 1) ? domainAndIp[1] : domainAndIp[0],
                           key: hostAndKey[1],
                         }
                       });
      }
    }
  }
</script>
