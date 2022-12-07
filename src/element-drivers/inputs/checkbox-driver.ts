import {events, labelElementsFor, labelTextsFor} from '../..'

export class CheckboxDriver {
  public $element: HTMLElement

  static findWithLabelText(text: string, $parent = document.body): CheckboxDriver {
    const $element = Array.from($parent.querySelectorAll('input[type="checkbox"]')).find($el =>
      labelTextsFor($el as HTMLElement).includes(text),
    ) as HTMLElement

    if (!$element) {
      return null
    }

    return new CheckboxDriver($element)
  }

  constructor($element: HTMLElement) {
    this.$element = $element
  }

  get labelTexts(): string[] {
    return labelTextsFor(this.$element)
  }

  get $labels(): HTMLElement[] {
    return labelElementsFor(this.$element)
  }

  get focused(): boolean {
    return this.$element === document.activeElement
  }

  get checked() {
    return (this.$element as HTMLInputElement).checked
  }

  setChecked(checked: boolean): void {
    if (this.checked !== checked) {
      this.click()
    }
  }

  click(): void {
    events.click(this.$element)
  }

  focus(): void {
    events.focus(this.$element)
  }
}
