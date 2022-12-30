// Update the function signature to explicitly specify the type of the props parameter
export function pick<T extends object, K extends keyof T>(obj: T, props: K[]): Pick<T, K> {
  const pickedProperties = {} as Pick<T, K>
  for (const prop of props) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      pickedProperties[prop] = obj[prop]
    }
  }
  return pickedProperties
}
