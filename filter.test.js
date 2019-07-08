const filterByFacility = require('./filterByFacility');

test('filterByFacility function exists', () => {
  expect(filterByFacility).toBeDefined();
});

test('ten hotels are added to state on first render of the page', () => {
  expect(this.state.hotels.length).toBe(10);
});

test('filter solely for wifi to equal 7 hotels', () => {
  expect(filterByFaciity('wifi').length).toBe(7);
})
