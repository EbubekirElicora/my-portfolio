// interface
export interface NavigableSection {
  nextSectionId: string;
  onNext(ev?: Event): void;          // vorher: KeyboardEvent
  onKey(ev: KeyboardEvent): void;
  onBack?(ev?: Event): void;         // falls du Back nutzt
}
