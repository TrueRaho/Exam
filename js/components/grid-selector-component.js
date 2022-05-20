import { LayoutType } from "../utils.js";
import { AbstractComponent } from "./abstract-component.js";

export class GridSelectorComponent extends AbstractComponent {
	constructor(service) {
		super();
		this.service = service;
	}

	_getTemplate() {
		return `<div class="page grid-select">
							<h2 class="grid-select__header">Выберите сетку сайта</h2>
							<ul class="carousel" aria-live="polite">
								<h2 id="item-title" class="visually-hidden"></h2>
								<li data-title="landing">
									<input
										class="grid-select__radio visually-hidden"
										id="grid-landing"
										name="grid"
										type="radio"
										value="${LayoutType.LANDING}"
									/>
									<label class="grid-select__btn" for="grid-landing">
										<span class="grid-select__text">Лендинг</span>
										<svg
											class="grid-select__img"
											fill="none"
											height="132"
											viewBox="0 0 240 132"
											width="240"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect
												height="15.4"
												stroke-dasharray="5 5"
												stroke-width="0.6"
												width="239.4"
												x="0.3"
												y="0.3"
											/>
											<rect
												height="15.4"
												stroke-dasharray="5 5"
												stroke-width="0.6"
												width="239.4"
												x="0.3"
												y="116.3"
											/>
											<rect
												height="79.4"
												stroke-dasharray="5 5"
												stroke-width="0.6"
												width="239.4"
												x="0.3"
												y="26.3"
											/>
										</svg>
									</label>
									<button class="next">Next</button>
								</li>
								<li data-title="blog">
									<input
										class="grid-select__radio visually-hidden"
										id="grid-blog"
										name="grid"
										type="radio"
										value="${LayoutType.BLOG}"
									/>
									<label class="grid-select__btn" for="grid-blog">
										<span class="grid-select__text">Блог</span>
										<svg
											class="grid-select__img"
											fill="none"
											height="132"
											viewBox="0 0 240 132"
											width="240"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect
												height="15.4"
												stroke-dasharray="5 5"
												stroke-width="0.6"
												width="239.4"
												x="0.3"
												y="0.3"
											/>
											<rect
												height="15.4"
												stroke-dasharray="5 5"
												stroke-width="0.6"
												width="239.4"
												x="0.3"
												y="116.3"
											/>
											<rect
												height="79.4"
												stroke-dasharray="5 5"
												stroke-width="0.6"
												width="89.4"
												x="0.3"
												y="26.394"
											/>
											<rect
												height="79.4"
												stroke-dasharray="5 5"
												stroke-width="0.6"
												width="139.4"
												x="100.3"
												y="26.3"
											/>
										</svg>
									</label>
									<button class="next">Next</button>
								</li>
								<li data-title="shop">
									<input
										class="grid-select__radio visually-hidden"
										id="grid-shop"
										name="grid"
										type="radio"
										value="${LayoutType.SHOP}"
									/>
									<label class="grid-select__btn" for="grid-shop">
										<span class="grid-select__text">Магазин</span>
										<svg
											class="grid-select__img"
											fill="none"
											height="132"
											viewBox="0 0 240 132"
											width="240"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect
												height="15.4"
												stroke-dasharray="5 5"
												stroke-width="0.6"
												width="239.4"
												x="0.3"
												y="0.3"
											/>
											<rect
												height="15.4"
												stroke-dasharray="5 5"
												stroke-width="0.6"
												width="239.4"
												x="0.3"
												y="116.3"
											/>
											<rect
												height="79.4"
												stroke-dasharray="5 5"
												stroke-width="0.6"
												width="73.4"
												x="0.3"
												y="26.3"
											/>
											<rect
												height="79.4"
												stroke-dasharray="5 5"
												stroke-width="0.6"
												width="73.4"
												x="83.3"
												y="26.3"
											/>
											<rect
												height="79.4"
												stroke-dasharray="5 5"
												stroke-width="0.6"
												width="73.4"
												x="166.3"
												y="26.3"
											/>
										</svg>
									</label>
									<button class="next">Restart</button>
								</li>
							</ul>

							<ul class="pagination" aria-label="Carousel pagination menu">
								<li>
									<button data-index="0">
										<span class="visually-hidden">Landing</span>
									</button>
								</li>
								<li>
									<button data-index="1">
										<span class="visually-hidden">Blog</span>
									</button>
								</li>
								<li>
									<button data-index="2">
										<span class="visually-hidden">Shop</span>
									</button>
								</li>
							</ul>
						</div>`;
	}

	_afterCreateElement() {
		this.getElement().addEventListener(
			`change`,
			this._gridTypeChangedHandler.bind(this)
		);
		this.getElement()
			.querySelector(`#grid-${this.service.getLayoutType()}`)
			.toggleAttribute(`checked`, true);
	}

	_gridTypeChangedHandler(evt) {
		this.service.setLayoutType(evt.target.value);
	}
}

const carouselItems = document.querySelectorAll(".carousel li");
const paginationItems = document.querySelectorAll(".pagination li");
const nextButtons = document.querySelectorAll(".next");
const title = document.querySelector("#item-title");

let activeItem = 0;

const updateItems = (announce = true) => {
	carouselItems.forEach((item, i) => {
		const isActive = activeItem % carouselItems.length === i;
		item.classList[isActive ? "add" : "remove"]("active");
		item.setAttribute("aria-hidden", isActive ? false : true);

		if (isActive) {
			if (announce)
				title.innerText = `Carousel updated to ${item.dataset.title} content`;
			item.focus();
		}
	});
	paginationItems.forEach((item, i) =>
		item.classList[
			activeItem % paginationItems.length === i ? "add" : "remove"
		]("active")
	);
	nextButtons.forEach((item, i) =>
		item.setAttribute(
			"tabindex",
			activeItem % paginationItems.length === i ? null : -1
		)
	);
};

paginationItems.forEach((item, i) => {
	item.addEventListener("click", () => {
		activeItem = i;
		updateItems();
	});
});

nextButtons.forEach((item, i) => {
	item.addEventListener("click", () => {
		activeItem++;
		updateItems();
	});
});

updateItems(false);
