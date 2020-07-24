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
        this.scrollAnimationTick = null;
        this.boundScrollTick = () => this.scrollTick();
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        const templateClone = InfiniteScroll.templateElem.content.cloneNode(true);

        shadowRoot.appendChild(templateClone);

        this.divContentElem = shadowRoot.querySelector('div');
        this.setDivContainerHeight();
    }
    disconnectedCallback() {
        window.removeEventListener('scroll', this.boundScrollTick);
        this.divContentElem.removeEventListener('scroll', this.boundScrollTick);

        cancelAnimationFrame(this.scrollAnimationTick);
        this.scrollAnimationTick = null;
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
    setDivContainerHeight(height = this.divContentElem?.style.height) {
        if (!this.divContentElem) {
            return;
        }
        if (height) {
            this.divContentElem.addEventListener('scroll', this.boundScrollTick);
            window.removeEventListener('scroll', this.boundScrollTick);
        } else {
            window.addEventListener('scroll', this.boundScrollTick);
            this.divContentElem.removeEventListener('scroll', this.boundScrollTick);
        }
        this.divContentElem.style.height = height;
    }
    scrollTick() {
        if (!this.scrollAnimationTick) {
            this.scrollAnimationTick = window.requestAnimationFrame(() => {
                let currentThreshold = (window.scrollY + window.innerHeight) / this.divContentElem.scrollHeight;

                if (this.divContentElem.style.height) {
                    currentThreshold = (this.divContentElem.scrollTop + this.divContentElem.clientHeight) / this.divContentElem.scrollHeight;
                } 

                // May only want to fire once, when the threshold is reached
                // As of now it would fire mutliple times
                if (currentThreshold >= this.thresholdLimit) {
                    const event = new Event('infinite-scroll-fetch');
                    window.dispatchEvent(event);
                }

                this.scrollAnimationTick = null;
            });
        }
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