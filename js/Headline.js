import { interfaceElements } from "../dictionaries/interface.js";
import { createElement } from "./helpFunctions.js";

export class Headline {
  constructor(version, visualization, block) {
    this.showOverlay = this.showOverlay.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
    this.switchParameter = this.switchParameter.bind(this);
    const place = document.querySelector(`.${block}`);
    // Headline
    const headline = createElement("h1", "headline");
    headline.innerHTML = `${version.year.yearNum}`;
    place.append(headline);
    // Top right corner
    const tr = createElement("div", "top-right");
    if (version.country) {
      this.countryBlock = createElement("div", "parameter");
      this.countryBlock.innerHTML =
        interfaceElements.countries[version.country];
      tr.append(this.countryBlock);
    }
    if (version.language) {
      this.languageBlock = createElement("div", "parameter");
      this.languageBlock.innerHTML =
        interfaceElements.languages[version.language];
      tr.append(this.languageBlock);
    }
    const button = createElement("div", "button");
    button.innerHTML = "▢";
    tr.append(button);
    button.addEventListener("click", (event) => {
      this.showOverlay(version, visualization);
    });
    place.append(tr);
  }

  showOverlay(version, visualization) {
    this.overlay = createElement("div", "overlay");
    const popup = createElement("div", "popup");
    // Options
    this.createOptionsLine(
      "country",
      visualization.object.country,
      interfaceElements.countries,
      popup,
      version,
      visualization,
    );
    this.createOptionsLine(
      "language",
      visualization.object.language,
      interfaceElements.languages,
      popup,
      version,
      visualization,
    );
    // Links
    const line = createElement("div", "options-line");
    for (let link of interfaceElements.links) {
      const block = createElement("a", "option");
      block.innerHTML = link.text;
      block.href = link.url;
      block.target = "_blank";
      line.append(block);
    }
    popup.append(line);

    this.overlay.prepend(popup);
    document.body.prepend(this.overlay);
    this.overlay.addEventListener("click", this.hideOverlay);
    popup.addEventListener("click", this.stopPropagation);
  }

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  hideOverlay() {
    this.overlay.classList.add("overlay_fade");

    this.overlay.addEventListener("transitionend", () => {
      this.overlay.remove();
    });
  }

  createOptionsLine(
    parameter,
    setParameter,
    optionsGroup,
    block,
    version,
    visualization,
  ) {
    const line = createElement("div", "options-line");
    Object.keys(optionsGroup).forEach((key) => {
      const country = optionsGroup[key];
      const block = createElement("div", "option");
      block.dataset[`${parameter}`] = key;
      if (setParameter === key) {
        block.classList.add("option_active");
      }
      block.innerHTML = country;
      const datasetKey = Object.keys(block.dataset)[0];
      block.addEventListener("click", (event) => {
        this.switchParameter(
          event,
          datasetKey,
          block.dataset[`${parameter}`],
          version,
          visualization,
        );
      });
      line.append(block);
    });
    block.append(line);
  }

  switchParameter(event, key, parameter, version, visualization) {
    const block = event.target;
    const optionsLine = block.parentElement;
    for (let element of optionsLine.children) {
      element.classList.remove("option_active");
    }
    block.classList.add("option_active");

    switch (key) {
      case "country":
        version.localize(parameter);
        this.countryBlock.innerHTML = interfaceElements.countries[parameter];
        break;
      case "language":
        version.translate(parameter);
        this.languageBlock.innerHTML = interfaceElements.languages[parameter];
        break;
    }
    visualization.render(version);
  }
}
