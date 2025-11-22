export interface NavigableSection {
  nextSectionId: string;
  onNext(ev?: Event): void;
  onKey(ev: KeyboardEvent): void;
  onBack?(ev?: Event): void;
}