# CSS Paint API: Blob Animation
From my article: https://css-tricks.com/exploring-the-css-paint-api-blob-animation/

![CSS Blob Animation](https://css-tricks.com/wp-content/uploads/2021/08/blob-featured-image.png)

Create a blob shapes or animation using a few lines of CSS thanks to the CSS Paint API. All you have to do is to apply a mask and adjust some CSS variables.

#### [Live Demo](https://afif13.github.io/CSS-blob-animation/)

### How to use

First, you include the Paint Worklet:

```html
<script>
if(CSS.paintWorklet) {              
  CSS.paintWorklet.addModule('src/blob.js');
} else {
  console.log("Your browser doesn't support the Paint API :(");
}
</script>
```

The generic CSS will look like below:

```css
@property --b { /* we register this Custom property to be able to animate it */
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

img {
  /* we apply the mask */
  -webkit-mask:paint(blob);
          mask:paint(blob);
  --n: ..;  /* control the granularity of the blob effect (the number of points) */
  --t: ..;  /* control the type of the movement (0 = uniform, 1 = random) */
  --na: ..; /* control the nature of the movement */
  --v: ..;  /* to be used in the animation */
  --b: 0;   /* we animate this variable from 0 .. */
  transition: --b .5s;
}
img:hover {
  --b: var(--v); /* .. to V to create the blob effect */
}
```

----

Find all the details in my [CSS-tricks article](https://css-tricks.com/exploring-the-css-paint-api-blob-animation/)
