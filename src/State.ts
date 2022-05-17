export class State
{
	public playerTurn : boolean;
    public debug : boolean;
	constructor(pt : boolean, d : boolean)
	{
		this.playerTurn = pt;
		this.debug = d;

	}
}