import createContainer from './create-container'

export default function renderString(htmlString, $container = null) {
  if ($container == null) {
    $container = createContainer('div')
  }

  $container.innerHTML = htmlString

  return {$container}
}
