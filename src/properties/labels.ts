export function labelElementsFor($element: HTMLElement): HTMLElement[] {
  const $labels = Array.from(($element as HTMLInputElement).labels || []) as HTMLElement[]

  const ariaLabelIds = ($element.getAttribute('aria-labelledby') || '').split(/ +/)
  ariaLabelIds.forEach(labelId => {
    const $ariaLabel = document.getElementById(labelId)
    if ($ariaLabel) {
      $labels.push($ariaLabel)
    }
  })

  return $labels
}

export function labelTextsFor($element: HTMLElement): string[] {
  const ariaLabel = $element.getAttribute('aria-label')
  const labelTexts = ariaLabel ? [ariaLabel.trim()] : []
  return labelTexts.concat(labelElementsFor($element).map($label => $label.innerText.trim()))
}
