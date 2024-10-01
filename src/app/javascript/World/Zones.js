import * as THREE from 'three';
import Zone from './Zone.js';

export default class Zones {
    constructor(_options) {
        // Options
        this.time = _options.time;
        this.sizes = _options.sizes;
        this.physics = _options.physics;
        this.debug = _options.debug;

        // Set up
        this.container = new THREE.Object3D();
        this.container.visible = false;
        this.container.matrixAutoUpdate = false;

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder('zones');
            this.debugFolder.open();

            this.debugFolder.add(this.container, 'visible').name('visible');
        }

        // this.setTester();
        this.setItems();
    }

    setTester() {
        this.tester = {};
        this.tester.x = 0;
        this.tester.y = 0;

        this.time.on('tick', () => {
            const carPosition = this.getCarPosition();
            if (carPosition) {
                this.tester.x = carPosition.x;
                this.tester.y = carPosition.y;
            }
        });
    }

    setItems() {
        this.items = [];

        this.time.on('tick', () => {
            for (const _zone of this.items) {
                const carPosition = this.getCarPosition();
                if (!carPosition) continue; // Skip if carPosition is undefined

                const isIn = carPosition.x < _zone.position.x + _zone.halfExtents.x && carPosition.x > _zone.position.x - _zone.halfExtents.x &&
                             carPosition.y < _zone.position.y + _zone.halfExtents.y && carPosition.y > _zone.position.y - _zone.halfExtents.y;

                if (isIn && !_zone.isIn) {
                    _zone.trigger('in', [_zone.data]);
                } else if (!isIn && _zone.isIn) {
                    _zone.trigger('out', [_zone.data]);
                }

                _zone.isIn = isIn;
            }
        });
    }

    getCarPosition() {
        // Ensure physics and playerId are properly initialized and available
        if (this.physics && this.physics.cars && this.physics.cars[this.playerId]) {
            const car = this.physics.cars[this.playerId];
            if (car && car.chassis && car.chassis.body && car.chassis.body.position) {
                return car.chassis.body.position;
            }
        }
        return null; // Return null if car position is not available
    }

    add(_settings) {
        // Set up
        const zone = new Zone(_settings);
        this.container.add(zone.mesh);

        // Save
        this.items.push(zone);

        return zone;
    }
}
