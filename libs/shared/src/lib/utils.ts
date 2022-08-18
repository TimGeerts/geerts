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

// search all given properties of an object for a given string value
// usage: this.filteredUsers = queryByProps(this.users, query, ['customerNumber', 'displayName']);
export function queryByProps<T, K extends keyof T>(
  values: T[],
  q: string,
  props: K[]
): T[] {
  q = q.toLowerCase();
  return values.filter((v) => {
    return props.some((p) => {
      return `${v[p]}`.toLowerCase().indexOf(q) >= 0;
    });
  });
}
