export default async () => {

  const N = 100;
  const coins = Array.from(Array(N), () => 1);

  coins[Math.floor(Math.random() * (N - 0) + 0)] = 2;

  const end = N - 2;
  const middle = end / 2;

  let w;
  for (let i = 0, j = middle; i < middle; i++, j--) {

    const a = coins[i];
    const b = coins[j];

    if (a > b) {

      w = i;
    } else if (b > a) {

      w = j;
    }
  }

  if (!w) {

    const a = coins[coins.length - 2];
    const b = coins[coins.length - 1];

    if (a > b) {

      w = coins.length - 2;
    } else {

      w = coins.length - 1;
    }
  }

  const main = document.querySelector('main');

  main.innerHTML = `<pre>${JSON.stringify({
    i: w,
    weight: coins[w]
  })}</pre>`;
};