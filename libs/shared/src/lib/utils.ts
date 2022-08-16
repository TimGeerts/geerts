// ## ARRAY FUNCTIONS ##
// sort an array of objects by a given property
// usage: this.users = sortByProp(users, 'displayName');
export function sortByProp<T, K extends keyof T>(
  values: T[],
  orderType: K
): T[] {
  return values.sort((a, b) =>
    a[orderType] > b[orderType] ? 1 : b[orderType] > a[orderType] ? -1 : 0
  );
}
