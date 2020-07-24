import InfinteScroll from '../src/infinite-scroll';

describe('infinite-scroll Tests', () => {

    it('can initialize', () => {
        const infiniteScroll = new InfinteScroll();

        expect(infiniteScroll.divContentElem).toBeNull();
        expect(infiniteScroll.thresholdLimit).toEqual(0.85);
        expect(typeof infiniteScroll.boundScrollTick).toEqual('function');
    });

    it('can initialize - init static template only once', () => {
        const mockCreateElementSpy = jest.spyOn(document, 'createElement');

        InfinteScroll.templateElem = null;

        new InfinteScroll();
        new InfinteScroll();

        expect(mockCreateElementSpy).toHaveBeenCalledTimes(1);
        expect(InfinteScroll.templateElem.innerHTML).toEqual(InfinteScroll.template);
    });
});