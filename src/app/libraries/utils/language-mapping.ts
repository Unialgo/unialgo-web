export interface LanguageMapping {
  judge0Id: number;
  judge0Name: string;
  monacoLanguage: string;
  fileExtension: string;
}

export class LanguageMappingService {
  private static readonly LANGUAGE_MAPPINGS: LanguageMapping[] = [
    {
      judge0Id: 50,
      judge0Name: 'C (GCC 9.2.0)',
      monacoLanguage: 'c',
      fileExtension: '.c'
    },
    {
      judge0Id: 54,
      judge0Name: 'C++ (GCC 9.2.0)',
      monacoLanguage: 'cpp',
      fileExtension: '.cpp'
    },
    {
      judge0Id: 62,
      judge0Name: 'Java (OpenJDK 13.0.1)',
      monacoLanguage: 'java',
      fileExtension: '.java'
    },
    {
      judge0Id: 71,
      judge0Name: 'Python (3.8.1)',
      monacoLanguage: 'python',
      fileExtension: '.py'
    },
    {
      judge0Id: 63,
      judge0Name: 'JavaScript (Node.js 12.14.0)',
      monacoLanguage: 'javascript',
      fileExtension: '.js'
    }
  ];

  static getMonacoLanguageByJudge0Id(judge0Id: number): string {
    const mapping = this.LANGUAGE_MAPPINGS.find(m => m.judge0Id === judge0Id);
    return mapping?.monacoLanguage || 'plaintext';
  }

  static getMonacoLanguageByExtension(extension: string): string {
    const mapping = this.LANGUAGE_MAPPINGS.find(m => m.fileExtension === extension);
    return mapping?.monacoLanguage || 'plaintext';
  }

  static getJudge0IdByMonacoLanguage(monacoLanguage: string): number | undefined {
    const mapping = this.LANGUAGE_MAPPINGS.find(m => m.monacoLanguage === monacoLanguage);
    return mapping?.judge0Id;
  }

  static getAllMappings(): LanguageMapping[] {
    return [...this.LANGUAGE_MAPPINGS];
  }
}