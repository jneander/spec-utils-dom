import {labelElementsFor, labelTextsFor} from '../../properties'
import {KeyOptions, events, keyboard} from '../..'

export class SearchInputDriver {
  public $element: HTMLElement

  static findAll($parent = document.body): SearchInputDriver[] {
    return Array.from($parent.querySelectorAll('input[type="search"]')).map(
      ($el: HTMLElement) => new SearchInputDriver($el),
    )
  }

  static findWithLabelText(text: string, $parent = document.body): SearchInputDriver | null {
    const $element = Array.from($parent.querySelectorAll('input[type="search"]')).find(
      ($el: HTMLElement) => labelTextsFor($el).includes(text),
    ) as HTMLElement

    if (!$element) {
      return null
    }

    return new SearchInputDriver($element)
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

  get id(): string | null {
    return this.$element.id || null
  }

  get placeholder(): string | null {
    return (this.$element as HTMLInputElement).placeholder || null
  }

  get value(): string {
    return (this.$element as HTMLInputElement).value
  }

  click(): void {
    this.$element.click()
  }

  getAttribute(attributeName: string): string | null {
    return this.$element.getAttribute(attributeName)
  }

  focus(): void {
    this.$element.focus()
  }

  keyDown(key: string | number, options?: KeyOptions): void {
    keyboard.keyDown(this.$element, key, options)
  }

  changeValue(value: string): void {
    if (this.value !== value) {
      events.change(this.$element, {target: {value}})
    }
  }

  inputValue(value: string): void {
    if (this.value !== value) {
      events.input(this.$element, {target: {value}})
    }
  }
}
