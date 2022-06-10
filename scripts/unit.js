export class Unit {

    #state = {
        x: 0,
        y: 0,
        sprite: null,
        endKeyButton: 'base'
    };

    #sprites = {}; // спрайты юнита

    constructor(atlasTextures, loader, resource, AnimatedSprite, application) {
        this.changeState = this.changeState.bind(this);
        this.changeOrintation = this.changeOrintation.bind(this);

        loader.add(atlasTextures).load(() => {

            const arrResource = Object.values(resource).filter(item => item.extension !== 'png' );

            for(let item of arrResource) {
                const masterTextures = item.textures;
                const textures = Object.values(masterTextures);
                this.#sprites[item.name] = new AnimatedSprite(textures);
                this.#sprites[item.name].animationSpeed = 0.2;
            }

            this.#state.sprite = this.#sprites['baseLeft'];
            application.stage.addChild(this.#state.sprite);
            this.#state.sprite.play();
        });
    }

    // действия
    #actions = {
        'a': {nameSprite: 'goLeft', x: -10, y: 0 },
        'd': {nameSprite: 'goRight', x: 10, y: 0 },
        'w': {nameSprite: 'goLeft', x: 0, y: -10 },
        's': {nameSprite: 'goLeft', x: 0, y: 10 },
        'base': {nameSprite: 'baseLeft', x: 0, y: 0 }
    }

    // смена ориентации в пространстве
    changeOrintation(keyButton) {
        if(keyButton === 'a') {
            this.#actions['w'].nameSprite = 'goLeft';
            this.#actions['s'].nameSprite = 'goLeft';
            this.#actions['base'].nameSprite = 'baseLeft';
        } else if (keyButton === 'd') {
            this.#actions['w'].nameSprite = 'goRight';
            this.#actions['s'].nameSprite = 'goRight';
            this.#actions['base'].nameSprite = 'baseRight';
        }

    }

    // изменение состояния юнита
    changeState(keyButton, application) {

        if (['a', 'd'].includes(keyButton)) {
            this.changeOrintation(keyButton);
        }

        const action = this.#actions[keyButton];

        if (keyButton !== this.#state.endKeyButton && (keyButton in this.#actions)){

            application.stage.removeChild(this.#state.sprite);
            this.#state.sprite = this.#sprites[action.nameSprite];
            application.stage.addChild(this.#state.sprite);

            this.#state.sprite.play();

            this.#state.endKeyButton = keyButton;
        }
        this.#state.x += action.x;
        this.#state.y += action.y;
        this.#state.sprite.position.set(this.#state.x, this.#state.y);
    }

}