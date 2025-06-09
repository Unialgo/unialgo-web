import { Component, Input, Output, EventEmitter, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface MonacoLanguageConfig {
  monacoLanguage: string;
  defaultCode?: string;
  readOnly?: boolean;
}

export interface CodeEditorTheme {
  name: string;
  base: 'vs' | 'vs-dark' | 'hc-black';
  inherit: boolean;
  rules: any[];
  colors: { [key: string]: string };
}

@Component({
  selector: 'app-monaco-code-editor',
  templateUrl: './monaco-code-editor.component.html',
  styleUrls: ['./monaco-code-editor.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonacoCodeEditorComponent),
      multi: true
    }
  ]
})
export class MonacoCodeEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() language: string = 'javascript';
  @Input() theme: string = 'vs-dark';
  @Input() readOnly: boolean = false;
  @Input() height: string = '400px';
  @Input() options: any = {};
  @Input() placeholder: string = 'Write your code here...';

  @Output() codeChanged = new EventEmitter<string>();
  @Output() editorInit = new EventEmitter<any>();

  code: string = '';
  editorOptions: any = {};
  editor: any;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  private languageStrategy = new Map<string, MonacoLanguageConfig>([
    ['c', { monacoLanguage: 'c', defaultCode: '#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}' }],
    ['cpp', { monacoLanguage: 'cpp', defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}' }],
    ['java', { monacoLanguage: 'java', defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}' }],
    ['python', { monacoLanguage: 'python', defaultCode: '# Your code here\ndef main():\n    pass\n\nif __name__ == "__main__":\n    main()' }],
    ['javascript', { monacoLanguage: 'javascript', defaultCode: '// Your code here\nconsole.log("Hello, World!");' }]
  ]);

  ngOnInit(): void {
    this.setupEditorOptions();
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  writeValue(value: string): void {
    this.code = value || '';
    if (this.editor) {
      this.editor.setValue(this.code);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.readOnly = isDisabled;
    this.setupEditorOptions();
    if (this.editor) {
      this.editor.updateOptions({ readOnly: this.readOnly });
    }
  }

  onEditorInit(editor: any): void {
    this.editor = editor;
    this.editorInit.emit(editor);

    if (this.code) {
      editor.setValue(this.code);
    } else {
      const config = this.getLanguageConfig();
      if (config?.defaultCode) {
        editor.setValue(config.defaultCode);
        this.code = config.defaultCode;
        this.onChange(this.code);
      }
    }

    editor.onDidChangeModelContent(() => {
      const value = editor.getValue();
      this.code = value;
      this.onChange(value);
      this.onTouched();
      this.codeChanged.emit(value);
    });

    editor.onDidBlurEditorText(() => {
      this.onTouched();
    });
  }

  setLanguage(language: string): void {
    this.language = language;
    this.setupEditorOptions();
    
    if (this.editor) {
      const model = this.editor.getModel();
      if (model) {
        const config = this.getLanguageConfig();
        (window as any).monaco.editor.setModelLanguage(model, config?.monacoLanguage || 'plaintext');
      }
    }
  }

  setTheme(theme: string): void {
    this.theme = theme;
    this.setupEditorOptions();
    
    if (this.editor) {
      (window as any).monaco.editor.setTheme(theme);
    }
  }

  focus(): void {
    if (this.editor) {
      this.editor.focus();
    }
  }

  getCode(): string {
    return this.code;
  }

  private setupEditorOptions(): void {
    const config = this.getLanguageConfig();
    
    this.editorOptions = {
      theme: this.theme,
      language: config?.monacoLanguage || 'plaintext',
      readOnly: this.readOnly,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      minimap: { enabled: false },
      fontSize: 14,
      fontFamily: 'Consolas, "Courier New", monospace',
      lineNumbers: 'on',
      rulers: [80, 120],
      wordWrap: 'on',
      tabSize: 4,
      insertSpaces: true,
      renderWhitespace: 'selection',
      scrollbar: {
        vertical: 'visible',
        horizontal: 'visible',
        useShadows: false,
        verticalHasArrows: true,
        horizontalHasArrows: true
      },
      ...this.options
    };
  }

  private getLanguageConfig(): MonacoLanguageConfig | undefined {
    return this.languageStrategy.get(this.language.toLowerCase());
  }
}