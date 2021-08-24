const config: { mobile: any; desktop: any } = {
  mobile: {
    maxHeight: '100%',
    maxWidth: '100%',
    height: '100%',
    width: '100%',
    closeOnNavigation: false,
    panelClass: 'dialog-mobile',
  },
  desktop: {},
};

export function dialogConfig<T = unknown>(
  type: 'mobile' | 'desktop',
  _config?: T
) {
  return { ...config[type], ..._config };
}
