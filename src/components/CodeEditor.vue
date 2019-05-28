<template>
  <div>
    <textarea name="editorBody" id="" ref="editorBody"></textarea>
  </div>
</template>

<script lang="ts">
import { Editor, fromTextArea } from '@/lib/codeMirror';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class CodeEditor extends Vue {
  @Prop({
    type: String,
    default: '',
    required: true,
  })
  public readonly value!: string;

  private instance: Editor | null = null;
  private code: string = '';

  public mounted() {
    this.init();
  }

  public beforeDestroy() {
    this.destroy();
  }

  private init() {
    this.instance = fromTextArea(this.$refs.editorBody as HTMLTextAreaElement, {
      mode: 'text/yaml',
      theme: 'monokai',
      styleActiveLine: true,
      lineNumbers: true,
      // line: true,
      lineWrapping: true,
      // styleSelectedText: true,
      foldGutter: true,
      gutters: [ 'CodeMirror-linenumbers', 'CodeMirror-foldgutter' ],
      autofocus: true,
      keyMap: 'sublime',
      matchBrackets: true,
      showCursorWhenSelecting: true,
      extraKeys: { Ctrl: 'autocomplete' },
    });

    this.instance.setValue(this.value);

    this.instance.on('change', (codeMirrorTextArea) => {
      this.code = codeMirrorTextArea.getValue();
      if (this.$emit) {
        this.$emit('input', this.code);
      }
    });
  }

  private destroy() {
    if (this.instance) {
      const element = this.instance.getWrapperElement();
      element && element.remove && element.remove();
    }
  }
}
</script>

<style lang="scss">
  @import "~codemirror/addon/dialog/dialog.css";
  @import "~codemirror/addon/fold/foldgutter.css";
  @import "~codemirror/addon/hint/show-hint.css";
  @import "~codemirror/lib/codemirror.css";
  @import "~codemirror/theme/monokai.css";
</style>
