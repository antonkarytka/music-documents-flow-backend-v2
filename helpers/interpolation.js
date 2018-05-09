/**
 * Keys for interpolation must be surrounded by curly braces like this:
 * Hello, {firstName} {lastName}.
 *
 * @param string - string to interpolate
 * @param props - object for substitution of corresponding keys in a string
 * @returns interpolated string
 */
function interpolate(string, props) {
  if (!string) return Promise.reject('String to interpolate must be provided.');
  if (!props) return Promise.reject('Substitution object must be provided.');

  return string.replace(/\{(\w+)\}/g, (match, substringKey) => {
    if (props[substringKey] && !substringKey.toLowerCase().includes('id')) {
      return !isNaN(new Date(props[substringKey]).valueOf()) // if not invalid date
        ? new Date(props[substringKey]).toLocaleDateString(
            'en-US',
            { year: '2-digit', month: '2-digit', day: '2-digit' }
          )
        : props[substringKey];
    } else return substringKey;
  });
}

module.exports = interpolate;