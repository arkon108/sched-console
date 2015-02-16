# Schonsole v0.1
Sched Live Console. Simple wrapper around jq-console.



## Installation
Include the "schonsole.js" in your HTML with other Javascript files. Write your server evaluator and point the Schonsole to it.


## Wishlist
- [x] Have the script self-install. To make it run, include single file
- [x] Hitting ESC should hide the console
- [x] Add the #schonsole div to the installation
- [x] Write missing parts in Readme
- [x] Ctrl+F should full-screen toggle
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
- [ ] Include the Debug flag
- [ ] Figure out a way to plug into every next request