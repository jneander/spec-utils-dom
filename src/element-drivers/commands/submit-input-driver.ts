import {KeyOptions, keyboard} from '../..'

export class SubmitInputDriver {
  public $element: HTMLElement

  static findAll($parent = document.body): SubmitInputDriver[] {
    return Array.from($parent.querySelectorAll('input[type="submit"]')).map(
      ($el: HTMLElement) => new SubmitInputDriver($el),
    )
  }

  static findWithText(text: string, $parent = document.body): SubmitInputDriver | null {
    const $element = Array.from($parent.querySelectorAll('input[type="submit"]')).find($el =>
      ($el as HTMLInputElement).value.includes(text),
    ) as HTMLElement

    if (!$element) {
      return null
    }

    return new SubmitInputDriver($element)
  }

  constructor($element: HTMLElement) {
    this.$element = $element
  }

  get id(): string | null {
    return this.$element.id || null
  }

  get text(): string {
    return (this.$element as HTMLInputElement).value.trim()
  }

  get disabled(): boolean {
    return (this.$element as HTMLInputElement).disabled
  }

  get focused(): boolean {
    return this.$element === document.activeElement
  }

  click(): void {
    this.$element.click()
  }

  focus(): void {
    this.$element.focus()
  }

  keyDown(key: string | number, options?: KeyOptions): void {
    keyboard.keyDown(this.$element, key, options)
  }

  getAttribute(attributeName: string): string | null {
    return this.$element.getAttribute(attributeName)
  }
}
