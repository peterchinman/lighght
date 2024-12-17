function silentCancer() {
   silentLetterSpans = document.querySelectorAll('.silent-letters');
   randomIndex = Math.floor(Math.random() * silentLetterSpans.length)
   cancer = silentLetterSpans[randomIndex];
   const clone = cancer.cloneNode(true);
   cancer.parentNode.insertBefore(clone, cancer.nextSibling)
   // console.log(cancer);
}

function cancerInterval(chance, interval){
   return setInterval(() => {
      // Generate a random number between 0 and 99
      const randomChance = Math.floor(Math.random() * 100);

      if (randomChance < chance) {
         silentCancer();
      }
   }, interval);
}

document.addEventListener('click', (event) => {
   if (event.target.closest('.silent-letter-container')) {
      let $container = event.target.closest('.silent-letter-container');
      const children = Array.from($container.children);
      for (let i = 0; i < children.length; ++i) {
         if (i > 0) {
            $container.removeChild(children[i])
         }
      }
   }
})


