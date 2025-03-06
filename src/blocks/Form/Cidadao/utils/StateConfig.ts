export abstract class ReadOnlyStateConfig<TKey extends {}, TValue>{
    protected stateMap: {[key in string]?: TValue}

    protected toString(key: TKey) {
        return Object.entries(key).filter(([_, value]) => value !== undefined).sort().toString();
    }

    public get(key: TKey) {
        return this.stateMap[this.toString(key)];
    }
}

export class StateConfig<TKey extends {}, TValue> extends ReadOnlyStateConfig<TKey, TValue>{
    constructor() {
        super();
        this.stateMap = {}
    }

    public set(key: TKey, value: TValue) {
        this.stateMap[this.toString(key)] = value;
    }

}