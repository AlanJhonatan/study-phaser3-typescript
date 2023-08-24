import Phaser from 'phaser';
import { Marker } from '../editor/marker/Marker';
import { PlayerAnimations } from '../player/animations';
import { MainMap } from './maps/MainMap';

export default class Demo extends Phaser.Scene {
  private map!: MainMap
  private marker!: Marker;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private controls: any;
  
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('tile-grass', 'assets/tiles/grass.png')
    this.load.spritesheet('player', 'assets/player/character-basic.png', { frameWidth: 48, frameHeight: 48 })
  }

  create() {
    this.map = new MainMap(this)
    this.map.execute({
      tilesetName: 'tile-grass',
      tileSize: 16,
    })
    

    this.cursors = this.input.keyboard.createCursorKeys();
    
    const controlConfig = {
      camera: this.cameras.main,
      left: this.cursors.left,
      right: this.cursors.right,
      up: this.cursors.up,
      down: this.cursors.down,
      speed: 0.5
    };
    
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    
    this.marker = new Marker(this.add.graphics())
    
    this.input.on('pointerdown', (event: Phaser.Input.Pointer) => {
      this.marker.selectTile()
    })

    this.input.keyboard.on('keydown-ESC', () => {
      this.marker.resetSelection()
    })


    const playerAnim = new PlayerAnimations(this)
    playerAnim.createPlayerAnimations()
    playerAnim.setAnimation('idle')
  }

  update(time: any, delta: any) {
    this.controls.update(delta)
    const worlpoint = this.input.manager.activePointer.positionToCamera(this.cameras.main)

    const { x: tilePointX,  y: tilePointY } = this.map.worldToTilePoint()
    const { x: tileX, y: tileY } = this.map.worldToTileCoords()
    
    this.marker.setTilePosition({ x: tilePointX, y: tilePointY })
  }

  
}
