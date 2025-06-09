import { LanguageMappingService } from './language-mapping';

describe('LanguageMappingService', () => {
  
  it('should map Judge0 language IDs to Monaco languages correctly', () => {
    expect(LanguageMappingService.getMonacoLanguageByJudge0Id(50)).toBe('c');
    expect(LanguageMappingService.getMonacoLanguageByJudge0Id(54)).toBe('cpp');
    expect(LanguageMappingService.getMonacoLanguageByJudge0Id(62)).toBe('java');
    expect(LanguageMappingService.getMonacoLanguageByJudge0Id(71)).toBe('python');
    expect(LanguageMappingService.getMonacoLanguageByJudge0Id(63)).toBe('javascript');
  });

  it('should return plaintext for unknown Judge0 language ID', () => {
    expect(LanguageMappingService.getMonacoLanguageByJudge0Id(999)).toBe('plaintext');
  });

  it('should map file extensions to Monaco languages correctly', () => {
    expect(LanguageMappingService.getMonacoLanguageByExtension('.c')).toBe('c');
    expect(LanguageMappingService.getMonacoLanguageByExtension('.cpp')).toBe('cpp');
    expect(LanguageMappingService.getMonacoLanguageByExtension('.java')).toBe('java');
    expect(LanguageMappingService.getMonacoLanguageByExtension('.py')).toBe('python');
    expect(LanguageMappingService.getMonacoLanguageByExtension('.js')).toBe('javascript');
  });

  it('should return plaintext for unknown file extension', () => {
    expect(LanguageMappingService.getMonacoLanguageByExtension('.unknown')).toBe('plaintext');
  });

  it('should map Monaco languages back to Judge0 IDs', () => {
    expect(LanguageMappingService.getJudge0IdByMonacoLanguage('c')).toBe(50);
    expect(LanguageMappingService.getJudge0IdByMonacoLanguage('cpp')).toBe(54);
    expect(LanguageMappingService.getJudge0IdByMonacoLanguage('java')).toBe(62);
    expect(LanguageMappingService.getJudge0IdByMonacoLanguage('python')).toBe(71);
    expect(LanguageMappingService.getJudge0IdByMonacoLanguage('javascript')).toBe(63);
  });

  it('should return undefined for unknown Monaco language', () => {
    expect(LanguageMappingService.getJudge0IdByMonacoLanguage('unknown')).toBeUndefined();
  });

  it('should return all mappings', () => {
    const mappings = LanguageMappingService.getAllMappings();
    expect(mappings).toHaveLength(5);
    expect(mappings.find(m => m.judge0Id === 50)).toBeDefined();
    expect(mappings.find(m => m.judge0Id === 54)).toBeDefined();
    expect(mappings.find(m => m.judge0Id === 62)).toBeDefined();
    expect(mappings.find(m => m.judge0Id === 71)).toBeDefined();
    expect(mappings.find(m => m.judge0Id === 63)).toBeDefined();
  });
});