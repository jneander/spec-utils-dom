import {KeyOptions, keyboard} from '../..'

export class ButtonDriver {
  public $element: HTMLElement

  static findAll($parent = document.body): ButtonDriver[] {
    return Array.from($parent.querySelectorAll('button,[role="button"]')).map(
      $el => new ButtonDriver($el as HTMLElement),
    )
  }

  static findWithText(text: string, $parent = document.body): ButtonDriver | null {
    const $element = Array.from($parent.querySelectorAll('button,[role="button"]')).find($el =>
      $el.textContent.includes(text),
    )

    if (!$element) {
      return null
    }

    return new ButtonDriver($element as HTMLElement)
  }

  constructor($element: HTMLElement) {
    this.$element = $element
  }

  get id(): string | null {
    return this.$element.id || null
  }

  get text(): string {
    return this.$element.textContent.trim()
  }

  get disabled(): boolean {
    return (this.$element as HTMLButtonElement).disabled
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

  keyDown(key: string | number, options: KeyOptions): void {
    keyboard.keyDown(this.$element, key, options)
  }

  getAttribute(attributeName: string): string | null {
    return this.$element.getAttribute(attributeName)
  }
}
