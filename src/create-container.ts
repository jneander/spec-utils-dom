export interface CreateContainerOptions {
  $parent?: HTMLElement
  as?: keyof HTMLElementTagNameMap
}

function withDefaultOptions(options: CreateContainerOptions) {
  return {
    $parent: document.body,
    as: 'div',
    ...options,
  }
}

export function createContainer(options: CreateContainerOptions = {}): HTMLElement {
  const {$parent, as} = withDefaultOptions(options)
  return $parent.appendChild(document.createElement(as))
}
