import {keyboard} from '../..'
import type {KeyId, KeyOptions} from '../../keyboard'
import {labelTextsFor} from '../../properties'

export class MenuDriver {
  public $element: HTMLElement

  static findWithLabelText(text: string, $parent = document.body): MenuDriver | null {
    const $element = Array.from($parent.querySelectorAll('[role="menu"]')).find(
      ($el: HTMLElement) => labelTextsFor($el).includes(text),
    ) as HTMLElement

    if (!$element) {
      return null
    }

    return new MenuDriver($element)
  }

  constructor($element: HTMLElement) {
    this.$element = $element
  }

  get focused(): boolean {
    return this.$element === document.activeElement
  }

  get labelTexts(): string[] {
    return labelTextsFor(this.$element)
  }

  keyDown(key: KeyId, options?: KeyOptions) {
    keyboard.keyDown(this.$element, key, options)
  }
}
