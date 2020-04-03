# Naming Rules

### Ordering

Files will be parsed and ordered alphabetically. In order to enforce custom ordering, you can prefix folder/files with `__`
Anything before `__` will be used only for ordering and it will be striped from the name.
Also, any underscore in the name will be converted to a space on the sidebar.

```
001__Hello.md			// It will be rendered first as 'Hello'
aza__Something_else.md		// It will be rendered second as 'Something else'
zzz__Anything_else.md		// It will be rendered third as 'Anything else'
```
