export interface Comparator<V> {
  compare(value1: V, value2: V): number;
}
