import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from 'react-native';
import { render, getDefaultNormalizer, within } from '../..';

type MyButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
};
const MyButton = ({ children, onPress }: MyButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{children}</Text>
  </TouchableOpacity>
);

const Banana = () => {
  const test = 0;
  return (
    <View>
      <Text>Is the banana fresh?</Text>
      <Text testID="bananaFresh">not fresh</Text>

      <MyButton onPress={jest.fn()}>Change freshness!</MyButton>
      <Text testID="duplicateText">First Text</Text>
      <Text testID="duplicateText">Second Text</Text>
      <Text>{test}</Text>
    </View>
  );
};

type ChildrenProps = { children: React.ReactNode };

test('getByText, queryByText', async () => {
  const { getByText, queryByText } = await render(<Banana />);
  const button = getByText(/change/i);

  expect(button.props.children).toBe('Change freshness!');

  const sameButton = getByText('not fresh');

  expect(sameButton.props.children).toBe('not fresh');
  expect(() => getByText('InExistent')).toThrow(
    'Unable to find an element with text: InExistent'
  );

  const zeroText = getByText('0');

  expect(queryByText(/change/i)).toBe(button);
  expect(queryByText('InExistent')).toBeNull();
  expect(() => queryByText(/fresh/)).toThrow(
    'Found multiple elements with text: /fresh/'
  );
  expect(queryByText('0')).toBe(zeroText);
});

test('getByText, queryByText with children as Array', async () => {
  type BananaCounterProps = { numBananas: number };
  const BananaCounter = ({ numBananas }: BananaCounterProps) => (
    <Text>There are {numBananas} bananas in the bunch</Text>
  );

  const BananaStore = () => (
    <View>
      <BananaCounter numBananas={3} />
      <BananaCounter numBananas={6} />
      <BananaCounter numBananas={5} />
    </View>
  );

  const { getByText } = await render(<BananaStore />);

  const threeBananaBunch = getByText('There are 3 bananas in the bunch');
  expect(threeBananaBunch.props.children).toEqual([
    'There are ',
    3,
    ' bananas in the bunch',
  ]);
});

test('getAllByText, queryAllByText', async () => {
  const { getAllByText, queryAllByText } = await render(<Banana />);
  const buttons = getAllByText(/fresh/i);

  expect(buttons).toHaveLength(3);
  expect(() => getAllByText('InExistent')).toThrow(
    'Unable to find an element with text: InExistent'
  );

  expect(queryAllByText(/fresh/i)).toEqual(buttons);
  expect(queryAllByText('InExistent')).toHaveLength(0);
});

test('findByText queries work asynchronously', async () => {
  const options = { timeout: 10 }; // Short timeout so that this test runs quickly
  const { rerender, findByText, findAllByText } = await render(<View />);
  await expect(findByText('Some Text', {}, options)).rejects.toBeTruthy();
  await expect(findAllByText('Some Text', {}, options)).rejects.toBeTruthy();

  setTimeout(
    () =>
      rerender(
        <View>
          <Text>Some Text</Text>
        </View>
      ),
    20
  );

  await expect(findByText('Some Text')).resolves.toBeTruthy();
  await expect(findAllByText('Some Text')).resolves.toHaveLength(1);
}, 20000);

test('getByText works properly with custom text component', async () => {
  function BoldText({ children }: ChildrenProps) {
    return <Text>{children}</Text>;
  }

  expect(
    (await render(<Text>
      <BoldText>Hello</BoldText>
    </Text>)).getByText('Hello')
  ).toBeTruthy();
});

test('getByText works properly with custom text container', async () => {
  function MyText({ children }: ChildrenProps) {
    return <Text>{children}</Text>;
  }
  function BoldText({ children }: ChildrenProps) {
    return <Text>{children}</Text>;
  }

  expect(
    (await render(<MyText>
      <BoldText>Hello</BoldText>
    </MyText>)).getByText('Hello')
  ).toBeTruthy();
});

test('queryByText nested <Image> in <Text> at start', async () => {
  expect(
    (await render(<Text>
      <Image source={{}} />
      Hello
    </Text>)).queryByText('Hello')
  ).toBeTruthy();
});

test('queryByText nested <Image> in <Text> at end', async () => {
  expect(
    (await render(<Text>
      Hello
      <Image source={{}} />
    </Text>)).queryByText('Hello')
  ).toBeTruthy();
});

