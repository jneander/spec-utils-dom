import {KeyOptions, keyboard} from '../..'

export class MenuItemDriver {
  public $element: HTMLElement

  static findAll($parent: HTMLElement): MenuItemDriver[] {
    return Array.from($parent.querySelectorAll('[role="menuitem"]')).map(
      ($el: HTMLElement) => new MenuItemDriver($el),
    )
  }

  static findWithText(text: string, $parent = document.body): MenuItemDriver | null {
    const $element = Array.from($parent.querySelectorAll('[role="menuitem"]')).find($el =>
      $el.textContent.includes(text),
    ) as HTMLElement

    if (!$element) {
      return null
    }

    return new MenuItemDriver($element)
  }

  constructor($element: HTMLElement) {
    this.$element = $element
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
