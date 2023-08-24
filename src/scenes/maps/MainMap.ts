import { Vector2 } from "../../shared/types"

export interface IExecuteOptions {
    tilesetName: string
    tileSize: number
}

export class MainMap {
    private scene: Phaser.Scene
    private tilemap: Phaser.Tilemaps.Tilemap

    constructor(scene: Phaser.Scene) {
        this.scene = scene

        const level = [
            [ 31, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ]
        
        this.tilemap = this.scene.make.tilemap({
            tileWidth: 16,
            tileHeight: 16,
            data: level,
        })
    }

    execute(executeOptions: IExecuteOptions) {
        const tiles = this.tilemap.addTilesetImage(
            executeOptions.tilesetName,
            undefined,
            executeOptions.tileSize,
            executeOptions.tileSize,
        )

        this.tilemap.createLayer(0, tiles, 0, 0)
    }

    worldToTilePoint(): Vector2 {
        const worldPoint = this.scene.input.manager.activePointer.positionToCamera(this.scene.cameras.main) as Vector2
        
        const pointerTileX = this.tilemap.worldToTileX(worldPoint.x);
        const pointerTileY = this.tilemap.worldToTileY(worldPoint.y);

        return { x: this.tilemap.tileToWorldX(pointerTileX), y: this.tilemap.tileToWorldY(pointerTileY) }
    }
    
    worldToTileCoords(): Vector2 {
        const worldPoint = this.scene.input.manager.activePointer.positionToCamera(this.scene.cameras.main) as Vector2
        
        const pointerTileX = this.tilemap.worldToTileX(worldPoint.x);
        const pointerTileY = this.tilemap.worldToTileY(worldPoint.y);

        return { x: pointerTileX, y: pointerTileY }
    }
} 