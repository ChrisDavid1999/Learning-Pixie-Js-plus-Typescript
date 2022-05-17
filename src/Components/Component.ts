import { InteractionEvent } from 'pixi.js'
import { GameObject } from '../GameObject';
import { Manager } from '../Manager';

export abstract class Component
{
	value : number = 0;
	
	constructor()
	{
		
	}

	abstract Update(dt : number, go : GameObject) : void;
}

export class Player extends Component
{
	constructor(go : GameObject)
	{
		super();
		go.AddEvent("pointertap", this.onClick);
	}

	override Update(dt : number, go : GameObject) : void{
		if(!Manager.GameState.debug)
		{
			go.off;
		}

		if(Manager.GameState.debug){
			console.log("DEBUG::UPDATE::BUTTON::" + go + dt);
		}
	}

	public onClick(e: InteractionEvent): void
	{
		console.log("You clicked something :)" + e);
	}
}


//Buttons
export class Button extends Component
{
	constructor(go : GameObject)
	{
		super();
		go.AddEvent("pointertap", this.onClick);
	}

	override Update(dt : number, go : GameObject) : void{
		if(Manager.GameState.debug){
			console.log("DEBUG::UPDATE::BUTTON::" + go + dt);
		}
	}

	public onClick(e: InteractionEvent): void
	{
		console.log("You clicked something :)" + e);
	}
}

export class MatchStartButton extends Button
{
	constructor(go : GameObject)
	{
		super(go);
	}

	override Update(dt : number, go : GameObject) : void{
		super.Update(dt, go);
	}

	override onClick(e: InteractionEvent): void
	{
		Manager.Game();
		console.log("Match should start" + e + " Time: ");
	}
}

export class MainMenuButton extends Button
{
	constructor(go : GameObject)
	{
		super(go);
	}

	override Update(dt : number, go : GameObject) : void{
		super.Update(dt, go);
	}

	override onClick(e: InteractionEvent): void
	{
		Manager.MainMenu();
		console.log("Match should start" + e + " Time: " );
	}
}

export class PlayerAttack extends Button
{
	constructor(go : GameObject)
	{
		super(go);
	}

	override Update(dt : number, go : GameObject) : void{
		super.Update(dt, go);
		if(!Manager.GameState.playerTurn)
		{
			go.visible = false;
		}
		else
		{
			go.visible = true;
		}
	}

	override onClick(e: InteractionEvent): void
	{
		Manager.GameState.playerTurn = false;
		console.log("Match should start" + e + " Time: ");
	}
}