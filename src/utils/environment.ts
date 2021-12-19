import path from 'path';
import { cleanEnv, bool, str, num, ValidatorSpec } from 'envalid';

interface IEnvironment {
  IS_DEV: boolean;
  SAVE_LOCAL: boolean;
  UPLOADS_DIR?: string;
  SERVER_PORT?: number;
  DATABASE_URI: string;
}

const extendsObject = (...objects) => {
  return objects.reduce((acc, obj) => ({ ...acc, ...obj }));
};

const validateEnvironment = <T>(options: {
  [K in keyof T]: ValidatorSpec<T[K]>;
}) => {
  return cleanEnv(process.env, options);
};

export class Config {
  private static instance: Config;
  public environment: IEnvironment;

  protected constructor() {
    let environment = validateEnvironment<Partial<IEnvironment>>({
      SERVER_PORT: num({ default: 3333 }),
      SAVE_LOCAL: bool({ default: true }),
      DATABASE_URI: str(),
    });

    if (environment.SAVE_LOCAL) {
      environment = extendsObject(
        environment,
        validateEnvironment({
          UPLOADS_DIR: str({
            default: path.resolve(__dirname, '../../uploads'),
          }),
        }),
      );
    } else {
      environment = extendsObject(
        environment,
        validateEnvironment({ CLOUDINARY_URL: str() }),
      );
    }
    this.environment = extendsObject(environment, {
      IS_DEV: process.env.NODE_ENV !== 'production',
    });
  }

  public get<K extends keyof IEnvironment>(key: K): IEnvironment[K] {
    return this.environment[key];
  }

  static getInstance(): Config {
    if (!Config.instance) {
      this.instance = new Config();
    }
    return this.instance;
  }
}

export default Config.getInstance();
