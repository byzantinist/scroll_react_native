import 'react-native';
import React from 'react';
import "isomorphic-fetch"
import ListArticles from '../components/listarticles';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <ListArticles />
  );
  expect(tree).toMatchSnapshot();
});

