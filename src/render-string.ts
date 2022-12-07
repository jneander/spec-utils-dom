import {createContainer} from './create-container'

export function renderString(htmlString: string, $container: HTMLElement = null) {
  if ($container == null) {
    $container = createContainer({as: 'div'})
  }

  $container.innerHTML = htmlString

  return {$container}
}
