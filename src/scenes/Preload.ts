import ts from "typescript";

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
        // this.load.setBaseURL('./assets/scripts/')
        this.loadScript('Intro');
        this.loadScript('testAssumption');
        this.loadScript('intro_notice');
        this.loadScript('n0');
        this.loadScript('e0s0');
        this.loadScript('e0s1');
        this.loadScript('n0_barry');
        this.loadScript('n0_blood');
        this.loadScript('n0_finished');
        this.loadScript('n0_skateboard');


    }

    loadScript(name:string) {
        this.load.text(name, `scripts/${name}.txt`);
    }

    create() {
        this.anims.create({ key: 'player_stand', frameRate: 60, frames: this.anims.generateFrameNames('atlas', { prefix: 'player_stand_', end: 0}), repeat: 0 });


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