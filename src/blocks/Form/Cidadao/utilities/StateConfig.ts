export abstract class ReadOnlyStateConfig<TKey extends object, TValue> {
  protected stateMap: { [key in string]?: TValue } = {}

  protected toString(key: TKey) {
    return Object.entries(key)
      .filter(([_, value]) => value !== undefined)
      .sort()
      .toString()
  }

  public get(key: TKey) {
    return this.stateMap[this.toString(key)]
  }
}

export class StateConfig<TKey extends object, TValue> extends ReadOnlyStateConfig<TKey, TValue> {
  constructor() {
    super()
  }

  public set(key: TKey, value: TValue) {
    this.stateMap[this.toString(key)] = value
  }

  static from<TKey extends object, TValue>(
    params: { key: TKey; value: TValue }[],
  ): StateConfig<TKey, TValue> {
    const config = new StateConfig<TKey, TValue>()
    params.forEach((param) => config.set(param.key, param.value))
    return config
  }
}
