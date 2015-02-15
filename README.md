# Schonsole v0.1

Sched Live Console. Friendly wrapper around jq-console.

## Installation
TODO: add text
       
## Origin Story
Sometimes we need to quickly prototype a piece of code or just dump some value
I wished for something like this for years, tried php-i, tried php-a,
asked Ante, he was using index.php to make sure he doesn't forget to clean up
Sometimes I just wanted to see if a code idea would work and the upload would take forever
There was no convention. 

## Project scope
Not a replacement for SSH console
            
## Features
TODO: add text

## Task Wishlist
- [x] Have the script self-install. To make it run, include single file
- [x] Hitting ESC should hide the console
- [ ] Write missing parts in Readme
- [ ] Document the backend file
- [ ] Ctrl+F should full-screen toggle
- [ ] Pressing Ctrl+H should print out the help text
- [ ] Make sure empty input doesn't get sent
- [ ] Implement the timeout for requests
- [ ] Clicking on the document.body (outside of console) hides the console
- [ ] Create several themes with different colors and prompts ( ☞ ☛ » ✌︎ ⚇ ≫ ⫸ ❱ ⭐️ 😾 💭 🎼 🔜 ► )
- [ ] Log the input history to localStorage, allow configuration
- [ ] Display the time response time as status
- [ ] Fetch additional often-needed backend data and display in an easy to expand manner
- [ ] Syntax highlighting?
- [ ] Safeguard the backend eval, define behavior for errors
- [ ] Syntax check (or check well formedness) on input before sending to backend
- [ ] Use autocomplete (common backend vars, language selected...)
- [ ] Contextual mode - instead of 'endpoint', send the input to the *current* page
- [ ] Do we want a blinking cursor?
- [ ] Collaborative mode, make it possible to type in other user's console.