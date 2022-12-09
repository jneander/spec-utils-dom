import sinon, {SinonSpy} from 'sinon'

import {createContainer, renderString} from '../../..'
import {SearchInputDriver} from './search-input-driver'

describe('Element Drivers > Inputs > SearchInputDriver', () => {
  let $container: HTMLElement
  let driver: SearchInputDriver

  beforeEach(() => {
    $container = createContainer()
  })

  afterEach(() => {
    $container.remove()
  })

  function render(string: string) {
    renderString(string, $container)
    driver = new SearchInputDriver(getInput())
  }

  function getInput(): HTMLInputElement {
    return document.body.querySelector(`#input-1`)
  }

  describe('.findAll()', () => {
    let inputs

    it('matches `input` elements with a type of "search"', () => {
      render(`
        <label>Input 2<input type="search" id="input-2" /></label>
        <label>Input 1<input type="search" id="input-1" /></label>
      `)
      inputs = SearchInputDriver.findAll()
      expect(inputs.map(input => input.id)).to.have.members(['input-1', 'input-2'])
    })

    it('does not match `input` elements without a type of "search"', () => {
      render(`
        <label>Input 2<input type="search" id="input-2" /></label>
        <label>Input 1<input type="text" id="input-1" /></label>
      `)
      inputs = SearchInputDriver.findAll()
      expect(inputs.map(input => input.id)).to.have.members(['input-2'])
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <label>Input 1<input type="search" id="input-2" /></label>
        </div>
        <div id="container-2">
          <label>Input 1<input type="search" id="input-1" /></label>
        </div>
      `)
      inputs = SearchInputDriver.findAll($container.querySelector('#container-2'))
      expect(inputs.map(input => input.id)).to.have.members(['input-1'])
    })
  })

  describe('.findWithLabelText()', () => {
    it('matches `input` elements with a type of "search"', () => {
      render(`
        <label>Input 2<input type="search" id="input-2" /></label>
        <label>Input 1<input type="search" id="input-1" /></label>
      `)
      driver = SearchInputDriver.findWithLabelText('Input 1')
      expect(driver.$element).to.equal(getInput())
    })

    it('does not match `input` elements without a type of "search"', () => {
      render(`
        <label>Input 2<input type="search" id="input-2" /></label>
        <label>Input 1<input type="text" id="input-1" /></label>
      `)
      driver = SearchInputDriver.findWithLabelText('Input 1')
      expect(driver).not.to.exist
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <label>Input 1<input type="search" id="input-2" /></label>
        </div>
        <div id="container-2">
          <label>Input 1<input type="search" id="input-1" /></label>
        </div>
      `)
      const $parent = $container.querySelector('#container-2') as HTMLElement
      driver = SearchInputDriver.findWithLabelText('Input 1', $parent)
      expect(driver.$element).to.equal(getInput())
    })

    it('matches deeply-nested text', () => {
      render('<label><span>Input 1</span><input type="search" id="input-1" /></label>')
      driver = SearchInputDriver.findWithLabelText('Input 1')
      expect(driver.$element).to.equal(getInput())
    })

    it('ignores surrouding whitespace', () => {
      render(`
        <label>
          Input 1
          <input type="search" id="input-1" />
        </label>
      `)
      driver = SearchInputDriver.findWithLabelText('Input 1')
      expect(driver.$element).to.equal(getInput())
    })

    it('returns null when nothing matches', () => {
      driver = SearchInputDriver.findWithLabelText('Input 1')
      expect(driver).to.equal(null)
    })
  })

  describe('#$element', () => {
    it('is the `input` element', () => {
      render('<input type="search" id="input-1" />')
      expect(driver.$element).to.equal(getInput())
    })
  })

  describe('#id', () => {
    it('is the id the `input`', () => {
      render('<input type="search" id="input-1" />')
      expect(driver.id).to.equal('input-1')
    })

    it('is null when the `input` has no id', () => {
      render('<input type="search" id="input-1" />')
      getInput().removeAttribute('id')
      expect(driver.id).to.be.null
    })
  })

  describe('#labelTexts', () => {
    it('is the list of label texts for the `input`', () => {
      render(`
        <label id="label-1">
          Label 1
          <input type="search" id="input-1" />
        </label>
      `)
      expect(driver.labelTexts).to.have.members(['Label 1'])
    })
  })

  describe('#$labels', () => {
    it('is the list of `label` elements for the `input`', () => {
      render(`
        <label id="label-1">
          Label 1
          <input type="search" id="input-1" />
        </label>
      `)
      expect(driver.$labels).to.have.members([$container.querySelector('label')])
    })
  })

  describe('#focused', () => {
    it('is true when the `input` has focus', () => {
      render('<input type="search" id="input-1" />')
      getInput().focus()
      expect(driver.focused).to.equal(true)
    })

    it('is false when the `input` does not have focus', () => {
      render('<input type="search" id="input-1" />')
      expect(driver.focused).to.equal(false)
    })
  })

  describe('#placeholder', () => {
    it('is the placeholder of the `input` element', () => {
      render('<input type="search" id="input-1" placeholder="Placeholder" value="Content" />')
      expect(driver.placeholder).to.equal('Placeholder')
    })

    it('is null when the `input` has no placeholder', () => {
      render('<input type="search" id="input-1" />')
      expect(driver.placeholder).to.equal(null)
    })
  })

  describe('#value', () => {
    it('is the content of the `input` element', () => {
      render('<input type="search" id="input-1" value="Content" />')
      expect(driver.value).to.equal('Content')
    })

    it('is an empty string when the `input` has no content', () => {
      render('<input type="search" id="input-1" />')
      expect(driver.value).to.equal('')
    })
  })

  describe('#focus()', () => {
    let eventSpy: SinonSpy

    beforeEach(() => {
      render('<input type="search" id="input-1" />')
      listenForFocus()
    })

    function listenForFocus() {
      eventSpy = sinon.spy()
      getInput().addEventListener('focus', eventSpy, false)
    }

    it('sets focus on the `input` element', () => {
      driver.focus()
      expect(document.activeElement).to.equal(getInput())
    })

    it('propagates a "focus" event', () => {
      driver.focus()
      const specCaveat =
        'When running this spec locally in a browser with devtools open, ' +
        'this behavior will not occur.'
      expect(eventSpy.callCount).to.equal(1, specCaveat)
    })

    it('does nothing when the `input` already has focus', () => {
      getInput().focus()
      listenForFocus()
      driver.focus()
      expect(eventSpy.callCount).to.equal(0)
    })
  })

  describe('#keyDown()', () => {
    let eventSpy: SinonSpy

    beforeEach(() => {
      render('<input type="search" id="input-1" />')
      eventSpy = sinon.spy()
      getInput().addEventListener('keydown', eventSpy, false)
    })

    it('propagates a "keydown" event', () => {
      driver.keyDown(13, {altKey: true})
      expect(eventSpy.callCount).to.equal(1)
    })

    it('includes the given keycode', () => {
      driver.keyDown(13, {altKey: true})
      const [event] = eventSpy.lastCall.args
      expect(event.keyCode).to.equal(13)
    })

    it('assigns the given keyDown options', () => {
      driver.keyDown(13, {altKey: true})
      const [event] = eventSpy.lastCall.args
      expect(event.altKey).to.equal(true)
    })
  })

  describe('#changeValue()', () => {
    let eventSpy: SinonSpy

    beforeEach(() => {
      eventSpy = sinon.spy()
      $container.addEventListener('change', eventSpy, false)
      render('<input type="text" id="input-1" value="Content" />')
    })

    it('sets the content in the `input` element', () => {
      driver.changeValue('Updated Content')
      expect(driver.value).to.equal('Updated Content')
    })

    it('propagates a "change" event when setting the content', () => {
      driver.changeValue('Updated Content')
      expect(eventSpy.callCount).to.equal(1)
    })

    it('does nothing when setting the content with the same value', () => {
      driver.changeValue('Content')
      expect(eventSpy.callCount).to.equal(0)
    })
  })

  describe('#inputValue()', () => {
    let eventSpy: SinonSpy

    beforeEach(() => {
      eventSpy = sinon.spy()
      $container.addEventListener('input', eventSpy, false)
      render('<input type="text" id="input-1" value="Content" />')
    })

    it('sets the content in the `input` element', () => {
      driver.inputValue('Updated Content')
      expect(driver.value).to.equal('Updated Content')
    })

    it('propagates an "input" event when setting the content', () => {
      driver.inputValue('Updated Content')
      expect(eventSpy.callCount).to.equal(1)
    })

    it('does nothing when setting the content with the same value', () => {
      driver.inputValue('Content')
      expect(eventSpy.callCount).to.equal(0)
    })
  })
})
