/// Import `serde` from `near_sdk` crate
use near_sdk::serde::{Deserialize, Serialize};

/// Import `borsh` from `near_sdk` crate
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, PanicOnDefault};

/// Main contract structure serialized with Borsh
#[near_bindgen]
#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize, PanicOnDefault)]
/// Implements both `serde` and `borsh` serialization.
/// `serde` is typically useful when returning a struct in JSON format for a frontend.
// This Struct should act as a template definition to all my products
#[serde(crate = "near_sdk::serde")]
pub struct Calculator {
    postfix: String,
    result: f32,
}

#[near_bindgen]
impl Calculator {
    // initializing the contract
    #[init]
    pub fn new() -> Calculator {
        Calculator {
            postfix: "".to_string(),
            result: 0.0,
        }
    }

    // a bool function that checks if a character is an operand
    pub fn is_operand(&self, ch: char) -> bool {
        if ch >= '0' && ch <= '9' {
            true
        } else {
            false
        }
    }

    // a bool function that checks if a character is an operator
    pub fn is_operator(&self, ch: char) -> bool {
        if ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '^' {
            true
        } else {
            false
        }
    }

    // a utitlity function used to convert an expression from infix to postfix
    pub fn infix_to_postfix(&mut self, expression: String) -> String {
        // initializing a vector that will be used to act as a stack
        let mut stack_char: Vec<char> = Vec::new();

        // initializing a counter that will help to break the loop when the size
        // length of the string has reached
        let mut counter = 0;

        // Initializing an empty string that will store the resulting postfix expression
        let mut postfix = String::from("");

        // checking the length of the expression to be evaluated
        let length = expression.len();

        // looping through the string and converting it to postfix expression
        loop {
            // if statement to break the loop when the counter is equal to the length of the string
            if counter == length {
                break;
            }
            // initializing a character called 'top' that will be used to store the characters that are on top
            // of the stack
            let mut top: char = ' ';

            // checking if the stack is empty; if not, we asign the character on top of the stack to the 'top'
            // variable
            if stack_char.len() >= 1 {
                top = stack_char[stack_char.len() - 1];
            }

            // converting the specific character to its ASCII code e.g. a = 97
            let b: u8 = expression.as_bytes()[counter];

            // taking the ASCII code of the given character and storing it as a character in
            // variable ch
            let ch: char = b as char;

            // checking if 'ch' is an operator or an operand or a dot (.)
            // if it either of the above, then we proceed with our operation else the code should panick
            if self.is_operator(ch) || self.is_operand(ch) || ch == '(' || ch == ')' || ch == '.' {
                // if 'ch' is an open bracket, it should be pushed into the the stack
                if ch == '(' {
                    stack_char.push(ch);
                }
                // if 'ch' is a closing bracket, then the contents of the stack should be poped out and be pushed into
                // our 'postfix' string variable
                else if ch == ')' {
                    while !stack_char.is_empty() && top != '(' {
                        postfix.push(top);
                        stack_char.pop();
                        if stack_char.len() >= 1 {
                            top = stack_char[stack_char.len() - 1];
                        }
                    }

                    // these blocks of codes were created to remove redundant operators that were being
                    // inserted into the postfix string
                    let c: u8 = postfix.as_bytes()[postfix.len() - 1];
                    let ch_a: char = c as char;

                    let d: u8 = postfix.as_bytes()[postfix.len() - 2];
                    let ch_b: char = d as char;

                    if ch_a == ch_b {
                        postfix.pop();
                    }

                    // checks if the stack is not empty
                    // this will help to remove the residual opening brackets '('
                    if !stack_char.is_empty() {
                        stack_char.pop();
                    }
                }
                // this is supposed to push space; space will act as a seperator
                // in our expression
                else if self.is_operator(ch) {
                    postfix.push(' ');

                    // this checks for precedence of the current character in our expression e.g.
                    // expression[i]
                    let precedence_ch = match ch {
                        '+' | '-' => 1,
                        '*' | '/' => 2,
                        '^' => 3,
                        _ => 0,
                    };

                    // this checks for precedence of the character on top of the stack
                    let precedence_top = match top {
                        '+' | '-' => 1,
                        '*' | '/' => 2,
                        '^' => 3,
                        _ => 0,
                    };
                    // this compares the precedence of the character on top of the stack
                    // and the the current character in the expression
                    while !stack_char.is_empty() && precedence_ch <= precedence_top {
                        postfix.push(top);
                        stack_char.pop();
                    }
                    stack_char.push(ch);
                } else if self.is_operand(ch) || ch == '.' {
                    postfix.push(ch);
                } else {
                    let msg = format!("Error in loop postfix");
                    env::log(msg.as_bytes());
                }
            } else {
                let msg = format!("Enter the correct expression");
                env::panic(msg.as_bytes());
            }
            counter = counter + 1;
        }

        while !stack_char.is_empty() {
            postfix.push(stack_char[stack_char.len() - 1]);
            stack_char.pop();
        }

        // converts postfix to an owned variable the returns the resulting postfix expression
        let res = &postfix;
        self.postfix = res.to_owned();
        postfix
    }

