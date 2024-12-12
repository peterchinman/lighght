// Example usage
document.addEventListener('DOMContentLoaded', () => {
   // markSilentLettersInDocument();
   // Check every second (1000 milliseconds)
   setInterval(() => {
      // Generate a random number between 0 and 99
      const randomChance = Math.floor(Math.random() * 100);

      if (randomChance < 20) {
         silentCancer();
      }
   }, 10);

   document.addEventListener('click', (event) => {
      console.log("click");
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
});
