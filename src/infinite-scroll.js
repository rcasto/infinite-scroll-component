export default class InfiniteScroll extends HTMLElement {
    static thresholdLimit = .85;
    static template = `
        <div>
            <slot>No content to scroll</slot>
        </div>
    `;
    /**
     * @type {HTMLTemplateElement}
     */
    static templateElem = null;

    constructor() {
        super();

        if (!InfiniteScroll.templateElem) {
            InfiniteScroll.templateElem = document.createElement('template');
            InfiniteScroll.templateElem.innerHTML = InfiniteScroll.template;
        }
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        const templateClone = InfiniteScroll.templateElem.content.cloneNode(true);

        shadowRoot.appendChild(templateClone);

        window.addEventListener('scroll', () => {
            let ticking = false;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentThreshold = (document.body.scrollTop + document.body.clientHeight) / document.body.scrollHeight;

                    // May only want to fire once, when the threshold is reached
                    // As of now it would fire mutliple times
                    if (currentThreshold >= InfiniteScroll.thresholdLimit) {
                        const event = new Event('infinite-scroll-fetch');
                        document.body.dispatchEvent(event);
                    }

                    ticking = false;
                });

                ticking = true;
            }
        });
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