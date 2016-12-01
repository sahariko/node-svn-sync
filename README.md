# Synchronous 

This is a module for working with [svn-spawn](https://github.com/ddliu/node-svn-spawn) synchronously. It works using generator functions and `yield` calls.
Feel free to add more methods.
 
### Dependencies

   - [svn-spawn](https://github.com/ddliu/node-svn-spawn)
   - [co](https://github.com/tj/co)

### Usage

1. `require()` the module wherever you plan to use it.
2. Execute `yield` + the command you want to use. For example: `yield update()`