/* eslint-disable react/no-multi-comp */
import * as React from 'react';
import { View } from 'react-native';
import { cleanup, render } from '../pure';

class Test extends React.Component<{ onUnmount: () => void }> {
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }
  render() {
    return <View />;
  }
}

test('cleanup', async () => {
  const fn = jest.fn();

  await render(<Test onUnmount={fn} />);
  await render(<Test onUnmount={fn} />);
  expect(fn).not.toHaveBeenCalled();

  await cleanup();
  expect(fn).toHaveBeenCalledTimes(2);
});
