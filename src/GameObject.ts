import EventEmitter from 'eventemitter3';
import { Container, Graphics, Text } from 'pixi.js'
import { Component} from './Components/Component';
import { Manager } from './Manager';

export class GameObject extends Container
{
	protected components : Array<Component> = [];

	constructor()
	{
		super();
	}

	public AddComponent(c : Component)
	{
		this.components.push(c);
	}
	public AddEvent(type : string, fn: EventEmitter.ListenerFn) : void
	{
		console.log("Added event " + type + " fn: " + fn);
	}

	public Update(dt : number) : void{
		this.components.forEach(comp =>
		{
			comp.Update(dt, this);
		});
	}
}

export class GoButton extends GameObject
{
	private shape : Graphics;

	private text : Text;

	constructor(x : number, y : number, width : number, height : number, text : string, fontSize : number)
	{
		super();
		this.shape = new Graphics();
		this.text = new Text(text, {
			align: "center",
    		fontSize: fontSize
		});
		this.text.x = x + (width / 2);
		this.text.y = y + (height / 2);
		this.text.anchor.set(0.5);
		this.shape.addChild(this.text);
		this.shape.beginFill(0xFF00FF);
		this.shape.lineStyle(1, 0x00FF00);
		this.shape.drawRect(x, y, width, height);
		this.shape.endFill();
        this.addChild(this.shape);
		this.shape.interactive = true;
	}

	override AddEvent(type : string, fn: EventEmitter.ListenerFn) : void
	{
		this.shape.on(type, fn, this);
	}

	override Update(dt : number) : void{
		super.Update(dt);
		this.shape.x = this.shape.x + 0 * dt;
		if (this.shape.x > Manager.width) {
            this.shape.x = 0;
        }
	}
}