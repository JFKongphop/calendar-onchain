export const shortAddrss = (address: string) => {
  return `${address.slice(0, 5)}...${address.slice(37, 42)}`;
}