export default async () => {

  const N = 100;

  const building = Array.from(Array(N), (_, i) => i + 1);

  const triangularSeries = [];
  for (let i = 0, j = building.length - 1; i < j; i++, j--) {

    const a = building[i];
    const b = building[j];
    const s = a + b;

    triangularSeries.push(`
      <p>
        <code>${a} + ${b} = ${s}</code>
      </p>`);
  }

  const quad = (-1 + Math.sqrt(Math.pow(1, 2) - (4 * 1 * N * -2))) / (2 * 1);

  const floor = Math.floor(Math.random() * (N - 1) + 1);

  let
    climb = Math.round(quad),
    dropFloor = Math.round(quad),
    iterations = 0,
    safeFloor = 0;

  do {

    iterations++;

    if (dropFloor > floor) {
      // think of this as the egg breaking, rather than "knowing" the floor it will break on
      break;
    }

    safeFloor = dropFloor;

    climb -= 1;
    dropFloor += climb;

  } while (dropFloor < N);

  if (dropFloor > N) {

    // since N may not be a true triangular number
    dropFloor = N;
    // for the stats
    climb += 1;
  }

  let linearSteps = 0;
  for (safeFloor; safeFloor < N; safeFloor++) {

    linearSteps++;

    // we have to break the egg to know the last safe floor
    if (safeFloor > floor) {
      safeFloor -= 1;
      break;
    }
  }

  const result = {
    dropFloor,
    floor,
    iterations,
    lastClimb: climb,
    linearSteps,
    maxDistanceAfterBreak: dropFloor - safeFloor,
    N,
    safeFloor,
    quad
  };

  const main = document.querySelector('main');

  main.innerHTML = `
    <p>
      <a href='https://brilliant.org/wiki/egg-dropping/'>Egg Dropping</a>
    </p>
    <p>
      <code>N = ${N}</code>
    </p>
    <p>
      <code>${building.join(', ')}</code>
    </p>
    <p>
      1. Find the number of floors to skip (<code>n</code>) 
      which reduces the number of drop attempts the furthest.
    </p>
    <p>
      <code>n + (n - 1) + (n - 2) + ... + 1 = ${N}</code>
    </p>
    <p>
      The left hand side of this equation is a triangular series.
    </p>
    <p>
      Triangular series
      <ul>
        <li>Pairs of numbers from each end of the series will sum to the same value</li>
        <li>The sum of each pair will always be 1 more than the length of the series</li>
      </ul>
    </p>
    ${triangularSeries.join('\n')}
    <p>
      The sum of each pair is <code>n + 1</code>.
    </p>
    <p>
      <code>${N} + 1 = ${N + 1}</code>
    </p>
    <p>
      There are <code>n/2</code> pairs.
    </p>
    <p>
      <code>${N}/2 = ${N / 2}</code>
    </p>
    <p>
      The total sum is <code>(n + 1) * n/2</code> or <code>(n<sup>2</sup> + n)/2</code>.
    </p>
    <p>
      <code>(n<sup>2</sup> + n)/2 = ${N}</code>
    </p>
    <p>
      Rearrange the left hand side into a quadratic equation.
    </p>
    <p>
      <code>2/1 * (n<sup>2</sup> + n)/2 = ${N} * 2</code>
    </p>
    <p>
      <code>n<sup>2</sup> + n = ${N * 2}</code>
    </p>
    <p>
      <code>n<sup>2</sup> + n - ${N * 2} = 0</code>
    </p>
    <p>
      Solve for n with the <a href='https://en.wikipedia.org/wiki/Quadratic_equation'>quadratic formula</a>. 
      Use the positive solution.
    </p>
    <p>
      <code>a = 1, b = 1, c = ${N * -2}</code>
    </p>
    <p>
      <code>${quad}</code>
    </p>
    <p>
      Round up to <code>${Math.round(quad)}</code>.
    </p>
    <p>
      <pre>${JSON.stringify(result, null, 2)}</pre>
    </p>
    <p>
      <pre>
let
  climb = Math.round(quad),
  dropFloor = Math.round(quad),
  iterations = 0,
  safeFloor = 0;

do {

  iterations++;

  if (dropFloor > floor) {
    // think of this as the egg breaking, rather than "knowing" the floor it will break on
    break;
  }

  safeFloor = dropFloor;

  climb -= 1;
  dropFloor += climb;

} while (dropFloor < N);

if (dropFloor > N) {

  // since N may not be a true triangular number
  dropFloor = N;
  // for the stats
  climb += 1;
}

let linearSteps = 0;
for (safeFloor; safeFloor < N; safeFloor++) {

  linearSteps++;

  // we have to break the egg to know the last safe floor
  if (safeFloor > floor) {
    safeFloor -= 1;
    break;
  }
}
      </pre>
    </p>`;
};