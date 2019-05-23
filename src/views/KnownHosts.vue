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
  import getPaths from '@/helpers/get-paths';
  import electron from 'electron';
  import fs from 'fs';
  import { Component, Vue } from 'vue-property-decorator';

  interface IKnownHosts {
    domain: string;
    ip: string;
    key: string;
  }

  @Component({})
  export default class KnownHosts extends Vue {
    private paths = getPaths(electron);
    public sshFolderNotFound = false;
    public hosts: IKnownHosts[] = [];

    public mounted() {
      this.sshFolderNotFound = !fs.existsSync(this.paths.sshFolder);

      if (!this.sshFolderNotFound) {
        this.hosts = fs.readFileSync(this.paths.knownHostsFile)
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
                         };
                       });
      }
    }
  }
</script>
