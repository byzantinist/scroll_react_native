import 'react-native';
import React from 'react';
import NewScroll from '../components/newscroll';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <NewScroll />
  );
  expect(tree).toMatchSnapshot();
});

