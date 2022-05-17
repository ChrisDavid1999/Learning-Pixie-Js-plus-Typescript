import { Application } from "@pixi/app";
import { Scene, Menu, Game } from "./Scene";
import { State } from "./State";

export class Manager {
    private constructor() {}

    private static app: Application;
    private static currentScene: Scene;

    private static _width: number;
    private static _height: number;
    private static gameState : State;

    public static get width(): number {
        return Manager._width;
    }
    public static get height(): number {
        return Manager._height;
    }

    public static get GameState(): State
    {
        return Manager.gameState;
    }

    public static set GameState(s : State)
    {
        this.gameState = s;
    }

    public static MainMenu()
    {
        const s : Scene = new Menu();
        Manager.changeScene(s);
    }

    public static Game()
    {
        const s : Scene = new Game();
        Manager.changeScene(s);
    }
    public static initialize(width: number, height: number, background: number): void {

        Manager._width = width;
        Manager._height = height;
        Manager.GameState = new State(true, true);

        Manager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        Manager.app.ticker.add(Manager.update)
        Manager.MainMenu();
    }

    public static changeScene(newScene: Scene): void {
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        Manager.currentScene = newScene;
        Manager.app.stage.addChild(Manager.currentScene);
    }

    private static update(dt : number): void {
        if (Manager.currentScene) {
            Manager.currentScene.Update(dt);
        }
    }
}