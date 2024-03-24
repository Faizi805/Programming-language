function lexer(source_code) {
  const tokens = [];
  let index = 0;
  while (index < source_code.length) {
    let char = source_code[index];

    // Skip whitespace
    // if (char === " ") {
    //   index++;
    //   continue;
    // }
    if (/\s/.test(char)) {
      index++;
      continue;
    }

    if (/[a-zA-Z]/.test(char)) {
      let word = "";
      while (/[a-zA-Z0-9]/.test(source_code[index])) {
        word += char;
        char = source_code[++index];
      }
      if (word === "ye" || word === "bol") {
        tokens.push({ type: "keyword", value: word });
      } else {
        tokens.push({ type: "identifier", value: word });
      }
      continue;
    }
    if (/[0-9]/.test(char)) {
      let number = "";
      while (/[0-9]/.test(char)) {
        number += char;
        char = source_code[++index];
      }
      tokens.push({ type: "number", value: parseInt(number) });
      continue;
    }
    // Tokenize operators and equals sign
    if (/[\+\-\*\/=]/.test(char)) {
      tokens.push({ type: "operator", value: char });
      index++;
      continue;
    }

    //     if (char === '+') {
    //         tokens.push({ type: 'plus' });
    //     } else if (char === '-') {
    //         tokens.push({ type: 'minus' });
    //     } else if (char === '*') {
    //         tokens.push({ type: 'multiply' });
    //     } else if (char === '/') {
    //         tokens.push({ type: 'divide' });
    //     } else if (char === '(') {
    //         tokens.push({ type: 'left_paren' });
    //     } else if (char === ')') {
    //         tokens.push({ type: 'right_paren' });
    //     } else if (char === ' ') {
    //         // skip
    //     } else {
    //         throw new Error('Unknown character');
    //     }
    //     index++;
    // }
    // return tokens;
  }
  return tokens;
}

function parser(tokens) {
  const ast = {
    type: "Program",
    body: [],
  };

  while (tokens.length > 0) {
    let token = tokens.shift();
    if (token.type === "keyword" && token.value === "ye") {
      let declaration = {
        type: "Declaration",
        name: tokens.shift().value,
        value: null,
      };
      //   Check if the next token is an equals sign
      //   let nextToken = tokens.shift();
      //   if (nextToken.type === "operator" && nextToken.value === "=") {
      //     declaration.value = tokens.shift();
      //   }
      if (tokens[0].type === "operator" && tokens[0].value === "=") {
        tokens.shift(); // Remove the equals sign
        // parse the value expression
        let expression = "";
        while (tokens.length > 0 && tokens[0].type !== "keyword") {
          expression += tokens.shift().value;
        }
        declaration.value = expression.trim();
      }
      ast.body.push(declaration);
    }

    if (token.type === "keyword" && token.value === "bol") {
      ast.body.push({
        type: "print",
        expression: tokens.shift().value,
        // value: tokens.shift().value,
      });
    }

    // if(token.type === "keyword") {
    //     if(token.value === "ye") {
    //         ast.body.push({
    //             type: "VariableDeclaration",
    //             id: {
    //                 type: "Identifier",
    //                 name: tokens.shift().value,
    //             },
    //             init: {
    //                 type: "NumericLiteral",
    //                 value: tokens.shift().value,
    //             },
    //         });
    //     } else if(token.value === "bol") {
    //         ast.body.push({
    //             type: "BooleanLiteral",
    //             value: tokens.shift().value,
    //         });
    //     }
    // }
  }

  //     let index = 0;
  //   while (index < tokens.length) {
  //     const token = tokens[index];
  //     if (token.type === "number") {
  //       index++;
  //       continue;
  //     }
  //     if (token.type === "identifier") {
  //       index++;
  //       continue;
  //     }
  //     if (token.type === "operator") {
  //       index++;
  //       continue;
  //     }
  //   }
  return ast; // Return the AST object
}

function codeGen(ast) {
  switch (ast.type) {
    case "Program":
      return ast.body.map(codeGen).join("\n");
    case "Declaration":
      return `let ${ast.name} = ${ast.value};`;
    case "print":
      return `console.log(${ast.expression});`;
    default:
      throw new Error(`Unknown node type: ${ast.type}`);
  }

  //   let executableCode = "";
  //   for (let i = 0; i < ast.body.length; i++) {
  //     const node = ast.body[i];
  //     if (node.type === "Declaration") {
  //       executableCode += `let ${node.name} = ${node.value};\n`;
  //     } else if (node.type === "print") {
  //       executableCode += `console.log(${node.expression});\n`;
  //     }
  //   }
  //   return executableCode;
}

function compiler(source_code) {
  const tokens = lexer(source_code);
  const ast = parser(tokens);
  const executableCode = codeGen(ast);
  //   console.log(executableCode);
  return executableCode;
}

function execute(code) {
  eval(code);
}

// const source_code = '1 + 2 * 3';
const code = `
ye x = 10
ye y = 40
ye sum = x - y
bol sum

`;

const exec = compiler(code);
execute(exec);
// console.log(exec);
