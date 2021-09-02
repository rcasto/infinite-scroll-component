# inifinite-scroll-component
A little web component for infinite scrolling.

[Example codepen - Unsplash images](https://codepen.io/rcasto/full/eYJxepG)  
[Another example - Infinite memes](https://rcasto.github.io/infinite-scroll-component/)
## Getting Started

### npm
```
npm install infinite-scroll-component
```

### script tag
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/infinite-scroll-component/dist/infinite-scroll.min.js"></script>
```

## Usage
```html
<infinite-scroll>
    <!-- Your content to infinite scroll goes here -->
</infinite-scroll>
```

### Additional Info
- `data-height` - This attribute can be passed to customize the height of the infinite scroll container. The height provided can be any valid [CSS height](https://developer.mozilla.org/en-US/docs/Web/CSS/height).
- `data-threshold` - A number in the range 0 < x <= 1. The x or threshold chosen represents the amount of content that must be scrolled before initiating a fetch for more content. Say your threshold was 0.8. This would essentially represent that 80% of the content must be scrolled before a new fetch for more content is made.

The above attributes can be used as shown below:
```html
<infinite-scroll data-height="300" data-threshold="0.8"></infinite-scroll>
```

If a `data-height` is not provided then the scroll container will naturally grow as large as possible to hold the contained content.

If a `data-threshold` is not provided, then the default will be 0.85 or 85% of content must be scrolled before a fetch event is fired.

Speaking of fetch events. When a fetch event is initiated a custom DOM event will be emitted with the name `infinite-scroll-fetch`.

In your code you can then handle this event by registering an event listener like shown below:
```javascript
function handleInfiniteScrollFetchRequest() {
    // fetch more content
    // add to infinite scroll container
}

const infiniteScrollElem = document.querySelector('infinite-scroll');
infiniteScrollElem.addEventListener('infinite-scroll-fetch', handleInfiniteScrollFetchRequest);
```
