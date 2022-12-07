import {fireEvent as dispatch} from '@testing-library/dom'

export type InputEventProperties = Omit<Partial<InputEvent>, 'target'> & {
  target?: Partial<EventTarget & HTMLInputElement>
}

export const events = {
  change: dispatch.change,

  click($element: HTMLElement, eventProperties: Partial<MouseEvent> = {}): boolean {
    if (($element as HTMLButtonElement).disabled) {
      return
    }

    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: $element.ownerDocument.defaultView,
      ...eventProperties,
    })

    return $element.dispatchEvent(event)
  },

  focus($element: HTMLElement): void {
    $element.focus()
  },

  input($element: HTMLElement, eventProperties: InputEventProperties): void {
    Object.assign($element, eventProperties.target)
    $element.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        ...eventProperties,
      }),
    )
  },

  dispatch,
}
