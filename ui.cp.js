import { component, part, TilingLayout } from 'lively.morphic';
import { pt, rect } from 'lively.graphics/geometry-2d.js';
import { Color } from 'lively.graphics/color.js';
import { Text } from 'lively.morphic/text/morph.js';
import { EstudianteModel } from 'estudiante';

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
