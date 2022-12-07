declare module 'keycodes' {
  import keycodes from 'keycodes'

  function keycodes(input: string | number): string | number
  function keycodes(input: string): number
  function keycodes(input: number): string

  export default keycodes
}
