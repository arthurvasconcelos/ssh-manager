<template>
  <div class="keys">
    <h1 class="display-3">Keys</h1>

    <v-divider></v-divider>

    <v-data-table
      :headers="headers"
      :items="keysDetails"
      class="elevation-1 mt-5"
      item-key="name"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ props.header.text }}</span>
          </template>
          <span>{{ props.header.fullText }}</span>
        </v-tooltip>
      </template>

      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>

      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>
          <v-edit-dialog
            :return-value.sync="props.item.mode"
            large
            lazy
            persistent
            @save="saveMode(props.item.name, props.item.mode)"
            @cancel="cancelModeEdit"
            @open="openModeEdtionModal"
            @close="closeModeEditionModal"
          >
            <div>{{ props.item.mode }}</div>
            <template v-slot:input>
              <v-text-field
                v-model="props.item.mode"
                :rules="[need5chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </td>
        <td>{{ props.item.uid }}</td>
        <td>{{ props.item.gid }}</td>
        <td>{{ props.item.size }}</td>
        <td>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ props.item.atime.toDateString() }}</span>
            </template>
            <span>{{ props.item.atime }}</span>
          </v-tooltip>
        </td>
        <td>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ props.item.mtime.toDateString() }}</span>
            </template>
            <span>{{ props.item.mtime }}</span>
          </v-tooltip>
        </td>
        <td>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ props.item.ctime.toDateString() }}</span>
            </template>
            <span>{{ props.item.ctime }}</span>
          </v-tooltip>
        </td>
        <td>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ props.item.birthtime.toDateString() }}</span>
            </template>
            <span>{{ props.item.birthtime }}</span>
          </v-tooltip>
        </td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="seeFileContent(props.item.name)">visibility</v-icon>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="570px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>

        <v-card-text>
          <pre v-if="dialogPre">{{ dialogText }}</pre>
          <span style="word-wrap: break-word" v-else>{{ dialogText }}</span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-tooltip v-model="showCopyTooltip" top>
            <template v-slot:activator="{ on }">
              <v-btn color="blue darken-1" flat @click="copyToClipBoard">Copy</v-btn>
            </template>
            <span>Copied to clipboard</span>
          </v-tooltip>
          <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import getPaths from '@/helpers/get-paths';
import electron, { clipboard } from 'electron';
import fs from 'fs';
import path from 'path';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Keys extends Vue {

  get keysDetails() {
    return this.sshKeys.map((k) => ({
      name: k,
      ...fs.statSync(path.resolve(this.paths.sshFolder, k)),
    }));
  }
  public sshFolderNotFound = false;
  public sshKeys: string[] = [];
  public headers = [
    { text: 'Name', fullText: 'Name', value: 'name' },
    { text: 'Mode', fullText: 'Mode', value: 'mode' },
    { text: 'User ID', fullText: 'User ID', value: 'uid' },
    { text: 'Group ID', fullText: 'Group ID', value: 'gid' },
    { text: 'Size', fullText: 'Size', value: 'size' },
    { text: 'LA', fullText: 'Last Access', value: 'atime' },
    { text: 'LM', fullText: 'Last Modified', value: 'mtime' },
    { text: 'LC', fullText: 'Last Change', value: 'ctime' },
    { text: 'CA', fullText: 'Created At', value: 'birthtime' },
    { text: 'Actions', fullText: 'Actions', value: 'name', sortable: false },
  ];
  public dialog = false;
  public dialogTitle = '';
  public dialogText = '';
  public dialogPre = false;
  public showCopyTooltip = false;
  public snack = false;
  public snackColor = '';
  public snackText = '';
  private paths = getPaths(electron);
  public need5chars = (v: string) => v.length === 5 || 'Input too long!';

  public mounted() {
    this.sshFolderNotFound = !fs.existsSync(this.paths.sshFolder);

    if (!this.sshFolderNotFound) {
      this.fecthSshKeys();
    }
  }

  public seeFileContent(fileName: string) {
    this.dialogTitle = fileName;
    this.dialogText = fs.readFileSync(path.resolve(this.paths.sshFolder, fileName)).toString();
    this.dialogPre = !fileName.endsWith('.pub');
    this.dialog = true;
  }

  public copyToClipBoard() {
    clipboard.write({ text: this.dialogText }, 'rsaKey');
    this.showCopyTooltip = true;
    setTimeout(() => this.showCopyTooltip = false, 3000);
  }

  public closeDialog() {
    this.dialog = false;
    this.dialogTitle = '';
    this.dialogText = '';
  }

  public saveMode(fileName: string, newMode: string) {
    this.snack = true;
    this.snackColor = 'success';
    this.snackText = 'Data saved';

    fs.chmodSync(path.resolve(this.paths.sshFolder, fileName), newMode.substring(2));
    this.fecthSshKeys();
  }

  public cancelModeEdit() {
    this.snack = true;
    this.snackColor = 'error';
    this.snackText = 'Canceled';
  }

  public openModeEdtionModal() {
    this.snack = true;
    this.snackColor = 'info';
    this.snackText = 'Dialog opened';
  }

  public closeModeEditionModal() {
    console.log('Dialog closed');
  }

  private fecthSshKeys() {
    this.sshKeys = fs.readdirSync(this.paths.sshFolder)
                     .filter((file) => file.endsWith('.pub'))
                     .flatMap((k) => [ k.replace('.pub', ''), k ]);
  }
}
</script>