    // function that carries out the computation
    pub fn solve_expression(&mut self, n1: String) -> f32 {
        // this variable is supposed to convert the 'n1' infix expression to postifx
        let n = self.infix_to_postfix(n1);

        // we're are creating a vector that will act as a stack of floats
        let mut stack_float: Vec<f32> = Vec::new();

        // creating a variable that will hold an empty string
        let mut expression: String = String::from("");

        let mut counter = 0;

        // takes the length of our postfix expression
        let length = n.len();

        loop {
            if counter == length {
                break;
            }

            let b: u8 = n.as_bytes()[counter];
            let ch: char = b as char;

            if self.is_operand(ch) || ch == '.' {
                expression.push(ch);
            } else if ch == ' ' {
                if expression.len() > 0 {
                    let x: f32 = expression.parse().unwrap();
                    stack_float.push(x);
                    expression = String::from("");
                }
            } else if self.is_operator(ch) {
                if expression.len() > 0 {
                    let a: f32 = expression.parse().unwrap();
                    stack_float.push(a);
                    expression = String::from("");
                }

                let mut x: f32 = 0.00;
                let mut y: f32 = 0.00;

                if !stack_float.is_empty() {
                    x = stack_float[stack_float.len() - 1];
                    stack_float.pop();
                    y = stack_float[stack_float.len() - 1];
                    stack_float.pop();
                }

                match ch {
                    '+' => {
                        let z: f32 = y + x;
                        stack_float.push(z);
                    }
                    '-' => {
                        let z: f32 = y - x;
                        stack_float.push(z);
                    }
                    '*' => {
                        let z: f32 = y * x;
                        stack_float.push(z);
                    }
                    '/' => {
                        let z: f32 = y / x;
                        stack_float.push(z);
                    }
                    '^' => stack_float.push(y.powf(x)),
                    _ => {
                        let msg = format!("Error in switch case");
                        env::panic(msg.as_bytes());
                    }
                }
            }

            counter = counter + 1;
        }

        if !stack_float.is_empty() {
            self.result = stack_float[stack_float.len() - 1];
            stack_float[stack_float.len() - 1]
        } else {
            self.result = stack_float[stack_float.len() - 1];
            -1.00
        }
    }

    pub fn get_expression_result(&self) -> f32 {
        self.result
    }

    pub fn get_expression_postfix(&self) -> String {
        let x = &self.postfix;
        x.to_owned()
    }
}

// Tests
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice.testnet".to_string(),
            signer_account_id: "robert.testnet".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "jane.testnet".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 1_000_000_000_000_000_000_000_000,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    #[test]
    fn infix_to_postfix() {
        let context = get_context(vec![], false);
        testing_env!(context);

        let mut calculator = Calculator::new();
        calculator.infix_to_postfix(String::from("(2^4)*2"));
        assert_eq!("2 4^ 2*", calculator.postfix);
    }

    #[test]
    fn solve_expression() {
        let context = get_context(vec![], false);
        testing_env!(context);

        let mut calculator = Calculator::new();
        calculator.solve_expression(String::from("(((((300*2)/5)*4)^2)+4)-4"));
        assert_eq!(230400.0, calculator.result);
    }
}
