import {fireEvent} from '@testing-library/dom'
import keycodes from 'keycodes'

export type KeyId = string | number
export type KeyOptions = Partial<KeyboardEvent>

function withDefaults(options: KeyOptions = {}) {
  return {
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    ...options,
  }
}

export const keyboard = {
  keyDown($element: HTMLElement, key: KeyId, options: KeyOptions) {
    return fireEvent.keyDown($element, {
      keyCode: isNaN(key as number) ? keycodes(key) : key,
      ...withDefaults(options),
    })
  },

  keyPress($element: HTMLElement, key: KeyId, options: KeyOptions) {
    return fireEvent.keyPress($element, {
      keyCode: isNaN(key as number) ? keycodes(key) : key,
      ...withDefaults(options),
    })
  },

  keyUp($element: HTMLElement, key: KeyId, options: KeyOptions) {
    return fireEvent.keyUp($element, {
      keyCode: isNaN(key as number) ? keycodes(key) : key,
      ...withDefaults(options),
    })
  },
}
