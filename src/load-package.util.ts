const MISSING_REQUIRED_DEPENDENCY = (name: string, reason: string) =>
  `The "${name}" package is missing. Please, make sure to install this library ($ npm install ${name}) to take advantage of ${reason}.`;

/**
 * Lazy loads a package
 * @see https://github.com/nestjs/nest/blob/master/packages/common/utils/load-package.util.ts#L8 (fork)
 * @param packageName
 * @param context
 * @param loaderFn
 * @returns
 */
export function loadPackage(packageName: string, context: string, loaderFn?: () => any) {
  try {
    return loaderFn ? loaderFn() : require(packageName);
  } catch (e) {
    console.error(MISSING_REQUIRED_DEPENDENCY(packageName, context));
    process.exit(1);
  }
}
