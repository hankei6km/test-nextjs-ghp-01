export function pruneClasses(
  classes: { [key: string]: string } | undefined,
  classNames: string[]
) {
  const ret: { [key: string]: string } = {};
  if (classes) {
    classNames.forEach((className) => {
      if (className in classes) {
        ret[className] = classes[className];
      }
    });
  }
  return ret;
}
