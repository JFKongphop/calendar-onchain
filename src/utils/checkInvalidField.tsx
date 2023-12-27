export function checkInvalidField<T extends object>(data: T) {
  Object.values(data).some((value: string) => {
    if (value.length === 0) {
      return false;
    }
  });
}