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

    it('disconnectedCallback - can cleanup', () => {
        const windowRemoveEventListenerSpy = jest.spyOn(window, 'removeEventListener');

        const infiniteScroll = new InfinteScroll();

        infiniteScroll.connectedCallback();
        const divContentElemRemoveEventListenerSpy = jest.spyOn(infiniteScroll.divContentElem, 'removeEventListener');

        infiniteScroll.disconnectedCallback();

        expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith('scroll', infiniteScroll.boundScrollTick);
        expect(divContentElemRemoveEventListenerSpy).toHaveBeenCalledWith('scroll', infiniteScroll.boundScrollTick);
    });

    it('setDivContainerHeight - can handle no divContentElem set', () => {
        const windowAddEventListenerSpy = jest.spyOn(window, 'addEventListener');
        const windowRemoveEventListenerSpy = jest.spyOn(window, 'removeEventListener');
        const infiniteScroll = new InfinteScroll();

        infiniteScroll.setDivContainerHeight();

        expect(infiniteScroll.divContainerHeight).toBeNull();
        expect(windowAddEventListenerSpy).not.toHaveBeenCalled();
        expect(windowRemoveEventListenerSpy).not.toHaveBeenCalled();
    });
    it('setDivContainerHeight - can handle no explicit height, divContentElem set', () => {
        const windowAddEventListenerSpy = jest.spyOn(window, 'addEventListener');

        const infiniteScroll = new InfinteScroll();

        infiniteScroll.connectedCallback();
        const divContentElemRemoveEventListenerSpy = jest.spyOn(infiniteScroll.divContentElem, 'removeEventListener');

        infiniteScroll.setDivContainerHeight(null);

        expect(infiniteScroll.divContainerHeight).toBeNull();
        expect(windowAddEventListenerSpy).toHaveBeenCalledWith('scroll', infiniteScroll.boundScrollTick);
        expect(divContentElemRemoveEventListenerSpy).toHaveBeenCalledWith('scroll', infiniteScroll.boundScrollTick);
        expect(infiniteScroll.divContentElem.style.height).toEqual('');
    });
    it('setDivContainerHeight - can handle explicitly set height, divContentElem set', () => {
        const windowRemoveEventListenerSpy = jest.spyOn(window, 'removeEventListener');

        const infiniteScroll = new InfinteScroll();

        infiniteScroll.connectedCallback();
        const divContentElemAddEventListenerSpy = jest.spyOn(infiniteScroll.divContentElem, 'addEventListener');

        infiniteScroll.setDivContainerHeight('200px');

        expect(infiniteScroll.divContainerHeight).toEqual('200px');
        expect(divContentElemAddEventListenerSpy).toHaveBeenCalledWith('scroll', infiniteScroll.boundScrollTick);
        expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith('scroll', infiniteScroll.boundScrollTick);
        expect(infiniteScroll.divContentElem.style.height).toEqual('200px');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});