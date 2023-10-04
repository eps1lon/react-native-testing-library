import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { render, isInaccessible } from '../..';

test('returns false for accessible elements', async () => {
  expect(
    isInaccessible((await render(<View testID="subject" />)).getByTestId('subject'))
  ).toBe(false);

  expect(
    isInaccessible(
      (await render(<Text testID="subject">Hello</Text>)).getByTestId('subject')
    )
  ).toBe(false);

  expect(
    isInaccessible(
      (await render(<TextInput testID="subject" />)).getByTestId('subject')
    )
  ).toBe(false);
});

test('detects elements with accessibilityElementsHidden prop', async () => {
  const view = await render(<View testID="subject" accessibilityElementsHidden />);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(true);
});

test('detects nested elements with accessibilityElementsHidden prop', async () => {
  const view = await render(<View accessibilityElementsHidden>
    <View testID="subject" />
  </View>);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(true);
});

test('detects deeply nested elements with accessibilityElementsHidden prop', async () => {
  const view = await render(<View accessibilityElementsHidden>
    <View>
      <View>
        <View testID="subject" />
      </View>
    </View>
  </View>);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(true);
});

test('detects elements with importantForAccessibility="no-hide-descendants" prop', async () => {
  const view = await render(<View testID="subject" importantForAccessibility="no-hide-descendants" />);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(true);
});

test('detects nested elements with importantForAccessibility="no-hide-descendants" prop', async () => {
  const view = await render(<View importantForAccessibility="no-hide-descendants">
    <View testID="subject" />
  </View>);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(true);
});

test('detects elements with display=none', async () => {
  const view = await render(<View testID="subject" style={{ display: 'none' }} />);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(true);
});

test('detects nested elements with display=none', async () => {
  const view = await render(<View style={{ display: 'none' }}>
    <View testID="subject" />
  </View>);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(true);
});

test('detects deeply nested elements with display=none', async () => {
  const view = await render(<View style={{ display: 'none' }}>
    <View>
      <View>
        <View testID="subject" />
      </View>
    </View>
  </View>);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(true);
});

test('detects elements with display=none with complex style', async () => {
  const view = await render(<View
    testID="subject"
    style={[{ display: 'flex' }, [{ display: 'flex' }], { display: 'none' }]}
  />);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(true);
});

test('is not trigged by opacity = 0', async () => {
  const view = await render(<View testID="subject" style={{ opacity: 0 }} />);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(false);
});

test('detects siblings of element with accessibilityViewIsModal prop', async () => {
  const view = await render(<View>
    <View accessibilityViewIsModal />
    <View testID="subject" />
  </View>);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(true);
});

test('detects deeply nested siblings of element with accessibilityViewIsModal prop', async () => {
  const view = await render(<View>
    <View accessibilityViewIsModal />
    <View>
      <View>
        <View testID="subject" />
      </View>
    </View>
  </View>);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(true);
});

test('is not triggered for element with accessibilityViewIsModal prop', async () => {
  const view = await render(<View>
    <View accessibilityViewIsModal testID="subject" />
  </View>);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(false);
});

test('is not triggered for child of element with accessibilityViewIsModal prop', async () => {
  const view = await render(<View>
    <View accessibilityViewIsModal>
      <View testID="subject" />
    </View>
  </View>);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(false);
});

test('is not triggered for descendent of element with accessibilityViewIsModal prop', async () => {
  const view = await render(<View>
    <View accessibilityViewIsModal>
      <View>
        <View>
          <View testID="subject" />
        </View>
      </View>
    </View>
  </View>);
  expect(isInaccessible(view.getByTestId('subject'))).toBe(false);
});
