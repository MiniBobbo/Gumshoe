import { SceneEvents } from "../enums/SceneEvents";
import { GameScene } from "../scenes/GameScene";

export class EffectManager {
    gs:GameScene;
    l:Phaser.GameObjects.Layer;
    emitter:Phaser.GameObjects.Particles.ParticleEmitter;
    constructor(gs:GameScene) {
        this.gs = gs;
        this.l = gs.effectLayer;

        this.gs.events.on(SceneEvents.StartEffect, this.StartEffect, this); 
        this.gs.events.on(SceneEvents.EndEffect, this.EndEffect, this); 

        
    }
    StartEffect(effect: string) {
        this.emitter = this.gs.add.particles(0, 270, 'particle',
        {
            // frame: 'white',
            // color: [ 0x0000ff ],
            colorEase: 'quad.out',
            lifespan: 2400,
            angle: { min: 0, max: 0 },
            // scale: { start: 0.70, end: 0, ease: 'sine.out' },
            scaleX: 2,
            speed: {min:1000, max:3000},
            // advance: 2000,
            blendMode: 'ADD',
        });


        // this.l.add(this.emitter);

        let line = new Phaser.Geom.Ellipse(-100, 0, 100, 540);
        this.emitter.addEmitZone({ type: 'random', source: line, quantity: 64, total: 128 });
        this.gs.tweens.add({
            targets: this.emitter,
            alpha: 1,
            ease: 'Linear',
            duration: 1000,
            repeat: 0,
            yoyo: false,
        });
    }

    EndEffect() {
        this.gs.tweens.add({
            targets: this.emitter,
            alpha: 0,
            ease: 'Linear',
            duration: 1000,
            repeat: 0,
            yoyo: false,
            complete: () => {
                this.emitter.destroy();
            }
        });

    }

    DestroyEvents() {
        this.gs.events.removeListener(SceneEvents.StartEffect, this.StartEffect, this); 
        this.gs.events.removeListener(SceneEvents.EndEffect, this.EndEffect, this); 

    }



}