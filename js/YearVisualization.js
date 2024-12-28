import { months } from "../dictionaries/months.js";
import { createElement, intToRoman } from "./functions.js";

export class YearVisualization {
  constructor(object, block) {
    const today = new Date();
    this.currentMonth = today.getMonth() + 1;
    this.currentDate = today.getDate();
    this.currentYear = today.getFullYear();
    this.delta = 3;
    this.isDragging = false;
    this.handleMouseGrab = this.handleMouseGrab.bind(this);
    this.handleMouseTouchMove = this.handleMouseTouchMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchGrab = this.handleTouchGrab.bind(this);
    this.render(object, block); // Pass the block only while creating the object
    // Behaviour on scrolling
    document.addEventListener("wheel", this.handleWheelEvent, {
      passive: false,
    });
    // Grabbing the slides
    document.addEventListener("mousedown", this.handleMouseGrab);
    document.addEventListener("touchstart", this.handleTouchGrab);

    // Days on hover
    this.slides.addEventListener("mouseover", this.handleDayHover);
    this.slides.addEventListener("mouseout", this.handleDayMouseOut);
  }

  render(object, block) {
    this.object = object;
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
      let step = 1;
      if (window.innerWidth < 600) {
        step = 2;
      }
      for (let columnNum = 2; columnNum <= 32; columnNum += step) {
        this.renderColumnHR(columnNum, slide);
      }
      //Creating months names
      for (let rowNum = 0; rowNum < 12; rowNum++) {
        this.renderRowHR(rowNum, slide);
      }
      //Creating table body
      for (let day of this.object.year.days) {
        this.renderTheDay(day, slide);
      }
      this.slides.append(slide);
    }
    this.section.append(this.slides);
    this.content.append(this.section);
    //Center the visualization
    this.centerVisualization(this.object.year.yearNum, block);

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

  handleTouchGrab(event) {
    const slides = document.querySelector(".slides");
    this.isDragging = true;

    const clientX = event.touches[0].clientX;

    this.offsetX = clientX + Math.abs(slides.getBoundingClientRect().left);

    document.addEventListener("touchmove", this.handleTouchMove);
    document.addEventListener("touchend", this.handleTouchEnd);
  }

  handleMouseGrab(event) {
    const slides = document.querySelector(".slides");
    this.isDragging = true;

    this.offsetX =
      event.clientX + Math.abs(slides.getBoundingClientRect().left);

    document.addEventListener("mousemove", this.handleMouseTouchMove);
    document.addEventListener("mouseup", this.handleTouchEnd);

    document.body.style.cursor = "grabbing";
  }

  handleTouchMove(event) {
    const window = document.documentElement.clientWidth;
    const slides = document.querySelector(".slides");

    if (this.isDragging) {
      let clientX = event.touches[0].clientX;
      let left = clientX - this.offsetX;
      let leftBorder = -2 * window;
      if (
        slides.getBoundingClientRect().left < leftBorder ||
        slides.getBoundingClientRect().left > 0
      ) {
        slides.style.left = window + "px";
        this.offsetX =
          event.touches[0].clientX +
          Math.abs(slides.getBoundingClientRect().left);
      }
      slides.style.left = left + "px";
    }
  }

  handleMouseTouchMove(event) {
    const window = document.documentElement.clientWidth;
    const slides = document.querySelector(".slides");

    if (this.isDragging) {
      let clientX = event.clientX || event.touches[0].clientX;
      let left = clientX - this.offsetX;
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
    const currentDay = document.querySelector(".current-date");
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

  handleDayHover(event) {
    const target = event.target.closest(".cell");
    const firstChild = target ? target.children[0] : null;
    if (firstChild) {
      firstChild.classList.add("day_hover");

      const date = firstChild.parentElement.dataset.date;
      const month = firstChild.parentElement.dataset.month;
      const weekday = firstChild.parentElement.dataset.weekday;

      let message;
      if (typeof weekday !== "undefined") {
        message = `${weekday}<br>${date}.${month}`;
      } else {
        message = `${date}.${month}`;
      }
      const text = document.createElement("div");
      text.classList.add("cell-text");
      text.innerHTML = message;
      firstChild.append(text);
    }
  }

  handleDayMouseOut(event) {
    const text = document.querySelector(".cell-text");
    const parent = text && text.parentElement ? text.parentElement : null;
    if (parent) {
      parent.removeChild(text);
    }
    const target = event.target.closest(".cell");
    const firstChild = target ? target.children[0] : null;
    if (firstChild) {
      firstChild.classList.remove("day_hover");
    }
  }

  renderTheDay(day, where) {
    const cell = createElement("div", "cell");
    cell.style.gridRow = day.month + 2;
    cell.style.gridColumn = day.date + 1;
    cell.style.top = `${this.delta * day.date}%`;

    let dayMark;
    if (day.working) {
      dayMark = createElement("div", "day");
    } else {
      dayMark = createElement("div", "special-day");
    }

    cell.dataset.month = day.month;
    cell.dataset.date = day.date;
    if (day.weekdayNameShort) {
      cell.dataset.weekday = day.weekdayNameShort;
    }
    if (
      day.month === this.currentMonth &&
      day.date === this.currentDate &&
      day.year === this.currentYear
    ) {
      dayMark.classList.add("current-date");
    }

    cell.append(dayMark);
    where.append(cell);
  }

  renderColumnHR(columnNum, where) {
    const hr = createElement("div", "hr");
    hr.style.gridRow = "1";
    hr.style.gridColumn = `${columnNum}`;
    hr.textContent = `${columnNum - 1}`;
    hr.style.top = `${this.delta * columnNum}%`;
    where.append(hr);
  }

  renderRowHR(rowNum, where) {
    const monthName = createElement("div", "hr");
    monthName.style.gridColumn = "1";
    monthName.style.gridRow = `${rowNum + 3}`;
    if (this.object.language) {
      monthName.textContent = months[rowNum][this.object.language]
        .charAt(0)
        .toUpperCase();
    } else {
      monthName.textContent = intToRoman(rowNum + 1);
    }
    where.append(monthName);
  }
}
