export default class InfiniteScroll extends HTMLElement {
    static template = `
        <style>
            div {
                overflow-y: auto;
            }
        </style>
        <div>
            <slot></slot>
        </div>
    `;
    /**
     * @type {HTMLTemplateElement}
     */
    static templateElem = null;

    static get observedAttributes() {
        return [
          'data-height',
          'data-threshold'
        ];
      }

    constructor() {
        super();

        if (!InfiniteScroll.templateElem) {
            InfiniteScroll.templateElem = document.createElement('template');
            InfiniteScroll.templateElem.innerHTML = InfiniteScroll.template;
        }

        this.divContentElem = null;
        this.thresholdLimit = 0.85;
        this.divContainerHeight = null;
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        const templateClone = InfiniteScroll.templateElem.content.cloneNode(true);

        shadowRoot.appendChild(templateClone);

        this.divContentElem = shadowRoot.querySelector('div');
        this.setDivContainerHeight();

        window.addEventListener('scroll', () => {
            let ticking = false;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentThreshold = (window.scrollY + window.innerHeight) / this.divContentElem.scrollHeight;

                    // May only want to fire once, when the threshold is reached
                    // As of now it would fire mutliple times
                    if (currentThreshold >= this.thresholdLimit) {
                        const event = new Event('infinite-scroll-fetch');
                        window.dispatchEvent(event);
                    }

                    ticking = false;
                });

                ticking = true;
            }
        });
    }
    attributeChangedCallback(name, _, newValue) {
        if (name === 'data-height') {
            this.setDivContainerHeight(newValue);
        } else if (name === 'data-threshold') {
            const thresholdLimit = parseFloat(newValue) || this.thresholdLimit;
            if (thresholdLimit >= 0 && thresholdLimit <= 1) {
                this.thresholdLimit = thresholdLimit;
            }
        }
    }
    setDivContainerHeight(height = this.divContainerHeight) {
        this.divContainerHeight = height;
        if (!this.divContentElem) {
            return;
        }
        this.divContentElem.style.height = height;
    }
}

/*
  Register or associate the web component
  with a <infinite-scroll></infinite-scroll> element
*/
(function () {
    const customElementName = 'infinite-scroll';
    if (customElements.get(customElementName)) {
        console.error(`There is already a custom element registered under the name ${customElementName}`);
    } else {
        customElements.define(customElementName, InfiniteScroll);
    }
}());