test('queryByText nested <Image> in <Text> in middle', async () => {
  expect(
    (await render(<Text>
      Hello
      <Image source={{}} />
      World
    </Text>)).queryByText('HelloWorld')
  ).toBeTruthy();
});

test('queryByText not found', async () => {
  expect(
    (await render(<Text>
      Hello
      <Image source={{}} />
    </Text>)).queryByText('SomethingElse')
  ).toBeFalsy();
});

test('queryByText does not match nested text across multiple <Text> in <Text>', async () => {
  const { queryByText } = await render(<Text nativeID="1">
    Hello{' '}
    <Text nativeID="2">
      World
      <Text>!{true}</Text>
    </Text>
  </Text>);

  expect(queryByText('Hello World!')).toBe(null);
});

test('queryByText with nested Text components return the closest Text', async () => {
  const NestedTexts = () => (
    <Text nativeID="1">
      <Text nativeID="2">My text</Text>
    </Text>
  );

  const { queryByText } = await render(<NestedTexts />);

  expect(queryByText('My text', { exact: false })?.props.nativeID).toBe('2');
});

test('queryByText with nested Text components each with text return the lowest one', async () => {
  const NestedTexts = () => (
    <Text nativeID="1">
      bob
      <Text nativeID="2">My text</Text>
    </Text>
  );

  const { queryByText } = await render(<NestedTexts />);

  expect(queryByText('My text', { exact: false })?.props.nativeID).toBe('2');
});

test('queryByText nested deep <CustomText> in <Text>', async () => {
  const CustomText = ({ children }: ChildrenProps) => {
    return <Text>{children}</Text>;
  };

  expect(
    (await render(<Text>
      <CustomText>Hello</CustomText> <CustomText>World!</CustomText>
    </Text>)).queryByText('Hello World!')
  ).toBe(null);
});

test('queryByText with nested Text components: not-exact text match returns the most deeply nested common component', async () => {
  const { queryByText: queryByTextFirstCase } = await render(<Text nativeID="1">
    bob
    <Text nativeID="2">My </Text>
    <Text nativeID="3">text</Text>
  </Text>);

  const { queryByText: queryByTextSecondCase } = await render(<Text nativeID="1">
    bob
    <Text nativeID="2">My text for test</Text>
  </Text>);

  expect(queryByTextFirstCase('My text')).toBe(null);
  expect(
    queryByTextSecondCase('My text', { exact: false })?.props.nativeID
  ).toBe('2');
});

test('queryAllByText does not match several times the same text', async () => {
  const allMatched = (await render(<Text nativeID="1">
    Start
    <Text nativeID="2">This is a long text</Text>
  </Text>)).queryAllByText('long text', { exact: false });
  expect(allMatched.length).toBe(1);
  expect(allMatched[0].props.nativeID).toBe('2');
});

test('queryAllByText matches all the matching nodes', async () => {
  const allMatched = (await render(<Text nativeID="1">
    Start
    <Text nativeID="2">This is a long text</Text>
    <Text nativeID="3">This is another long text</Text>
  </Text>)).queryAllByText('long text', { exact: false });
  expect(allMatched.length).toBe(2);
  expect(allMatched.map((node) => node.props.nativeID)).toEqual(['2', '3']);
});

