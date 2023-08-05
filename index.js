import { ViewModel, HTMLMorph } from 'lively.morphic';
import { pt } from 'lively.graphics';
import { EstudianteButtonActive, EstudianteButtonInactive } from './ui.cp.js';
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
