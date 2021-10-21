export function UUID() {
  const UUID = (() =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1))();

  return `${UUID}${UUID}-${UUID}-${UUID}-${UUID}-${UUID}${UUID}${UUID}`;
}
