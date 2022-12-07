const headingSelector = 'h1,h2,h3,h4,h5,h6,[role="heading"]'

export class HeadingDriver {
  public $element: HTMLElement

  static findWithText(text: string, $parent = document.body): HeadingDriver | null {
    const $element = Array.from($parent.querySelectorAll(headingSelector)).find($el =>
      $el.textContent.includes(text),
    ) as HTMLElement

    if ($element == null) {
      return null
    }

    return new HeadingDriver($element)
  }

  static find($parent = document.body): HeadingDriver | null {
    const $element = $parent.querySelectorAll(headingSelector)[0] as HTMLElement

    if ($element == null) {
      return null
    }

    return new HeadingDriver($element)
  }

  constructor($element: HTMLElement) {
    this.$element = $element
  }

  get level(): number | undefined {
    let level = undefined

    const matches = this.$element.tagName.match(/H([1-6])/)
    if (matches) {
      level = matches[1]
    } else {
      level = this.$element.getAttribute('aria-level') || undefined
    }

    if (level) {
      return Number.parseInt(level, 10)
    }

    return undefined
  }

  get text(): string {
    return this.$element.textContent.trim()
  }
}
