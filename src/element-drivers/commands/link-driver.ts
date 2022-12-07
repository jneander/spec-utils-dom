export class LinkDriver {
  public $element: HTMLAnchorElement

  static findAll($parent = document.body): LinkDriver[] {
    return Array.from($parent.querySelectorAll('a')).map($el => new LinkDriver($el))
  }

  static findWithText(text: string, $parent = document.body): LinkDriver | null {
    const $element = Array.from($parent.querySelectorAll('a')).find($el =>
      $el.textContent.includes(text),
    )

    if (!$element) {
      return null
    }

    return new LinkDriver($element)
  }

  constructor($element: HTMLAnchorElement) {
    this.$element = $element
  }

  get id(): string | null {
    return this.$element.id || null
  }

  get text(): string {
    return this.$element.textContent.trim()
  }

  get href(): string | null {
    return this.$element.href.trim() || null
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

  getAttribute(attributeName: string): string | null {
    return this.$element.getAttribute(attributeName)
  }
}
