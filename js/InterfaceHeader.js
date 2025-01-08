import { interfaceElements } from "../dictionaries/interface.js";
import { createElement } from "./helpFunctions.js";
import { InterfacePopup } from "./InterfacePopup.js";

export class InterfaceHeader {
  constructor(version, visualization, block) {
    const place = document.querySelector(`.${block}`);
    // Interface
    const headline = createElement("h1", "headline");
    headline.innerHTML = `${version.year.yearNum}`;
    place.append(headline);
    // Top right corner
    const tr = createElement("div", "top-right");
    if (version.country) {
      this.countryBlock = createElement("sup", "parameter");
      this.countryBlock.classList.add("country");
      this.countryBlock.innerHTML =
        interfaceElements.countries[version.country];
      headline.append(this.countryBlock);
    }
    if (version.language) {
      this.languageBlock = createElement("sup", "parameter");
      this.languageBlock.classList.add("language");
      this.languageBlock.innerHTML =
        interfaceElements.languages[version.language];
      headline.append(this.languageBlock);
    }
    const button = createElement("div", "button");
    tr.append(button);
    if (version && visualization) {
      button.addEventListener("click", (event) => {
        new InterfacePopup(version, visualization);
      });
    }
    place.append(tr);
  }
}
