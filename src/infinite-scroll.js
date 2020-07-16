const templateContent = `
  <style>
  </style>
  <div class="social-contact-container"></div>
`;

const template = document.createElement('template');
template.innerHTML = templateContent;

export default class InfiniteScroll extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        const socialContactTemplateClone = template.content.cloneNode(true);
        const socialContactContainer = socialContactTemplateClone.querySelector('.social-contact-container');

        shadowRoot.appendChild(socialContactTemplateClone);
    }
}

/*
  Register or associate the web component
  with a <social-contact></social-contact> element
*/
try {
    customElements.define('social-contact', SocialContact);
} catch (err) {
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#Exceptions
    console.error(err);
}