/* eslint-disable no-use-before-define */
import { component, HTMLMorph, ViewModel, part, TilingLayout } from 'lively.morphic';
import { pt, rect } from 'lively.graphics/geometry-2d.js';
import { Color } from 'lively.graphics/color.js';
import { Text } from 'lively.morphic/text/morph.js';

export class EstudianteModel extends ViewModel {
  static get properties () {
    return {
      bindings: {
        get () {
          return [
            { target: 'show', signal: 'onMouseUp', handler: 'showIframe' },
            { target: 'hide', signal: 'onMouseUp', handler: 'hideIframe' }
          ];
        }
      },

      expose: {
        get () {
          return ['menuItems', 'remove'];
        }
      },

      hidden: {
        defaultValue: false
      },

      sourceUrl: {
        set (url) {
          this.setProperty('sourceUrl', url);
          this.iframe?.remove();
          this.iframe = null;
          this.iframeNode = null;
          this.iframe = new HTMLMorph({
            acceptsDrops: false,
            extent: pt(1800, 1050),
            cssDeclaration: '',
            html: `<iframe src=${url} frameborder="0" style="width:100%; height: 100%"></iframe>`
          });
          this.iframe.openInWorld();
          this.iframe.position = pt(75, 75);
        }
      }
    };
  }

  async viewDidLoad () {
    const name = await $world.prompt('Name of this Presentation');
    this.ui.name.textString = name;
    this.view.name = name;
    await this.promptForSourceURL();
    this.view.position = pt(100, 100);
  }

  showIframe () {
    if (!this.hidden) return;

    const { iframe } = this;
    iframe.visible = iframe.reactsToPointer = iframe.halosEnabled = true;

    const { show, hide } = this.ui;
    show.master = { auto: EstudianteButtonInactive };
    hide.master = { auto: EstudianteButtonActive };

    this.hidden = false;
    iframe.domNode.firstChild.focus();
  }

  hideIframe () {
    if (this.hidden) return;

    const { iframe } = this;
    iframe.visible = iframe.reactsToPointer = iframe.halosEnabled = false;

    const { show, hide } = this.ui;
    show.master = { auto: EstudianteButtonActive };
    hide.master = { auto: EstudianteButtonInactive };

    this.hidden = true;
  }

  remove () {
    this.iframe?.remove();
    this.withoutExposedPropsDo(() => this.view.remove());
  }

  async promptForSourceURL () {
    const url = await $world.prompt('Enter Source URL');
    if (!url) return;
    this.sourceUrl = url;
  }

  menuItems () {
    return [['Change source URL', this.promptForSourceURL()]
    ];
  }
}

export const EstudianteButtonActive = component({
  type: Text,
  name: 'estudiante button',
  extent: pt(51, 30),
  borderWidth: 1,
  borderColor: Color.rgb(0, 0, 0),
  fontColor: Color.black,
  padding: rect(5, 5, 0, 0),
  dynamicCursorColoring: true,
  fill: Color.white,
  nativeCursor: 'pointer'
});

export const EstudianteButtonInactive = component(EstudianteButtonActive, {
  fill: Color.rgb(176, 176, 176),
  fontColor: Color.rgba(0, 0, 0, 0.5049),
  nativeCursor: 'not-allowed'
});

export const Estudiante = component({
  name: 'presenter',
  defaultViewModel: EstudianteModel,
  extent: pt(334.5, 48.5),
  position: pt(280, 60),
  layout: new TilingLayout({
    axisAlign: 'center',
    justifySubmorphs: 'spaced',
    orderByIndex: true,
    padding: rect(5, 5, 0, 0),
    spacing: 5
  }),
  borderRadius: 5,
  submorphs: [{
    type: Text,
    name: 'name',
    clipMode: 'hidden',
    fontFamily: 'Roboto',
    borderRadius: 5,
    lineHeight: 2,
    textAlign: 'left',
    borderColor: Color.rgb(23, 160, 251),
    borderWidth: 2,
    cursorWidth: 1.5,
    dynamicCursorColoring: true,
    extent: pt(180.5, 29),
    fill: Color.white,
    fixedHeight: true,
    fixedWidth: true,
    lineWrapping: 'by-words',
    padding: rect(1, 1, 0, 0),
    position: pt(3, 2.5),
    textAndAttributes: ['Name of the Presentation', null]
  }, part(EstudianteButtonInactive, {
    name: 'show',
    textAndAttributes: ['', {
      fontFamily: '"Font Awesome 6 Free", "Font Awesome 6 Brands"',
      fontWeight: '900'
    }, ' ', {}, 'Show', {
      fontFamily: 'Roboto'
    }]
  }), part(EstudianteButtonActive, {
    name: 'hide',
    textAndAttributes: ['', {
      fontFamily: '"Font Awesome 6 Free", "Font Awesome 6 Brands"',
      fontWeight: '900'
    }, ' ', {}, 'Hide', {
      fontFamily: 'Roboto'
    }]
  })]
});
