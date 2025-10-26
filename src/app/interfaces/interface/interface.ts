export interface NavigableSection {
  nextSectionId: string;
  onNext(ev?: KeyboardEvent): void;
  onKey(ev: KeyboardEvent): void;
}
