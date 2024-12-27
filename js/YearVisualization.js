import { months } from "../data/months.js";
import { createElement, intToRoman } from "./functions.js";

export class YearVisualization {
  constructor(object, block) {
    this.handleGrab = this.handleGrab.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.render(object, block); // Pass the block only while creating the object

    // Days on hover
    this.slides.addEventListener("mouseover", (e) => {
      const target = e.target.closest(".cell");
      const firstChild = target ? target.children[0] : null;
      if (firstChild) {
        firstChild.classList.add("day_hover");

        const date = firstChild.parentElement.dataset.date;
        const month = firstChild.parentElement.dataset.month;
        const weekday = firstChild.parentElement.dataset.weekday;
        const message = `${weekday}<br>${date}.${month}`;
        const text = document.createElement("div");
        text.classList.add("cell-text");
        text.innerHTML = message;
        firstChild.append(text);
      }
    });

    this.slides.addEventListener("mouseout", (e) => {
      const text = document.querySelector(".cell-text");
      const parent = text && text.parentElement ? text.parentElement : null;
      if (parent) {
        parent.removeChild(text);
      }
      const target = e.target.closest(".cell");
      const firstChild = target ? target.children[0] : null;
      if (firstChild) {
        firstChild.classList.remove("day_hover");
      }
    });
  }

  render(object, block) {
    this.object = object;
    this.isDragging = false;
    const delta = 3;
    if (block) {
      this.block = block;
      this.content = document.querySelector(`.${this.block}`);
      this.section = createElement("section", "slider");
      this.slides = createElement("div", "slides");
    }
    const oldVisualization = document.querySelectorAll(".slide");
    for (let slide of oldVisualization) {
      if (slide) {
        slide.remove();
      }
    }
    for (let i = 0; i < 3; i++) {
      const slide = createElement("div", "slide");
      //Creating table header
      for (let columnNum = 2; columnNum <= 32; columnNum++) {
        const hr = createElement("div", "name");
        hr.style.gridRow = "1";
        hr.style.gridColumn = `${columnNum}`;
        hr.textContent = `${columnNum - 1}`;
        hr.style.top = `${delta * columnNum}%`;
        slide.append(hr);
      }
      //Creating months names
      for (let rowNum = 0; rowNum < 12; rowNum++) {
        const monthName = createElement("div", "name");
        monthName.style.gridColumn = "1";
        monthName.style.gridRow = `${rowNum + 3}`;
        if (this.object.language) {
          monthName.textContent = months[rowNum][this.object.language]
            .charAt(0)
            .toUpperCase();
        } else {
          monthName.textContent = intToRoman(rowNum + 1);
        }
        slide.append(monthName);
      }
      //Creating table body
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentDate = today.getDate();
      const currentYear = today.getFullYear();
      for (let day of this.object.year.days) {
        const cell = createElement("div", "cell");
        cell.style.gridRow = day.month + 2;
        cell.style.gridColumn = day.date + 1;
        cell.style.top = `${delta * day.date}%`;

        let dayMark;
        if (day.working) {
          dayMark = createElement("div", "day");
        } else {
          dayMark = createElement("div", "special-day");
        }

        cell.dataset.month = day.month;
        cell.dataset.date = day.date;
        cell.dataset.weekday = day.weekdayNameShort;

        if (
          day.month === currentMonth &&
          day.date === currentDate &&
          day.year === currentYear
        ) {
          dayMark.classList.add("date-current");
        }

        cell.append(dayMark);
        slide.append(cell);
      }
      this.slides.append(slide);
    }
    this.section.append(this.slides);
    this.content.append(this.section);
    //Center the visualization
    this.centerVisualization(this.object.year.yearNum, block);
    // On scrolling
    document.addEventListener("wheel", this.handleWheelEvent, {
      passive: false,
    });
    // Grabbing the slides
    document.addEventListener("mousedown", this.handleGrab);
    document.addEventListener("touchstart", this.handleGrab);

    return this;
  }

  handleWheelEvent(event) {
    const slides = document.querySelector(".slides");
    const window = document.documentElement.clientWidth;
    const deltaY = event.deltaY;
    const deltaX = event.deltaX;
    let left = slides.getBoundingClientRect().left;

    let leftBorder = -2 * window;
    if (
      slides.getBoundingClientRect().left < leftBorder ||
      slides.getBoundingClientRect().left > 0
    ) {
      slides.style.left = -window + "px";
      left = slides.getBoundingClientRect().left;
    }

    if (deltaY > 0) {
      slides.style.left = left + deltaY + "px";
    } else if (deltaY < 0) {
      slides.style.left = left + deltaY + "px";
    }

    if (deltaX < 0) {
      slides.style.left = left - deltaX + "px";
    } else if (deltaX > 0) {
      slides.style.left = left - deltaX + "px";
    }

    event.preventDefault();
  }

  handleGrab(event) {
    const slides = document.querySelector(".slides");
    this.isDragging = true;
    this.offsetX =
      event.clientX + Math.abs(slides.getBoundingClientRect().left);

    document.addEventListener("mousemove", this.handleTouchMove);
    document.addEventListener("touchmove", this.handleTouchMove);
    document.addEventListener("mouseup", this.handleTouchEnd);
    document.addEventListener("touchend", this.handleTouchEnd);

    document.body.style.cursor = "grabbing";
  }

  handleTouchMove(event) {
    const window = document.documentElement.clientWidth;
    const slides = document.querySelector(".slides");

    if (this.isDragging) {
      let left = event.clientX - this.offsetX;
      let leftBorder = -2 * window;
      if (
        slides.getBoundingClientRect().left < leftBorder ||
        slides.getBoundingClientRect().left > 0
      ) {
        slides.style.left = window + "px";
        this.offsetX =
          event.clientX + Math.abs(slides.getBoundingClientRect().left);
      }
      slides.style.left = left + "px";
    }
  }

  handleTouchEnd() {
    this.isDragging = false;
    document.body.style.cursor = "grab";
  }

  centerVisualization(year, block) {
    const chosenYear = year;
    const currentDay = document.querySelector(".date-current");
    const screenWidth = document.documentElement.clientWidth;
    const slidesX = this.slides.getBoundingClientRect().left;
    const dayWidth = document
      .querySelector(".day")
      .parentElement.getBoundingClientRect().width;
    const centerX = screenWidth / 2;
    if (block) {
      if (currentDay) {
        const dayX = -currentDay.parentElement.getBoundingClientRect().left;
        const delta = centerX - dayX;
        this.slides.style.left = -delta - dayWidth / 2 + "px";
      } else {
        this.slides.style.left =
          chosenYear % 4 === 0
            ? slidesX + dayWidth * 3 + "px"
            : slidesX + dayWidth * 4 + "px";
      }
    }
  }
}
