interface CreateOptions {
    width: number
    height: number
}

interface Vector2 {
    x: number
    y: number
}

export interface IMarker {
    setTilePosition(vector2: Vector2): void

    selectTile(): void
}