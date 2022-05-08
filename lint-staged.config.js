module.exports = {
  'src/**/*.{ts,tsx}': [() => 'tsc --noEmit', 'npm run lint:fix'],
};
