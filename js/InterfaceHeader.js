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
      this.countryBlock = createElement("div", "parameter");
      this.countryBlock.classList.add("country");
      this.countryBlock.innerHTML =
        interfaceElements.countries[version.country];
      tr.append(this.countryBlock);
    }
    if (version.language) {
      this.languageBlock = createElement("div", "parameter");
      this.languageBlock.classList.add("language");
      this.languageBlock.innerHTML =
        interfaceElements.languages[version.language];
      tr.append(this.languageBlock);
    }
    const button = createElement("div", "button");
    button.innerHTML = "⃞";
    tr.append(button);
    button.addEventListener("click", (event) => {
      new InterfacePopup(version, visualization);
    });
    place.append(tr);
  }
}
