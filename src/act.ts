// This file and the act() implementation is sourced from react-testing-library
// https://github.com/testing-library/react-testing-library/blob/c80809a956b0b9f3289c4a6fa8b5e8cc72d6ef6d/src/act-compat.js
import { act as reactTestRendererAct } from 'react-test-renderer';
import { checkReactVersionAtLeast } from './react-versions';

const actMock = async <T>(callback: () => Promise<T> | T) => {
  return await callback();
};

// See https://github.com/reactwg/react-18/discussions/102 for more context on global.IS_REACT_ACT_ENVIRONMENT
declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

function setIsReactActEnvironment(isReactActEnvironment: boolean | undefined) {
  globalThis.IS_REACT_ACT_ENVIRONMENT = isReactActEnvironment;
}

function getIsReactActEnvironment() {
  return globalThis.IS_REACT_ACT_ENVIRONMENT;
}

type Act = <T>(scope: () => Promise<T> | T) => Promise<T>;

function withGlobalActEnvironment(actImplementation: Act): Act {
  return async <T>(scope: () => Promise<T> | T) => {
    const previousActEnvironment = getIsReactActEnvironment();
    setIsReactActEnvironment(true);

    // this code is riddled with eslint disabling comments because this doesn't use real promises but eslint thinks we do
    try {
      const actResult = await actImplementation(async () => {
        return scope();
      });
      return actResult;
    } finally {
      setIsReactActEnvironment(previousActEnvironment);
    }
  };
}
const getAct = (): Act => {
  if (!reactTestRendererAct) {
    return actMock;
  }

  return checkReactVersionAtLeast(18, 0)
    ? withGlobalActEnvironment(reactTestRendererAct)
    : function compatAct(scope) {
        return (reactTestRendererAct as Act)(async () => {
          return scope();
        });
      };
};
const act = getAct();

export default act;
export {
  setIsReactActEnvironment as setReactActEnvironment,
  getIsReactActEnvironment,
};
