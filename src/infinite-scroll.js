export default class InfiniteScroll extends HTMLElement {
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

        const containerDiv = shadowRoot.querySelector('div');
        window.addEventListener('scroll', () => {
            let ticking = false;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    console.log(containerDiv.clientHeight);
                    console.log(containerDiv.scrollHeight);

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