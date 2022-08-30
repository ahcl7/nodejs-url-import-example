import { get } from 'node:https';
import { get as getHttp } from 'node:http'
export function resolve(specifier, context, nextResolve) {
  const { parentURL = null } = context;

  // Normally Node.js would error on specifiers starting with 'https://', so
  // this hook intercepts them and converts them into absolute URLs to be
  // passed along to the later hooks below.
  if (specifier.startsWith('https://') || specifier.startsWith('http://')) {
    return {
      shortCircuit: true,
      url: specifier
    };
  } else if (parentURL && (parentURL.startsWith('https://') || parentURL.startsWith('http://'))) {
    return {
      shortCircuit: true,
      url: new URL(specifier, parentURL).href,
    };
  }

  // Let Node.js handle all other specifiers.
  return nextResolve(specifier);
}

export function load(url, context, nextLoad) {
  // For JavaScript to be loaded over the network, we need to fetch and
  // return it.

  const getter = url.startsWith('https://') ? get : (url.startsWith('http://') ? getHttp : null)
  if (!getter) return nextLoad(url)
  return new Promise((resolve, reject) => {
      getter(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve({
          // This example assumes all network-provided JavaScript is ES module
          // code.
          format: 'module',
          shortCircuit: true,
          source: data,
        }));
      }).on('error', (err) => reject(err));
    });
}
