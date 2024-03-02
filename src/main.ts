import * as Phaser from "phaser";
import { Preload } from "./scenes/Preload";
import { GameScene } from "./scenes/GameScene";
import { C } from "./C";
import { objCurrentState } from "./objects/objCurrentState";


class Main extends Phaser.Game {
  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: 960,
      height: 540,
      zoom:1,
      physics: {
      },
      // scene:{
      //   // preload:preload,
      //   // game:Game
      // },
      render: {
        pixelArt:true,
      },
    };
    super(config);

    //Create the gamestate
    C.currentState = new objCurrentState();

    //Create test stuff
    C.currentState.Area = '0';
    


    // this.scene.add("boot", Boot, false);
    this.scene.add("preload", Preload, false);
    this.scene.add("game", GameScene, false);
    this.scene.start("preload");


    }
}

window.onload = () => {
  const GameApp: Phaser.Game = new Main();
};