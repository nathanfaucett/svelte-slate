let ID = 0;

export class Key {
	id: string;

	constructor() {
		this.id = `${ID++}`;
	}

	toString() {
		return this.id;
	}
}
