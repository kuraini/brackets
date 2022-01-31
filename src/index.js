module.exports = function check(str, bracketsConfig) {
  const openBrackets = [];
  const closeBrackets = [];
  const stack = [];

  for (let i = 0; i < bracketsConfig.length; i++) {
    openBrackets.push(bracketsConfig[i][0]);
    closeBrackets.push(bracketsConfig[i][1]);
  }

  for (let symbol of str) {
    if (closeBrackets.includes(symbol) && symbol !== '|' && symbol !== '7' && symbol !== '8') {
      if (stack.length === 0) {
        return false;
      }
      
      const top = stack[stack.length - 1];
      
      if (openBrackets.indexOf(top) !== closeBrackets.indexOf(symbol)) {
        return false
      } else {
        stack.pop();
      }
      
    } else if (symbol === '|' || symbol == '7' || symbol == '8') {
      if (stack.length === 0) {
        stack.push(symbol);
      } else {
        const top = stack[stack.length - 1];
        
        if (top === '|' && symbol === '|') {
          stack.pop();
        } else if (top === '7' && symbol === '7') {
          stack.pop();
        } else if (top === '8' && symbol === '8') {
          stack.pop();
        } else if (openBrackets.includes(top)) {
          stack.push(symbol);
        } else {
          return false;
        }
      }
      
    } else {
      stack.push(symbol);
    }
  }
  
  return stack.length === 0;
}
