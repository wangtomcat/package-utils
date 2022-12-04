export function checkJsonCode(strJsonCode) {
  let res = '';
  try {
    for (let i = 0, j = 0, k = 0, ii, ele; i < strJsonCode.length; i++) {
      ele = strJsonCode.charAt(i);
      if (j % 2 === 0 && ele === '}') {
        // eslint-disable-next-line no-plusplus
        k--;
        for (ii = 0; ii < k; ii++) ele = `    ${ele}`;
        ele = `\n${ele}`;
      } else if (j % 2 === 0 && ele === '{') {
        ele += '\n';
        // eslint-disable-next-line no-plusplus
        k++;
        for (ii = 0; ii < k; ii++) ele += '    ';
      } else if (j % 2 === 0 && ele === ',') {
        ele += '\n';
        for (ii = 0; ii < k; ii++) ele += '    ';
        // eslint-disable-next-line no-plusplus
      } else if (ele === '"') j++;
      res += ele;
    }
  } catch (error) {
    res = strJsonCode;
  }
  return res;
}