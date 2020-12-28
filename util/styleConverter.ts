declare global {
  interface Array<T> {
    sca(): string;
  }
}
export const styleFunc = (): void => {
  if (!Array.prototype.sca) {
    Object.defineProperty(Array.prototype, "sca", {
      enumerable: false,
      value: function () {
        return this.join(" ");
      },
    });
  }
};
