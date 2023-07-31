# estudiante

`estudiante` is a small tool helping with `iframe` presentations/demonstrations inside of `lively.next`. 

![A gif showing the UI of estudiante consisting of the name of the currently displayed presentation, a button labelled "Show", and a button labelled "Hide".](./estudiante.gif)

## Usage

```js
import { part } from "lively.morphic";
import { Estudiante } from "estudiante/ui.cp.js";
part(Estudiante).openInWorld()
```

## Open Problems

- auto focus of `iframe` node after unhiding slides does not work
- `ViewModel` is sometimes not attached upon first import. Saving `ui.cp.js` resolves this usually.

## License

MIT (c) 2023 Linus Hagemann.