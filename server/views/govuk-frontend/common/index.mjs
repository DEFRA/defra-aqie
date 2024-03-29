function mergeConfigs(...configObjects) {
  function flattenObject(configObject) {
    const flattenedObject = {};
    function flattenLoop(obj, prefix) {
      for (const [key, value] of Object.entries(obj)) {
        const prefixedKey = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === 'object') {
          flattenLoop(value, prefixedKey);
        } else {
          flattenedObject[prefixedKey] = value;
        }
      }
    }
    flattenLoop(configObject);
    return flattenedObject;
  }
  const formattedConfigObject = {};
  for (const configObject of configObjects) {
    const obj = flattenObject(configObject);
    for (const [key, value] of Object.entries(obj)) {
      formattedConfigObject[key] = value;
    }
  }
  return formattedConfigObject;
}
function extractConfigByNamespace(configObject, namespace) {
  const newObject = {};
  for (const [key, value] of Object.entries(configObject)) {
    const keyParts = key.split('.');
    if (keyParts[0] === namespace) {
      if (keyParts.length > 1) {
        keyParts.shift();
      }
      const newKey = keyParts.join('.');
      newObject[newKey] = value;
    }
  }
  return newObject;
}
function getFragmentFromUrl(url) {
  if (!url.includes('#')) {
    return undefined;
  }
  return url.split('#').pop();
}
function isSupported($scope = document.body) {
  if (!$scope) {
    return false;
  }
  return $scope.classList.contains('govuk-frontend-supported');
}
function validateConfig(schema, config) {
  const validationErrors = [];
  for (const [name, conditions] of Object.entries(schema)) {
    const errors = [];
    for (const {
      required,
      errorMessage
    } of conditions) {
      if (!required.every(key => !!config[key])) {
        errors.push(errorMessage);
      }
    }
    if (name === 'anyOf' && !(conditions.length - errors.length >= 1)) {
      validationErrors.push(...errors);
    }
  }
  return validationErrors;
}

/**
 * Schema for component config
 *
 * @typedef {object} Schema
 * @property {SchemaCondition[]} [anyOf] - List of schema conditions
 */

/**
 * Schema condition for component config
 *
 * @typedef {object} SchemaCondition
 * @property {string[]} required - List of required config fields
 * @property {string} errorMessage - Error message when required config fields not provided
 */

export { extractConfigByNamespace, getFragmentFromUrl, isSupported, mergeConfigs, validateConfig };
//# sourceMappingURL=index.mjs.map
