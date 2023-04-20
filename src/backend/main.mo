// Import the necessary modules from the Motoko libraries
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import List "mo:base/List";
import Iter "mo:base/Iter";

// Define the main actor for this program
actor {
  // Define custom types for File, Folder and FileTree
  type File = { name: Text; content: Blob };
  type Folder = { name: Text; files: List.List<(Text, File)> };
  type FileTree = TrieMap.TrieMap<Text, Folder>;

  // Define the Result type for error handling
  type Result<T> = { #Ok: T; #Err: Text };

  // Define a custom hash function for Text
  func customHash(text: Text): Nat32 {
    return Text.hash(text);
  };

  // Define a custom equality function for Text
  func customEq(a: Text, b: Text): Bool {
    return Text.equal(a, b);
  };

  // Create a FileTree using custom equality and hash functions
  var fileTree: FileTree = TrieMap.TrieMap<Text, Folder>(customEq, customHash);

  // Define a public function to add a new folder to the fileTree
  public func addFolder(folderName: Text) : async () {
    let newFolder = { name = folderName; files = List.nil<(Text, File)>() };
    fileTree.put(folderName, newFolder);
  };

  // Define a public function to add a new file to an existing folder in the fileTree
  public func addFile(folderName: Text, fileName: Text, content: Blob) : async Result<()> {
    let folder = fileTree.get(folderName);
    switch (folder) {
      case (null) { return #Err("Folder not found"); };
      case (?f) {
        let newFileList = List.push<(Text, File)>((fileName, { name = fileName; content = content }), f.files);
        let updatedFolder = { name = f.name; files = newFileList };
        fileTree.put(folderName, updatedFolder);
        return #Ok(());
      };
    };
  };

  // Define a public function to browse the contents of the fileTree
  public shared func browse() : async List.List<(Text, Folder)> {
    let entries = fileTree.entries();
    let entriesArray = Iter.toArray<(Text, Folder)>(entries);
    return List.fromArray<(Text, Folder)>(entriesArray);
  }
}
