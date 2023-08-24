import { IMarker } from "./IMarker";

export class Marker implements IMarker {
    private marker: Phaser.GameObjects.Graphics;

    private isSelect: boolean

    constructor(graphics: Phaser.GameObjects.Graphics) {
        this.marker = graphics
        this.marker.lineStyle(1, 0x000000, 1);
        this.marker.strokeRect(0, 0, 16, 16)

        this.isSelect = false
    }
    
    setTilePosition(vector2: { x: number, y: number }) {
        if(this.isSelect) {
            return
        } 
        
        this.marker.x = vector2.x
        this.marker.y = vector2.y
    }

    
    selectTile() {
        this.isSelect = true

        this.marker.lineStyle(1, 0xcc2233, 1);
        this.marker.strokeRect(0, 0, 16, 16)
    }

    resetSelection() {
        this.isSelect = false
        this.marker.lineStyle(1, 0x000000, 1);
        this.marker.strokeRect(0, 0, 16, 16);
    }
}