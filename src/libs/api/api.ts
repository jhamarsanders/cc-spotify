import { Model } from "objection";

const DEFAULTS = {
    identifier: 'id',
    baseUrl: '',
    hardDelete: false,
    idAttribute: 'id',
    visibleKey: 'visible',
    userIdKey: 'user_id'
};
  
const DEFAULT_MODEL_OPTIONS = {
    name: '',
    saveUserId: false,
    disabledMethods: {
      // GET_ALL, GET, POST, PUT, DELETE
  
    },
    // array of Models
    subroutes: [],
    withRelated: []
};

export class API {
    app: any;
    model_map: any;
    options: any;

    constructor(app: any, options = {}) {
        this.app = app;
        this.model_map = {};
        this.options = {
            ...DEFAULTS,
            ...options
        }
    }

    addModel(Model: any, modelOptions: any): void {
        this.model_map[Model.tableName] = Model;

        this.setupModel(Model, modelOptions);
    }

    private setupModel(Model: any, _modelOptions: any): void {
        const app = this.app;
        const options = this.options;

        const modelOptions = {
            ...DEFAULT_MODEL_OPTIONS,
            ..._modelOptions
        };

        // const {
        //     baseUrl,
        //     identifier,
        //     disabledMethods
        // } = {
        //     ...modelOptions,
        //     ...options
        // };

        // const name = modelOptions.name || Model.tableName;
        // const path = `${baseUrl}/${name}`;
    }
}