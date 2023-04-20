# dfws (Decentralized File Tree Web Server)

This code defines an actor that manages a file tree using TrieMap. The file tree consists of folders and files, where each folder can have multiple files. The implementation provides methods to add folders and files to the tree and browse the tree content.

***Please note that this dfws code has not been thoroughly tested, and you may encounter many bugs. Use it at your own risk, and feel free to report any issues you find or contribute to help fixing the code bug you might encounter.***

## Key Components

### Imports

The code imports the following modules:

- TrieMap: A mutable, concurrent map collection used to store the file tree data.
- Text: A string-like data type used as the key type in the TrieMap.
- Blob: A data type used to represent the content of files.
- List: A collection type used to store lists of files in a folder.
- Iter: A module that provides methods to iterate over collections.

### Type Definitions

The code defines the following record types:

- File: A record type representing a file with a name and content.
- Folder: A record type representing a folder with a name and a list of files.
- FileTree: A TrieMap with keys of type Text and values of type Folder.
- Result: A variant type representing a result, which can either be Ok with a value or an error message.

### Functions

The code includes the following helper functions:

- customHash: A custom hash function for Text.
- customEq: A custom equality function for Text.

### Variable

- fileTree: This is the main TrieMap structure that stores the folders and their content.

### Methods

The code provides the following methods:

- addFolder(folderName: Text) -> Result: Takes a folder name as input and creates a new folder with that name. Returns a Result type indicating success or error.
- addFile(folderName: Text, fileName: Text, content: Blob) -> Result: Takes a folder name, file name, and content as input, and adds the file in the specified folder. Returns a Result type indicating success or error.
- browse() -> List: Returns a list of all the entries in the file tree.

This actor can be used to manage a file system-like structure using TrieMap, allowing for the addition of folders and files, as well as browsing the contents of the tree.

## Project File Structure

```plaintext
- dfx.json
- src/
  - backend/
    - main.mo
  - frontend/
    - index.html
    - index.js
    - package.json
    - webpack.config.js
 ```

**Note**: You need other files like `dfx.json`, `index.html`, `index.js`, `package.json`, and `webpack.config.js` to make it a full dApp.

## Using dfws on the Internet Computer

To create a decentralized file/web server dApp for the Internet Computer, you'll need to set up a frontend (using React, for example) that interacts with the backend canister smart contract. The backend will be based on the provided main.mo code.

To get started, follow these general steps:

1. Set up a new project and create a frontend using a web development framework such as React, Vue.js, or Angular.
2. Create a new canister smart contract for the backend using the provided main.mo code.
3. Integrate the frontend with the backend by making HTTP calls to the backend canister's endpoints using the Internet Computer's ic package.
4. Implement the necessary frontend features to allow users to interact with the backend canister's functions and display the results.

For more detailed instructions, refer to the documentation on the Internet Computer developer website.
