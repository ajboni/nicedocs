# Folder Structure.

- `__sapper__` folder contains both the server and client bundles.
- `__cypress__` for testing, Not configured in this project.
- `docs` is where the documentation file should be.
- `src` source files.
- `static` Static files should be put here. They will be copied to the root directory of the published site. Relative links on markdown files will be relative to this folder.

## Docs Folder

You can nest unlimited\* folders and markdown (.md) files here. However the first level is reserved for localization.
In the following levels folders and files will be rendered in the sidebar as navigation links. Folders will display a collapsable item, while links will render the md file in the content area.

An example folder structure would be:

````
docs/
    eng/
        1__About/
            1__Hello.md
    spa/
        1_Sobre
            1_Hola.md
    ```
````
