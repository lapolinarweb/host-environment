/**
 * Information about the host environment that the code is running in.
 */
export interface Host {
  /**
   * The Global object.
   * In Node this is the `global` object. In web browsers it's the `window` object.
   */
  global: Global;

  /**
   * Information about the host operating system.
   * In web browsers the OS info is inferred from the user agent.
   */
  os: OSInfo;

  /**
   * The environment variables of the host operating system.
   * Environment variables aren't accessible in web browsers, so this object will be empty.
   * However, you can use Karma-Host-Environment to access environment variables when testing in browsers.
   *
   * @see https://jstools.dev/karma-host-environment/
   */
  env: EnvironmentVariables;

  /**
   * Information about the CI/CD host.
   * This property is `false` when not running in a known CI/CD host.
   *
   * @see https://www.npmjs.com/package/@qawolf/ci-info#supported-ci-tools
   */
  ci: false | CIInfo;

  /**
   * Information about the Node host.
   * This property is `false` when running in a web browser.
   */
  node: false | NodeInfo;

  /**
   * Indicates which web browser the code is running in.
   * This property is `false` when running in Node.
   */
  browser: false | Browsers;

  /**
   * Deep-merges the given object with the Host object. This is an easy way for other libraries
   * and tools to extend the Host object with additional fields and/or override existing fields.
   *
   * @param props - An object whose properties will be merged with the Host object.
   * @returns - The Host object with the merged properties
   */
  merge<T>(props: T): Host & T;

  /**
   * Returns a copy of the host object that can be safely converted to JSON.
   */
  toJSON(): HostJSON;
}

/**
 * A Host-like object that is safe for JSON serialization.
 */
export interface HostJSON {
  global: string;
  os: OSInfo;
  env: EnvironmentVariables;
  ci: false | CIInfo;
  node: false | NodeInfo;
  browser: false | Browsers;
}

/**
 * The Global object. In Node, this is the `global` object. In browsers it's the `window` object.
 */
export type Global = Record<string, unknown>;

/**
 * Information about the host operating system.
 */
export interface OSInfo {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

/**
 * The `OSInfo` type, with an index signature.
 */
export interface OSInfoRecord {
  [key: string]: boolean | undefined;
}

/**
 * The environment variables of the host operating system.
 */
export interface EnvironmentVariables {
  [key: string]: string | undefined;
}

/**
 * Information about the CI/CD host.
 */
export interface CIInfo {
  /**
   * The friendly name of the CI/CD host (e.g. "Travis CI", "GitHub Actions", etc.)
   */
  name: string;

  /**
   * Whether the CI/CD job was triggered by a pull-request.
   */
  pr: boolean;

  /**
   * The CI/CD host name, as a boolean. (e.g. `TRAVIS`, `GITHUB_ACTIONS`, `TEAMCITY`, etc.)
   */
  CODEBUILD: boolean | undefined;
  APPVEYOR: boolean | undefined;
  AZURE_PIPELINES: boolean | undefined;
  BAMBOO: boolean | undefined;
  BITBUCKET: boolean | undefined;
  BITRISE: boolean | undefined;
  BUDDY: boolean | undefined;
  BUILDKITE: boolean | undefined;
  CIRCLE: boolean | undefined;
  CIRRUS: boolean | undefined;
  CODESHIP: boolean | undefined;
  DRONE: boolean | undefined;
  DSARI: boolean | undefined;
  GITHUB_ACTIONS: boolean | undefined;
  GITLAB: boolean | undefined;
  GOCD: boolean | undefined;
  HUDSON: boolean | undefined;
  JENKINS: boolean | undefined;
  MAGNUM: boolean | undefined;
  NETLIFY: boolean | undefined;
  NEVERCODE: boolean | undefined;
  SAIL: boolean | undefined;
  SEMAPHORE: boolean | undefined;
  SHIPPABLE: boolean | undefined;
  SOLANO: boolean | undefined;
  STRIDER: boolean | undefined;
  TASKCLUSTER: boolean | undefined;
  TEAMCITY: boolean | undefined;
  TRAVIS: boolean | undefined;
}

/**
 * Information about the Node host.
 */
export type NodeInfo = VersionInfo;

/**
 * Indicates which web browser the code is running in.
 */
export interface Browsers {
  /**
   * Information about the Internet Explorer host.
   * This property is `false` when running in a browser other than Internet Explorer.
   */
  IE: false | BrowserInfo;

  /**
   * Information about the Edge browser host.
   * This property is `false` when running in a browser other than Edge.
   */
  edge: false | BrowserInfo;

  /**
   * Information about the Chrome browser host.
   * This property is `false` when running in a browser other than Chrome.
   */
  chrome: false | BrowserInfo;

  /**
   * Information about the Firefox browser host.
   * This property is `false` when running in a browser other than Firefox.
   */
  firefox: false | BrowserInfo;

  /**
   * Information about the Safari browser host.
   * This property is `false` when running in a browser other than Safari.
   */
  safari: false | BrowserInfo;

  /**
   * Indicates whether the host is a mobile browser.
   */
  mobile: boolean;
}

/**
 * The `Browsers` type, with an index signature.
 */
export interface BrowsersRecord {
  [key: string]: false | BrowserInfo | undefined;
}

/**
 * Information about the web browser host.
 */
export interface BrowserInfo extends VersionInfo {
  /**
   * Indicates whether the host browser is a mobile browser.
   */
  mobile: boolean;
}

/**
 * The host's version number, broken into its numeric components.
 */
export interface VersionInfo {
  /**
   * The major and minor version numbers, as a float (e.g. 10.2).
   */
  version: number;
  majorVersion: number;
  minorVersion: number;
  patchVersion: number;

  /**
   * A boolean flag that is only set for the major version.
   * For example, if the version is 10.2.45, then the `v10` flag will be `true`.
   */
  [vMajor: string]: true | unknown;
}
