This code explains the working of how our code is passed through differents steps to convert into executable code.
<br/>
first the compiler() takes the source_code and passed it to lexer().
<br/>
lexer() converts the code into tokens.
<br/>
These tokens are passed to parser() which make the AST(Abstract Syntax Tree).
<br/>
Then the nodes of AST are passed to Codegen() which converts this into executable code.
<br/>
This compiler returns the executable code.
<br/>
execute() takes the executable code and runs it
