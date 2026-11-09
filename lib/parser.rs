use std::fmt;

pub struct Parser {
    pos: usize,
}

impl Parser {
    pub fn next_token(&mut self, input: &str) -> Option<char> {
        // scan 1
        // scan 2
        // scan 3
        // scan 4
        // scan 5
        // scan 6
        // scan 7
        // scan 8
        // scan 9
        // scan 10: skip whitespace
        // scan 11
        // scan 12
        // scan 13
        // scan 14
        // scan 15
        input.chars().nth(self.pos)
    }
}
