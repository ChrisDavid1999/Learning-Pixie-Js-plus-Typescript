import { Container} from 'pixi.js'
import { MainMenuButton, MatchStartButton, PlayerAttack } from './Components/Component';
import { GameObject, GoButton } from './GameObject';
import { Manager } from './Manager';

export class Scene extends Container
{
	protected goList : Array<GameObject> = [];
	protected go : GameObject = new GameObject();
	constructor()
	{
		super();
	}

	public Update(dt: number)
	{
		this.goList.forEach(element => {
			element.Update(dt);
		});
	}
}

export class Menu extends Scene
{
	constructor()
	{
		super();

		this.DefineGameObject();
		this.goList.forEach(element => {
			this.addChild(element);
		});
	}

	private DefineGameObject() : void
	{
		this.go = new GoButton(100, 125, 200, 100, "Play", 42)
		this.go.AddComponent(new MatchStartButton(this.go));
		this.goList.push(this.go);
	}
}

export class Game extends Scene
{
	constructor()
	{
		super();
		this.DefineGameObject();
		this.goList.forEach(element => {
			this.addChild(element);
		});
	}

	private DefineGameObject() : void
	{
		this.go = new GoButton(Manager.width - 65, Manager.height - 55, 60, 50, "Quit", 24)
		this.go.AddComponent(new MainMenuButton(this.go));
		this.goList.push(this.go);
		
		this.go = new GoButton(100, 125, 200, 100, "Play", 42)
		this.goList.push(this.go);
		this.go.AddComponent(new PlayerAttack(this.go));
	}
}