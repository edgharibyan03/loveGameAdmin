export const toastChangeBody = (text, cb) => ({
  pending: `The ${text} is changing`,
  success: {
    render() {
      cb();
      return `The ${text} was changed`;
    },
  },
  error: `Failed to change ${text}`,
});

export const toastDeleteBody = (text) => ({
  pending: `The ${text} is deleting`,
  success: `The ${text} was deleted`,
  error: `Failed to delete ${text}`,
});

export const toastAddBody = (text) => ({
  pending: `The ${text} is adding`,
  success: {
    render() {
      return `The ${text} was added`;
    },
  },
  error: `Failed to add ${text}`,
});
