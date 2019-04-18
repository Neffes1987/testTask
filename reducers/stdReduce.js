
export default class StdReduce {
  constructor(props) {
    this.initialState = props.initialState || {};
    this.prefix = props.prefix;
  }

    _actions = {};

    actionCreators = {};

    /**
    * It is a standard method, that add actions to reducers list
    * @method _getActionCreator
    * @param {string} label Action creator label, by this label reduce will call assigned method
    * @param {object} method This callback will be called when reduce find assigned label
    */
    useUpdate = (label, method) => {
      const prefixedLabel = (this.prefix + label).toUpperCase();
      const lowedLabel = label.toLowerCase();

      // add method for list where method "checkActionForState" will be find assigned actions
      this._actions[lowedLabel] = method;

      // add action creator to list of actions. This list could be used in controller
      this.actionCreators[lowedLabel] = (params = {}) => ({ type: prefixedLabel, ...params });
    }

    /**
    * Method will takes state and incoming action.
    * Then method compare action.type with each action label from configuration.
    * If method find equal label, will be call the method for this label,
    * else will be returned old state without changes
    *
    * @method checkActionForState
    * @param {any} state Cloned state for updating
    * @param {object} action Object
    * @return {any} will return old state if action.type not matched, else will return cloned
    *  state with changes from action.type method
    */
    checkActionForState = (state = this.initialState || {}, action) => {
      // for initialization
      if (!action.type || action.error) return state;

      // all methods inside _actions structure keeps without prefix
      const type = action.type.toLowerCase();
      const prefix = this.prefix.toLowerCase();

      // we should exclude prefix from action type
      const internalType = type.replace(prefix, '');

      // try to find equal label without prefix inside _actions
      if (this._actions[internalType]) {
        // clone full state in new object
        const clone = this._deepClone(state);
        // call label method and return result in store
        return this._actions[internalType]({ clone, action });
      }
      // return state without mutations for any other variant
      return state;
    }

    /**
    * Getter for exporting action creators functions to page controller
    * @method getActionCreators
    * @return {object} will return list of action creator,
    * where key it is a type property from configuration, and value it is a assigned action creator
    */
    getActionCreators = () => this.actionCreators;

    /**
    * Method for object deep cloning
    * @author Новицкий Вячеслав, created on 07-04-2019
    * @method _deepClone
    * @param {any} arr - object or array that should be cloned
    * @return {any} will return duplicate of object
    */
    _deepClone = (arr) => {
      let arr1;
      if (Array.isArray(arr)) {
        arr1 = [];
      } else if (typeof arr === 'object') {
        arr1 = {};
      } else {
        return arr;
      }
      for (const key in arr) {
        if (typeof arr[key] === 'function'
            || !Array.isArray(arr)
            || typeof arr[key] !== 'object') {
          arr1[key] = arr[key];
        } else {
          arr1[key] = this._deepClone(arr[key]);
        }
      }
      return arr1;
    }

    static counter = (initialValue = 0) => {
      let count = initialValue;
      return () => {
        count += 1;
        return count;
      };
    }
}
