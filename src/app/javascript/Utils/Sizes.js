import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    /**
     * Constructor
     */
    constructor()
    {
        super()

        if (typeof window !== 'undefined') {

            // Viewport size
            this.viewport = {}
            this.$sizeViewport = document.createElement('div')
            this.$sizeViewport.style.width = '100vw'
            this.$sizeViewport.style.height = '100vh'
            this.$sizeViewport.style.position = 'absolute'
            this.$sizeViewport.style.top = 0
            this.$sizeViewport.style.left = 0
            this.$sizeViewport.style.pointerEvents = 'none'

            // Resize event
            this.resize = this.resize.bind(this)
            if (typeof window !== 'undefined') {
                window.addEventListener('resize', this.resize)
            }

            this.resize()
        }
    }

    /**
   * Resize
   */

    resize() {
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    // Append the hidden viewport size div
    document.body.appendChild(this.$sizeViewport);
    
    // Get the width and height of the actual viewport
    this.viewport.width = this.$sizeViewport.offsetWidth;
    this.viewport.height = Math.min(
      window.innerHeight,
      this.$sizeViewport.offsetHeight
    ); // Ensures proper height even on mobile UI change

    // Remove the hidden div
    document.body.removeChild(this.$sizeViewport);

    // Dynamically set the size of the canvas based on viewport
    this.width = window.innerWidth;
    this.height = Math.min(window.innerHeight, this.$sizeViewport.offsetHeight);

    // Trigger the resize event
    this.trigger('resize');
  }
}

//   resize() {
//     if (typeof document !== 'undefined' && typeof window !== 'undefined') {
//       document.body.appendChild(this.$sizeViewport);
//       this.viewport.width = this.$sizeViewport.offsetWidth;
//       this.viewport.height = this.$sizeViewport.offsetHeight;
//       document.body.removeChild(this.$sizeViewport);

//       this.width = window.innerWidth;
//       this.height = window.innerHeight;

//       this.trigger('resize');
//     }
// }
}
