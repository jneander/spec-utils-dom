import {labelElementsFor, labelTextsFor} from '../../properties'
import {KeyOptions, events, keyboard} from '../..'

export class TextareaDriver {
  public $element: HTMLElement

  static findWithLabelText(text: string, $parent = document.body): TextareaDriver {
    const element = Array.from($parent.querySelectorAll('textarea')).find($el =>
      labelTextsFor($el).includes(text),
    ) as HTMLElement

    if (!element) {
      return null
    }

    return new TextareaDriver(element)
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

  get placeholder(): string | null {
    return (this.$element as HTMLInputElement).placeholder || null
  }

  get value(): string {
    return (this.$element as HTMLInputElement).value
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

  setValue(value: string): void {
    if (this.value !== value) {
      events.input(this.$element, {target: {value}})
    }
  }
}
