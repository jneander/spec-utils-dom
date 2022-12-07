import {labelElementsFor, labelTextsFor} from '../../properties'
import {KeyOptions, events, keyboard} from '../..'

export class TextInputDriver {
  public $element: HTMLElement

  static findAll($parent = document.body): TextInputDriver[] {
    return Array.from($parent.querySelectorAll('input[type="text"]')).map(
      ($el: HTMLElement) => new TextInputDriver($el),
    )
  }

  static findWithLabelText(text: string, $parent = document.body): TextInputDriver | null {
    const $element = Array.from($parent.querySelectorAll('input[type="text"]')).find(
      ($el: HTMLElement) => labelTextsFor($el).includes(text),
    ) as HTMLElement

    if (!$element) {
      return null
    }

    return new TextInputDriver($element)
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

  keyDown(key: string | number, options: KeyOptions): void {
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
