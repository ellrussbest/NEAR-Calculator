# A NEAR-calculator that obeys BODMAS

 The <strong>LINK</strong> to the demo of the Dapp is:  <strong style=font-size:20px>[Demo Dapp](https://ellrussbest.github.io/NEAR-Calculator/)</strong>.


This code is used to take an input of an expression as a string. It will then traverse through the whole string to solve the mathematical equation.

The code will basically solve the basic arithmetic problems including:
- addition
- subtraction
- multiplication
- division
- power

It will solve this obeying the BODMAS rules.

It does the above by first converting the infix string expression e.g. `1+2` to postfix expression e.g. `1 2+`. Even the largest of expressions can be converted to a postfix expression and hence this will allow us to solve the expression using upholding the precedence law.

We will be using stacks to help us solve this particular type of expression.

# Front END

The front end is simple UI and you can either write a <strong>Valid</strong> expression at the input field or you can use the buttons to key in.

To get your answer you need to press the equal sign `=` button.
You can convert your expression to postfix using `convert to postfix` button.