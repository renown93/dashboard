type NumericSortable = {
  [key: string]: number;
};

type StringSortable = {
  [key: string]: string;
};

export function sortNumber(
  column: keyof NumericSortable,
  direction: 'asc' | 'desc',
  a: NumericSortable,
  b: NumericSortable
) {
  if (direction === 'asc') {
    return a[column] - b[column];
  }
  if (direction === 'desc') {
    return b[column] - a[column];
  }
  return 0;
}

export function sortString(
  column: keyof StringSortable,
  direction: 'asc' | 'desc',
  a: StringSortable,
  b: StringSortable
) {
  if (direction === 'asc') {
    if (a[column] < b[column]) {
      return -1;
    }
    if (a[column] > b[column]) {
      return 1;
    }
  }

  if (direction === 'desc') {
    if (a[column] > b[column]) {
      return -1;
    }
    if (a[column] < b[column]) {
      return 1;
    }
  }

  return 0;
}
