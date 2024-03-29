import ts from "typescript";
import { ScriptList } from "../ScriptList";
import { SFX } from "../enums/SFX";

export class Preload extends Phaser.Scene {
    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
            }
        });

        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value:any) {
            //@ts-ignore
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file:any) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            //@ts-ignore
        }, this);
    
        this.load.setBaseURL('./assets/')
        this.load.multiatlas('atlas', 'atlas.json');
        this.load.image('particle', 'particles/elec3.png');
        this.load.audio(SFX.thump, 'sfx/thump.ogg');
        this.load.audio(SFX.PlayerTalk, 'sfx/PlayerTalk.wav');
        this.load.audio(SFX.ChaosTalk, 'sfx/ChaosTalk.wav');
        this.load.audio(SFX.OrderTalk, 'sfx/OrderTalk.wav');
        this.load.audio(SFX.click, 'sfx/click.ogg');
        this.load.audio(SFX.correct, 'sfx/Correct.wav');
        this.load.audio(SFX.flash, 'sfx/Flash.wav');
        this.load.audio(SFX.crash, 'sfx/Crash.wav');

        ScriptList.scripts.forEach(element => {
            this.loadScript(element);
        });


    }

    loadScript(name:string) {
        this.load.text(name, `scripts/${name}.txt`);
    }

    create() {
        this.anims.create({ key: 'player_stand', frameRate: 60, frames: this.anims.generateFrameNames('atlas', { prefix: 'player_stand_', end: 0}), repeat: 0 });

        // let scripts = this.cache.text.get('allScripts');
        // let lines = scripts.split(',');
        // for (let l of lines) {
        //     this.loadScript(l);
        // }


        const element = document.createElement('style');
        document.head.appendChild(element);
        const sheet = element.sheet;
        let styles = '@font-face { font-family: "munro"; src: url("assets/munro.ttf") format("truetype"); }\n';
        sheet.insertRule(styles, 0);
        styles = '@font-face { font-family: "tempesta"; src: url("assets/tempesta.ttf") format("truetype"); }\n';
        sheet.insertRule(styles, 0);

        //@ts-ignore
        WebFont.load({
            custom: {
                families: [ 'munro', 'tempesta' ]
            },
            active: function ()
            {
            }
        });

        this.scene.start('game');

    }
}