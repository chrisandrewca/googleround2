export default async () => {

  const N = 100;
  const sorted = Array.from(Array(N), (_, i) => i + 1);
  const target = Math.floor(Math.random() * (N - 0) + 0);

  const binarySearch = () => {

    let iterations = 0;
    let start = -1;
    let end = sorted.length;

    while (start + 1 < end) {

      iterations++;

      const distance = end - start;
      const middle = Math.floor(distance / 2);
      const selection = start + middle;

      const value = sorted[selection];

      if (value === target) {

        return {
          found: true,
          index: selection,
          iterations,
          N,
          target,
          value
        };
      }

      if (value > target) {

        end = selection;
      } else {

        start = selection;
      }
    }

    return {
      found: false,
      iterations,
      N,
      target
    };
  };

  const result = binarySearch();

  const main = document.querySelector('main');

  main.innerHTML = `
    <p>
      Binary search is 
      <code>O(log<sub>2</sub>(n))</code>. 
      <code>log2(100)</code> is <code>6.64385618977</code>.
    </p>
    <pre>${JSON.stringify(result, null, 2)}</pre>`;
}