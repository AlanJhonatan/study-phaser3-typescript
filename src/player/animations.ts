enum PlayerAnimationsStates {
    'idle',
    'idle-down',
    'idle-up',
    'idle-left',
    'idle-right',
    'walk-up',
    'walk-down'
}

export class PlayerAnimations {
    private scene: Phaser.Scene
    private playerAnimation: Phaser.GameObjects.Sprite
    
    constructor(scene: Phaser.Scene) {
        this.scene = scene

        this.playerAnimation = this.scene.add.sprite(20, 10, 'player-sprite');
    }

    createPlayerAnimations() {

        const frameNumbers = this.scene.anims.generateFrameNumbers('player', {
            frames: [0, 1]
        });

        this.scene.anims.create({
            key: 'idle',
            frames: frameNumbers,
            frameRate: 3,
            repeat: -1
        })
    }

    setAnimation(animation: string) {
        this.playerAnimation.play(animation)
    }
}