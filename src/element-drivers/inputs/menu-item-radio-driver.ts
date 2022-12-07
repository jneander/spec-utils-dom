import {KeyOptions, keyboard} from '../..'

export class MenuItemRadioDriver {
  public $element: HTMLElement

  static findAll($parent: HTMLElement): MenuItemRadioDriver[] {
    return Array.from($parent.querySelectorAll('[role="menuitemradio"]')).map(
      ($el: HTMLElement) => new MenuItemRadioDriver($el),
    )
  }

  static findWithText(text: string, $parent = document.body): MenuItemRadioDriver | null {
    const $element = Array.from($parent.querySelectorAll('[role="menuitemradio"]')).find($el =>
      $el.textContent.includes(text),
    ) as HTMLElement

    if (!$element) {
      return null
    }

    return new MenuItemRadioDriver($element)
  }

  constructor($element: HTMLElement) {
    this.$element = $element
  }

  get checked(): boolean {
    return this.$element.getAttribute('aria-checked') === 'true'
  }

  get disabled(): boolean {
    return (this.$element as HTMLInputElement).disabled
  }

  get focused(): boolean {
    return this.$element === document.activeElement
  }

  get id(): string | null {
    return this.$element.id || null
  }

  get text(): string {
    return this.$element.textContent.trim()
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
}
