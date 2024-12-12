// Function to load the module
function loadModule() {
    return new Promise((resolve, reject) => {
        // Use the initialization method you were using
        Module().then((LoadedModule) => {
            Module = LoadedModule;
            resolve(Module);
        }).catch((error) => {
            console.error("Error loading WebAssembly module:", error);
            reject(error);
        });
    });
}

// Function to initialize the WebAssembly module and dictionary
async function initializeSilentLettersModule() {
   // Load the module
   await loadModule();
   
   // Initialize the dictionary
   const dict = new Module.CMU_Dict();
   
   // Return a function that can be used for marking
   return function markSilentLetters(word) {
      let pronunciations = "";
      try {
         pronunciations = dict.find_phones(word);
      }
      catch(error) {
         // Optionally log or handle dictionary lookup errors
         return word;
      }

      const prefix = "<span class='silent-letter-container'><span class='silent-letters'>";
      const suffix = "</span></span>";

      let marked_word = word;
      if (pronunciations) {
         try {
               marked_word = Module.get_word_with_marked_silent_letters(
                  word, 
                  pronunciations, 
                  prefix, 
                  suffix, 
                  false, 
                  ""
               );
         }
         catch(error) {
               // Optionally log or handle silent letter marking errors
               return word;
         }
      }
      return marked_word;
   };
}

// TODO add "&shy;" so that we can have line breaking

// Function to mark silent letters in the entire document
async function markSilentLettersInDocument() {
    // Ensure module and dictionary are initialized
    const markSilentLetters = await initializeSilentLettersModule();

    // Walk through all text nodes in the document
    function processTextNode(node) {
        // Skip nodes that are not text or within script/style tags
        if (node.nodeType !== Node.TEXT_NODE || 
            !node.parentElement || 
            ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement.tagName)) {
            return;
        }

        // Split the text into words
        const words = node.textContent.split(/\b/);
        
        // Process and replace words
        const processedWords = words.map(word => {
            // Only process words with actual letters
            if (/[a-zA-Z]/.test(word)) {
                return markSilentLetters(word);
            }
            return word;
        });

        // If processed words differ from original, update the text
        if (processedWords.some((word, index) => word !== words[index])) {
            // Create a temporary div to help with HTML parsing
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = processedWords.join('');

            // Replace the original text node with processed content
            while (tempDiv.firstChild) {
                node.parentNode.insertBefore(tempDiv.firstChild, node);
            }
            node.parentNode.removeChild(node);
        }
    }

    // Recursive function to walk through all nodes
    function walkNodes(node) {
        processTextNode(node);
        
        // Recursively process child nodes
        for (let child = node.firstChild; child; child = child.nextSibling) {
            walkNodes(child);
        }
    }

    // Start walking from the document body
    walkNodes(document.body);
}


