import 'react-native';
import React from 'react';
import ModalBox from '../components/modalbox';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <ModalBox/>
  );
  expect(tree).toMatchSnapshot();
});

