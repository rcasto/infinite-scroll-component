import InfinteScroll from '../src/infinite-scroll';

describe('infinite-scroll Tests', () => {

    it('can initialize', () => {
        const infiniteScroll = new InfinteScroll();

        expect(infiniteScroll.divContentElem).toBeNull();
        expect(infiniteScroll.thresholdLimit).toEqual(0.85);
        expect(typeof infiniteScroll.boundScrollTick).toEqual('function');
    });

    it('can initialize - init static template only once', () => {
        const createElementSpy = jest.spyOn(document, 'createElement');

        InfinteScroll.templateElem = null;

        new InfinteScroll();
        new InfinteScroll();

        expect(createElementSpy).toHaveBeenCalledTimes(1);
        expect(InfinteScroll.templateElem.innerHTML).toEqual(InfinteScroll.template);
    });

    it('connectedCallback - sets up shadow DOM', () => {
        const infiniteScroll = new InfinteScroll();

        expect(infiniteScroll.shadowRoot).toBeNull();

        infiniteScroll.connectedCallback();

        expect(infiniteScroll.shadowRoot).toBeDefined();
        expect(infiniteScroll.divContentElem).toBeDefined();
    });

    it('connectedCallback - call internal setDivContainerHeight', () => {
        const infiniteScroll = new InfinteScroll();
        const setDivContainerHeightSpy = jest.spyOn(infiniteScroll, 'setDivContainerHeight');

        infiniteScroll.connectedCallback();

        expect(setDivContainerHeightSpy).toHaveBeenCalledTimes(1);
    });
});