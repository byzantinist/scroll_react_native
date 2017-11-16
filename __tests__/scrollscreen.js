import 'react-native';
import React from 'react';
import ScrollScreen from '../components/scrollscreen';
import { StackNavigator } from 'react-navigation';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <ScrollScreen/>
  );
  expect(tree).toMatchSnapshot();
});

