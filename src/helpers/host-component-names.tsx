import { Switch, Text, TextInput, View } from 'react-native';
import { configureInternal, getConfig, HostComponentNames } from '../config';

export function getHostComponentNames(): HostComponentNames {
  let hostComponentNames = getConfig().hostComponentNames;
  if (!hostComponentNames) {
    hostComponentNames = detectHostComponentNames();
    configureInternal({ hostComponentNames });
  }

  return hostComponentNames;
}

export function configureHostComponentNamesIfNeeded() {
  const configHostComponentNames = getConfig().hostComponentNames;
  if (configHostComponentNames) {
    return;
  }

  const hostComponentNames = detectHostComponentNames();
  configureInternal({ hostComponentNames });
}

function detectHostComponentNames(): HostComponentNames {
  return {
    switch: 'RCTSwitch',
    text: (Text as any).displayName,
    textInput: (TextInput as any).displayName,
  };
}