describe('supports TextMatch options', () => {
  test('getByText, getAllByText', async () => {
    const { getByText, getAllByText } = await render(<View>
      <Text testID="text">Text and details</Text>
      <Button
        testID="button"
        title="Button and a detail"
        onPress={jest.fn()}
      />
    </View>);

    expect(getByText('details', { exact: false })).toBeTruthy();
    expect(getAllByText('detail', { exact: false })).toHaveLength(2);
  });

  test('getByPlaceholderText, getAllByPlaceholderText', async () => {
    const { getByPlaceholderText, getAllByPlaceholderText } = await render(<View>
      <TextInput placeholder={'Placeholder with details'} />
      <TextInput placeholder={'Placeholder with a DETAIL'} />
    </View>);

    expect(getByPlaceholderText('details', { exact: false })).toBeTruthy();
    expect(getAllByPlaceholderText('detail', { exact: false })).toHaveLength(2);
  });

  test('getByDisplayValue, getAllByDisplayValue', async () => {
    const { getByDisplayValue, getAllByDisplayValue } = await render(<View>
      <TextInput value={'Value with details'} />
      <TextInput value={'Value with a detail'} />
    </View>);

    expect(getByDisplayValue('details', { exact: false })).toBeTruthy();
    expect(getAllByDisplayValue('detail', { exact: false })).toHaveLength(2);
  });

  test('getByTestId, getAllByTestId', async () => {
    const { getByTestId, getAllByTestId } = await render(<View>
      <View testID="test" />
      <View testID="tests id" />
    </View>);
    expect(getByTestId('id', { exact: false })).toBeTruthy();
    expect(getAllByTestId('test', { exact: false })).toHaveLength(2);
  });

  test('with TextMatch option exact === false text search is NOT case sensitive', async () => {
    const { getByText, getAllByText } = await render(<View>
      <Text testID="text">Text and details</Text>
      <Button
        testID="button"
        title="Button and a DeTAil"
        onPress={jest.fn()}
      />
    </View>);

    expect(getByText('DeTaIlS', { exact: false })).toBeTruthy();
    expect(getAllByText('detail', { exact: false })).toHaveLength(2);
  });
});

describe('Supports normalization', () => {
  test('trims and collapses whitespace by default', async () => {
    const { getByText } = await render(<View>
      <Text>{`  Text     and


      whitespace`}</Text>
    </View>);

    expect(getByText('Text and whitespace')).toBeTruthy();
  });

  test('trim and collapseWhitespace is customizable by getDefaultNormalizer param', async () => {
    const testTextWithWhitespace = `  Text     and


        whitespace`;
    const { getByText } = await render(<View>
      <Text>{testTextWithWhitespace}</Text>
    </View>);

    expect(
      getByText(testTextWithWhitespace, {
        normalizer: getDefaultNormalizer({
          trim: false,
          collapseWhitespace: false,
        }),
      })
    ).toBeTruthy();
  });

  test('normalizer function is customisable', async () => {
    const testText = 'A TO REMOVE text';
    const normalizerFn = (textToNormalize: string) =>
      textToNormalize.replace('TO REMOVE ', '');
    const { getByText } = await render(<View>
      <Text>{testText}</Text>
    </View>);

    expect(getByText('A text', { normalizer: normalizerFn })).toBeTruthy();
  });
});

test('getByText and queryByText work properly with text nested in React.Fragment', async () => {
  const { getByText, queryByText } = await render(<Text>
    <>Hello</>
  </Text>);
  expect(getByText('Hello')).toBeTruthy();
  expect(queryByText('Hello')).not.toBeNull();
});

test('getByText and queryByText work properly with text partially nested in React.Fragment', async () => {
  const { getByText, queryByText } = await render(<Text>
    He<>llo</>
  </Text>);
  expect(getByText('Hello')).toBeTruthy();
  expect(queryByText('Hello')).not.toBeNull();
});

test('getByText and queryByText work properly with multiple nested fragments', async () => {
  const { getByText, queryByText } = await render(<Text>
    He
    <>
      l<>l</>o
    </>
  </Text>);
  expect(getByText('Hello')).toBeTruthy();
  expect(queryByText('Hello')).not.toBeNull();
});

test('getByText and queryByText work with newlines', async () => {
  const textWithNewLines = 'Line 1\nLine 2';
  const { getByText, queryByText } = await render(<Text>{textWithNewLines}</Text>);
  expect(getByText(textWithNewLines)).toBeTruthy();
  expect(queryByText(textWithNewLines)).toBeTruthy();
});

test('getByText and queryByText work with tabs', async () => {
  const textWithTabs = 'Line 1\tLine 2';
  const { getByText, queryByText } = await render(<Text>{textWithTabs}</Text>);
  expect(getByText(textWithTabs)).toBeTruthy();
  expect(queryByText(textWithTabs)).toBeTruthy();
});

test('getByText searches for text within itself', async () => {
  const { getByText } = await render(<Text testID="subject">Hello</Text>);
  const textNode = within(getByText('Hello'));
  expect(textNode.getByText('Hello')).toBeTruthy();
});

test('getByText searches for text within self host element', async () => {
  const { getByTestId } = await render(<Text testID="subject">Hello</Text>);
  const textNode = within(getByTestId('subject'));
  expect(textNode.getByText('Hello')).toBeTruthy();
});
