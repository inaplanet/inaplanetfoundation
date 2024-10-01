import EventEmitter from './EventEmitter.js';

export default class Sizes extends EventEmitter {
    /**
     * Constructor
     */
    constructor() {
        super();

        // Viewport size
        this.viewport = {};
        this.$sizeViewport = document.createElement('div');
        this.$sizeViewport.style.width = '100vw';
        this.$sizeViewport.style.height = '100vh';
        this.$sizeViewport.style.position = 'absolute';
        this.$sizeViewport.style.top = 0;
        this.$sizeViewport.style.left = 0;
        this.$sizeViewport.style.pointerEvents = 'none';

        // Resize event
        this.resize = this.resize.bind(this);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.resize);
        }

        // Check and handle orientation on mobile devices
        this.handleMobileOrientation = this.handleMobileOrientation.bind(this);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.handleMobileOrientation);
            window.addEventListener('orientationchange', this.handleMobileOrientation);
        }

        this.resize();
        this.handleMobileOrientation(); // Call once initially
    }

    /**
     * Resize
     */
    resize() {
        document.body.appendChild(this.$sizeViewport);
        this.viewport.width = this.$sizeViewport.offsetWidth;
        this.viewport.height = this.$sizeViewport.offsetHeight;
        document.body.removeChild(this.$sizeViewport);

        if (typeof window !== 'undefined') {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }

        this.trigger('resize');
    }

    /**
     * Handle mobile orientation
     */
    handleMobileOrientation() {
        if (typeof window !== 'undefined') {

            // Check if the device is mobile
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            // Check if the device is in portrait mode
            const isPortrait = window.innerHeight > window.innerWidth;

            if (isMobile && isPortrait) {
                // Display a message asking the user to rotate the device
                this.showRotateMessage();
            } else {
                // Hide the rotate message if it was displayed
                this.hideRotateMessage();
            }
        }
    }

    /**
     * Show rotate message
     */
    showRotateMessage() {
        if (!this.rotateMessage) {
            this.rotateMessage = document.createElement('div');
            this.rotateMessage.innerHTML = 'Please rotate your device to landscape mode.';
            this.rotateMessage.style.position = 'fixed';
            this.rotateMessage.style.top = '50%';
            this.rotateMessage.style.left = '50%';
            this.rotateMessage.style.transform = 'translate(-50%, -50%)';
            this.rotateMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            this.rotateMessage.style.color = '#fff';
            this.rotateMessage.style.padding = '20px';
            this.rotateMessage.style.fontSize = '18px';
            this.rotateMessage.style.textAlign = 'center';
            this.rotateMessage.style.zIndex = '10000';
            this.rotateMessage.style.display = 'block';
            document.body.appendChild(this.rotateMessage);
        }
    }

    /**
     * Hide rotate message
     */
    hideRotateMessage() {
        if (this.rotateMessage) {
            this.rotateMessage.style.display = 'none';
        }
    }
}
