function silentCancer() {
   silentLetterSpans = document.querySelectorAll('.silent-letters');
   randomIndex = Math.floor(Math.random() * silentLetterSpans.length)
   cancer = silentLetterSpans[randomIndex];
   const clone = cancer.cloneNode(true);
   cancer.parentNode.insertBefore(clone, cancer.nextSibling)
   // console.log(cancer);
}


