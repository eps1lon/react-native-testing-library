/* eslint-disable no-console */
import * as React from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView } from 'react-native';
import { render, fireEvent, RenderAPI, resetToDefaults } from '..';

const PLACEHOLDER_FRESHNESS = 'Add custom freshness';
const PLACEHOLDER_CHEF = 'Who inspected freshness?';
const INPUT_FRESHNESS = 'Custom Freshie';
const INPUT_CHEF = 'I inspected freshie';
const DEFAULT_INPUT_CHEF = 'What did you inspect?';
const DEFAULT_INPUT_CUSTOMER = 'What banana?';

beforeEach(() => {
  resetToDefaults();
});

class MyButton extends React.Component<any> {
  render() {
    return (
      <Pressable onPress={this.props.onPress}>
        <Text>{this.props.children}</Text>
      </Pressable>
    );
  }
}

class Banana extends React.Component<any, { fresh: boolean }> {
  state = {
    fresh: false,
  };

  componentDidUpdate() {
    if (this.props.onUpdate) {
      this.props.onUpdate();
    }
  }

  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }

  changeFresh = () => {
    this.setState((state) => ({
      fresh: !state.fresh,
    }));
  };

  render() {
    const test = 0;
    return (
      <View>
        <Text>Is the banana fresh?</Text>
        <Text testID="bananaFresh">
          {this.state.fresh ? 'fresh' : 'not fresh'}
        </Text>
        <TextInput
          testID="bananaCustomFreshness"
          placeholder={PLACEHOLDER_FRESHNESS}
          value={INPUT_FRESHNESS}
        />
        <TextInput
          testID="bananaChef"
          placeholder={PLACEHOLDER_CHEF}
          value={INPUT_CHEF}
          defaultValue={DEFAULT_INPUT_CHEF}
        />
        <TextInput defaultValue={DEFAULT_INPUT_CUSTOMER} />
        <TextInput defaultValue={'hello'} value="" />
        <MyButton onPress={this.changeFresh} type="primary">
          Change freshness!
        </MyButton>
        <Text testID="duplicateText">First Text</Text>
        <Text testID="duplicateText">Second Text</Text>
        <Text>{test}</Text>
      </View>
    );
  }
}

test('UNSAFE_getAllByType, UNSAFE_queryAllByType', async () => {
  const { UNSAFE_getAllByType, UNSAFE_queryAllByType } = await render(
    <Banana />
  );
  const [text, status, button] = UNSAFE_getAllByType(Text);
  const InExistent = () => null;

  expect(text.props.children).toBe('Is the banana fresh?');
  expect(status.props.children).toBe('not fresh');
  expect(button.props.children).toBe('Change freshness!');
  expect(() => UNSAFE_getAllByType(InExistent)).toThrow('No instances found');

  expect(UNSAFE_queryAllByType(Text)[1]).toBe(status);
  expect(UNSAFE_queryAllByType(InExistent)).toHaveLength(0);
});

test('UNSAFE_getByProps, UNSAFE_queryByProps', async () => {
  const { UNSAFE_getByProps, UNSAFE_queryByProps } = await render(<Banana />);
  const primaryType = UNSAFE_getByProps({ type: 'primary' });

  expect(primaryType.props.children).toBe('Change freshness!');
  expect(() => UNSAFE_getByProps({ type: 'inexistent' })).toThrow(
    'No instances found'
  );

  expect(UNSAFE_queryByProps({ type: 'primary' })).toBe(primaryType);
  expect(UNSAFE_queryByProps({ type: 'inexistent' })).toBeNull();
});

test('UNSAFE_getAllByProp, UNSAFE_queryAllByProps', async () => {
  const { UNSAFE_getAllByProps, UNSAFE_queryAllByProps } = await render(
    <Banana />
  );
  const primaryTypes = UNSAFE_getAllByProps({ type: 'primary' });

  expect(primaryTypes).toHaveLength(1);
  expect(() => UNSAFE_getAllByProps({ type: 'inexistent' })).toThrow(
    'No instances found'
  );

  expect(UNSAFE_queryAllByProps({ type: 'primary' })).toEqual(primaryTypes);
  expect(UNSAFE_queryAllByProps({ type: 'inexistent' })).toHaveLength(0);
});

test('update', async () => {
  const fn = jest.fn();
  const { getByText, update, rerender } = await render(
    <Banana onUpdate={fn} />
  );

  fireEvent.press(getByText('Change freshness!'));

  await update(<Banana onUpdate={fn} />);
  await rerender(<Banana onUpdate={fn} />);

  expect(fn).toHaveBeenCalledTimes(3);
});

test('unmount', async () => {
  const fn = jest.fn();
  const { unmount } = await render(<Banana onUnmount={fn} />);
  await unmount();
  expect(fn).toHaveBeenCalled();
});

test('unmount should handle cleanup functions', async () => {
  const cleanup = jest.fn();
  const Component = () => {
    React.useEffect(() => cleanup);
    return null;
  };

  const { unmount } = await render(<Component />);

  await unmount();

  expect(cleanup).toHaveBeenCalledTimes(1);
});

test('toJSON', async () => {
  const { toJSON } = await render(<MyButton>press me</MyButton>);

  expect(toJSON()).toMatchSnapshot();
});

test('renders options.wrapper around node', async () => {
  type WrapperComponentProps = { children: React.ReactNode };
  const WrapperComponent = ({ children }: WrapperComponentProps) => (
    <View testID="wrapper">{children}</View>
  );

  const { toJSON, getByTestId } = await render(<View testID="inner" />, {
    wrapper: WrapperComponent,
  });

  expect(getByTestId('wrapper')).toBeTruthy();
  expect(toJSON()).toMatchInlineSnapshot(`
    <View
      testID="wrapper"
    >
      <View
        testID="inner"
      />
    </View>
  `);
});

test('renders options.wrapper around updated node', async () => {
  type WrapperComponentProps = { children: React.ReactNode };
  const WrapperComponent = ({ children }: WrapperComponentProps) => (
    <View testID="wrapper">{children}</View>
  );

  const { toJSON, getByTestId, rerender } = await render(
    <View testID="inner" />,
    {
      wrapper: WrapperComponent,
    }
  );

  await rerender(
    <View testID="inner" accessibilityLabel="test" accessibilityHint="test" />
  );

  expect(getByTestId('wrapper')).toBeTruthy();
  expect(toJSON()).toMatchInlineSnapshot(`
    <View
      testID="wrapper"
    >
      <View
        accessibilityHint="test"
        accessibilityLabel="test"
        testID="inner"
      />
    </View>
  `);
});

test('returns container', async () => {
  const { container } = await render(<View testID="inner" />);

  expect(container).toBeDefined();
  // `View` composite component is returned. This behavior will break if we
  // start returning only host components.
  expect(container.type).toBe(View);
  expect(container.props.testID).toBe('inner');
});

test('returns wrapped component as container', async () => {
  type WrapperComponentProps = { children: React.ReactNode };
  const WrapperComponent = ({ children }: WrapperComponentProps) => (
    <SafeAreaView testID="wrapper">{children}</SafeAreaView>
  );

  const { container } = await render(<View testID="inner" />, {
    wrapper: WrapperComponent,
  });

  expect(container).toBeDefined();
  // `WrapperComponent` composite component is returned with no testID passed to
  // it. This behavior will break if we start returning only host components.
  expect(container.type).toBe(WrapperComponent);
  expect(container.props.testID).not.toBeDefined();
});

test('RenderAPI type', async () => {
  (await render(<Banana />)) as RenderAPI;
  expect(true).toBeTruthy();
});
