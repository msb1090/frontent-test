export const containerStyle = (theme) => ({
  minHeight: {
    xs: '',
    sm: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  },
  background: theme.palette.grey[50],
});

export const listItemStyle = {
  width: '100%',
  color: 'text.primary',
  textDecoration: 'none',
  '&.active': {
    color: 'primary.dark',
    fontWeight: 'bold',
    backgroundColor: '#d2d2d2',
  },
};
